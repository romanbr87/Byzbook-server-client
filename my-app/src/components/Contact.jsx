import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { isBrowser } from "react-device-detect";
import ContactForm from "../Panels/ContactForm"
import "../styles/style.css";

export default function Contact(props) {

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

        <title>אודות</title>
        </Helmet>
        
        <div className={isBrowser ? "container" : "container-fluid"}>       
        <div className="jumbotron">
            <h2 className="title" id="title" style={{ textAlign: 'center', textDecoration: 'underline' }}>ייצרת קשר</h2>
        </div>
        
        <div className="row">        
            <ContactForm className={isBrowser ? "col-lg-4 col-md-4 col-lg-offset-4 col-md-offset-4" : ""}/>
        </div>
        </div>
    </React.Fragment>
    )
}   

