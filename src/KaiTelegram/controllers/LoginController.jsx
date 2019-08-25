
import Config from '../config/config';
import MTProto from 'telegram-mtproto';

async function connect(_phoneNumber, _phoneCode, client){
		
	  // const { phone_code_hash } = await client('auth.sendCode', {
	  //   phone_number  : _phoneNumber,
	  //   current_number: true,
	  //   api_id        : Config.id,
	  //   api_hash      : Config.hash
	  // });

	  
	  // const { user } = await client('auth.signIn', {
	  //   phone_number   : _phoneNumber,
	  //   phone_code_hash: phone_code_hash,
	  //   phone_code     : _phoneCode
	  // });

	  // console.log('signed as ', user)
	  client('auth.checkPhone', {
	  	phone_number:_phoneNumber,
	  }).then(val => {
	  	console.log(val);
	  })
	  // return new Promise(resolve => resolve('oke'))
}

const LoginController =  () => {
	return {
		login: async (_phoneNumber, _phoneCode) => {

			const api = {
		      invokeWithLayer: 0xda9b0d0d,
		      layer: 57,
			  initConnection : 0x69796de9,
			  api_id         : Config.id,
		        app_version: '1.0.0',
		        lang_code: 'en',
			}

			const server = {
			    webogram: true,
        		dev: false,
			}           //Any empty configurations fields can just not be specified

			const client = MTProto({ server, api });
			console.log(client);
			const result = await connect(_phoneNumber, _phoneCode, client);
			console.log('phone code', result);
			return result;

		},
		selectCountry: (props) => {
		},
	}
}

export default LoginController;