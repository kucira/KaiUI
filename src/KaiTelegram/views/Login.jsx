import React, { useState, useCallback, useEffect } from 'react';
import { useGlobal } from 'reactn';
import Header from '../../components/Header/Header';
import { SoftKeyProvider } from '../../components/SoftKey/SoftKeyProvider';
import { withRouter } from 'react-router-dom';
import BodyTextListItem from '../../components/BodyTextListItem/BodyTextListItem';
import ListView from '../../views/ListView/ListView';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import LoginController from '../controllers/LoginController';
import ChatController from '../controllers/ChatController';
import { askForPermissionToReceiveNotifications } from '../Utils/PushNotification';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import DataServices from '../Utils/DataServices';
import colors from '../../theme/colors.scss';


function Login(props) {
  const [ login, setLogin ] = useGlobal('login');
  const [ chatData, setChatData ] = useGlobal('chatData');
  const [ chats, setChats ] = useGlobal('chats');
  const [ loading, setLoading ] = useState(false);

  const handleInputChange = useCallback(value  => {
    //const inputPhone = document.getElementById('phone')
  }, [login]);
  const { history, location, socket } = props;

  let firebaseListener;

  useEffect(() => {
    const messaging = firebase.messaging();
    firebaseListener = messaging.onMessage(async (_payload) => {
      const { payload } = _payload.data;
      const parse = JSON.parse(payload);
      const type = String(parse['@type']) || '';
      console.log(type.includes('updateUser'));
      if(type.includes('error')) {
        setLoading(false);
        alert(parse.message);
      }
      else if(type.includes('updateUser')){
        history.replace('/chats');
      }
      else {
        history.push('/auth');
      }
    });
    return () => {
      firebaseListener();
    }
  }, [])

  useEffect(() => {
    const inputPhone = document.getElementById('phone')
    if(login.country)
      inputPhone.value = login.country.phoneCode;
      // inputPhone.value = login.country.phoneCode !== null ? login.phoneNumber : login.country.phoneCode; 
  }, [login]);

  return (
    <div className="App">
      <Header text="Kai Telegram" 
              backgroundColor={colors.watTheBlue} />
        <div className="content">
          <ListView>
            <BodyTextListItem header='Sign in'
                              body='Please Choose your country and enter your full phone number'
                              focusColor={colors.cyan} />
            <Input 
              label='Country'
              placeholder="Country"
              onInputChange={handleInputChange}
              focusColor={colors.cyan}
              centerText='Select'
              leftText=''
              rightText=''
              value={(login.country && login.country.name) || 'Select Country' }
              centerCallback={()=>{
                history.push('/country');
              }}
              />
            <Input 
              id='phone'
              label='Phone Number'
              placeholder="Number"
              centerText='Select'
              leftText=''
              rightText=''
              onInputChange={handleInputChange}
              focusColor={colors.cyan}
              />

              <Button text={loading ? 'Loading' : 'Next'}
                      focusColor={colors.cyan}
                      centerCallback={async ()=>{
                        const inputPhone = document.getElementById('phone');
                        const phone = inputPhone.value;
                        
                        const token = localStorage.getItem('ft');
                        console.log(token);
                        localStorage.setItem('phone', phone);
                        localStorage.setItem('isSyncChat', 0);


                        setLogin({...login, phoneNumber:inputPhone.value});
                        // socket.emit('request-code', {phone});


                          // Send Push Notification
                          // console.log("Sending Push...");
                          // const subscription = localStorage.getItem('subscription');
                          // alert(process.env.REACT_APP_BASE_URL);
                          // alert(subscription);
                          // await fetch(`${process.env.REACT_APP_BASE_URL}/subscribe`, {
                          //   method: "POST",
                          //   body: subscription,
                          //   headers: {
                          //     "content-type": "application/json"
                          //   }
                          // });
                          // console.log("Push Sent...");
                        if(!loading) {
                          try {
                            // statements
                            const result = await LoginController.getCode(phone, token);
                            console.log(result);
                            setLoading(true);
                            if(!result.data.initClient) {
                              const { data } = await LoginController.getMe(phone, token); //check the user info
                              
                              if(data.message) {
                                const parse = JSON.parse(data.message);
                                console.log(parse);
                                if(parse['@type'] === 'error'){
                                  alert(data.message);
                                  setLoading(false)
                                }
                              }else{
                                console.log(data);
                                history.replace('/chats');
                              }
                            }
                            
                          } catch(e) {
                            
                            // statements
                            alert(e);
                          }
                        }

                      }}/>
          </ListView>
        </div>
    </div>
  );
}

export default withRouter(Login);
