import React, { useState, useEffect } from "react";
import { isBrowser } from "react-device-detect";
import "../styles/style.css";
import { fetchData } from "../ContextAPI";

export default function ContactmessagesPanel (props) {

    const [list, setList] = useState ([]);
    const text = "מסך הדיווח אפשר לנו לראות את הדיווחים השונים על העסקים השונים. בהתאם לדייוח, הדיווח ימחק או שהעסק יבוטל/ימחק"
       

    const delMsg = (obj) => {
        var res = window.confirm ("האם ברצונך למחוק את ההודעה?")
        if (!res) return;

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: obj._id } )
        };
        
        fetchData('/deletemessage', 'put', { data: obj._id })
        .then (e=> {
            var arr = [...list];
            arr = arr.filter (e=> e._id !==  obj._id);
            setList(arr);
            alert ("ההודעה נמחק");
        })
        .catch (e=> {
            alert ("לא ניתן למחוק את ההודעה");
        }) 
    }

    const MessagesItem = (props1) => { 
        return (
        <div className="panel panel-info">
            <div className="panel-heading">
                <h1 className="title text-center">{
                props1.element?.gsx$title ? props1.element.gsx$title : 'ללא הודעה' }</h1>
            </div>
    
        <div className="panel-body" style={{ marginTop: "-3%" }}>
            {
                props1.element.gsx$sendersName && 
                <React.Fragment>
                    <span className="text caption">שם: {props1.element.gsx$sendersName}</span>        
                    <br/>
                </React.Fragment> 
            }

            {
                props1.element.gsx$contactEmail && 
                <React.Fragment>
                    <span className="text caption">אימייל ליצירת קשר:&nbsp;  
                    <a href={'mailto:'+props1.element.gsx$contactEmail}>
                        {props1.element.gsx$contactEmail}
                    </a>
                    </span>        
                    <br/>
                </React.Fragment>
            }
            {
                props1.element.gsx$contactPhone && 
                <React.Fragment>
                    <span className="text caption">טלפון ליצירת קשר:&nbsp;  
                    <a href={'tel:'+props1.element.gsx$contactPhone}>
                        {props1.element.gsx$contactPhone}
                    </a>
                    </span>        
                    <br/>
                </React.Fragment>
            }
            <div style={{minHeight: "50px"}}>
            <label className="text">הודעה:  </label>
            <span className="text"> {props1.element.gsx$message}</span>
            </div>
        </div>
        <div className="panel-footer">
            <button type="button" className="btn btn-primary btn-sm"
            onClick={e => delMsg(props1.element)}>למחוק הודעה</button>   
        </div>
        </div>)
    }

    useEffect(() => {       
        setList(props.data);
    }, [])

    if (!list) return <React.Fragment/>
    return (
    <React.Fragment>
 
        { isBrowser ? 
        <div className="table-responsive">
            <table className="table table-bordered table-striped table-condensed" style={{backgroundColor: "white"}}>
            <thead>
                <tr>
                <td style={{width: "10px"}}>מחיקה</td>
                { (1==2) && <th className="text-right" style={{width: "60px"}}>#</th>}
                <th className="text-right">הודעה</th>
                <th className="text-right" style={{width: "15%"}}>שם</th>
                <th className="text-right" style={{width: "25%"}}>אימייל</th>
                <th className="text-right" style={{width: "14%"}}>טלפון</th>
                </tr>
            </thead>
            <tbody>
                { list.map ((item, i) => 
                <tr key={i}>
                <td>            
                    <button className="btn btn-default btn-sm" onClick={e=> delMsg(item)}>
                    <i className="glyphicon glyphicon-trash" style={{color: "blue"}}></i>
                    </button>
                </td>
                { (1==2) && <td>{i+1}</td>}
                <td>{item.gsx$message}</td>
                <td>{item.gsx$sendersName}</td>
                <td>                    
                    <a href={'mailto:'+ item.gsx$contactEmail}>
                        {item.gsx$contactEmail}
                    </a>
                </td>
                <td>                    
                    <a href={'tel:'+ item.gsx$contactPhone}>
                        {item.gsx$contactPhone}
                    </a>
                </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        :
        list.map ((item, i) => <MessagesItem element={item} key={'i'+i} />)
        
        }

    </React.Fragment>
    )
}