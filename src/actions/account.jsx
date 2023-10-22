import axios from "./api/axios";
import history from "../history";
import { message } from "antd";

export  const getUsers = async (values) => {
    // console.log(values.username)
    try {
        const response = await axios.post(`user/login`, {
            username: values.username,
            password: values.password,
          });

          if (response.status === 200) {
            //  return response.json();
            // console.log(response);
            message.success("Login Successfully");
            window.localStorage.setItem("authtoken", response.data.access);
            window.localStorage.setItem(
              "authtokentype",
              response.data.token_type
            );
            window.localStorage.setItem(
              "countername",
              response.data.counter_name
            );
            window.localStorage.setItem(
              "counterno",
              response.data.counter_no
            );
            window.localStorage.setItem(
              "countertype",
              response.data.counter_categories
            );
            window.localStorage.setItem("active", response.data.is_active);
            window.localStorage.setItem("staff", response.data.is_staff);
            window.localStorage.setItem("username", response.data.username);
            
  
            
              response.data.is_staff===true && response.data.is_active===true ? (
                
                history.push("/dashboard")
              ) : response.data.is_staff===false && response.data.is_active===true ? (
                history.push("/user-dashboard")
              ):<h1>Not Active</h1>
            
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