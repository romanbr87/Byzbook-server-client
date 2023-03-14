import React from "react";
import { isBrowser } from "react-device-detect";
import "../styles/style.css";

export default function Admin(props) {

	const adminData = props.data;
    const changePanel = props.changePanel;

    return (
        <div className={isBrowser ? "col-lg-6 col-md-6 col-lg-offset-3 col-md-offset-3" : ''}>
            <div className="table-responsive">
            <table className="table table-bordered table-striped table-condensed" style={{backgroundColor: "white"}}>
            <caption><h3 className="title text-center">ניהול האתר</h3></caption>
            <thead>
                <tr>
                <th className="text-right" style={{width: "30%"}}>כמות פריטים</th>
                <th className="text-right" style={{width: "35%"}}>פאנל</th>
                <th className="text-right" style={{width: "35%"}}>מסך</th>
                </tr>
            </thead>
            <tbody>

                <tr>
                <th className="text-right">{adminData[2].businesses}</th>
                <td>
                <a href="#" className="btn btn-* btn-default btn-sm" onClick={e=> { e.preventDefault(); changePanel (1); }} style={{borderRadius: '0'}}>עריכת עסקים</a>
                </td>
                <td>
                <a href="/BusinessEditor" style={{borderRadius: '0'}}>עריכת עסקים</a>
                </td>
                </tr>
                
                <tr>
                <th className="text-right">{adminData[2].businesstypes}</th>
                <td>
                <a href="#" className="btn btn-primary btn-sm" onClick={e=> { e.preventDefault(); changePanel (2); }} style={{borderRadius: '0'}}>עריכת טיפוסים</a>
                </td>
                <td>
                <a href="/TypesEditor" style={{borderRadius: '0'}}>עריכת טיפוסים</a>
                </td>
                </tr>

                <tr>
                <th className="text-right">{adminData[2].reports}</th>
                <td>
                <a href="#" className="btn btn-primary btn-sm" onClick={e=> { e.preventDefault(); changePanel (3); }} style={{borderRadius: '0'}}>דיווחים</a>
                </td>
                <td>
                <a href="/Reports" style={{borderRadius: '0'}}>דיווחים</a>
                </td>
                </tr>

                <tr>
                <th className="text-right">{adminData[2].messages}</th>
                <td>
                <a href="#" className="btn btn-primary btn-sm" onClick={e=> { e.preventDefault(); changePanel (4); }} style={{borderRadius: '0'}}>הודעות מערכת</a>
                </td>
                <td>
                <a href="/Contactmessages" style={{borderRadius: '0'}}>הודעות מערכת</a>
                </td>
                </tr>

                <tr>
                <th className="text-right">{adminData[2].images}</th>
                <td>
                <a href="#" className="btn btn-primary btn-sm" onClick={e=> { e.preventDefault(); changePanel (5); }} style={{borderRadius: '0'}}>תמונות</a>
                </td>
                <td>
                <a href="/Imgs" style={{borderRadius: '0'}}>תמונות</a>
                </td>
                </tr>

                <tr>
                <th className="text-right">{adminData[2].comments}</th>
                <td>
                <a href="#" className="btn btn-primary btn-sm" onClick={e=> { e.preventDefault(); changePanel (6); }} style={{borderRadius: '0'}}>תגובות לעסקים</a>
                </td>
                <td>
                <a href="/CommentsAdmin" style={{borderRadius: '0'}}>תגובות לעסקים</a>
                </td>
                </tr>

            </tbody>
            </table>
            
            </div> 
       </div>
    )
}