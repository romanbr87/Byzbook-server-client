import React from 'react';
import axios, {isCancel, AxiosError} from 'axios';
const context = React.createContext();

export const serverURL = (url) => `http://localhost:8080${url}`;
export const Provider = context.Provider;
export const Consumer = context.Consumer;
export const divideArray = (n, array) =>
array.reduce((arr, curr, i) => {
    if (i % n === 0) arr.push ([]);
    arr[arr.length - 1].push (curr);
    return arr;
}, [])

export const getCities = (setCities) => {
    var url="https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=2500"
    fetch(url)
        .then(response => response.json())
        .then(data => {
            //data = data.result.records;
            //console.log (data.result.records);
            /*var napas = data.result.records.map (e => {
                var napa = String(e["שם_נפה"]).trim();
                return napa;
            })

            napas = napas.reduce ((a,b) => {
                if (!a.includes(b)) a.push (b);
                return a;
            }, [])

            //console.log (napas);*/
            
            var addedCities = data.result.records.map (e => {
                var city = String(e["שם_ישוב"]).trim();
                //if (city.includes(["שבט","יישוב"]))
                if (city==="נצרת עילית") city="נוף הגליל"
                return city.replace(")", "QW").replace("(", ")").replace("QW", "(");
                
            });
            addedCities = addedCities.sort((a, b) => a.localeCompare(b))
            addedCities = addedCities.filter (e => e !== "לא רשום")
            if (setCities !== null) setCities (addedCities);
        },
        (currError) => {
            console.log (currError);
        });
}

export const fetchData = async (url, method='POST', data = null) => {
    /*const urls = ['/contact']
    if (urls.some(currUrl => currUrl.toLowerCase() === url.toLowerCase())) {
        return Promise.resolve(true);
    }*/

    let requestOptions = {
        method: method,
        headers: {'Content-Type': 'application/json'},
    }
    
    if (data !== null) requestOptions.body = JSON.stringify (data);
    const response = await fetch(`http://localhost:8080${url}`, requestOptions)
    const result = response.json();
    return result
}

export const getPost = async (url) => {
    var req = axios.post (`http://localhost:8080${url}`, {
        headers: {'Content-Type': 'application/json'},
    }).then (d => d).catch (err => err.response);
    
    //req*/
    //var req = await fetchData (url)
    console.log ("Req:")
    console.log (req);

    return req;
    
}
