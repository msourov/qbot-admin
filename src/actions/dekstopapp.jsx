import axios from "./api/axios";
import history from "../history";
import { message } from "antd";

// const config = {
//     headers: {
//       "content-type": "application/json",

//       Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
//     },}



export  const getLogo = async () => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },}
    // console.log(values.username)
    try {
        const response = await axios.get(`dekstop/logo/show`, config);

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
export  const LogoStatusUpdate = async (name,status) => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },}
   
    try {
        const response = await axios.patch(`dekstop/logo/edit-status`,{
            name: name,
            status: status,
          }, config);

          if (response.status === 201) {
            //  return response.json();
            console.log(response);
            message.success("Logo status Update Succesfully");
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


export  const LogoDelete = async (values) => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },}
    
    try {
        const response = await axios.delete(`dekstop/logo/delete/${values}`,
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
 

export  const UploadLogosp = async (docimg  ) => {
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
    
        const response = await axios.post(`dekstop/logo/uploadfile`,data,
        {headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    
          
        },});
        // console.log(response)
        

          if (response.status === 201) {
            //  return response.json();
            // console.log(response);
            // return response.data
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

export  const getName = async () => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },}
    // console.log(values.username)
    try {
        const response = await axios.get(`dekstop/name/show`, config);

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
export  const NameStatusUpdate = async (name,status) => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },}
    try {
        const response = await axios.patch(`dekstop/name/edit-status`,{
            name: name,
            status: status,
          }, config);

          if (response.status === 201) {
            //  return response.json();
            console.log(response);
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

export  const NameDelete = async (values) => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },}
    
    try {
        const response = await axios.delete(`dekstop/name/delete/${values}`,
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
 

export  const NameCreate = async (create ) => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },}
    // const data = new FormData();
    // data.append("upload_file",upload_file)
    
    // let data = new FormData();
    // console.log(docimg + ' ' + 'this is image pathname')
    // data.append('upload_file', docimg);
    // console.log(docimg)
    
    try {
    
        const response = await axios.post(`dekstop/name/create`,{name:create.name},
        config);
        // console.log(response)
        

          if (response.status === 201) {
            //  return response.json();
            // console.log(response);
            // return response.data
            message.success(" Company Name Create Succesfully");
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
export  const EditName = async (create ) => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },}
    // const data = new FormData();
    // data.append("upload_file",upload_file)
    
    // let data = new FormData();
    // console.log(docimg + ' ' + 'this is image pathname')
    // data.append('upload_file', docimg);
    // console.log(docimg)
    
    try {
    
        const response = await axios.patch(`dekstop/name/edit-name`,{name:create.name},
        config);
        // console.log(response)
        

          if (response.status === 201) {
            //  return response.json();
            // console.log(response);
            // return response.data
            message.success(" Company Name Create Succesfully");
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

export  const EditDekstopName = async (oldname,create ) => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },}
    // const data = new FormData();
    // data.append("upload_file",upload_file)
    
    // let data = new FormData();
    // console.log(docimg + ' ' + 'this is image pathname')
    // data.append('upload_file', docimg);
    // console.log(docimg)
    
    try {
    
        const response = await axios.patch(`dekstop/edit-name/${oldname}`,{name:create.name},
        config);
        // console.log(response)
        

          if (response.status === 201) {
            //  return response.json();
            // console.log(response);
            // return response.data
            message.success(response.data.message);
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

  export  const getDekstopList = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
  
        Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
      },}
    try {
        const response = await axios.get(`dekstop/all`, config);

          if (response.status === 200) {
            //  return response.json();
            console.log(response.data);
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
export  const DekstopStatusUpdate = async (name,status) => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },}
    try {
        const response = await axios.patch(`dekstop/edit-status/${name}`,{
            
            status: status,
          }, config);

          if (response.status === 201) {
            //  return response.json();
            // console.log(response);
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


export  const DekstopOptionDelete = async (values) => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },}
    
    try {
        const response = await axios.delete(`dekstop/delete/${values}`,
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
 

export  const DekstopOptionCreate = async (data  ) => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },}
    // const data = new FormData();
    // data.append("upload_file",upload_file)
    
    
    try {
    
        const response = await axios.post(`dekstop/create`,{name:data?.name,categories:data?.categories,value:data?.value},
        config);
        // console.log(response)
        

          if (response.status === 201) {
            //  return response.json();
            // console.log(response);
            // return response.data
            message.success(" Dekstop Option Create Succesfully");
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