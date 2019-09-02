import React, { useState, useCallback, useEffect } from 'react';
import { useGlobal } from 'reactn';
import Header from '../../components/Header/Header';
import { SoftKeyProvider } from '../../components/SoftKey/SoftKeyProvider';
import { withRouter } from 'react-router-dom';
import ListView from '../../views/ListView/ListView';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import LoginController from '../controllers/LoginController';
import colors from '../../theme/colors.scss';

function AuthCode(props) {
  const [ login, setLogin ] = useGlobal('login');
  const [ chats, setChats ] = useGlobal('chats');
  const { history, location } = props;

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
                centerText='Sign in'
                leftText='Back'
                rightText=''
                onInputChange={()=>{}}
                focusColor={colors.cyan}
                centerCallback={ async ()=>{
                  const authCode = document.getElementById('AuthCode').value;
                  const token = localStorage.getItem('ft');
                  const result = await LoginController().authCode(authCode, login.phoneNumber, token);
                  history.replace('/chats');
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
