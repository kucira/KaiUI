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
import Spinner from 'react-spinner-material';
import colors from '../../theme/colors.scss';

function StartPage(props) {

  const { history, location } = props;

  const fetchData = async () => {
    const isLogin = localStorage.getItem('isLogin');
    const token = localStorage.getItem('ft');
    const phone = localStorage.getItem('phone');
    if(isLogin){
      const result = await LoginController.getCode(phone, token);
      history.replace('/chats')
    }
    else{
      // clear client telegram on server
      // axios.post('/logout');
      history.replace('/login');
    }
  }

  async function getToken() {
    const token = await askForPermissionToReceiveNotifications();
    console.log(token);
    
    //save token
    localStorage.setItem('ft', token);
  }

  useEffect(() => {
      // getToken();
      fetchData();
      // history.replace('/login');
  }, []);


  return (
    <div style={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      height:'100vh'
    }}>
      <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />
    </div>
  );
}

export default withRouter(StartPage);
