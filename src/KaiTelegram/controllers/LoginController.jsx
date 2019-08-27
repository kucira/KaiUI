
import Config from '../config/config';
import axios from 'axios';

const LoginController =  () => {
	return {
		login: async (_phoneNumber, _phoneCode) => {
			const result = await axios.get(`http://localhost:3009/auth/0/${_phoneNumber}`);
			console.log(result);
			return new Promise(resolve => {
				resolve(result);
			});
		},
		authCode: async (_code, _phoneNumber) => {
			const result = await axios.get(`http://localhost:3009/auth/${_code}/${_phoneNumber}`);
			console.log(result);
			return new Promise(resolve => {
				resolve(result);
			});
		},
		getChat: async (_phoneNumber) => {
			const result = await axios.get(`http://localhost:3009/chats/${_phoneNumber}`);
			console.log(result);
			return new Promise(resolve => {
				resolve(result);
			});
		},
	}
}

export default LoginController;