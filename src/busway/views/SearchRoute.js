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
import Button from '../../components/Button/Button';
import ListChat from '../components/ListChat';
import colors from '../../theme/colors.scss';


function SearchRoute(props) {

  const { history } = props;
  const [locationListFrom, setLocationListFrom] = useState([]);
  const [locationListTo, setLocationListTo] = useState([]);
  
  const [fromObject, setFromObject] = useState({});
  const [toObject, setToObject] = useState({});

  const [routeList, setRouteList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  let countDown = 15;
  let id = 0;

  const handleInputFrom = useCallback(value  => {
    countDown = 15;
    if(!id){
      id = setInterval(async () => {
        if(countDown > 0){
          countDown -= 1;
        }
        else{
          clearInterval(id);
          id = null;
          const input = document.getElementById('fromInput');
          setLoading(true);
          const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/search-location/${input.value}`);
          setLocationListFrom(data.locations);
          setLocationListTo([]);
          setLoading(false);
        }
      }, 100);
    }
  }, [locationListFrom]);


  const handleInputTo = useCallback(async value  => {
    countDown = 15;
    if(!id){
      id = setInterval(async () => {
        if(countDown > 0){
          countDown -= 1;
        }
        else{
          clearInterval(id);
          id = null;
          const input = document.getElementById('toInput');
          setLoading(true);
          const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/search-location/${input.value}`);
          setLocationListTo(data.locations);
          setLocationListFrom([]);
          setLoading(false);
        }
      }, 100);
    }
  }, [locationListTo]);

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

  }
  
  useEffect(() => {

  }, [])

  const renderList = () => {
    return (
      <ListView>
        <Input 
          id='fromInput'
          label='From'
          placeholder="Choose your location"
          onInputChange={handleInputFrom}
          focusColor={colors.cyan}
          centerText=''
          leftText=''
          rightText='Busway'
          leftCallback={()=> {
            console.log('');
          }}
          rightCallback={() => {
            history.push('/busway');
          }}
        />
        <Input 
          id='toInput'
          label='To'
          placeholder="Choose your destination"
          onInputChange={handleInputTo}
          focusColor={colors.cyan}
          centerText=''
          leftText=''
          rightText='Busway'
          leftCallback={()=> {
            console.log('');
          }}
          rightCallback={() => {
            history.push('/busway');
          }}
        />

        {
          locationListFrom.map(c => (
            <ArrowListItem
              key={Math.random()}
              primary={c.name}
              secondary={c.address}
              focusColor={colors.cyan}
              centerText='Select'
              leftText='Back'
              rightText=''
              leftCallback={() => {
              }}
              centerCallback={()=> {
                setFromObject(c);
                setLocationListTo([]);
                setLocationListFrom([]);
                document.getElementById('fromInput').value = c.name;
              }}
              rightCallback={()=> {
              }}

            />))
        }

        {
          locationListTo.map(c => (
            <ArrowListItem
              key={Math.random()}
              primary={c.name}
              secondary={c.address}
              focusColor={colors.cyan}
              centerText='Select'
              leftText='Back'
              rightText=''
              leftCallback={() => {
              }}
              centerCallback={()=> {
                setToObject(c);
                setLocationListTo([]);
                setLocationListFrom([]);
                document.getElementById('toInput').value = c.name;
              }}
              rightCallback={()=> {
                
              }}

            />))
        }

        {
          routeList.map(c => (
            <ArrowListItem
              key={Math.random()}
              primary={c.overview.summary}
              secondary={JSON.stringify(c.overview.summary)}
              focusColor={colors.cyan}
              centerText='Select'
              leftText='Back'
              rightText=''
              leftCallback={() => {
                history.goBack();
              }}
              centerCallback={()=> {
                
              }}
              rightCallback={()=> {
              }}
              backCallback={(e)=> {
                e.preventDefault();
                history.goBack();
              }}
            />))
        }
        <Button text='Search' 
                centerCallback={ async () => {
                  setLoading(true);
                  const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/search-route/${fromObject.id}/${toObject.id}`);
                  setLocationListTo([]);
                  setLocationListFrom([]);
                  console.log(data);
                  if(data){
                    setRouteList(data.routeGroups[0].routes);  
                  }
                  else{
                    setRouteList([]);   
                  }
                  setLoading(false);
                }}/>
        
      </ListView>

    )
  }

  return (
    <div className="App">
      <Header text="Find Route" 
              backgroundColor={colors.watTheBlue} />
        <div className="content">
          {
            renderList()
          }
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
        </div>
    </div>
  );
}

export default withRouter(SearchRoute);