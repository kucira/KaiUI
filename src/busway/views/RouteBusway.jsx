import React, { useState, useCallback, useEffect } from 'react';
import { useGlobal } from 'reactn';
import Header from '../../components/Header/Header';
import { SoftKeyProvider } from '../../components/SoftKey/SoftKeyProvider';
import { SoftKeyConsumer } from '../../components/SoftKey/withSoftKeyManager';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
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

  const fetchData = async () => {
    try{
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-route/${match.params.id}/${match.params.type}`);
      const track1 = data.tracks[0].stops;
      const track2 = data.tracks[1].stops;
      const newRoute1 = track1.map(t => {
        const stopDetil = data.stops.find(s => s.id === t.stopId);
        return {
          ...stopDetil,
          stopId:stopDetil.id,
          id:data.tracks[0].id,

        }
      });
      const newRoute2 = track2.map(t => {
        const stopDetil = data.stops.find(s => s.id === t.stopId);
        return {
          ...stopDetil,
          stopId:stopDetil.id,
          id:data.tracks[1].id,
        }
      });
      setRoute(newRoute1);
      setRoute1(newRoute1);
      setRoute2(newRoute2);
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

  const swapRoute = () => {

    const swapRoute = isSwap ? [].concat(route1) : [].concat(route2);
    setSwap(!isSwap);
    setRoute(swapRoute);
  }

  console.log(data.tracks)

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
              rightText='Swap'
              leftCallback={() => {
                history.goBack();
              }}
              centerCallback={()=> {
                history.push(`/times/${data.id}/${c.id}/${c.stopId}`);
              }}
              rightCallback={()=> {
                swapRoute();
              }}
            />))
        }
      </ListView>
    )
  }

  const renderHeaderTitle = ()=> {
    let title = '';
    if(data.tracks){
      console.log(data.tracks.length > 0,'render');
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
                  height:'100vh'
                }}>
                  <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />
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