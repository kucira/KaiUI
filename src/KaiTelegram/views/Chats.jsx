import React, { useState, useCallback, useEffect } from 'react';
import { useGlobal } from 'reactn';
import Header from '../../components/Header/Header';
import { SoftKeyProvider } from '../../components/SoftKey/SoftKeyProvider';
import { SoftKeyConsumer } from '../../components/SoftKey/withSoftKeyManager';
import { withRouter } from 'react-router-dom';
import DataServices from '../Utils/DataServices';
import BodyTextListItem from '../../components/BodyTextListItem/BodyTextListItem';
import ListView from '../../views/ListView/ListView';
import Input from '../../components/Input/Input';
import ListChat from '../components/ListChat';
import ChatController from '../controllers/ChatController';
import countryList from '../config/country-list';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import mockChats from '../config/mock-chats';
import colors from '../../theme/colors.scss';

function Chats(props) {

  const [chatsList, setChatsList] = useState([]);
  const [ login, setLogin ] = useGlobal('login');
  const [ chatData, setChatData ] = useGlobal('chatData');
  const [ chats, setChats ] = useGlobal('chats');

  let firebaseListener = null;
  let id;
  let countDown = 15;
  const handleInputChange = useCallback( async (value)  => {
    const dataApp = await DataServices.getData('messagram_data_app');
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
          const chatFilter = dataApp.updateNewChat.filter(c => c.title.toLowerCase().includes(input.value.toLowerCase()));
          setChatsList(chatFilter);
        }
      }, 100);
    }
    
  }, [chatsList]);

  const { history, socket } = props;

  const fetchData = async () => {
      const token = localStorage.getItem('ft');
      const phone = localStorage.getItem('phone');
      const isSyncChat = localStorage.getItem('isSyncChat');

      getChatData();
      
      const result = await ChatController.getAllChat(phone, token);
      saveChatData(result.data);
  }

  const getChatData = async () => {
    const dataApp = await DataServices.getData('messagram_data_app');
    if(dataApp && dataApp.updateNewChat && dataApp.updateNewChat.length > 0){
      setChats({
        ...chats,
        chats: dataApp.updateNewChat,
      });
      setChatsList(dataApp.updateNewChat);
    }
  }

  const saveChatData = async (data) => {
      const dataApp = await DataServices.getData('messagram_data_app');
      DataServices.saveData('messagram_data_app', {
        ...dataApp,
        updateNewChat: data,
      });
      setChats({
        ...chats,
        chats: data,
      });
      setChatsList(data);
  }

  const registerOnMessage = async (data) => {
    const newChatList = await ChatController.transformChatData(data);
    // const dataApp = await DataServices.getData('messagram_data_app');
    if(newChatList && newChatList.length > 0)
    {
      setChats(newChatList);
      setChatsList(newChatList);
    }
  }

  useEffect(() => {
    // setChats(mockChats);
    // setChatsList(mockChats);
    const messaging = firebase.messaging();

    fetchData();

    firebaseListener = messaging.onMessage(async (_payload) => {
      const { payload } = _payload.data;
      registerOnMessage(payload);
    });

    // const phone = localStorage.getItem('phone');
    // socket.emit('getAllChat', {phone});
    // socket.on('updateCallback', async (data) => {
    //   registerOnMessage(data);
    // });
    // socket.on('responseAllChat', async (data) => {
    //   saveChatData(data);
    // });

    return () => {
      firebaseListener();
      // socket.removeEventListener('updateCallback');
      // socket.removeEventListener('responseAllChat');
    }

  }, [])

  const translateTypeTextMessage = (payload) => {
    let text = '';
    switch(payload.last_message.content['@type']){
      case 'messageCustomServiceAction' :
        text = String(payload.last_message.content.text.text);
      break;
      case 'messageAnimation' :
        text = "animation not supported for moment";
      break;
      case 'messageText' :
        text = String(payload.last_message.content.text.text);
      break;
      default :
        text = String(payload.last_message.content.text);
      break;
    }

    return text;
  }

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
              leftText='New Chat'
              rightText='Refresh'
              rightCallback={()=> {
                window.location.reload();
              }}
              leftCallback={()=> {
                history.push('/newchat');
              }}
            />
            {
              chatsList && chatsList.map(c => (
                <ListChat
                  key={Math.random()}
                  primary={c.title}
                  secondary={translateTypeTextMessage(c)}
                  data={c}
                  focusColor={colors.cyan}
                  centerText='Select'
                  leftText='New Chat'
                  rightText='Refresh'
                  rightCallback={()=> {
                    window.location.reload();
                  }}
                  centerCallback={()=> {
                    history.push(`/message/${c.id}/${c.title}`);
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