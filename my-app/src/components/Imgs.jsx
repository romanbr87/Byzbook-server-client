import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Menu from "../Panels/Menu";
import ImgsPanel from "../Panels/ImgsPanel";
import "../styles/style.css";

export default function Imgs (props) {
    
	useEffect(() => {    
		console.log (props);
    }, [props])

    return (
	<React.Fragment>
    <Helmet>
    <link rel="canonical" href="https://romanbr87.github.io/index/index.html" />
    <meta name="description" content="אינדקס עסקים של נוף הגליל לטובת פרסום עסקים" />
    <meta name="author" content="https://www.facebook.com/RonenBr60/" />

    <meta property="og:description" content="אינדקס עסקים של נוף הגליל לטובת פרסום עסקים" />
    <meta property="og:url" content="https://romanbr87.github.io/index/index.html" />
    <meta property="og:title" content="אינדקס עסקים" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="byzbook" />

    <title>"אינדקס עסקים"</title>
    </Helmet>
        
    <div className="container" style={{ marginTop: '0', paddingTop: '0', textAlign: 'right', direction: 'rtl' }}>
    
    <div className="jumbotron" style={{ padding: '0', borderRadius: '0' }}>
        <h2 className="title" id="title" style={{ textAlign: 'center', textDecoration: 'underline' }}>
            מסך תמונות
        </h2>
        <p></p>
    </div>

    <ImgsPanel {...props} /> 

    </div>	
    </React.Fragment>
	);
}
