import React, { useState, useCallback, useEffect } from 'react';
import { useGlobal } from 'reactn';
import Header from '../../components/Header/Header';
import { SoftKeyProvider } from '../../components/SoftKey/SoftKeyProvider';
import { SoftKeyConsumer } from '../../components/SoftKey/withSoftKeyManager';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import localforage from 'localforage';
import Spinner from 'react-spinner-material';
import ListView from '../../views/ListView/ListView';
import ArrowListItem from '../../components/ArrowListItem/ArrowListItem';
import Input from '../../components/Input/Input';
import ListChat from '../components/ListChat';
import colors from '../../theme/colors.scss';


function RouteBusway(props) {

  const { history, match } = props;
  const [route, setRoute] = useState([]);
  const [route1, setRoute1] = useState([]);
  const [route2, setRoute2] = useState([]);
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isSwap, setSwap] = useState(false);
  let countDown = 15;
  let id = 0;

  const getCacheData = async () => {
    try{
      const buswayNumber = await localforage.getItem(`routes_${match.params.id}`);
      return buswayNumber;
    }
    catch(error){
      window.location.reload();
    }
  }

  const mappingData = (data) => {      
      if(data.tracks.length > 0) {
        const track1 = data.tracks[0].stops;
        const track2 = data.tracks[1]   ? data.tracks[1].stops : null;
        const newRoute1 = track1.map(t => {
          const stopDetil = data.stops.find(s => s.id === t.stopId);
          return {
            ...stopDetil,
            stopId:stopDetil.id,
            id:data.tracks[0].id,

          }
        });
        setRoute(newRoute1);
        setRoute1(newRoute1);

        if(track2){
          const newRoute2 = track2.map(t => {
          const stopDetil = data.stops.find(s => s.id === t.stopId);
            return {
              ...stopDetil,
              stopId:stopDetil.id,
              id:data.tracks[1].id,
            }
          });
          setRoute2(newRoute2);
        }
        
        setData(data);
        setLoading(false);
    }
  }

  const fetchData = async () => {
    try {
      const dataCache = await getCacheData();

      if(dataCache) {
        mappingData(dataCache);
      }
      else{
        setLoading(true);
      }
      const { data } = await axios.get(`
          ${process.env.REACT_APP_BASE_URL}/get-route/${match.params.id}/${match.params.type}`);
      mappingData(data);
      localforage.setItem(`routes_${match.params.id}`, data);
    }
    catch(error){
      alert(error);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, [])

  const swapRoute = () => {

    const swapRoute = isSwap ? [].concat(route1) : [].concat(route2);
    setSwap(!isSwap);
    setRoute(swapRoute);
  }

  const renderList = () => {
    return (
      <ListView>
        {
          route.map(c => (
            <ArrowListItem
              key={Math.random()}
              primary={c.name}
              focusColor={colors.cyan}
              centerText='Select'
              leftText='Back'
              rightText={route2.length > 0 ? 'swap' : ''}
              leftCallback={() => {
                history.goBack();
              }}
              centerCallback={()=> {
                history.push(`/times/${data.id}/${c.id}/${c.stopId}`);
              }}
              rightCallback={()=> {
                swapRoute();
              }}
              backCallback={(e)=> {
                e.preventDefault();
                history.goBack();
              }}
            />))
        }
      </ListView>
    )
  }

  const renderHeaderTitle = ()=> {
    let title = '';
    if(data.tracks){
      isSwap ? title = data.tracks[1].name : title = data.tracks[0].name;
    }
    return title;
  }

  return (
    <div className="App">
      <Header text={renderHeaderTitle()} 
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

export default withRouter(RouteBusway);