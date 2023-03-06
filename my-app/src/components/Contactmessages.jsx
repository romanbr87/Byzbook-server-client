import React from "react";
import { Helmet } from "react-helmet";
import Menu from "../Panels/Menu";
import ContactmessagesPanel from "../Panels/ContactmessagesPanel";
import "../styles/style.css";

export default function Contactmessages(props) {

    const text = "מסך הדיווח אפשר לנו לראות את הדיווחים השונים על העסקים השונים. בהתאם לדייוח, הדיווח ימחק או שהעסק יבוטל/ימחק"

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

        <title>מסך הודעות</title>
        </Helmet>
        <Menu user={props.user}/>        
        
        <div className="container" style={{ marginTop: '0', paddingTop: '0', textAlign: 'right', direction: 'rtl' }}>
        
        <div className="jumbotron" style={{ padding: '0', borderRadius: '0' }}>
            <h2 className="title" id="title" style={{ textAlign: 'center', textDecoration: 'underline' }}>
                מסך הודעות
            </h2>
            <p>{text}</p>
            { <h3 className="title">{props.data.length} הודעות</h3>}
        </div>

        <ContactmessagesPanel {...props} />

        </div>
    </React.Fragment>
    )
}