import React, { useState, useCallback, useEffect } from 'react';
import { useGlobal } from 'reactn';
import Header from '../../components/Header/Header';
import { SoftKeyProvider } from '../../components/SoftKey/SoftKeyProvider';
import { withRouter } from 'react-router-dom';
import DataServices from '../Utils/DataServices';
import ListView from '../../views/ListView/ListView';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import LoginController from '../controllers/LoginController';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import colors from '../../theme/colors.scss';

function AuthCode(props) {
  const [ login, setLogin ] = useGlobal('login');
  const [ chats, setChats ] = useGlobal('chats');
  const [ loading, setLoading ] = useState(false);
  const { history, location } = props;


  let firebaseListener;

  useEffect(() => {
    const messaging = firebase.messaging();
    firebaseListener = messaging.onMessage(async (_payload) => {
      const { payload } = _payload.data;
      const parse = JSON.parse(payload);
      const type = String(parse['@type']) || '';
      console.log(type);
      if(type.includes('error')) {
        setLoading(false);
        alert(parse.message);
      }
      else if(type.includes('updateUser')){
        history.replace('/chats');
      }
      // else{
      //   localStorage.setItem('isLogin', 1);
      //   history.replace('/chats');
      // }
    });
    return () => {
      firebaseListener();
    }
  }, [])

  return (
    <div className="App">
      <Header text="Insert Code" 
              backgroundColor={colors.watTheBlue} />
        <div className="content">
          <ListView>
             <Input 
                id='AuthCode'
                label='Code'
                placeholder="Insert Code"
                centerText={loading ? 'Loading' : 'Sign in'}
                leftText='Back'
                rightText=''
                onInputChange={()=>{}}
                focusColor={colors.cyan}
                centerCallback={ async ()=>{
                  const authCode = document.getElementById('AuthCode').value;
                  const token = localStorage.getItem('ft');
                  if(!loading){
                    try {
                      // statements
                      setLoading(true);
                      const result = await LoginController.authCode(authCode, login.phoneNumber, token);
                    } catch(e) {
                      // statements
                      alert(e);
                      console.log(e);
                    }
                  }
                }}
                leftCallback={()=>{
                  history.goBack();
                }}
                />
          </ListView>
        </div>
    </div>
  );
}

export default withRouter(AuthCode);
