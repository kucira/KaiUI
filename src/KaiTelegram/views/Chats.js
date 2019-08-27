import React, { useState, useCallback, useEffect } from 'react';
import { useGlobal } from 'reactn';
import Header from '../../components/Header/Header';
import { SoftKeyProvider } from '../../components/SoftKey/SoftKeyProvider';
import { SoftKeyConsumer } from '../../components/SoftKey/withSoftKeyManager';
import { withRouter } from 'react-router-dom';
import BodyTextListItem from '../../components/BodyTextListItem/BodyTextListItem';
import ListView from '../../views/ListView/ListView';
import Input from '../../components/Input/Input';
import IconListItem from '../../components/TextListItem/TextListItem';
import LoginController from '../controllers/LoginController';
import countryList from '../config/country-list';
import colors from '../../theme/colors.scss';

function Chats(props) {

  const [chatsList, setChatsList] = useState([]);
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
          const input = document.getElementById('SearchChatInput');
        }
      }, 100);
    }
    
  }, [chats]);

  const { history } = props;
  
  useEffect(async () => {
    const chats = await LoginController().getChat(login.phoneNumber);
    setChats(chats);
  }, [])

  return (
    <div className="App">
      <Header text="Chats" 
              backgroundColor={colors.watTheBlue} />
        <div className="content">
          <ListView >
            <Input 
              id='SearchChatInput'
              label='Search'
              placeholder="Search Chats"
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
              chats.map(c => (
                <IconListItem
                  key={Math.random()}
                  primary={'hello'}
                  secondary={'hello'}
                  focusColor={colors.cyan}
                  centerText='Select'
                  leftText='more'
                  rightText='options'
                  centerCallback={()=> {
                    
                  }}
                >
                  <span>img</span>
                </IconListItem>
              ))
            }
          </ListView>
        </div>
    </div>
  );
}

export default withRouter(Chats);