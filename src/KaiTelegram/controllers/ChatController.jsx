import axios from 'axios';
import DataServices from '../Utils/DataServices';

const ChatController = {
	transformChatData: async (_payload) => {
		const statusApp = await DataServices.getData('messagram_status_app');
		const dataApp = await DataServices.getData('messagram_data_app');
		const parse = JSON.parse(_payload);
		switch(parse['@type']) {
            case 'updateUser' :
              console.log('save user if the phone number same with the payload'); //save user information
              await DataServices.saveData('messagram_data_app', {
					...dataApp,
					updateUser: parse,
				});
              return [];
            break;
            case 'updateNewMessage' :
            	// update the chat data with the new payload
            	if(dataApp && dataApp.updateNewChat){
					const newChatData = dataApp.updateNewChat.map(c => {

						return {
							...c,
							last_message : (c.id === parse.message.chat_id ) ? 
							parse.message : c.last_message,
							unread_count: (c.id === parse.message.chat_id ) ? 
							c.unread_count += 1 : c.unread_count,
						}
					});
					console.log(newChatData, 'transform chat data');
					// save to database for the new chat
					// if(dataApp.updateNewMessage)
					// 	dataApp.updateNewMessage.push(parse.message);

					DataServices.saveData('messagram_data_app', {
						...dataApp,
						updateNewChat: newChatData,
					});
					return newChatData;
            	}
            	return [];
            	
            break;
            case 'updateNewChat' :
				// update the chat data with the new payload

    //         	const indexChat = dataApp.updateNewChat.findIndex(c => c.id === parse.chat.id);
    //         	if(indexChat === -1) { // new chat
    //         		dataApp.updateNewChat.push({
    //         			'@type':'chat',
    //         			...parse.chat,
    //         		});
    //         	}
    //         	else { // update chat 
    //         		dataApp.updateNewChat[indexChat] = {
    //         			'@type':'chat',
    //         			...parse.chat,
    //         		}	
    //         	}

    //         	// save to database for the new chat
				// await DataServices.saveData('messagram_data_app', {
				// 	...dataApp,
				// 	updateNewChat: dataApp.updateNewChat,
				// });
				if(dataApp && dataApp.updateNewChat){
					return dataApp.updateNewChat;
				}
            	return [];
            break;
          }
          // console.log('Message received. ', JSON.parse(_payload));
	},
	getChat: async (_chat_id, _phoneNumber, token) => {
			const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/chat`, {
					chat_id:_chat_id,
					phone:_phoneNumber,
					token,
			});
			console.log(result);
			return new Promise(resolve => {
				resolve(result);
			});
		},
	getAllChat: async (_phoneNumber, token) => {
		const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/all-chats`, {
				phone:_phoneNumber,
				token,
		});
		console.log(result);
		return new Promise(resolve => {
			resolve(result);
		});
	},
	openChat: async (chat_id, phone, token) => {
		const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/open-chat`, {
				chat_id,
				phone,
				token,
		});
		console.log(result);
		return new Promise(resolve => {
			resolve(result);
		});
	},
	getAllMessages: async (chat_id, phone, token) => {
		const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/history-chat`, {
				chat_id,
				phone,
				token,
		});
		console.log(result);
		return new Promise(resolve => {
			resolve(result);
		});
	},
	sendMessage: async (chat_id, phone, token, message) => {
		const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/send-message`, {
				chat_id,
				phone,
				token,
				message,
		});
		console.log(result);
		return new Promise(resolve => {
			resolve(result);
		});
	},
}

export default ChatController;