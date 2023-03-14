import React, { useMemo } from "react";
import "../styles/style.css";

export default function Menu(props) {
    
    const user  = useMemo (() => props.user, [props]);
    const panelData = useMemo (() => props.panelData.data, [props])

    /*const logout = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        
        fetch('../logout', requestOptions)
        .then (res => res.json())
        .then (data => console.log (data) )
        .catch (err => {
            console.log (err);
            alert ("לא ניתן להתנתק");
        })

    }*/

    return ( 
        <>
        <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
        <a className="navbar-brand navbar-right" href="/" style={{marginLeft: "1%", marginRight: "-1%"}}>דף הבית</a>
        <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" 
            data-target="#navbar-collapse" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            </button>
        </div>

        <div className="collapse navbar-collapse" id="navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
        <li><a href="/about">אודות</a></li>
        <li><a href="/Contact">ייצרת קשר</a></li>        
        {props.children}
        { (user.role === 'admin') ?
        <li className="dropdown">
        <a href="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
        כלי ניהול<span className="caret"></span></a>
        <ul className="dropdown-menu">
            <li><a href="#" className="text-right" onClick={e=> { e.preventDefault(); console.clear() } }>איפוס קונסול</a></li>
            <li><a href="/administrator" className="text-right">מנהל אתר</a></li>
            <li><a href="/BusinessEditor" className="text-right">עריכת עסק <span className="pull-left"><span className="badge">{panelData?.businesses}</span></span></a></li>
            <li><a href="/TypesEditor" className="text-right">טיפוסי עסק <span className="pull-left"><span className="badge">{panelData?.businesstypes}</span></span></a></li>
            <li><a href="/Reports" className="text-right">דיווחים על עסק <span className="pull-left"><span className="badge">{panelData?.reports}</span></span></a></li>
            {(1==2) && <li role="separator" className="divider"></li>}
            <li><a href="/Contactmessages" className="text-right">הודעות <span className="pull-left"><span className="badge">{panelData?.messages}</span></span></a></li>
            <li><a href="/Imgs" className="text-right">תמונות <span className="pull-left"><span className="badge">{panelData?.images}</span></span></a></li>
            <li><a href="/CommentsAdmin" className="text-right">תגובות <span className="pull-left"><span className="badge">{panelData?.comments}</span></span></a></li>
        </ul> 
        </li> : '' }
        <li><a href="/newBusiness">עסק חדש</a></li>        
        { !user.role ? 
            <li><a href="/login">התחברות</a></li> 
            : 
            <li><a href="/logout">התנתקות</a></li> 
        }
        </ul>
        </div>
        
        </div>
        </nav>    
        </>
    )
}   