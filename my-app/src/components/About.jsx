import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { isBrowser } from "react-device-detect";
import Menu from "../Panels/Menu";

import BusinessCard from "../Panels/BusinessCard";
import { serverURL } from "../ContextAPI";
import "../styles/style.css";

export default function About(props) {

    const [business, setBusiness] = useState (props.business)
    const getBusiness = async (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };

        try {
            let res = await fetch(serverURL('/about'), requestOptions);
            let business = (await res.json()).business;
            if (res.ok) {
                setBusiness (business);
            }

            else {
                alert ("לא ניתן לקבל עסק חדש");
            }
        }

        catch (e) { console.log (e) }
    }

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
        <Menu user={props.user}/>
        
        <div className={isBrowser ? "container" : "container-fluid"} style={{paddingBottom: "15em"}}>       
        <div className="row typeEditor">        

        <div className="col-lg-8 col-md-8">
            <div className="jumbotron" style={{backgroundColor: 'white'}}>
            <h3 className="title" id="title" style={{ marginTop: "-30px", textAlign: 'center', textDecoration: 'underline' }}>אודות ביזבוק</h3>
            <p>
                ברוכים הבאים לאתר ביזבוק, האתר הכי נפוץ וגדול לחיפוש עסקים ברשת. באתר זה תוכלו לקבל מידע ומקיף ומעודכן ככל האפשר על העסקים וכן תוכלו לעדכן בעצמכם מידע אם במקרה מצאתם מידע שאיננו מעודכן.
            </p>        
            <p>
            האתר נותן שירות לכלל העסקים שמעוניינים לפרסם את עצמם באתר אך הדגש הוא על עסקים זעירים עד בינוניים שלא פעם מעדיפים להשקיע מזמנם לפרסום ברשתות החברתיות	
            </p>
            <p>
            אתם רואים פה בדף דוגמית של כרטיסיית עסק. בלחיצה על הכותרת של העסק, תוכלו להגיע לדף העסק
            </p>
            </div>
        </div>

        <div className={"col-lg-4 col-md-4"}>
        <span className="btn btn-sm glyphicon glyphicon-refresh" style={{top: "3px"}} 
        onClick={getBusiness}/>
        <BusinessCard data={business} isLinkable={true} style={{marginTop: "-30px"}}  />
        </div>
        </div>
        </div>
    </React.Fragment>
    )
}   