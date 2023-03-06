import React, { useState, useEffect } from "react";
import "../styles/style.css";

export default function TypesInputPanel(props) {
    const [val, setVal] = useState('');
    const [disableAccept, setDisableAccept] = useState()
    const [disableCancel, setDisableCancel] = useState()

    const buttonCss = (val) => val ? {cursor: 'not-allowed'} : {}
    const changeVal = (txt) => {
        if (txt !== val) setVal(txt);
        setDisableAccept ((txt === props.type.gsx$type) || (txt.trim() == ''))
        setDisableCancel (txt === props.type.gsx$type)
    }

    const loadData = () => {
        setDisableAccept(true);
        setDisableCancel(true);
        setVal (props.type.gsx$type);        
    }

    const deleteVal = async () => {       
        let con = window.confirm ("האם ברצונך למחוק את הערך " + val + "?" );      
        if (con) {
            let res = await props.deleteVal(props.type._id);
        }
    }

    const updateVal = async () => {
        if (val.trim() == '') {
            alert ("לא ניתן לעדכן ערך ריק");
            return;
        }
        
        let res = await props.updateVal(val, props.type._id);
        if (res == true) {
            setDisableAccept(true);
            setDisableCancel(true);                    
        }
    }

    useEffect(() => {
       loadData();
    }, [])

    return (
    <React.Fragment>
     <div className="input-group input-group-sm" style={{direction: "ltr", marginBottom: "1%"}}>
        <div className="input-group-btn" style={{direction: "ltr"}}>
            <button className="btn btn-default btn-sm" onClick={deleteVal}>
                <i className="glyphicon glyphicon-trash" style={{color: "blue"}}></i>
            </button>
            <button className="btn btn-default btn-sm" disabled={disableCancel} 
            onClick={loadData} style={buttonCss(disableCancel)}>
                <i className="glyphicon glyphicon-remove" style={{color: "red"}}></i>
            </button>
            <button className="btn btn-default btn-sm" disabled={disableAccept} 
            onClick={updateVal} style={buttonCss(disableAccept)}>
                <i className="glyphicon glyphicon-ok" style={{color: "green"}}></i>
            </button>
        </div>
        <input type="text" className="form-control input-sm" placeholder="הכנס ערך"
        value={val} onChange={e => changeVal (e.target.value)} />
         <span className="input-group-addon">
        {(props.index < 9) ? '0'+(props.index+1) : props.index+1 }</span>
   </div>       
    </React.Fragment>
    )
}