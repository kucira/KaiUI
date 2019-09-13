import React, { useState, useCallback, useEffect } from 'react';
import { useGlobal } from 'reactn';
import Header from '../../components/Header/Header';
import { withRouter } from 'react-router-dom';
import TextListItem from '../../components/TextListItem/TextListItem';
import ListView from '../../views/ListView/ListView';
import OptionView from '../../views/OptionView/OptionView';
import Input from '../../components/Input/Input';
import Bubble from '../components/Bubble';
import ChatController from '../controllers/ChatController';
import DataServices from '../Utils/DataServices';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import countryList from '../config/country-list';
import moment from 'moment';
import mockChats from '../config/mock-chats';
import colors from '../../theme/colors.scss';
import './Message.scss';

function Messages(props) {

  const [messageList, setMessageList] = useState([]);
  const [isOptions, setIsOptions] = useState(false);
  const [ login, setLogin ] = useGlobal('login');
  const [ chatData, setChatData ] = useGlobal('chatData');

  let firebaseListener = null;
  let id;
  let countDown = 15;
  const handleInputChange = useCallback(value  => {
    
  }, [messageList]);

  const { history, match, socket } = props;

  const fetchData = async () => {
      const token = localStorage.getItem('ft');
      const phone = localStorage.getItem('phone');

      getMessageData();
      
      const result = await ChatController.getAllMessages(match.params.id, phone, token);
      saveMessageData(result.data)
  }

  const registerOnMessage = async (payload) => { 

      const dataApp = await DataServices.getData('messagram_data_app');
      const newChatList = await ChatController.transformChatData(payload);
      const parse = JSON.parse(payload);
      console.log(parse)
      console.log(Number(match.params.id));
      if(parse.message.chat_id === Number(match.params.id)) {
        dataApp.updateNewMessage.push(parse.message);
        setMessageList(dataApp.updateNewMessage);
        DataServices.saveData('messagram_data_app', dataApp);
      }
  }

  const getMessageData = async () => {
    const dataApp = await DataServices.getData('messagram_data_app');

    if(dataApp && dataApp.length > 0){
      const messSort = dataApp.updateNewMessage.sort((a, b) => a.date -b.date);
      setChatData({
        ...chatData,
        messages: messSort,
      });
      setMessageList(messSort);
    }
  }

  const saveMessageData = async (data) => {
      const messSort = data.messages.sort((a, b) => a.date -b.date);
      const dataApp = await DataServices.getData('messagram_data_app');
      DataServices.saveData('messagram_data_app', {
        ...dataApp,
        updateNewMessage: messSort,
      });
      setChatData({
        ...chatData,
        messages: messSort,
      });
      setMessageList(messSort);
  }

  const sendMessage = async (data) => {
    // socket.emit('sendMessage', data);
    const ft = localStorage.getItem('ft');
    const result = ChatController.sendMessage(data.chatId, data.phone, ft, data.message);
  }
  
  useEffect(() => {
    // const phone = localStorage.getItem('phone');
    // socket.emit('getHistoryChat', {phone, chatId:match.params.id});
    const messaging = firebase.messaging();

    fetchData();

    firebaseListener = messaging.onMessage(async (_payload) => {
      const { payload } = _payload.data;
      registerOnMessage(payload);
    });

    // socket.on('updateCallback', (data) => {
    //   registerOnMessage(data);
    // });
    // socket.on('responseHistoryChat', (data) => {
    //   saveMessageData(data);
    // });
    // socket.on('error', (data) => {
    //   console.log(data);
    // });

    return () => {
      firebaseListener();
      // socket.removeEventListener('updateCallback');
      // socket.removeEventListener('responseAllChat');
      // socket.removeEventListener('error');
    }

  }, []);

 const translateTypeTextMessage = (payload) => {
    let text = '';
    switch(payload.content['@type']){
      case 'messageCustomServiceAction' :
        text = String(payload.content.text.text);
      break;
      case 'messageAnimation' :
        text = "animation not supported for moment";
      break;
      case 'messageText' :
        text = String(payload.content.text.text);
      break;
      default :
        text = String(payload.content.text);
      break;
    }

    return text;
  }


  return (
    <div className="App">
      <Header text={match.params.title} 
              backgroundColor={colors.watTheBlue} />
        <div className="content">
          {
            isOptions && 
            (
              <OptionView header="Options">
                <TextListItem primary="Reply"
                              leftText='Cancel'
                              rightText=''
                              centerText='Select'
                              leftCallback={() => {
                                setIsOptions(false);
                              }}/>
                <TextListItem primary="Reply Privately" />
                <TextListItem primary="View Contact" />
                <TextListItem primary="Log out" />
              </OptionView>
            )
          }
          <ol className="discussion">
          { 
            !isOptions &&
            (
                <ListView >
                  {
                    messageList && messageList.map(m => (
                      <Bubble key={Math.random() * 9999}
                              isSelf={m.sender_user_id !== Number(match.params.id)}
                              focusColor={colors.cyan}
                              content={translateTypeTextMessage(m)}
                              time={moment.unix(m.date).format('HH:mm')} 
                              data={m}
                              leftText='More'
                              rightText='Options'
                              centerText='Info'
                              leftCallback={() => {
                                history.goBack();
                              }}
                              rightCallback={() => {
                                setIsOptions(true);
                              }}
                      />
                    ))
                  }
              <Input 
                id='InputMessage'
                placeholder="Messages"
                onInputChange={handleInputChange}
                focusColor={colors.cyan}
                centerText='Send'
                leftText='more'
                rightText='options'
                rightCallback={() => {
                  setIsOptions(true);
                }}
                leftCallback={() => {
                  history.goBack();
                }}
                centerCallback={() => {
                  const phone = localStorage.getItem('phone');
                  const inputMessageValue = document.getElementById('InputMessage').value;
                  sendMessage({
                    phone,
                    chatId:match.params.id,
                    message:inputMessageValue
                  });
                }}
              />
            </ListView>
          )
        }
          </ol>
        </div>
    </div>
  );
}

export default withRouter(Messages);