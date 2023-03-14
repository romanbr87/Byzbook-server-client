import React, { useState, useEffect } from "react";
import "../styles/style.css";

export default function ImgsPanel (props) {
	const [didMount, setDidMount] = useState(false);
	const [imgs, setImgs] = useState ()
	const [myImg, setMyImg] = useState ([]);

	useEffect(() => {    
		if (!imgs) {
            
            var data = props.data
            data = data.sort((a, b) => a.gsx$refID.gsx$name.localeCompare(b.gsx$refID.gsx$name))
            setImgs (data);
            setDidMount(true);   
        }
		
    }, [])
  
	if (!didMount) return <div></div>
	return (
	<React.Fragment>

    <div className="row">
    <div className="col-lg-6 col-lg-offset-6">
    <div className="table-responsive">
            <table className="table table-bordered table-striped table-condensed" style={{backgroundColor: "white"}}>
            <caption><h3 className="title text-center">{imgs.length} תמונות</h3></caption>
            <thead>
                <tr>
                <th className="text-right" style={{width: "50px"}}>#</th>
                <th className="text-right" style={{width: "250px"}}>תמונה</th>
                <th className="text-right">שם</th>
                </tr>
            </thead>
            <tbody>
        
            { imgs.map((img, i) => 
                <tr  key={'m' + i}>
                <th className="text-right">{i+1}</th>
                <td>
                <div className="thumbnail" onClick={e=> setMyImg (img.gsx$logo)} data-toggle="modal" data-target="#myModal">
                <img width="100" height="300" src={img?.gsx$logo ? img.gsx$logo : './x.png'} />
                </div>
                </td>

                <td>                    
                    <a href={"/page/" + img.gsx$refID.gsx$link}>
                        {img.gsx$refID.gsx$name}
                    </a>
                </td>

                </tr>
            )}

            </tbody>
            </table>
            
            </div> 
	        </div>
    </div>

	<div className="modal fade modal-info" tabIndex="-3" role="dialog" id="myModal" aria-labelledby="gridSystemModalLabel">
		<div className="modal-dialog" role="document">
			<div className="modal-content">
			<div className="modal-header">
				<button type="button" className="close pull-left" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 className="modal-title" id="gridSystemModalLabel">תמונה</h4>
			</div>
			<div className="modal-body" style={{padding :"1%"}}>
				<div className="thumbnail">
				<img src={myImg} />
				</div>
			</div>
			<div className="modal-footer">
			</div>
			</div>
			
		</div>
	</div>
	
    </React.Fragment>
	);
}
