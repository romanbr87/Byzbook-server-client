import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import TypesPanel from "../Panels/TypesPanel";
import Menu from "../Panels/Menu";
import "../styles/style.css";

export default function TypesEditor(props) {

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

        <div className="container">
            <div className="typeEditor">
            <TypesPanel {...props} />
            </div>
        </div>
    </React.Fragment>
    )
}