import React from "react";
import {Helmet} from "react-helmet";
import ReportsPanel from "../Panels/ReportsPanel";
import Menu from "../Panels/Menu";
import "../styles/style.css";


export default function Reports(props) {

    const text = "מסך הדיווח אפשר לנו לראות את הדיווחים השונים על העסקים השונים. בהתאם לדייוח, הדיווח ימחק או שהעסק יבוטל/ימחק"

    return (
    <React.Fragment>
        <Helmet>       
        <link rel="canonical" href="https://romanbr87.github.io/index/index.html" />
        <meta name="description" content="אינדקס עסקים של נוף הגליל לטובת פרסום עסקים" />
        <meta name="author" content="https://www.facebook.com/RonenBr60/" />

        <meta property="og:description" content="אינדקס עסקים של נוף הגליל לטובת פרסום עסקים" />
        <meta property="og:url" content="https://romanbr87.github.io/index/index.html" />
        <meta property="og:title" content="אינדק ס עסקים" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="byzbook" />

        <title>דיווחים על עסקים</title>
        </Helmet>
        <div className="container" style={{ textAlign: 'right', direction: 'rtl' }}>       
            <div className="jumbotron" style={{ padding: '0', borderRadius: '0' }}>
                <h2 className="title" id="title" style={{ textAlign: 'center', textDecoration: 'underline' }}>
                    מסך דיווחים על עסקים
                </h2>
                <p>{text}</p>
            </div>

            <ReportsPanel {...props} />
            
        </div>
    </React.Fragment>
    )
}