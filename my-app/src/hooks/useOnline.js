import {useEffect, useState} from 'react';

export const useOnline = () => { 
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect (() => {
        const setOffline = () => { setIsOnline (false) };
        const setOnline = () => { setIsOnline(true) };
        window.addEventListener('offline', setOffline);
        window.addEventListener('online', setOnline);  

        return () => {
            window.removeEventListener ('offline', setOffline);
            window.removeEventListener ('online', setOnline);
        }
    }, [])

    return isOnline;
}