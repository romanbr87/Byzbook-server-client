import React, { useState, useEffect, } from "react";

import "../styles/react-tags.css";

export default function TagsInput(props) {
	const [txt, setTxt] = useState("");
	const { maxLength, maxTags, tags, setTags } = props;
  
	const onKeyChangeSelVal = (e) => {
		var key = e.key;
		var newTags = [...tags];	
		e.preventDefault();
		e.stopPropagation();

		if (key==="Backspace" && tags.length > 0 && txt === '') {
			newTags.pop ();
			setTags (newTags) 			
		}

		if (key === "Enter" && txt.trim() !== "") {
			var exists = tags.some (val => val == txt);
			if (exists) {
			alert ("התגית כבר קיימת");
			return;
			}

			newTags.push(txt);
			setTxt("");
			setTags(newTags);
		}
  
	};
  
	const handleChange = (e) => {
		e.preventDefault();
		const value = e.target.value;
		if (value.length < maxLength) setTxt(e.target.value);
	};
  
	const removeTag = (e, i) => {
	  e.preventDefault();
	  var newTags = JSON.parse(JSON.stringify(tags)).filter((item, j) => i !== j);
	  console.log(newTags);
	  setTags(newTags);
	};
  
	useEffect(() => {
	  //console.log(tags);
	}, [tags]);
  
	return (
	  <div className="react-tagsinput">
		  {tags?.map((e, i) =>
			e == null ? "" :
			<React.Fragment key={"i" + i}>
				<mark className="react-tagsinput-tag"> {e}
				<span className="react-tagsinput-remove" onClick={(e) => removeTag(e, i)}></span>
				</mark>
			</React.Fragment>
		  )}
		{tags?.length < maxTags ? 
		  <input type="text" className="react-tagsinput-input" placeholder="הוספת תגית"
			value={txt} onKeyUp={onKeyChangeSelVal} onChange={handleChange} /> : ''
		}
	  </div>
	);
  }
  