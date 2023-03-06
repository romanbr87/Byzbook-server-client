import React, { useState, useEffect } from "react";
import "../styles/style.css";
import { fetchData } from "../ContextAPI";

export default function ReportsPanel(props) {

    const [list, setList] = useState ([]);

    const delReport = (obj) => {
        var res = window.confirm ("האם ברצונך למחוק דיווח על העסק " +  
        obj.gsx$refId.gsx$name + "?")

        if (!res) return;
                
        fetchData('/deletereport', 'put', { data: obj._id })
        .then (e=> {
            var arr = [...list];
            arr = arr.filter (e=> e._id !==  obj._id);
            setList(arr);
            alert ("הדיווח נמחק");
        })
        .catch (e=> {
            alert ("לא ניתן למחוק את הדיווח");
        }) 
    }

    /*      
    */

    /*const ReportItem = (props1) => { 
        return (
        <div className={props.className}> 
            <div className="panel panel-info" style={{direction: 'rtl'}}>

            <div className="panel-heading">
                <h1 className="title panel-title text-center">{props1.element.gsx$refId.gsx$name}
                <button type="button" className="close pull-right" aria-label="למחוק"
                onClick={e => delReport(props1.element)} style={{margin:"1% 2% 0 -2%"}}>
                <span aria-hidden="true">&times;</span></button>
                </h1>
            </div>

            <div className="panel-body" style={{paddingTop: '1.5%', paddingRight: "2%"}}>           
                <span className="text">{props1.element.gsx$desc}</span>
            </div>
            </div>
        </div>)
    }*/

    useEffect(() => {       
        setList(props.reports);
    }, [])

    if (!list) return <React.Fragment/>
    return (
    <React.Fragment>
            <div className="col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2">
            <div className="table-responsive">
            <table className="table table-bordered" style={{backgroundColor: "white"}}>
            <caption style={{backgroundColor: "white", border: "1px solid #ddd"}}>
                { <h3 className="title text-center">{list.length} הודעות</h3>}
            </caption>
            <thead>
                <tr>
                <th style={{width: "1px"}}>מחיקה</th>
                { (1==2) && <th className="text-right" style={{width: "60px"}}>#</th>}
                <th className="text-right" style={{width: "30%"}}>שם עסק</th>
                <th className="text-right">דיווח</th>
                </tr>
            </thead>
            <tbody>
             { list.map ((item, i) => 
             <tr key={i}>
                <th className="text-center">            
                    <button className="btn btn-default btn-sm" onClick={e=> delReport(item)}>
                    <i className="glyphicon glyphicon-trash" style={{color: "blue"}}>        
                    </i>
                    </button>
                </th>
                { (1==2) && <td>{i+1}</td> }
                <td> 
                    <a href={"/page/" + item.gsx$refId.gsx$link}>
                        {item.gsx$refId.gsx$name}
                    </a>
                </td>
                <td>{item.gsx$desc}</td>
             </tr>
             )}
            </tbody>
            </table>
            </div>
            </div>
    </React.Fragment>
    )
}