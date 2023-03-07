import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { isBrowser } from "react-device-detect";
import BusinessPagePanel from "../Panels/BusinessPagePanel"
import Comments from "../Panels/Comments";
import ReportModal from './ReportModal';

import {Provider} from '../ContextAPI'
import "../styles/style.css";
import "../styles/comments.css";

export default function BusinessPage(props) {
  const [user, setUser] = useState ({})

  return (
    <React.Fragment>
      <Helmet>
        <link rel="canonical" href="Byzbook.herokuapp.com" />
        <meta name="description" content={props.data.gsx$desc} />
        <meta name="author" content="https://www.facebook.com/RonenBr60/" />

        <meta property="og:description" content={props.data.gsx$desc} />
        <meta property="og:url" content="Byzbook.herokuapp.com" />
        <meta property="og:title" content={props.data.gsx$name} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="byzbook" />
        <meta property="og:image" content={props.data.gsx$logo} />
        
        <title>{props.data.gsx$name}</title>
      </Helmet>
      
      <div className={isBrowser ? "container" : "container-fluid"} style={{ textAlign: 'right', direction: 'rtl' }}>
        <Provider value={setUser}> 
        <BusinessPagePanel className="typeEditor col-lg-4 col-md-4" 
        data={ props.data } isLinkable={false} />
        </Provider>
        <Comments business={props.data._id} comments={props.comments} 
        className="typeEditor col-lg-6 col-md-6 col-lg-offset-2 col-md-offset-2"/>
      </div>
    
      <ReportModal user={user}/>
    </React.Fragment>
  );
}
