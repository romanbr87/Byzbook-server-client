import { Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { createBrowserHistory } from "history";
import {NotificationContainer, NotificationManager} from 'react-notifications';

import { fetchData } from './ContextAPI';
import HomePage from './components/HomePage';
import About from './components/About'
import TypesEditor from './components/TypesEditor'
import Reports from "./components/Reports";
import Contactmessages from "./components/Contactmessages";
import Imgs from "./components/Imgs";

import Menu from "./Panels/Menu";
import 'react-notifications/lib/notifications.css';

export default function App() {
  const [user, setUser]  = useState ();
  const [data, setData]  = useState ();
  const [userPaneldb, setUserPaneldb] = useState ()
  const history = createBrowserHistory();   

    useEffect(() => {
      const notify = (type) => {
        type === 'online' ? 
        NotificationManager.success('Success', 'you are online')
        :
        NotificationManager.error('Error', 'you are offline')
      }

      fetchData('/user', 'post')
      .then (userData =>  { 
        console.log ("user: 123")
        console.log (userData);
        setUser (userData) 
      }).catch (err => setUser (err));

      fetchData(history.location.pathname)
      .then (info =>  { 
        console.log (info);
        setData (info)
      }).catch (err => setData (err));
      
      fetchData('/cnt', 'post')
      .then (userData =>  { 
          console.log ("userData:")
          console.log (userData)
          setUserPaneldb (userData) 
      }).catch (err => setUserPaneldb (err));

      window.addEventListener('offline', (e) => { notify ('offline') });
      window.addEventListener('online', (e) => { notify ('online') });
    }, [])

    if (!data) return (<p>12</p>)
    return (
        <div className="root">
        <NotificationContainer/>
        <Menu user={user} userPaneldb={userPaneldb}>
        </Menu>

        <Router history={history}>
            <Switch>
            <Route exact path='/' render={() => <HomePage {...data} />} />
            <Route path='/about' render={() => <About {...data} />} />
            <Route path='/typeseditor' render={({ match }) => <TypesEditor {...data } />  } />
            <Route path='/reports' render={({ match }) => <Reports {...data } />  } />
            <Route path='/contactmessages' render={({ match }) => <Contactmessages {...data } />  } />
            <Route path='/imgs' render={({ match }) => <Imgs {...data } />  } />

            <Route path='/page:id' render={({ match }) => <p>QAZAZAZAZSS</p>  } />
              
                         
            <Route exact path='*' component={()=>{return <p>Null</p> }} status={404}/>
            </Switch>
        </Router>

        </div>
    );
}

