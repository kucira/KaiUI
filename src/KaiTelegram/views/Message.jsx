import React, { useState, useCallback, useEffect } from 'react';
import { useGlobal } from 'reactn';
import Header from '../../components/Header/Header';
import { withRouter } from 'react-router-dom';
import TextListItem from '../../components/TextListItem/TextListItem';
import ListView from '../../views/ListView/ListView';
import OptionView from '../../views/OptionView/OptionView';
import Input from '../../components/Input/Input';
import Bubble from '../components/Bubble';
import LoginController from '../controllers/LoginController';
import countryList from '../config/country-list';
import mockChats from '../config/mock-chats';
import colors from '../../theme/colors.scss';
import './Message.scss';

function Messages(props) {

  const [messageList, setMessageList] = useState([]);
  const [isOptions, setIsOptions] = useState(false);
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
          {
            isOptions && 
            (
              <OptionView header="Options">
                <TextListItem primary="Reply" />
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
                  <Bubble isSelf 
                          focusColor={colors.cyan}
                          leftText='More'
                          rightText='Options'
                          centerText='Info'
                          rightCallback={() => {
                            setIsOptions(true);
                          }}/>
                  <Bubble isSelf={false} focusColor={colors.cyan}/>
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