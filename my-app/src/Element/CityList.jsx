import React, { useState, useEffect } from "react";
import { getCities } from "../api";
import "../styles/style.css";

export default function CityList(props) {

    const [cities, setCities] = useState(null)

    const onKeyChangeSelVal = (e) => {
        var i = parseInt(e.target.value);
        var key = e.key;
        var code = e.charCode;
        if (key >= 'א' && key <= 'ת') {
            if (key != "ך" && key != "ם" && key != "ן" && key != "ף" && key != "ץ") {
                if ( ((i+1) < cities.length) && (cities[i].startsWith(key) && cities[i+1].startsWith(key)) ) {
                    props.changeVal( cities[i+1], "gsx$city");   
                }           
                
                else {
                    var str = cities.find (e => e.startsWith(key))
                    props.changeVal(str, "gsx$city");
                }

            }
        
        }

    }
   
    useEffect(() => {
        getCities (setCities);
    }, [])


    if (cities == null || cities == undefined) return (<p>null</p>)
    
    return (
    <React.Fragment>
        <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <label className="label1"><span className="astrix">*</span>יישוב</label>    
        
        <select className="form-control" style={{direction:"rtl"}}
        onChange={e => props.changeVal(cities[e.target.value], "gsx$city") } onKeyPress={e => onKeyChangeSelVal(e)}
        value={cities.indexOf(props.notEmptyVal('gsx$city'))} >
            {
                cities.map((e, i) => {
                    return <option key={e} value={i}>{e}</option> 
                })
            }
            </select>
        </div>

    </React.Fragment>
    )
}