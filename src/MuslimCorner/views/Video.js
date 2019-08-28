import React, { useState, useCallback, useEffect } from 'react';
import { useGlobal } from 'reactn';
import { SoftKeyProvider } from '../../components/SoftKey/SoftKeyProvider';
import { SoftKeyConsumer } from '../../components/SoftKey/withSoftKeyManager';
import { withRouter } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ArrowListItem from '../../components/ArrowListItem/ArrowListItem';
import ListView from '../../views/ListView/ListView';
import Input from '../../components/Input/Input';
import IconListItem from '../../components/TextListItem/TextListItem';
import colors from '../../theme/colors.scss';

function Video(props) {

  const { history } = props;
  return (
    <div className="App">
      <Header text="Videos" 
              backgroundColor={colors.watTheBlue} />
        <div className="content">
          <ListView >
             <ArrowListItem
                  primary="Video"
                  leftText='Back'
                  leftCallback={()=> {
                    history.goBack();
                  }}
                  centerText="Select"
                  centerCallback={() => {
                    history.push(`/video/:${1 + 1}`)
                  }}
                />
          </ListView>
        </div>
    </div>
  );
}

export default withRouter(Video);