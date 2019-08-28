import React, { useState, useCallback, useEffect } from 'react';
import { useGlobal } from 'reactn';
import Header from '../../components/Header/Header';
import { SoftKeyProvider } from '../../components/SoftKey/SoftKeyProvider';
import { withRouter } from 'react-router-dom';
import BodyTextListItem from '../../components/BodyTextListItem/BodyTextListItem';
import ArrowListItem from '../../components/ArrowListItem/ArrowListItem';
import ListView from '../../views/ListView/ListView';
import colors from '../../theme/colors.scss';

function Home(props) {

  const { history } = props;

  return (
    <div className="App">
      <Header text="Muslim Corner" 
              backgroundColor={colors.watTheBlue} />
        <div className="content">
          <ListView>
            <BodyTextListItem header='Welcome'
                              body='Read Holy Quran and all about Islam.'
                              focusColor={colors.green} />
            <ArrowListItem
              primary="Read Holy Quran"
              secondary="All list surah of Quran"
              centerText="Select"
              centerCallback={() => {
                history.push('/quran')
              }}
            />
            <ArrowListItem
              primary="Video"
              secondary="View All Insipration Videos"
              centerText="Select"
              centerCallback={() => {
                history.push('/video')
              }}
            />
          </ListView>
        </div>
    </div>
  );
}

export default withRouter(Home);
