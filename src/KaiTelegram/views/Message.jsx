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
  let id;
  let countDown = 15;
  const handleInputChange = useCallback(value  => {
    
  }, [messageList]);

  const { history, match } = props;

  const fetchData = async ()=> {
    const token = localStorage.getItem('ft');
    const phone = localStorage.getItem('phone');
    
    const dataApp = await DataServices.getData('messagram_data_app');
    // const { data } = await ChatController.openChat(match.params.id, phone, token);
    const { data } = await ChatController.getAllMessages(match.params.id, phone, token);

    if(data.message && JSON.parse(data.message)['@type'] === 'error'){
      const resultChats = await ChatController.getAllChat(phone, token);
      const resultHistory = await ChatController.getAllMessages(match.params.id, phone, token);
      
      const messSort = data.messages.sort((a, b) => a.date -b.date);
      await DataServices.saveData('messagram_data_app', {
        ...dataApp,
        updateNewMessage: messSort,
      });
      setChatData({
        ...chatData,
        messages: messSort,
      });
      setMessageList(messSort);

    }
    else{
      console.log(data.messages);  
      const messSort = data.messages.sort((a, b) => a.date -b.date);
      await DataServices.saveData('messagram_data_app', {
        ...dataApp,
        updateNewMessage: messSort,
      });
      setChatData({
        ...chatData,
        messages: messSort,
      });
      setMessageList(messSort);
    }
    
  }

  const registerOnMessage = async () => {
    const messaging = firebase.messaging();

    messaging.onMessage(async (_payload) => {
      const { payload } = _payload.data;

      const dataApp = await DataServices.getData('messagram_data_app');
      const newChatList = await ChatController.transformChatData(payload);

      const findLastMessageUpdate = newChatList.filter(c => c.id === Number(match.params.id));
      const transform = findLastMessageUpdate.map(m => {
        const obj = {
          ...m.last_message
        }
        dataApp.updateNewMessage.push(obj);
        return {
          ...m.last_message
        }
      });
      console.log(dataApp.updateNewMessage);
      setMessageList(dataApp.updateNewMessage);
      await DataServices.saveData('messagram_data_app', {
        ...dataApp,
      });
    });
  }
  
  useEffect(() => {
    fetchData();
    registerOnMessage();
  }, []);

 const translateTypeTextMessage = (payload) => {
    console.log(payload)
    let text = '';
    switch(payload.content['@type']){
      case 'messageCustomServiceAction' :
        console.log('hello');
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
                 { /* <Bubble isSelf 
                          focusColor={colors.cyan}
                          leftText='More'
                          rightText='Options'
                          centerText='Info'
                          rightCallback={() => {
                            setIsOptions(true);
                          }}/> */}
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
                centerText=''
                leftText='more'
                rightText='options'
                rightCallback={() => {
                  setIsOptions(true);
                }}
                leftCallback={() => {
                  history.goBack();
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