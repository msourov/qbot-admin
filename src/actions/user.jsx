import axios from "./api/axios";
import history from "../history";
import { message } from "antd";




export const getUserList = async () => {
    // console.log(values.username)
    try {

      const config = {
        headers: {
          "content-type": "application/json",
    
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },}
    

        const response = await axios.get(`user/all`, config);

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
  export  const UserCreate = async (create ) => {
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
      
          const response = await axios.post(`user/signup`,{ 
            username: create.username,
            password: create.password,
            email: create.email,
            counter_name: create.counter_name,
            counter_no: create.counter_no,
            counter_categories: create.counter_categories,
            is_staff: create.is_staff,
          
            is_active: create.is_active},
          config);
          // console.log(response)
          
  
            if (response.status === 201) {
              //  return response.json();
              // console.log(response);
              // return response.data
              message.success(" User Create Succesfully");
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
  export  const UserStatusUpdate = async (username,is_active) => {
    console.log(username,is_active,"sssss")
    const config = {
      headers: {
        "content-type": "application/json",
  
        Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
      },}
      try {
          const response = await axios.patch(`user/edit-status`,{
              username:username,
              is_active: is_active,
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
  export  const StaffStatusUpdate = async (username,is_staff) => {
    console.log(username,is_staff,"sssss")
    const config = {
      headers: {
        "content-type": "application/json",
  
        Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
      },}
      try {
          const response = await axios.patch(`user/edit-staff`,{
              username:username,
              is_staff: is_staff,
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

  export  const UpdateOwnPassword = async (values) => {
    console.log(values)
    const config = {
      headers: {
        "content-type": "application/json",
  
        Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
      },}
      try {
          const response = await axios.patch(`/user/update/own-password/${localStorage.getItem("username")}`,{
              
              old_password: values.old_password,
              password: values.password,
            }, config);
  
            if (response.status === 201) {
              //  return response.json();
              // console.log(response.data.message);
              message.success(response.data.message);
              localStorage.clear();
              history.push("/login");
              
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
  
  export  const UpdatePassword = async (name,values) => {
    console.log(name,values)
    const config = {
      headers: {
        "content-type": "application/json",
  
        Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
      },}
      try {
          const response = await axios.patch(`/user/update/password/${name}`,{
              
              password: values.password,
            }, config);
  
            if (response.status === 201) {
              //  return response.json();
              // console.log(response.data.message);
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
  

    export  const UserDelete = async (values) => {
      // console.log(values)
      const config = {
        headers: {
          "content-type": "application/json",
    
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },}
        
        try {
            const response = await axios.delete(`user/delete/${values}`,
                 config);
    
              if (response.status === 201) {
                //  return response.json();
                // console.log(response);
                // return response.data
                message.success("Delete User Succesfully");
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

      export const getUserByName = async (name) => {
        // console.log(values.username)
        try {
    
          const config = {
            headers: {
              "content-type": "application/json",
        
              Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
            },}
        
    
            const response = await axios.get(`user/${name}`, config);
    
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
      export  const EditUser = async (name,create ) => {
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
          
              const response = await axios.patch(`user/update/${name}`,{
            // username: create.username,
            email: create.email,
            counter_name: create.counter_name,
            
           
              },
              config);
              // console.log(response)
              
      
                if (response.status === 201) {
                  //  return response.json();
                  // console.log(response);
                  // return response.data
                  if(name==localStorage.getItem('username'))
                  {
                    localStorage.clear();
                  history.push("/login");
                  }
                  message.success(" Update Succesfully");
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
      export  const EditUserCategory = async (name,create ) => {
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
          
              const response = await axios.patch(`user/categories/update/${name}`,{
            
            counter_categories: create.counter_categories,
            
           
              },
              config);
              // console.log(response)
              
      
                if (response.status === 201) {
                  //  return response.json();
                  // console.log(response);
                  // return response.data
                  if(name==localStorage.getItem('username'))
                  {
                    localStorage.clear();
                  history.push("/login");
                  }
                  message.success(" Update Succesfully");
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