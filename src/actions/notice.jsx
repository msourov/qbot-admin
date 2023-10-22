import axios from "./api/axios";
import history from "../history";
import { message } from "antd";

// const config = {
//     headers: {
//       "content-type": "application/json",

//       Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
//     },}

export  const getNoticeListUser = async () => {
  const config = {
      headers: {
        "content-type": "application/json",
  
        Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
      },}
  // console.log(values.username)
  try {
      const response = await axios.get(`notice/all/user`, config);

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

export  const getNoticeList = async () => {
    const config = {
        headers: {
          "content-type": "application/json",
    
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },}
    // console.log(values.username)
    try {
        const response = await axios.get(`notice/all`, config);

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
export  const getUserCategoriesList = async () => {
    const config = {
        headers: {
          "content-type": "application/json",
    
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },}
    // console.log(values.username)
    try {
        const response = await axios.get(`categories/all`, config);

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
export  const getUserCounterList = async (categories) => {
    const config = {
        headers: {
          "content-type": "application/json",
    
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },}
    console.log(categories)
    try {
        const response = await axios.get(`/user/all/categories/${categories}`, config);
console.log(response)
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


export  const NoticeStatusUpdate = async (name,status) => {
    const config = {
        headers: {
          "content-type": "application/json",
    
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },}
    try {
        const response = await axios.patch(`notice/edit-status/${name}`,{
            
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

export  const NoticeDelete = async (name) => {
    const config = {
        headers: {
          "content-type": "application/json",
    
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },}
    
    try {
        const response = await axios.delete(`notice/delete/${name}`,
             config);

          if (response.status === 201) {
            //  return response.json();
            // console.log(response);
            // return response.data
            message.success("Delete Display Succesfully");
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
export  const NoticeCreate = async (base,data) => {

  console.log(base,data)
    const config = {
        headers: {
          "content-type": "application/json",
    
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },}
        if(base==="all"){
           
    try {
      const response = await axios.post(`notice/create?base=${base}`,{
        value:data.value,
        status:data.status

      },
           config);

        if (response.status === 201) {
          //  return response.json();
          // console.log(response);
          // return response.data
          message.success("Notice Create Succesfully");
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

        }
   
        if(base==="select"){
           
    try {
      const response = await axios.post(`notice/create?base=${base}`,{
        value:data.value,
        categories:data.categories,
        counter_no:data.counter_no,
        status:data.status



      },
           config);

        if (response.status === 201) {
          //  return response.json();
          // console.log(response);
          // return response.data
          message.success("Notice Create Succesfully");
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

        }
   
      
  };
