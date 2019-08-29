import React, { useState, useCallback, useEffect } from 'react';
import { useGlobal } from 'reactn';
import Header from '../../components/Header/Header';
import { SoftKeyProvider } from '../../components/SoftKey/SoftKeyProvider';
import { SoftKeyConsumer } from '../../components/SoftKey/withSoftKeyManager';
import { withRouter } from 'react-router-dom';
import BodyTextListItem from '../../components/BodyTextListItem/BodyTextListItem';
import ListView from '../../views/ListView/ListView';
import Input from '../../components/Input/Input';
import Bubble from '../components/Bubble';
import LoginController from '../controllers/LoginController';
import countryList from '../config/country-list';
import mockChats from '../config/mock-chats';
import colors from '../../theme/colors.scss';
import './Message.scss';

function Messages(props) {

  const [messageList, setMessageList] = useState([]);
  const [ login, setLogin ] = useGlobal('login');
  const [ chats, setChats ] = useGlobal('chats');
  const [ messages, setMessages ] = useGlobal('messages');
  let id;
  let countDown = 15;
  const handleInputChange = useCallback(value  => {
    
  }, [messages]);

  const { history, match } = props;
  
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
      <Header text={match.params.title} 
              backgroundColor={colors.watTheBlue} />
        <div className="content">
          <ol class="discussion">
          <ListView >
             
                <Bubble isSelf focusColor={colors.cyan}/>
                <Bubble isSelf={false} focusColor={colors.cyan}/>
              
            {
              // messageList.map(c => (
              //   <ListChat
              //     key={Math.random()}
              //     primary={c.title}
              //     secondary={c.last_message.content['@type'] === 'messageCustomServiceAction' ? 
              //       c.last_message.content.text :
              //       c.last_message.content.text.text
              //     }
              //     data={c}
              //     focusColor={colors.cyan}
              //     centerText='Select'
              //     leftText='more'
              //     rightText='options'
              //     centerCallback={()=> {
                    
              //     }}
              //   />
              // ))
            }
            <Input 
              id='InputMessage'
              placeholder="Messages"
              onInputChange={handleInputChange}
              focusColor={colors.cyan}
              centerText=''
              leftText='more'
              rightText='options'
              leftCallback={()=> {
                history.goBack();
              }}
            />
          </ListView>
          </ol>
        </div>
    </div>
  );
}

export default withRouter(Messages);