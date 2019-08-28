import React, { useState, useCallback, useEffect } from 'react';
import { useGlobal } from 'reactn';
import Header from '../../components/Header/Header';
import { SoftKeyProvider } from '../../components/SoftKey/SoftKeyProvider';
import { SoftKeyConsumer } from '../../components/SoftKey/withSoftKeyManager';
import { withRouter } from 'react-router-dom';
import ListView from '../../views/ListView/ListView';
import Input from '../../components/Input/Input';
import QuranAPI from '../services/QuranAPI';
import TextListItem from '../../components/TextListItem/TextListItem';
import colors from '../../theme/colors.scss';

function Surah(props) {

  const { history, match } = props;
  const [surah, setSurah] = useGlobal('surah');

  useEffect(()=> {
    const fetchData = async () => {
      const result = await QuranAPI.loadSurah(match.params.index);
      console.log(result);      
      setSurah(result);
    }
    fetchData();
  }, [])

  
  return (
    <div className="App">
      <Header text="Surah" 
              backgroundColor={colors.watTheBlue} />
        <div className="content">
          <ListView >
            <div></div>
            {
              surah.map((c, index) => (
              <TextListItem
                  key={Math.random()}
                  primary={c.text}
                  leftText='Back'
                  leftCallback={()=> {
                    history.goBack();
                  }}
                  centerText="Info"
                  centerCallback={() => {
                    history.push(`/surah/${index + 1}`)
                  }}
                  stylePrimary={{direction:'rtl', fontSize:'2rem'}}
                  classNamePrimary={'font-uthmani'}
                />
              ))
            }
          </ListView>
        </div>
    </div>
  );
}

export default withRouter(Surah);