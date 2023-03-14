import React, { useState, useEffect } from "react";
import '../styles/style.css';
import "../styles/comments.css";
import { fetchData } from "../api";

export default function Comments(props) {
    const [name, setName] = useState ("רומן");
    const [comment, setComment] = useState("123456789012124234356");
    const [comments, setComments] = useState();
    const [commetable, setCommetable] = useState (false)

    const cancelData = () => {
        setName('');
        setComment('');
        setCommetable (false);
        console.log (comments);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() === '') {
            alert ("לא הוכנס שם משתמש");
            return;
        }

        if (comment.trim() === '') {
            alert ("לא הוכנסה תגובה");
            return;
        }
        
        //alert ("התגובה הוגשה לאישור")
        const gmtDateTime = new Date().toUTCString();
        let data = {
            gsx$refID: props.business,
            gsx$userName: name,
            gsx$comment: comment,
            gsx$date: gmtDateTime, 
            gsx$active: false,    
        }
       
        fetchData('/comments', "put", { data: data })
        .then (data => {
            alert ("התגובה נשלחה")
            cancelData ();
            setCommetable (false);   
        })
        .catch (err => alert ("לא ניתן להוסיף הודעה"));

        return true;
    }

    const correctTD = (str, splitChar) => {
        if (splitChar.length != 1) return null;
        let arr =  str.split(splitChar);
        if (arr.length != 3) return null
        arr = arr.reduce ((a, b, i) => {
            return a + (b < 10 ? '0' + b : b) + (i < 2 ? splitChar : '') 
        }, [])

        return arr;
    }
    const time = (dateFromDB) => {
        let date = new Date(dateFromDB);
        let date1 = new Date ();
        if (date.getDate() == date1.getDate()) {
            let geTMFromDT = (date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
            geTMFromDT = correctTD (geTMFromDT, ":");
            return geTMFromDT;
        }
        else {
            let geDTFromDT = (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getUTCFullYear())
            geDTFromDT = correctTD (geDTFromDT, '/');

            let dayOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];            
            dayOfWeek = "יום " + dayOfWeek[date.getDay()];
            return dayOfWeek + ', ' + geDTFromDT;
            
            
        }
        // + "/" + date.getMonth() + "/" + date.getFullYear()
    }

    useEffect(() => {       
        setComments(props.comments);
        console.log (props.comments);
    }, [props.comments])
    
    if (!comments) return <React.Fragment/>
    return (
    <div {...props}>
        <h2 className="title" id="title">{comments.length} תגובות</h2>
        {comments.map ((data, i) => 
            <div key={'i'+i} className="well well-sm" id={"com"+i}>
            <div className="head">
            <strong className='user pull-right'>{data.gsx$userName}</strong>
            <small>{time(data.gsx$date)}</small>
            <br/>
            </div>    

            <p className="comment">{data.gsx$comment}</p>
            </div>
            )
        }

        { !commetable && <button type="button" className="btn btn-primary btn-sm"
        onClick={e => setCommetable (true)} style={{margin: '0', marginBottom: "4%"}}>תגובה</button> }
               
        { commetable && <form onSubmit={ handleSubmit }>
        <label className="control-label">שם משתמש</label>
        <div className="form-group form-group-sm">
            <input type="text" className="form-control" placeholder="משתמש" title="משתמש" 
            value={name} onChange={e=>setName(e.target.value)} name='username' required />
        </div>
        
        <label className="control-label" style={{top: "100px"}}>תגובה</label>
        <div className="form-group form-group-sm">
            <div contentEditable='true' value={comment} 
            onInput={e => setComment(e.currentTarget.textContent.trim())} required>
            </div>
        </div>
        

        <div className="btn-group-sm" role="group" aria-label="כפתורים"
        style={{marginBottom:"100px", marginTop: '0', paddingTop: '0'}}>
        <button type="submit" className="btn btn-primary pull-left">להגיש תגובה</button>
        <button type="button" className="btn btn-danger pull-right" onClick={cancelData}>ביטול</button>
        </div>
        </form> }

    </div>
  );
}
