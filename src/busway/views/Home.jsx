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
import Input from '../../components/Input/Input';
import ListChat from '../components/ListChat';
import colors from '../../theme/colors.scss';


function Home(props) {

  const { history } = props;
  const [buswayList, setBuswayList] = useState([]);
  const [numberBusway, setNumberBusway] = useState([]);
  const [isLoading, setLoading] = useState(false);
  let countDown = 15;
  let id = 0;

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
          const input = document.getElementById('SearchNumber');
          const buswayFilter = numberBusway.filter(c => 
            c.longName.toLowerCase().includes(input.value.toLowerCase()) ||
            c.name.toLowerCase().includes(input.value.toLowerCase())
          );
          setBuswayList(buswayFilter);
        }
      }, 100);
    }
  }, [buswayList]);

  const getCacheData = async () => {
    try{
      const buswayNumber = await localforage.getItem('numbers');
      return buswayNumber;
    }
    catch(error){
      window.location.reload();
    }
  }

  const mappingData = (data) => {
    const busway = data.schedulesByTransportId.find(d => d.transportName === 'Transjakarta');
    setNumberBusway(busway.schedules)
    setBuswayList(busway.schedules);
    setLoading(false);
  }

  const fetchData = async () => {
    try{
      const dataCache = await getCacheData();
      if(dataCache){
        mappingData(dataCache);
      }
      else{
        setLoading(true);
      }
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/get-data`);
      mappingData(data);
      localforage.setItem('numbers', data);
 
    }
    catch(error){
      setLoading(false)
      alert(error);
    }
  }
  
  useEffect(() => {
    fetchData();
    return () => { setBuswayList([]); setNumberBusway([])}
  }, [])

  const renderList = () => {
    return (
      <ListView>
        <Input 
          id='SearchNumber'
          label='Search'
          placeholder="Search Number"
          onInputChange={handleInputChange}
          focusColor={colors.cyan}
          centerText=''
          leftText=''
          rightText=''
          leftCallback={()=> {
            console.log('');
          }}
        />
        
        {
          buswayList && buswayList.map(c => (
            <ListChat
              key={Math.random()}
              initial={c.name}
              primary={c.longName}
              data={c}
              color={c.color}
              focusColor={colors.cyan}
              centerText='Select'
              leftText=''
              rightText='Options'
              centerCallback={()=> {
                history.push(`/route/${c.scheduleId}/transjakarta`);
              }}
            />))
        }
      </ListView>
    )
  }

  return (
    <div className="App">
      <Header text="Busway Number" 
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

export default withRouter(Home);