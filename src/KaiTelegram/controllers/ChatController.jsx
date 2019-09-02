const ChatController = {
	transformChatData:(initalState, _payload, _callback,) => {
		switch(JSON.parse(_payload)['@type']) {
            case 'updateUser' :
              console.log('save user if the phone number same with the payload') //save user information
            break;
            case 'updateNewMessage' :
              _callback({...initalState, updateNewMessage:_payload});
            break;
            case 'updateNewChat' :
              _callback({...initalState, updateNewChat:_payload});
            break;
          }
          console.log('Message received. ', JSON.parse(_payload));
	}
}

export default ChatController;