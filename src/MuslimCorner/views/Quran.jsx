import React, { useState, useCallback } from 'react';
import { useGlobal } from 'reactn';
import Header from '../../components/Header/Header';
import { SoftKeyProvider } from '../../components/SoftKey/SoftKeyProvider';
import { SoftKeyConsumer } from '../../components/SoftKey/withSoftKeyManager';
import { withRouter } from 'react-router-dom';
import ArrowListItem from '../../components/ArrowListItem/ArrowListItem';
import ListView from '../../views/ListView/ListView';
import Input from '../../components/Input/Input';
import QuranAPI from '../services/QuranAPI';
import TextListItem from '../../components/TextListItem/TextListItem';
import colors from '../../theme/colors.scss';

function Quran(props) {
  const { history } = props;
  const [ login, setLogin ] = useGlobal('login');
  const [tempSurah, setTempSurah] = useState(QuranAPI.listAyat);
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
          const input = document.getElementById('SurahInput');
          const surahFilter = QuranAPI.listAyat.filter(c => c.toLowerCase().includes(input.value.toLowerCase()));
          setTempSurah(surahFilter);
        }
      }, 100);
    }
    
  }, [tempSurah]);



  return (
    <div className="App">
      <Header text="Quran" 
              backgroundColor={colors.watTheBlue} />
        <div className="content">
          <ListView >
            <Input 
              id='SurahInput'
              label='Surah'
              placeholder="Search Surah"
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
              tempSurah.map((c, index) => (
              <ArrowListItem
                  key={Math.random()}
                  primary={c}
                  leftText='Back'
                  leftCallback={()=> {
                    history.goBack();
                  }}
                  centerText="Select"
                  centerCallback={() => {
                    history.push(`/surah/${index + 1}`)
                  }}
                />
              ))
            }
          </ListView>
        </div>
    </div>
  );
}

export default withRouter(Quran);