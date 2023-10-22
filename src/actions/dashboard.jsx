import axios from "./api/axios";
import history from "../history";
import { message } from "antd";

// const config = {
//     headers: {
//       "content-type": "application/json",

//       Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
//     },}



export  const getTodayToken = async () => {
    const config = {
        headers: {
          "content-type": "application/json",
    
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },}
    // console.log(values.username)
    try {
        const response = await axios.get(`dashboard/total/show/today`, config);

          if (response.status === 200) {
            //  return response.json();
            // console.log(response);
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
export  const getWeekToken = async () => {
    const config = {
        headers: {
          "content-type": "application/json",
    
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },}
    // console.log(values.username)
    try {
        const response = await axios.get(`dashboard/total/show/weeks`, config);

          if (response.status === 200) {
            //  return response.json();
            // console.log(response);
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
export  const getallToken = async () => {
    const config = {
        headers: {
          "content-type": "application/json",
    
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },}
    // console.log(values.username)
    try {
        const response = await axios.get(`dashboard/total/show`, config);

          if (response.status === 200) {
            //  return response.json();
            // console.log(response);
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