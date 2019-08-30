import React, { useState, useCallback, useEffect } from 'react';
import { useGlobal } from 'reactn';
import Header from '../../components/Header/Header';
import { SoftKeyProvider } from '../../components/SoftKey/SoftKeyProvider';
import { SoftKeyConsumer } from '../../components/SoftKey/withSoftKeyManager';
import { withRouter } from 'react-router-dom';
import BodyTextListItem from '../../components/BodyTextListItem/BodyTextListItem';
import ListView from '../../views/ListView/ListView';
import Input from '../../components/Input/Input';
import ListChat from '../components/ListChat';
import LoginController from '../controllers/LoginController';
import countryList from '../config/country-list';
import colors from '../../theme/colors.scss';

function NewChat(props) {

  const [contactList, setContactList] = useState([{
    name:'Jono'
  }]);
  const [ login, setLogin ] = useGlobal('login');
  const [ chats, setChats ] = useGlobal('chats');
  let id;
  let countDown = 15;
  const handleInputChange = useCallback(value  => {
    countDown = 15;
    if(!id){
      id = setInterval(() => {
        if(countDown > 0){
          countDown -= 1;
        }
        else{
          clearInterval(id);
          id = null;
          const input = document.getElementById('SearchContactInput');
        }
      }, 100);
    }
    
  }, [contactList]);

  const { history } = props;
  
  useEffect(() => {
    const fetchData = async ()=> {
      // const chats = await LoginController().getAllChat(login.phoneNumber);
      // console.log(chats);
      //setChats(chats);      
    }
    fetchData();
  }, [])

  return (
    <div className="App">
      <Header text="Chats" 
              backgroundColor={colors.watTheBlue} />
        <div className="content">
          <ListView >
            <Input 
              id='SearchContactInput'
              label='Search'
              placeholder="Search Contact"
              onInputChange={handleInputChange}
              focusColor={colors.cyan}
              centerText=''
              leftText='more'
              rightText='options'
              leftCallback={()=> {
                history.goBack();
              }}
            />
            {
              contactList.map(c => (
                <ListChat
                  key={Math.random()}
                  primary={c.name}
                  focusColor={colors.cyan}
                  centerText='Select'
                  leftText='more'
                  rightText='options'
                  centerCallback={()=> {
                    history.push('/message/1/Telegram')
                  }}
                />
              ))
            }
          </ListView>
        </div>
    </div>
  );
}

export default withRouter(NewChat);