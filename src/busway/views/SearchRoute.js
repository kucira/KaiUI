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
import TextListItem from '../../components/TextListItem/TextListItem';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import ListRoute from '../components/ListRoute';
import colors from '../../theme/colors.scss';


function SearchRoute(props) {

  const { history } = props;
  const [locationListFrom, setLocationListFrom] = useState([]);
  const [locationListTo, setLocationListTo] = useState([]);
  
  const [fromObject, setFromObject] = useState({});
  const [toObject, setToObject] = useState({});

  const [routeList, setRouteList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [detailRoute, setDetailRoute] = useState([]);
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
          setLoading(true);
          setLocationListFrom([{
            name:'Loading',
            address:''
          }]);
          setLocationListTo([]);
          setDetailRoute([]);
          setRouteList([]); 
          id = null;
          const input = document.getElementById('fromInput');
          try {
            // statements
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/search-location/${input.value}`);
            setLocationListFrom(data.locations);
          } catch(e) {
            setLocationListFrom([{
              name:'Not found, try again later',
              address:''
            }]);
            console.log(e);
          }
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
          setLoading(true);
          setLocationListTo([{
            name:'Loading',
            address:''
          }]);
          setLocationListFrom([]);
          setDetailRoute([]);
          setRouteList([]); 
          id = null;
          const input = document.getElementById('toInput');
          try {
            // statements
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/search-location/${input.value}`);
            setLocationListTo(data.locations);
          } catch(e) {
            // statements
            setLocationListTo([{
              name:'Not found, try again later',
              address:''
            }]);
            console.log(e);
          }
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
            setDetailRoute([]);
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
            setDetailRoute([]);
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
                setDetailRoute([]);
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
                setDetailRoute([]);
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
          routeList.map(c => {
            const { summary, price } = c.overview;
            const { segments } = c.details;
            const arr = [];
            const mappingSummary = (data) => {
              const obj = data.map(m => {
                console.log(m, 'm');
                if(m['walking']){
                  arr.push(`walking to : ${m['walking'].location.end}-${m['walking'].distance/1000} km | ${m['walking'].time.duration} minutes`);
                }
                else if(m['public']){
                  m['public'].departures.map(o => {
                    arr.push(`public : ${o.name} - ${o.icon} | departs in : ${o.departsIn || ''} minutes`);
                  });
                  m['public'].main.stops.map(s => {
                    arr.push(`stop : ${s}`);
                  })
                }
              })
            }


            console.log(mappingSummary(segments));
            console.log(arr);
            setDetailRoute(arr);


            return(
              <ListRoute
                key={Math.random()}
                focusColor={colors.cyan}
                primary={price && price.summary || ''}
                centerText='Select'
                leftText='Back'
                rightText=''
                leftCallback={() => {
                    setDetailRoute([]);
                }}
                centerCallback={()=> {
                  
                }}
                rightCallback={()=> {
                }}
              />
            )}
          )
        }
        <Button text={isLoading ? 'Loading' : 'Search'} 
                focusColor={colors.cyan}
                centerCallback={ async () => {
                  setLoading(true);
                  const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/search-route/${fromObject.id}/${toObject.id}`);
                  setLocationListTo([]);
                  setLocationListFrom([]);
                  console.log(data.routeGroups[0].routes);
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
            detailRoute.length <= 0 && renderList()
          }
          {
            detailRoute.length > 0 &&
            <ListView>
              {
                detailRoute.map(item => (
                  <TextListItem
                      key={Math.random()}
                      primary={item}
                      focusColor={colors.cyan}
                      centerText='Select'
                      leftText='Back'
                      rightText=''
                      leftCallback={() => {
                        setDetailRoute([]);
                        setRouteList([]); 
                      }}
                      centerCallback={()=> {
                      }}
                      rightCallback={()=> {
                        
                      }}

                    />
                ))
              }
            </ListView>
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