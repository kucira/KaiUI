
import Config from '../config/config';
import axios from 'axios';

const LoginController  = {
		getCode: async (_phoneNumber, token) => {
			const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/getcode`, {			
					phone:_phoneNumber,
					token,
			});
			console.log(result);
			return new Promise(resolve => {
				resolve(result);
			});
		},
		authCode: async (_code, _phoneNumber, token) => {
			const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth`, {
					code:_code,
					phone:_phoneNumber,
					token,
			});
			return new Promise(resolve => {
				resolve(result);
			});
		},
		getMe: async (_phoneNumber, token) => {
			const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/me`, {
					phone:_phoneNumber,
					token,
			});
			return new Promise(resolve => {
				resolve(result);
			});
		},
}

export default LoginController;