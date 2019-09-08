import React, { useState, useCallback, useEffect } from 'react';
import { useGlobal } from 'reactn';
import Header from '../../components/Header/Header';
import { SoftKeyProvider } from '../../components/SoftKey/SoftKeyProvider';
import { SoftKeyConsumer } from '../../components/SoftKey/withSoftKeyManager';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-spinner-material';
import ListView from '../../views/ListView/ListView';
import Separator from '../../components/Separator/Separator';
import TextListItem from '../../components/TextListItem/TextListItem';
import Input from '../../components/Input/Input';
import ListChat from '../components/ListChat';
import colors from '../../theme/colors.scss';


function DetailRoute(props) {

  const { history, match } = props;
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  let countDown = 15;
  let id = 0;

  const fetchData = async () => {
  	setLoading(true);
    try{
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-time/${match.params.id}/${match.params.trackId}/${match.params.stopId}`);
      setData(data);
      setLoading(false);
    }
    catch(error){
      alert(error);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, [])

  const renderList = () => {
    return (
      <ListView>
      	<Separator separatorText='Waktu Keberangkatan' />
      	<div></div>
        {
          data.realtime.map(c => (
            <TextListItem
              key={Math.random()}
              primary={c.departsInMinutes === 0 ? `Sekarang` : `${c.departsInMinutes} - Menit`}
              secondary={`Menuju ${c.destination}`}
              focusColor={colors.cyan}
              centerText='Select'
              leftText='Back'
              rightText='Update'
              leftCallback={()=> {
                history.goBack();
              }}
              rightCallback={async ()=> {
                await fetchData();
              }}
            />))
        }
      </ListView>
    )
  }

  return (
    <div className="App">
      <Header text={data.stopName || ''} 
              backgroundColor={colors.watTheBlue} />
        <div className="content">
          {
            isLoading && (
              <div style={{
                  display:'flex',
                  justifyContent:'center',
                  alignItems:'center',
                  height:'80vh'
                }}>
                  <Spinner size={50} spinnerColor={"#333"} spinnerWidth={2} visible={true} />
                </div>
            )
          }
          {
             !isLoading && renderList()
          }
          
        </div>
    </div>
  );
}

export default withRouter(DetailRoute);