import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { isEqual } from "lodash";
import BusinessCard from "../Panels/BusinessCard"
import CityList from "../Element/CityList";
import TagsInput from "../Element/TagsInput"
import { fetchData, getCities } from "../ContextAPI";
import "../styles/style.css";

export default function NewBusiness(props) {
    const [err, setErr] = useState(null)
    const [list, setList]  = useState(null);
    const [cities, setCities] = useState(null)
    const [types, setTypes] = useState([]);
    const [defaultData, setDefaultData] = useState(null);    
    const [changed, setChanged] = useState ();
    const [localData, setLocalData] = useState();
    const [editable, setEditable] = useState (true);
    const [fun, setFun] = useState ();
    const user  = useMemo (() => props.user, [props]);

    const text = "ברוכים הבאים למסך ערכית עסקים. כאן תוכלו לערוך את העסקים ולהוסיף עסקים חדשים. כל עסק ניתן להציג על המסך ולראות איך הוא נראה";
    const newBusinessData = {
		gsx$type: undefined,
        gsx$name: undefined,
        gsx$logo: undefined,
        gsx$address: undefined,
        gsx$city: undefined,
        gsx$phone: [undefined, undefined, undefined],
        gsx$facebook: undefined,
        gsx$instagram: undefined,
        gsx$website: undefined,
        gsx$email: undefined,
        gsx$whatsapp: undefined,
        gsx$desc: undefined,
        gsx$tags: [],
        gsx$worktime: [undefined, undefined, undefined],
        gsx$link: undefined,
        gsx$active: false
    }

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

    /*const onKeyChangeSelVal = (e) => {
        var i = parseInt(e.target.value);
        var key = e.key;
        var code = e.charCode;
        if (key >= 'א' && key <= 'ת') {
            if (key != "ך" && key != "ם" && key != "ן" && key != "ף" && key != "ץ") {
                if ( ((i+1) < cities.length) && (cities[i].startsWith(key) && cities[i+1].startsWith(key)) ) {
                    changeVal( cities[i+1], "gsx$city");   
                }           
                
                else {
                    var str = cities.find (e => e.startsWith(key))
                    changeVal(str, "gsx$city");
                }

            }
        
        }

    }*/

   
    const handleTags = (data) => {
        /*let obj = localData;
        obj.gsx$tags = data;*/
        let obj = {...localData, gsx$tags: data }
        setLocalData (obj);
        checkValues(obj);
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
        e.preventDefault();
        e.stopPropagation();

        if (fun === 0) addNewBusiness ();
        else if (fun === 1) setEditable(false);
    }
    const addNewBusiness = async () => {
        let data = localData;
        
        if (data?.$gsx$type) data.gsx$type = types[0]._id;
        if (data?.$gsx$city) data.gsx$city = cities[0];
        console.log (data);

        const dataEntries = Object.entries(data);
        const filtered = dataEntries.filter(([key, value]) => value !== undefined && value != null && value);
        data = Object.fromEntries(filtered);
        data.gsx$active = false;
        data.gsx$link = String(list.length+1);
        fetchData('/businessCreate', 'put', { data: data })
        .then ((newData) => {
            alert ("העסק " + newData.gsx$name + " הוגש למערכת");       
            if (user === 'admin') window.location.href = "/BusinessPageEditor/" +  data.gsx$link;
            else window.location.href = "/";
        })
        .catch (err => {console.log(err); alert ("לא ניתן ליצור עסק חדש"); })
    }

    const loadItem = () => {
        setEditable (!editable);
    }


    useEffect(() => {
        console.clear();

        if (props.err) {
            setErr (props.err);
        }

        else if (list?.length===0 || cities?.length===0 || types?.length===0) {            
            getCities (setCities);
            setList(props.businesses);
            setTypes (props.types.sort((a, b) => a.gsx$type.localeCompare(b.gsx$type)))

            var data = {
                "gsx$type": "61bfa7035c54d939a4544646",
                "gsx$name": "אביטל הפקות",
                "gsx$logo": "https://res.cloudinary.com/byzbook/image/upload/v1625168896/Github/12274542_1189317354417127_4539567918184026201_n.jpg",
                "gsx$logoheight": 250,
                "gsx$logowidth": 250,
                "gsx$city": "נוף הגליל", 
                "gsx$email": 'avitalprod@gmail.com',
                "gsx$phone":  ["0547421862", "0506903932", undefined],
                "gsx$worktime": [undefined, undefined, undefined],
                "gsx$facebook":  "https://www.facebook.com/Avital.Productions/",
                "gsx$instagram":  "https://www.instagram.com/avital_pro/",
                "gsx$whatsapp":  "0547421862",
                "gsx$desc":  'הפקת חתונות, בר-מצוות, ימי הולדת',
                "gsx$tags": [],
            }

            setLocalData (data);
            //setLocalData (newBusinessData)
        }

    }, [])


    if (err) return <h1>{err}</h1>
    if (cities === null || types === null || list === null ||
    cities === undefined || types === undefined || list === undefined) return (<p>null</p>)
    
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
            <div className="jumbotron">
                <h2 className="title" id="title" style={{ textAlign: 'center', textDecoration: 'underline' }}>עסק חדש</h2>
                {(1==2) && <p>{text}</p>}
            </div>
 
        <div className="row listRow1">
        {
        (!editable) ? 
        <div className="col-lg-4 col-md-4 col-lg-offset-4 col-md-offset-4">
        <span className="btn btn-sm glyphicon glyphicon-remove" onClick={loadItem} 
        style={{marginBottom: "-5%"}}></span>   
        
        <BusinessCard data={localData} isLinkable={false} style={{marginTop: "-17px"}} />
        </div>
        :  
        <div className="col-lg-6 col-md-6 col-lg-offset-3 col-md-offset-3">
        <div className="panel panel-info">
        <div className="panel-heading">
            <h1 className="caption panel-title title text-center">עסק חדש</h1>
        </div>       
        
        <div className="panel-body">
        <form id="form" onSubmit={ handleSubmit }>
        <div className="formInput row">
        <div className="form-group form-group-sm" style={{ marginTop: "-3%"}}>
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
                value={notEmptyVal('gsx$address')} onChange={e=>changeVal(e.target.value, "gsx$address")} style={{direction:"rtl"}} />
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
        [0, 1, 2].map((h) => 
        <div key={"h"+h} className="formInput input-group input-group-sm" style={{direction: "ltr"}}>
        <input type="text" className="form-control" placeholder="שעות עבודה" 
        value={notEmptyVal('gsx$worktime', h)} onChange={e2=>changeArray(e2.target.value, "gsx$worktime", h)} style={{direction:"rtl"}} />
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
        <button type="submit" className="btn btn-warning btn-md pull-left" 
        disabled={!changed} onClick={e=> setFun(0) }>שמירה</button>    

        <button type="submit" className="btn btn-info btn-md pull-right" onClick={e=> setFun(1) }>להציג עסק</button>    
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