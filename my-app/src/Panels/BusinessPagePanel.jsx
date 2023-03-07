import React, { useMemo } from 'react';
import {Consumer} from '../ContextAPI'
import SiteBtnPanel from '../Element/SiteBtnPanel';

import '../styles/App.css';
import '../styles/style.css';
import '../styles/bootstrap-social.css'


export default function BusinessPagePanel ({data: {gsx$link, gsx$name, gsx$logo="https://res.cloudinary.com/byzbook/image/upload/v1673717520/X.jpg", gsx$logoheight, 
gsx$address, gsx$city, gsx$phone, gsx$whatsapp, gsx$email, gsx$facebook, gsx$instagram, gsx$website, gsx$comment
, gsx$worktime, gsx$desc},  isLinkable, ...props}) {

    
    
    const fullAddress = useMemo(()=> (!gsx$address) ? gsx$city : `${gsx$address}, ${gsx$city}`, [gsx$address, gsx$city]);
    const googleMapsAddress = useMemo (() => 'http://maps.google.com/maps?q=' + encodeURIComponent(fullAddress.trim().replace(/\r?\n/, ',').replace(/\s+/g, ' ')), [fullAddress])
    const businessEmail = useMemo (()=> (!gsx$email ? 'javascript:void(0)' : "mailto:" + gsx$email), [gsx$email])

    //------------------------------------------------------------------------        
    /*const setBg = () => {
        return "#" + Math.floor(Math.random()*16777215).toString(16);
    }*/


    return (
        <div {...props}>
            <div className="panel-info" style={{backgroundColor: 'white'}}>
                <div className="panel-heading">
                    {
                        (isLinkable) ? 
                        <a href={"/page/" + gsx$link} ><h1 className="caption panel-title title text-center">
                            {gsx$name}</h1>
                        </a>:
                        <h1 className="caption title panel-title text-center">{gsx$name}</h1>
                    }

                </div>
                <div className="panel-body">
                    <div className="has-success has-feedback img-thumbnail center-block" style={{ 
                    maxHeight: "500px", margin: "-4% 0 1.5% 0", padding: "0", width: "100%"}}>
                        <img className="center-block" src={ gsx$logo } 
                        style={{height: gsx$logoheight + "px", 
                        margin: "0", padding: "0", width: "100%"}}/>
                    </div>
                    
                    <h4>קצת על העסק</h4>
                    <p className="text caption" style={{maxHeight: "100px", margin: "0", padding: "0"}}>{gsx$desc}</p>
                    <br/>
                    <SiteBtnPanel gsx$whatsapp={gsx$whatsapp} gsx$facebook={gsx$facebook} gsx$website={gsx$website} 
                    gsx$instagram={gsx$instagram}/>
                    <div className="properties" style={{ minHeight:'40px'}}>                     
                        { gsx$comment &&
                        <React.Fragment>
                        <hr />
                        <a title="הערות" className="linkWinthoutUnderline" href={'javascript:void(0)'}>
                        <span style={{direction: "ltr"}}>{ gsx$comment }</span><i className="fa fa-fw fa fa-comment"></i>
                        </a>
                        </React.Fragment>
                        }
                        {
                            [0, 1, 2].map(val =>
                            (!gsx$phone[val] ? '' :
                            <React.Fragment key={"tel"+val}>
                            <hr />
                            <a title={"טלפון"+(val+1)} href={gsx$phone[val] == null ? 'javascript:void(0)' : "tel:" + gsx$phone[val].split(' ')[0]}>
                            <span>{(gsx$phone[val] == undefined) ? '' : gsx$phone[val]}</span><i className="fa fa-fw fa-phone"></i></a>
                            </React.Fragment>
                            ))
                        }
                        <hr />
                        <a title="כתובת" href={googleMapsAddress}><span>{ fullAddress }</span><i className="fa fa-fw fa-map-marker"></i></a>
                        { (gsx$email) &&
                        <React.Fragment>
                        <hr />
                        <a title="אימייל" href={businessEmail}>
                        <span>{gsx$email == '' ? '' : gsx$email}</span><i className="fa fa-fw fa-envelope-o"></i>
                        </a>
                        </React.Fragment>
                        }
                        
                        {
                            [0, 1, 2].map(val => 
                            (!gsx$worktime[val] ? '' :
                            <React.Fragment key={"worktime"+val}>
                            <hr />
                            <a title="שעות עבודה" className="linkWinthoutUnderline" href='javascript:void(0)'>
                            <span>{gsx$worktime[val]}</span><i className="fa fa-fw fa-clock-o"></i>
                            </a>
                            </React.Fragment>
                            ))
                        }
                        <hr/>
                        
                        <Consumer>
                            { (value) =>
                            <button type="button" className="center-block btn btn-danger" data-toggle="modal" data-target="#myModal"
                            onClick={e => value(e)} style={{marginTop: "4%", marginBottom: '0%'}}>דיווח</button>   
                            }
                        </Consumer>
                    </div>
                </div>
            </div>
        </div>
    )
}
