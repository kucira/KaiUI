
import Config from '../config/config';
import axios from 'axios';

const LoginController =  () => {
	return {
		getCode: async (_phoneNumber) => {
			const result = await axios.post(`http://localhost:3009/getcode`, {			
					phone:_phoneNumber,
			});
			console.log(result);
			return new Promise(resolve => {
				resolve(result);
			});
		},
		authCode: async (_code, _phoneNumber) => {
			const result = await axios.post(`http://localhost:3009/auth`, {
					code:_code,
					phone:_phoneNumber,
			});
			console.log(result);
			return new Promise(resolve => {
				resolve(result);
			});
		},
		getChat: async (_chat_id, _phoneNumber) => {
			const result = await axios.post(`http://localhost:3009/chat`, {
					id:_chat_id,
					phone:_phoneNumber,
			});
			console.log(result);
			return new Promise(resolve => {
				resolve(result);
			});
		},
		getAllChat: async (_phoneNumber) => {
			const result = await axios.post(`http://localhost:3009/all-chats`, {
					phone:_phoneNumber,
			});
			console.log(result);
			return new Promise(resolve => {
				resolve(result);
			});
		},
	}
}

export default LoginController;