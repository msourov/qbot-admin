import axios from "./api/axios";
import history from "../history";
import { message } from "antd";

// const config = {
//     headers: {
//       "content-type": "application/json",

//       Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
//     },}



export  const getTodayTokenList = async () => {
    const date = new Date().toISOString().slice(0, 10);

     const start_date=date+'T00:59:59.415Z'
    const end_date=date+'T23:59:59.415Z'


    console.log(start_date,end_date)
    const config = {
        headers: {
          "content-type": "application/json",
    
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },}
    // console.log(values.username)
    try {
        const response = await axios.get(`count/all/token/today?start_time=${start_date}&end_time=${end_date}`, config);

          if (response.status === 200) {
            //  return response.json();
            console.log(response);
            return response.data
            
          }
          if (response.status === 400 || response.status === 409) {
            message.error(response.data.detail);
         
            // console.log(response.data.detail);
          }
          if (response.status === 401 || response.status === 403) {
            message.error(response.data.detail);
            
            localStorage.clear();
            history.push("/login");
          }

    }catch(error){
        if (error.response.status === 400) {
            message.error(error.response.data.detail);
            // console.log(error.response.data.detail);
          }
          if (error.response.status === 401 || error.response.status === 403) {
            message.error(error.response.data.detail);
            localStorage.clear();
            history.push("/login");
          }

    }
      
  };
export  const getTodayTokenListById = async (id) => {
    // console.log(id,'token_id')
    const config = {
        headers: {
          "content-type": "application/json",
    
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },}
    // console.log(values.username)
    try {
        const response = await axios.get(`count/all/token/today/${id}`, config);

          if (response.status === 200) {
            //  return response.json();
            // console.log(response.data,'res');
            return response.data[0]
            
          }
          if (response.status === 400 || response.status === 409) {
            message.error(response.data.detail);
         
            // console.log(response.data.detail);
          }
          if (response.status === 401 || response.status === 403) {
            message.error(response.data.detail);
            
            localStorage.clear();
            history.push("/login");
          }

    }catch(error){
        if (error.response.status === 400) {
            message.error(error.response.data.detail);
            // console.log(error.response.data.detail);
          }
          if (error.response.status === 401 || error.response.status === 403) {
            message.error(error.response.data.detail);
            localStorage.clear();
            history.push("/login");
          }

    }
      
  };
export  const getPreviousTokenList = async (ds,de) => {
    

     const start_date=ds+'T00:59:59.415Z'
    const end_date=de+'T23:01:43.415Z'


    console.log(start_date,"start")
    console.log(end_date,"end")

    console.log(de,ds)
    const config = {
        headers: {
          "content-type": "application/json",
    
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },}
    // console.log(values.username)
    try {
        const response = await axios.get(`count/all/token/previous?start_time=${start_date}&end_time=${end_date}`, config);
        

          if (response.status === 200) {
            //  return response.json();
            console.log(response);
            return response.data
            
          }
          if (response.status === 400 || response.status === 409) {
            message.error(response.data.detail);
         
            // console.log(response.data.detail);
          }
          if (response.status === 401 || response.status === 403) {
            message.error(response.data.detail);
            
            localStorage.clear();
            history.push("/login");
          }

    }catch(error){
        if (error.response.status === 400) {
            message.error(error.response.data.detail);
            // console.log(error.response.data.detail);
          }
          if (error.response.status === 401 || error.response.status === 403) {
            message.error(error.response.data.detail);
            localStorage.clear();
            history.push("/login");
          }

    }
      
  };
export  const getPreviousTokenListById = async (id) => {
    console.log(id,'token_id')
    const config = {
        headers: {
          "content-type": "application/json",
    
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },}
    // console.log(values.username)
    try {
        const response = await axios.get(`count/all/token/previous/${id}`, config);

          if (response.status === 200) {
            //  return response.json();
            console.log(response.data,'res');
            return response.data[0]
            
          }
          if (response.status === 400 || response.status === 409) {
            message.error(response.data.detail);
         
            // console.log(response.data.detail);
          }
          if (response.status === 401 || response.status === 403) {
            message.error(response.data.detail);
            
            localStorage.clear();
            history.push("/login");
          }

    }catch(error){
        if (error.response.status === 400) {
            message.error(error.response.data.detail);
            // console.log(error.response.data.detail);
          }
          if (error.response.status === 401 || error.response.status === 403) {
            message.error(error.response.data.detail);
            localStorage.clear();
            history.push("/login");
          }

    }
      
  };
