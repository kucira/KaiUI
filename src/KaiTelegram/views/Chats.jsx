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
import mockChats from '../config/mock-chats';
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
          const chatFilter = chats.filter(c => c.title.toLowerCase().includes(input.value.toLowerCase()));
          setChatsList(chatFilter);
        }
      }, 100);
    }
    
  }, [chatsList]);

  const { history } = props;
  
  useEffect(() => {
    const fetchData = async ()=> {
      // const chats = await LoginController().getAllChat(login.phoneNumber);
      // console.log(chats);
      //setChats(chats);      
    }
    setChats(mockChats);
    setChatsList(mockChats);
    fetchData();
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
              chatsList.map(c => (
                <ListChat
                  key={Math.random()}
                  primary={c.title}
                  secondary={c.last_message.content['@type'] === 'messageCustomServiceAction' ? 
                    c.last_message.content.text :
                    c.last_message.content.text.text
                  }
                  data={c}
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

export default withRouter(Chats);