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

export const fetchData =  async (url, method='POST', dataForServer = null) => {
    const urls = ['/contact']
    if (urls.some(currUrl => currUrl.toLowerCase() === url.toLowerCase())) {
        return Promise.resolve(true);
    }

    /*let requestOptions = {
        method: method,
        headers: {'Content-Type': 'application/json'},
    }
    
    if (data !== null) requestOptions.body = JSON.stringify (data);

    try {
        const response = await fetch(`http://localhost:8080${url}`, requestOptions)
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        return response.json();
    } 
    
    catch (err) {
        //console.error(`GET error: ${err}`);
        throw Error(`${err}`);
    }*/

    let requestOptions = {
        method: method,
        headers: {'Content-Type': 'application/json'},
    }
    
    if (dataForServer !== null) requestOptions.data = dataForServer;


    try {
        let  {data} = await (await axios(`http://localhost:8080${url}`, requestOptions))
        console.log (data);
        return data;
    } 
    
    catch (error) {
        console.log (error.response);
        const customError = new Error(error.response.data.message)
        throw customError;
    }
} 
    
        
    

export const getPost = async (url) => {
    return await fetchData (url);
}    

