import axios from "./api/axios";
import history from "../history";
import { message } from "antd";

// const config = {
//     headers: {
//       "content-type": "application/json",

//       Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
//     },}



export  const getImageList = async () => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },}
    try {
        const response = await axios.get(`app/all`, config);

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
export  const ImageStatusUpdate = async (name,status) => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },}
    try {
        const response = await axios.patch(`app/image/edit-status`,{
            name: name,
            status: status,
          }, config);

          if (response.status === 201) {
            //  return response.json();
            console.log(response.data.message);
            message.success(response.data.message);
            return response.status
            
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


export  const ImageDelete = async (values) => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },}
    
    try {
        const response = await axios.delete(`app/image/delete/${values}`,
             config);

          if (response.status === 201) {
            //  return response.json();
            // console.log(response);
            // return response.data
            message.success("Delete Image Succesfully");
            // await getImageList();
            return response.status

            
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
 

export  const UploadImagesp = async (docimg  ) => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },}
    // console.log(docimg)
    // const data = new FormData();
    // data.append("upload_file",upload_file)
    
    let data = new FormData();
    // console.log(docimg + ' ' + 'this is image pathname')
    data.append('upload_file', docimg);
    // console.log(docimg)
    
    try {
    
        const response = await axios.post(`app/image/uploadfile`,data,
        {headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    
          
        },});
        // console.log(response)
        

          if (response.status === 201) {
            //  return response.json();
            // console.log(response);
            // return response.statu/s
            message.success(" Image upload Succesfully");
            // await getImageList();
            return response.status
         
      
         
           
            
            
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