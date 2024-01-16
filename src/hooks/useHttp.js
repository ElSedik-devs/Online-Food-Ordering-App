import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url,config){
    const res=await fetch(url,config);

    const resData=await res.json();

    if(!res.ok){
        throw new Error(
            resData.message || "Something went wrong, failed to send request."
        );
    }
    return resData;
}


export default function useHttp(url,config,initialData){
    const[error,setError]= useState();
    const [data,setData]=useState(initialData);
    const [isLoading,setIsLoading]=useState(false);
    
    function clearData(){
        setData(initialData);
    }
    
    
    const sendReq=useCallback(async function sendRequest(data){
        setIsLoading(true);
        try{
            const resData = await sendHttpRequest(url,{...config,body:data});
            setData(resData);
        }catch(error){
            setError(error.message || "Something went wrong!")
        }
        setIsLoading(false);
    },[url,config]);

    useEffect(()=>{
        if(config && (config.method==='GET' || !config.method )||!config)
        sendReq()
    },[sendReq,config]);
    return{
        data,isLoading,error,sendReq,clearData
    }
}