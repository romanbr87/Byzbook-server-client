import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Menu from "../Panels/Menu";
import CommentsAdminPanel from '../Panels/CommentsAdminPanel'
import ContactmessagesPanel from "../Panels/ContactmessagesPanel";
import ImgsPanel from "../Panels/ImgsPanel";
import ReportsPanel from "../Panels/ReportsPanel";
import TypesPanel from "../Panels/TypesPanel";
import Admin from "../Panels/Admin";
import "../styles/style.css";
import "../styles/admin.css";
import { fetchData } from "../api";

export default function AdminPage (props) {
	const [admin, setAdmin] = useState (0);
	const [txt, setTxt] = useState ('');
	const [adminData, setAdminData] = useState([]);
    const setPanel = (n) => setAdmin (n)
    const panels = ['פאנל ניהול', 'עריכת עסקים', 'עריכת טיפוסים', 'טיפול בדיווחים', 'טיפול בהודעות', 'תמונת', 'תגובות לעסקים'];
    
    const [panelData, setPanelData] = useState ();

    const changePanel = (i) => {
        if (i == admin) return;
        setPanel(i);
    }

    const httpReq = async (req) => {       
        var data = await fetchData ('/' + req)
        return data;
    }
    
    const Equals = () => {
        alert (navigator.onLine);
    }
    
    const changePanelData = (data) => {
        var panels = ['types', 'reports', 'contactmessages', 'imgs', 'commentsAdmin']
        var dataType = ['types', 'reports', 'data', 'data', 'data'];
        //console.log({ [panels[admin - 2]]: { data: data } } )
        /*setPanelData ((currentList)=>{
            return currentList.map((item,index)=> {
                var currItem = commentsAdmin;

                return (admin - 2 === index) ?
                { ...item, currItem } : item
            });
        })*/
        var obj = {...panelData};
        obj[panels[admin - 2]][dataType[admin - 2]] = data;
        console.log (obj[panels[admin - 2]]);
        setPanelData (obj);
    }

    const Panel = () => {
        switch (admin) {
            default: return <React.Fragment/>
            case 0: return <Admin data={adminData} changePanel={changePanel}/>;
            case 2: return <TypesPanel {...panelData.types} changePanelData={changePanelData} />;
            case 3: return <ReportsPanel {...panelData.reports}/>;
            case 4: return <ContactmessagesPanel {...panelData.contactmessages} />;
            case 5: return <ImgsPanel {...panelData.imgs} />;
            case 6: return <CommentsAdminPanel {...panelData.commentsAdmin} changePanelData={changePanelData} />;
        }
    }

    useEffect(() => {    
		
        var data = ['types', 'reports', 'contactmessages', 'imgs', 'commentsAdmin',]

        Promise.all( data.map(name => httpReq(name)) ).then((values) => {
            var obj = data.reduce ((acc, curr, i) => {
                let obj1 = acc;
                acc[curr] = values[i];
                return obj1
            }, {})
            setPanelData (obj);
            //console.log (obj);
        });
        
        setAdminData ([Object.keys(props.cnt), Object.values(props.cnt), props.cnt])
    }, [])

    if (!panelData) return <p></p>
    return (
    <React.Fragment>
    { false && <Menu user={props.user} cnt={props.cnt}>
    <li className="dropdown visible-xs">
        <a href="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
        פנלי ניהול<span className="caret"></span></a>
        <ul className="dropdown-menu">
            { panels.map ((panel, i) =>
            <li key={'panel' + i}><a href="#" className="text-right" onClick={e=> { e.preventDefault(); changePanel(i); } }>{panel}</a></li>
            )}
            <li><a href="#" className="text-right" onClick={e=> { e.preventDefault(); console.log (Equals()); } }>מידע</a></li>
        </ul>
    </li>
    </Menu> }
    { false && <ul className="nav nav-pills navbar-fixed-top" style={{backgroundColor: '#ddd', padding: '0', marginTop: "51px"}}>
        { panels.map ((panel, i) =>
        <li role="presentation" className={(admin == i ? 'active' : '') + " pull-right"}>
        <a href="#" onClick={e=> { e.preventDefault(); changePanel (i); }} style={{borderRadius: '0'}}>{panel}</a>
        </li>
        )}
    </ul>}

    <div className="container-fluid " style={{marginTop: '51px'}}>
    <div className="row content">
        <div className="col-sm-10">
        <h2 className="title pull-center" style={{ textAlign: 'center', textDecoration: 'underline', marginBottom: '10px' }}>
        {panels[admin]}</h2>

        <div>
        <Panel/>
        </div>

        { false && <React.Fragment>
        <div className="input-group">
        <input className="form-control" value={txt} onChange={e=>setTxt(e.target.value)} />
        </div>
        
        <button className="btn btn-sm btn-default" onClick={e => console.log ("12")}>QR CODE</button>
        <canvas id="can"></canvas>
        </React.Fragment> }
        </div>

        <div className="col-sm-2 sidenav hidden-xs">
            <h2>אפשרויות ניהול</h2>
            <ul className="nav nav-pills nav-stacked">
            { panels.map ((panel, i) =>
            <li key={"panel"+i} className={(admin == i ? 'active' : '')}>
            <a href="#" onClick={e=> { e.preventDefault(); changePanel (i); }} style={{borderRadius: '0'}}>{panel}</a>
            </li>
            )}            
        </ul><br/>
        </div>
        <br/>

    </div>
    </div>
    </React.Fragment>
	);
}
