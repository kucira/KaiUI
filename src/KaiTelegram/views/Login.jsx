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
import { askForPermissionToReceiveNotifications } from '../Utils/PushNotification';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import axios from 'axios';
import colors from '../../theme/colors.scss';

function Login(props) {
  const [ login, setLogin ] = useGlobal('login');
  const handleInputChange = useCallback(value  => {
    //const inputPhone = document.getElementById('phone')
  }, [login]);
  const { history, location } = props;

  useEffect(() => {
    const inputPhone = document.getElementById('phone')
    if(login.country)
      inputPhone.value = login.country.phoneCode;
  }, [login]);

  useEffect(() => {
    async function getToken() {
      const token = await askForPermissionToReceiveNotifications();
      console.log(token);
      //save token
      localStorage.setItem('ft', token);
     const messaging = firebase.messaging();

      messaging.onMessage((payload) => {
      
        console.log('Message received. ', JSON.parse(payload.data.payload));
        // ...
      });

    // const currentToken = await messaging.getToken();
    //    if (currentToken) {
    //       console.log(currentToken);
    //     } else {
    //       // Show permission request.
    //       console.log('No Instance ID token available. Request permission to generate one.');
    //       // Show permission UI.
    //   }
    }
  getToken();

  }, []);

  const onUpdate = (e) => {
    
  }

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

              <Button text='Next'
                      focusColor={colors.cyan}
                      centerCallback={async ()=>{
                        const inputPhone = document.getElementById('phone');
                        const phone = inputPhone.value;
                        setLogin({...login, phoneNumber:inputPhone.value});
                        const token = localStorage.getItem('ft');
                        const result = await LoginController().getCode(phone, token);
                        console.log(result);
                        history.push('/auth');
                      }}/>
          </ListView>
        </div>
    </div>
  );
}

export default withRouter(Login);
