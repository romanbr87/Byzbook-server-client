import React, { useState, useEffect } from "react";
import {Helmet} from "react-helmet";
import TypesInputPanel from "../Element/TypesInputPanel";
import "../styles/style.css";
import { fetchData } from "../ContextAPI";

export default function TypesPanel (props) {
    const [err, setErr] = useState(null)
    const [types, setTypes] = useState();
    const [editable, setEditable] = useState (false);
    const [newVal, setNewVal] = useState('');

    /*const submitChange = (val, index) => {
        var arr = [...types];
        arr[index].gsx$type = val;
        setTypes (arr);
    }*/

    /*const addNewVal = () => {
        //let arr = [...types, { "__v": "0", "_id": "asdasddvssvffdfgdf", gsx$type: newVal}]
        let arr = JSON.parse(JSON.stringify(types));
        arr.push ({ "__v": "0", "_id": "asdasddvssvffdfgdf", gsx$type: newVal});

        //let arr1 = arr.sort((a, b) => Math.sign(a.gsx$type.localeCompare(b.gsx$type)));
        //arr1 = arr1.sort((a, b) => new Intl.Collator('heb').compare(a.gsx$type, b.gsx$type));
        let arr2 = arr.map (e => e.gsx$type).join('\n');
        console.log (arr);
        setTypes (arr);
        setNewVal ("")
    }

    const getTypes = () => {
        //setTypes (props.types.map (e => e.gsx$type).sort((a, b) => a.localeCompare(b)))
        //var arr = props.types.sort((a, b) => a.gsx$type.localeCompare(b.gsx$type));
        setVal (props.types);
        //console.clear();
        console.log ();
    }*/

    const changeVal = (txt) => {
        setNewVal (txt);
    }

    
    const findIndexOfTypeById = (ID) => {
        let type = types.find (e => e._id == ID);
        return types.indexOf (type);
    }

    const deleteVal = async (id) => {
      
        let index = findIndexOfTypeById (id);
        let val = types[index].gsx$type;
        let res = await fetchData('/deletetype', 'put', { data: id })
        
        if (!res) {
            alert ("לא ניתן למחוק את הערך");
            return false;
        }
        
        let arr = [...types];
        arr = arr.filter ((e, i) => i !== index); 
        setTypes(arr);
        alert ("ערך " + val + " נמחק");
        return true;
    
    }

    const updateVal = async (val, id) => {

        let index = findIndexOfTypeById (id);
        let sameVal = types.find (e => e.gsx$type === val);
        if (sameVal !== undefined) {
            alert ("הערך קיים במערכת");
            return false;
        }
       
        let res = await fetchData('/updatetype', 'put', { data: { val: val, id: id} })

        if (!res) {
            alert ("לא ניתן לעדכן את הערך");
            return false;
        }
        
        let arr = JSON.parse(JSON.stringify(types));
        arr = [...arr];
        arr[index] = res;
        setTypes(arr);
        alert ("הערך עודכן");
        return true;
    
    }

    const addNewVal = (val) => {
        if (val.trim() === '') {
            alert ("לא ניתן להוסיף ערך ריק");
            return
        }
      
        fetchData('/addnewtype', 'post', { data: val })
        .then (data => {
            setTypes([...types, data]);    
            alert ("הערך " + val + " התווסף לטבלה")
            setNewVal('');    
        })
        .catch (err => alert ("לא ניתן להוסיף ערך קיים"));
        
    }

    useEffect(() => {
        if (props.err) {
            setErr (props.err);
        }

        else if (types==undefined || types==null ) {
            setTypes (props.types);
        }
        else setTypes ([...types])
    }, [])

    if (err) return <h1>{err}</h1>
    if (types == undefined) return (<p>null</p>)

    return (
    <>
        <div className="col-lg-6 col-md-6 col-lg-offset-3 col-md-offset-3"> 
        <div className="panel panel-info">
            
            <div className="panel-heading">
                <h4 className="title text-center">מסך עריכת סוגי עסקים</h4>
            </div>

            <div className="panel-body">
            {
                types.sort((a, b) => Math.sign(a.gsx$type.localeCompare(b.gsx$type)))                  
                .map ((e, i) => {                       
                return <TypesInputPanel key={e.gsx$type} type={e} index={i}
                updateVal={updateVal} deleteVal={deleteVal}>
                </TypesInputPanel>
                })
            }                   
            {
                (editable)?
                <div className="input-group" style={{direction: "ltr"}}>

                <div className="input-group-btn" style={{direction: "ltr"}}>
                    <button className="btn btn-default btn-sm"
                    onClick={e=> {setEditable(false); setNewVal('') }}>
                        <i className="glyphicon glyphicon-remove" style={{color: "red"}}></i>
                    </button>
                    <button className="btn btn-default btn-sm" onClick={e => addNewVal(newVal) }>
                        <i className="glyphicon glyphicon-ok" style={{color: "green"}}></i>
                    </button>
                </div>

                <input type="text" className="form-control input-sm" placeholder="הכנס ערך"
                value={newVal} onChange={e => changeVal (e.target.value)} />
                <span className="input-group-addon">ערך חדש</span>

                </div>
                :
                <button className="btn btn-primary btn-sm"
                onClick={e=>setEditable(true)}> הוספת ערך חדש</button>

            }
            </div>
            
        </div>
        </div>

    </>
    )
}