import React, { useState, useEffect } from "react";
import { fetchData } from "../ContextAPI";

export default function ContactForm (props) {
    const [title, setTitle] = useState ("מצוקת מים");
    const [name, setName] = useState ("רומן");
    const [contactEmail, setContactEmail] = useState("romanbr87@gmail.com");
    const [contactPhone, setContactPhone] = useState("0507113699");
    const [message, setMessage] = useState("המים בארץ זוועה");

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = { gsx$message: message }
        if (title !== '') data.gsx$title = title;
        if (name !== '') data.gsx$sendersName = name;
        if (contactEmail !== '') data.gsx$contactEmail = contactEmail;
        if (contactPhone !== '') data.gsx$contactPhone = contactPhone;

        console.log (data);
        fetchData('/addmessage', 'post', { data: data })
        .then (data => {
            setTitle("");
            setName("");
            setContactEmail("");
            setContactPhone("");
            setMessage("");
            alert ("ההודעה נשלחה בהצלחה");
        })
        .catch (err => alert ("לא ניתן לשלוח את ההודעה"));
    }
    
    return (
    <div {...props}>
        <div className="panel panel-info">
            <div className="panel-heading">
                <h1 className="title panel-title text-center">
                יצירת קשר</h1>
            </div>       
            <div className="panel-body" style={{ marginTop: "0", marginRight: "0%"}}>
            <form onSubmit={handleSubmit}>            
                
                <div className="form-group form-group-sm" style={{marginTop: "-4%"}}>
                <label className="control-label label1" htmlFor="title">כותרת</label>    
                <input type="text" className="form-control input-sm" 
                placeholder="כותרת" id="title"value={title} onChange={e=>setTitle(e.target.value)} />
                </div>

                <div className="form-group form-group-sm" style={{marginTop: "-4%"}}>
                <label className="control-label label1" htmlFor="name">שם</label>    
                <input type="text" className="form-control input-sm"
                placeholder="שם" id="name" value={name} onChange={e=>setName(e.target.value)} />
                </div>

                <div className="form-group form-group-sm" style={{marginTop: "-4%"}}>
                <label className="control-label label1" htmlFor="contactEmail">אימייל ליצירת קשר</label>    
                <input type="text" className="form-control input-sm" placeholder="אימייל ליצירת קשר" id="contactEmail"
                value={contactEmail} onChange={e=>setContactEmail(e.target.value)} />
                </div>

                <div className="form-group form-group-sm" style={{marginTop: "-4%"}}>
                <label className="control-label label1" htmlFor="contactPhone">טלפון ליצירת קשר</label>    
                <input type="text" className="form-control input-sm" placeholder="טלפון ליצירת קשר" id="contactPhone"
                value={contactPhone} onChange={e=>setContactPhone(e.target.value)} />
                </div>
                
                <div className="form-group" style={{marginTop: "-4%"}}>
                <label className="control-label label1" htmlFor="message"><span className="astrix">*</span>הודעה</label>    
                <textarea className="form-control" rows="6" cols="11" placeholder="הודעה" 
                value={message} onChange={e => setMessage(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-primary btn-sm" style={{marginTop: "-2%", marginBottom: "-1%"}}
                >לשלוח</button>   
            </form>
            </div>
            
        </div>
            
    </div>
    )
}