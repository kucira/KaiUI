import React, { useState, useCallback } from 'react';
import { useGlobal } from 'reactn';
import Header from '../../components/Header/Header';
import { SoftKeyProvider } from '../../components/SoftKey/SoftKeyProvider';
import { SoftKeyConsumer } from '../../components/SoftKey/withSoftKeyManager';
import { withRouter } from 'react-router-dom';
import BodyTextListItem from '../../components/BodyTextListItem/BodyTextListItem';
import ListView from '../../views/ListView/ListView';
import Input from '../../components/Input/Input';
import TextListItem from '../../components/TextListItem/TextListItem';
import countryList from '../config/country-list';
import colors from '../../theme/colors.scss';

function Country(props) {

  const [country, setCountry] = useState(countryList);
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
          const input = document.getElementById('country');
          const countryFilter = countryList.filter(c => c.name.toLowerCase().includes(input.value.toLowerCase()));
          setCountry(countryFilter);
        }
      }, 100);
    }
    
  }, [country]);

  const { history } = props;
  const [ login, setLogin ] = useGlobal('login');
  console.log(login);

  return (
    <div className="App">
      <Header text="Kai Telegram" 
              backgroundColor={colors.watTheBlue} />
        <div className="content">
          <ListView >
            <Input 
              id='country'
              label='Country'
              placeholder="Search Country"
              onInputChange={handleInputChange}
              focusColor={colors.cyan}
              centerText=''
              leftText='Back'
              rightText=''
              leftCallback={()=> {
                history.goBack();
              }}
            />
            {
              country.map(c => (
                <TextListItem
                  key={Math.random()}
                  primary={c.name}
                  secondary={c.phoneCode}
                  focusColor={colors.cyan}
                  centerText='Select'
                  leftText='Back'
                  centerCallback={()=> {
                    setLogin({...login, country:c});
                    history.goBack();
                  }}
                  leftCallback={()=> {
                    history.goBack();
                  }}
                />
              ))
            }
          </ListView>
        </div>
    </div>
  );
}

export default withRouter(Country);