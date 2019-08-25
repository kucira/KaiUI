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
import colors from '../../theme/colors.scss';

function Login(props) {
  const [ login, setLogin ] = useGlobal('login');
  let phone = '';
  let joinPhone = '';
  const handleInputChange = useCallback(value  => {
    const inputPhone = document.getElementById('phone')
    phone = inputPhone.value;
  }, [login]);
  const { history, location } = props;

  useEffect(() => {
    const inputPhone = document.getElementById('phone')
    if(login.country)
      inputPhone.value = login.country.phoneCode;
  }, [login])

  useEffect(() => {
  }, [])

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
            <Button text='Sign in'
                    focusColor={colors.cyan}
                    centerCallback={async ()=>{
                      const inputPhone = document.getElementById('phone')
                      setLogin({...login, phoneNumber:inputPhone.value});
                      const result = await LoginController().login(phone, login.country.phoneCode);
                      console.log(result);
                    }}/>
          </ListView>
        </div>
    </div>
  );
}

export default withRouter(Login);
