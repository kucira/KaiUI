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
// import * as firebase from 'firebase/app';
// import 'firebase/messaging';
import mockChats from '../config/mock-chats';
import colors from '../../theme/colors.scss';

function Chats(props) {

  const [chatsList, setChatsList] = useState([]);
  const [ login, setLogin ] = useGlobal('login');
  const [ chatData, setChatData ] = useGlobal('chatData');
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

  const { history, socket } = props;

  const fetchData = async () => {
      const statusApp = await DataServices.getData('messagram_status_app');
      const dataApp = await DataServices.getData('messagram_data_app');
      const token = localStorage.getItem('ft');
      const phone = localStorage.getItem('phone');
      const isSyncChat = localStorage.getItem('isSyncChat');

      if(dataApp){
        const _chats = dataApp.updateNewChat;
        
        setChats(_chats);
        setChatsList(_chats);

        if(isSyncChat === '0') {
          console.log(isSyncChat, 'masuk');
          const result = await ChatController.getAllChat(phone, token);
          await DataServices.saveData('messagram_data_app', {
            ...dataApp,
            updateNewChat: result.data,
          });
          await DataServices.saveData('messagram_status_app', {
            isSyncChat:true,
          });
          localStorage.setItem('isSyncChat', 1);

          setChats({
            ...chats,
            chats: result.data,
          });
          setChatsList(result.data);
        }
      }
      else{
          const result = await ChatController.getAllChat(phone, token);
          await DataServices.saveData('messagram_data_app', {
            ...dataApp,
            updateNewChat: result.data,
          });
          await DataServices.saveData('messagram_status_app', {
            isSyncChat:true,
          });
          localStorage.setItem('isSyncChat', 1);

          setChats({
            ...chats,
            chats: result.data,
          });
          setChatsList(result.data);
      }
  }

  const getChatData = async () => {
    const statusApp = await DataServices.getData('messagram_status_app');
    const dataApp = await DataServices.getData('messagram_data_app');
    if(dataApp && dataApp.length > 0){
      setChats({
        ...chats,
        chats: dataApp.updateNewChat,
      });
      setChatsList(dataApp.updateNewChat);
    }
  }

  const saveChatData = async (data) => {
      const dataApp = await DataServices.getData('messagram_data_app');
      await DataServices.saveData('messagram_data_app', {
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
   // const messaging = firebase.messaging();

    // messaging.onMessage(async (_payload) => {
    //   // const { payload } = _payload.data;

    // });
    const newChatList = await ChatController.transformChatData(data);
    const dataApp = await DataServices.getData('messagram_data_app');
    if(newChatList && newChatList.length > 0)
    {
      setChats(newChatList);
      setChatsList(newChatList);
      if (!"Notification" in window) {
        console.log("This browser does not support notifications.");
      }

      // Let's check if the user is okay to get some notification
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        console.log(Notification.permission);
        if(dataApp && dataApp.updateNewChat && data.message) {
          const user = dataApp.updateNewChat.find(c => c.id === data.message.chat_id);
          const img = '';
          const text = translateTypeTextMessage(user);
          const notification = new Notification(`${user.title}`, { body: text, icon: img });
          notification.onclick = (event) => {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            // history.push(`/message/${user.id}/${user.title}`);
            window.open(`/message/${user.id}/${user.title}`);
          }
        }
      }
    }
  }

  useEffect(() => {
    // setChats(mockChats);
    // setChatsList(mockChats);
    // fetchData();
    // registerOnMessage();
    const phone = localStorage.getItem('phone');
    getChatData();

    socket.emit('getAllChat', {phone});
    socket.on('updateCallback', async (data) => {
      registerOnMessage(data);
    });
    socket.on('responseAllChat', async (data) => {
      saveChatData(data);
    });

    return () => {
      socket.removeEventListener('updateCallback');
      socket.removeEventListener('responseAllChat');
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
              rightText='Options'
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
                  rightText='Options'
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