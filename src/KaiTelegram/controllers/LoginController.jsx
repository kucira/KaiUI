
import Config from '../config/config';
import axios from 'axios';

const LoginController =  () => {
	return {
		login: async (_phoneNumber, _phoneCode) => {
			const result = await axios.get(`http://localhost:3009/getcode/${_phoneNumber}`);
			console.log(result);
			return new Promise(resolve => {
				resolve(result);
			});
		},
		authCode: async (_code) => {
			const result = await axios.post(`http://localhost:3009/auth/`,
					{
						code:_code
					});
			console.log(result);
			return new Promise(resolve => {
				resolve(result);
			});
		},
		selectCountry: (props) => {
		},
	}
}

export default LoginController;