import React, { useState, useEffect } from 'react';
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';

import { fetchData } from './ContextAPI';

import HomePage from './components/HomePage';
import About from './components/About'
import TypesEditor from './components/TypesEditor'
import Reports from "./components/Reports";
import Contactmessages from "./components/Contactmessages";
import Imgs from "./components/Imgs";
import CommentsAdmin from "./components/CommentsAdmin"
import Contact from "./components/Contact"
import NewBusiness from "./components/NewBusiness";
import BusinessPage from "./components/BusinessPage"
import BusinessPageEditor from "./components/BusinessPageEditor"

import Menu from "./Panels/Menu";
import 'react-notifications/lib/notifications.css';
import { fetchUser } from './store/slices/user-slice';
import { fetchPanelData } from './store/slices/panelData-slice';

export default function App() {
  const user = useSelector (state => state.user)
  const panelData = useSelector (state => state.panelData.data);  
  const dispatch = useDispatch ()

  
  const [data, setData]  = useState (null);
  //const [panelData, setPanelData] = useState ()
  const history = createBrowserHistory();   

    useEffect(() => {
      dispatch (fetchPanelData());
      dispatch(fetchUser());
  
      console.clear ();

      const notify = (type) => {
        type === 'online' ? 
        NotificationManager.success('Success', 'you are online')
        :
        NotificationManager.error('Error', 'you are offline')
      }

      window.addEventListener('offline', (e) => { notify ('offline') });
      window.addEventListener('online', (e) => { notify ('online') });

      console.log ("URL: "); 
      console.log (history.location)

      fetchData(history.location.pathname)
      .then (info =>  { 
        console.log (info);
        setData (info)
      }).catch (err => {
        console.log ("ERR:")
        console.log (err);
      });


    }, [])
    
    if (!data) return (<p>12</p>)
    return (
      <div className="root">
        <NotificationContainer/>
        <Menu user={user} panelData={panelData}/>

        <Router history={history}>
            { false && <Switch>
            <Route exact path='/' render={() => <HomePage {...data} />} />
            <Route path='/about' render={() => <About {...data} />} />
            <Route path='/typeseditor' render={({ match }) => <TypesEditor {...data } />  } />
            <Route path='/reports' render={({ match }) => <Reports {...data } />  } />
            <Route path='/contactmessages' render={({ match }) => <Contactmessages {...data } />  } />
            <Route path='/imgs' render={({ match }) => <Imgs {...data } />  } />
            <Route path='/commentsAdmin' render={({ match }) => <CommentsAdmin {...data } />  } />
            <Route path='/contact' render={({ match }) => <Contact />  } />
            <Route path='/newbusiness' render={({ match }) => <NewBusiness {...data} user={user}/>  } />

            <Route path='/page/:id' render={({ match }) => <BusinessPage {...data} />  } />
            <Route path='/businesspageeditor/:id' render={({ match }) => <BusinessPageEditor {...data} />  } />
              
                         
            <Route exact path='*' component={()=>{return <p>Null</p> }} status={404}/>
            </Switch> }
        </Router>
      </div>
    );
}

