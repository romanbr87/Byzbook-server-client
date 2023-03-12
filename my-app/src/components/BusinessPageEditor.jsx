import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { isEqual } from "lodash";
import { fetchData } from "../ContextAPI";

import BusinessCard from "../Panels/BusinessCard"
import CityList from "../Element/CityList";
import TagsInput from "../Element/TagsInput"
import CheckBox from "../Element/CheckBox";
import "../styles/style.css";
import "../styles/App.css";

export default function BusinessPageEditor(props) {

    const [changed, setChanged] = useState ();
    const [defaultData, setDefaultData] = useState(props.business);
    const [localData, setLocalData] = useState();
    const [editable, setEditable] = useState (true);
    const [cities, setCities] = useState(null)
    const [fun, setFun] = useState ();

    const types  = props.types.sort((a, b) => a.gsx$type.localeCompare(b.gsx$type));

    
    const whetherEmpty = (val) => (val === '' || val === undefined) ? null : val; 
    const notEmptyVal = (key, idx) => {
        try {
            let val = (idx != undefined) ? localData[key][idx] : localData[key]; 
            return  (val === '' || val === null) ? '' : val; 
        }
        
        catch (e) {
            return undefined
        }
    }

    const findIndexOfTypeById = (ID) => {
        let type = types.find (e => e._id == ID);
        return types.indexOf (type);
    }

    const handleTags = (data) => {
        let obj = localData;
        obj.gsx$tags = data;
        setLocalData (obj);
        checkValues(obj);
    }
    const onKeyChangeSelVal = (e) => {
        var i = parseInt(e.target.value);
        var key = e.key;
        var code = e.charCode;
        if (key >= 'א' && key <= 'ת') {
            if (key != "ך" && key != "ם" && key != "ן" && key != "ף" && key != "ץ") {
                if ( ((i+1) < cities.length) && (cities[i].startsWith(key) && cities[i+1].startsWith(key)) ) {
     
                    changeVal( cities[i+1], "gsx$city");   
                }           
                
                else {
                    //alert (key)
                    var str = cities.find (e => e.startsWith(key))
                    //changeVal("gsx$city", cities.indexOf(str));
                    changeVal(str, "gsx$city");
                }

            }
        
        }

    }

    const loadDefaultValues = () => {       
        var obj = Object.assign({}, defaultData)
        setLocalData (obj)
        setChanged (defaultData?.gsx$new == true);
    }
    
    const changeVal = (val, key) => {          
        var obj = Object.assign({}, localData)
        let insertedVal = whetherEmpty(val);
        obj[key] = insertedVal;
        setLocalData (obj);
        checkValues(obj);
    }

    const changeArray = (val, key, idx) => {         
        var obj = Object.assign({}, localData)
        let insertedVal = whetherEmpty(val);
        obj[key] = obj[key].map((value, index) => index === idx ? insertedVal : value);
        setLocalData (obj);
        checkValues(obj);
    }

    const checkValues = (data) => {
        var change = !isEqual(data, defaultData)
        setChanged (change);
        return change;
    }

    const handleSubmit = (e) => {
        if (fun == 0) submitByzData (e);
        else if (fun == 1) setEditable(false);
    }

    const submitByzData = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: localData })
        };

        await fetchData('/businessUpdate', 'put', { data: localData })
        .then (data => {
            alert ("העסק עודכן");

            console.clear();       
            setDefaultData (data);
            setLocalData (data);
            setChanged (false);
        })
        .catch (err =>  alert ("לא ניתן לעדכן את הערך"))
    }

    const loadItem = () => {
        setEditable (!editable);
    }

    useEffect(() => {
        if (changed == undefined || changed == null) loadDefaultValues();
    }, [])

    if (types == null || localData == null || types == undefined || localData == undefined) return (<p>null</p>)

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

        <title>עריכה/הוספת עסקים</title>
        </Helmet>
        
        <div className="container"> 
            <div className="row listRow1">
            {
            (!editable) ? 
            <div className="typeEditor col-lg-4 col-md-4 col-lg-offset-4 col-md-offset-4">
            <span className="btn btn-sm glyphicon glyphicon-remove" onClick={loadItem}></span>   
            
            <BusinessCard data={localData} isLinkable={false} style={{marginTop: "-31px"}} />
            </div>
            :  
            <div className="typeEditor col-lg-6 col-md-6 col-lg-offset-3 col-md-offset-3">
            
            <div className="panel panel-info">
            <div className="panel-heading">
                <h1 className="caption title panel-title text-center">{defaultData.gsx$name}</h1>
            </div>       
            
            <div className="panel-body">
            <form onSubmit={ e=> handleSubmit(e) }>
            <div className="formInput row" style={{ marginTop: "-3%"}}>
            <div className="form-group form-group-sm">
            <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <label className="label1"><span className="astrix">*</span>סוג עסק</label>    
            <select className="form-control" style={{direction:"rtl"}}
            onChange={e => changeVal(types[e.target.value]._id, "gsx$type") }
            value={ findIndexOfTypeById (notEmptyVal('gsx$type')) }>
            {
                types.map((e, j) => {
                    return <option key={e.gsx$type} value={j}>{(j+1) + ". " + e.gsx$type}</option> 
                })
            }
            </select>
            </div>

            <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <label className="label1"><span className="astrix">*</span>שם עסק</label>    
                <div className="input-group-sm">
                    <input type="text" className="form-control" placeholder="שם עסק" 
                    value={notEmptyVal('gsx$name')} onChange={e=>changeVal(e.target.value, "gsx$name")} style={{direction:"rtl"}} 
                    required />
                </div>
            </div>
            </div>
            </div>
    
            <div className="formInput input-group input-group-sm" style={{direction: "ltr"}}>
                <span className="input-group-addon"><span className="fa fa-fw fa-file-image-o"></span></span>

                <input type="text" className="form-control" placeholder="קישור ללוגו" 
                value={notEmptyVal('gsx$logo')} onChange={e=>changeVal(e.target.value, "gsx$logo")} 
                style={{direction:"ltr", textAlign: "left"}} />
            </div>

            <div className="formInput row">
            <div className="form-group form-group-sm">
                <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="input-group input-group-sm" style={{direction: "ltr"}}>
                    <input type="number" min="200" max="500" className="form-control" placeholder="אורך לוגו" required 
                    value={notEmptyVal('gsx$logowidth')} onChange={e=>changeVal(e.target.value, "gsx$logowidth" )} style={{direction:"ltr"}}/>

                    <span className="input-group-addon">אורך לוגו</span>
                    </div>
                </div>

                <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="input-group input-group-sm" style={{direction: "ltr"}}>
                    <input type="number" min="200" max="500" className="form-control" placeholder="גובה לוגו" required 
                    value={notEmptyVal('gsx$logoheight')} onChange={e=>changeVal(e.target.value, "gsx$logoheight")} style={{direction:"ltr"}}/>

                    <span className="input-group-addon">גובה לוגו</span>
                    </div>
                </div>
            </div>
            </div>

            <div className="formInput row" style={{ marginTop: "-4%"}}>
            <div className="form-group form-group-sm">
            <CityList changeVal={changeVal} notEmptyVal={notEmptyVal}></CityList>

            <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <label className="label1">כתובת</label>    
                <div className="input-group-sm">
                    <input type="text" className="form-control" placeholder="כתובת" 
                    value={notEmptyVal('gsx$address')} onChange={e=>changeVal(e.target.value, "gsx$address")} 
                    style={{direction:"rtl"}} />
                </div>
            </div>
            
            </div>
            </div>

            <div className="formInput row">
            <div className="form-group form-group-sm">
            <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6 formInput">
                <div className="input-group input-group-sm" style={{direction: "ltr"}}>
                    <span className="input-group-addon"><span className="fa fa-fw fa-phone"></span></span>
                    <input type="text" className="form-control" placeholder="טלפון2" max="11" 
                    value={notEmptyVal('gsx$phone', 1)} onChange={e=>changeArray(e.target.value, "gsx$phone", 1)} 
                    style={{direction: "ltr", textAlign: "left"}} />
                </div>
            </div>
            <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6 formInput">
                <div className="input-group input-group-sm" style={{direction: "ltr"}}>               
                    <span className="input-group-addon"><span className="fa fa-fw fa-phone"></span></span>
                    <input type="text" className="form-control" placeholder="טלפון" maxLength="11" required 
                    value={notEmptyVal('gsx$phone', 0)} onChange={e=>changeArray(e.target.value, "gsx$phone", 0)} 
                    style={{direction: "ltr", textAlign: "left"}} />
                </div>
            </div>
            </div>
            </div>

            <div className="formInput row" style={{marginTop: "-2%"}}>
            <div className="form-group form-group-sm">
            <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div className="input-group input-group-sm" style={{direction: "ltr"}}>
                    <span className="input-group-addon"><span className="fa fa-fw fa-whatsapp"></span></span>
                    <input type="text" className="form-control" placeholder="ווטסאפ" maxLength="11" 
                    value={notEmptyVal('gsx$whatsapp')} onChange={e=>changeVal(e.target.value, "gsx$whatsapp")} 
                    style={{direction: "ltr", textAlign: "left"}} />
                </div>
            </div>
            <div className="longItem col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <div className="input-group input-group-sm" style={{direction: "ltr"}}>
                    <span className="input-group-addon"><span className="fa fa-fw fa-phone"></span></span>
                    <input type="text" className="form-control" placeholder="טלפון3" maxLength="11"
                    value={notEmptyVal('gsx$phone', 2)} onChange={e=>changeArray(e.target.value, "gsx$phone", 2)} 
                    style={{direction: "ltr", textAlign: "left"}} />

                </div>
            </div>
            </div>
            </div>

            <div className="formInput input-group input-group-sm" style={{direction: "ltr"}}>
                <span className="input-group-addon"><span className="fa fa-fw fa-envelope-o"></span></span>

                <input type="email" className="form-control" placeholder="אימייל" 
                value={notEmptyVal('gsx$email')} onChange={e=>changeVal(e.target.value, "gsx$email")} 
                style={{direction:"ltr", textAlign: "left"}} />
            </div>

            <div className="formInput input-group input-group-sm" style={{direction: "ltr"}}>
                <span className="input-group-addon"><span className="fa fa-fw fa-facebook"></span></span>

                <input type="text" className="form-control" placeholder="קישור לפייסבוק" 
                value={notEmptyVal('gsx$facebook')} onChange={e=>changeVal(e.target.value, "gsx$facebook")} 
                style={{direction:"ltr", textAlign: "left"}} />
            </div>

            <div className="formInput input-group input-group-sm" style={{direction: "ltr"}}>
                <span className="input-group-addon"><span className="fa fa-fw fa-instagram"></span></span>

                <input type="text" className="form-control" placeholder="קישור לאינסטגרם" 
                value={notEmptyVal('gsx$instagram')} onChange={e=>changeVal(e.target.value, "gsx$instagram")}
                style={{direction:"ltr", textAlign: "left"}} />
            </div>
            <div className="formInput input-group input-group-sm" style={{direction: "ltr"}}>
                <span className="input-group-addon"><span className="fa fa-fw fa-globe"></span></span>
                <input type="text" className="form-control" placeholder="קישור לאתר" 
                value={notEmptyVal('gsx$website')} onChange={e=>changeVal(e.target.value, "gsx$website")}
                style={{direction:"ltr", textAlign: "left"}} />
            </div>
            
            <div className="formInput input-group input-group-sm" style={{direction: "ltr"}}>
                <input type="text" className="form-control" placeholder="הערות" 
                value={notEmptyVal('gsx$comment')} onChange={e=>changeVal(e.target.value, "gsx$comment")} style={{direction:"rtl"}} />
                <span className="input-group-addon"><span className="fa fa-fw fa fa-comment"></span></span>
            </div>
            <div style={{ marginTop: "-3%"}}>
            <label className="label1">שעות עבודה</label>    
            {
            [0, 1, 2].map((e1, i) => 
            <div key={i} className="formInput input-group input-group-sm" style={{direction: "ltr"}}>
            <input type="text" className="form-control" placeholder="שעות עבודה" 
            value={notEmptyVal('gsx$worktime', i)} onChange={e2=>changeArray(e2.target.value, "gsx$worktime", i)} style={{direction:"rtl"}} />
            <span className="input-group-addon"><span className="fa fa-fw fa-clock-o"></span></span>
            </div>
            )}
            </div>

            <div className="formInput form-group" style={{marginTop: "-2%"}}>
            <label className="label1">תיאור קצר של העסק</label>    
            <textarea className="form-control" rows="5" placeholder="תיאור קצר"
            style={{resize: 'unset'}} value={notEmptyVal('gsx$desc')} onChange={e => changeVal(e.target.value, "gsx$desc")}></textarea>
            </div>

            <div style={{marginTop: "-2%"}}>
            <label className="label1">תגיות</label>    
            <TagsInput maxLength='25' maxTags='6' tags={localData.gsx$tags} setTags={handleTags} />
            </div>
             
            <div style={{marginTop: "4%"}}>
                <button type="submit" className="btn btn-info btn-md pull-right" onClick={e=>setFun(1)}
                >להציג עסק</button>    

                <button type="submit" className="btn btn-warning btn-md pull-left"
                disabled={!changed} onClick={e=>setFun(0)}>שמירה</button>               

                <button type="button" className="btn btn-primary btn-md center-block" 
                onClick={loadDefaultValues} disabled={!changed}>ביטול</button>    
                
                {(1==2)&&<button type="button" className="btn btn-primary btn-md" 
                onClick={e=>changeVal(!localData.gsx$active, "gsx$active")} style={{marginTop: "2%"}}>
                {localData.gsx$active ? "להשבית" : "להפעיל" }</button>}
                        
                {(1==1)&& <CheckBox value={localData.gsx$active} dataOn="מופעל" dataOff="מושבת"           
                onChange={(e)=>{changeVal(!localData.gsx$active, "gsx$active") }}
                style={{marginTop: "2%"}}/>}
            </div>                           
            
            </form>

            </div>
            </div>

            </div>
            }       
            
 
            </div>
        </div>
        </React.Fragment>
    )
}