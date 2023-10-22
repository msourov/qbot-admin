import axios from "./api/axios";
import history from "../history";
import { message } from "antd";

// const config = {
//     headers: {
//       "content-type": "application/json",

//       Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
//     },}

export const getCategoriesList = async () => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },
  };
  // console.log(values.username)
  try {
    const response = await axios.get(`categories/all`, config);

    if (response.status === 200) {
      //  return response.json();
      // console.log(response);
      return response.data;
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
  } catch (error) {
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
export const getCategoriesListUser = async () => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },
  };
  // console.log(values.username)
  try {
    const response = await axios.get(`categories/all/2`, config);

    if (response.status === 200) {
      //  return response.json();
      // console.log(response);
      return response.data;
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
  } catch (error) {
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
export const getCategoriesListseq = async () => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },
  };
  // console.log(values.username)
  try {
    const response = await axios.get(`categories/all/list`, config);

    if (response.status === 200) {
      //  return response.json();
      // console.log(response);
      return response.data;
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
  } catch (error) {
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

export const CategoriesStatusUpdate = async (name, status) => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },
  };
  try {
    const response = await axios.patch(
      `categories/edit-status/${name}`,
      {
        status: status,
      },
      config
    );
    console.log(name);
    if (response.status === 201) {
      //  return response.json();
      console.log(response);
      message.success(response.data.message);

      return response.status;
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
  } catch (error) {
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

export const CategoriesDelete = async (name) => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },
  };

  try {
    const response = await axios.delete(`categories/delete/${name}`, config);

    if (response.status === 201) {
      //  return response.json();
      // console.log(response);
      // return response.data
      message.success("Delete Categories Succesfully");
      // await getImageList();
      return response.status;
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
  } catch (error) {
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

export const CategoriesCreate = async (data) => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },
  };
  // const data = new FormData();
  // data.append("upload_file",upload_file)

  try {
    const response = await axios.post(
      `categories/create`,
      {
        name: data?.name,
        categories_type: data?.categories_type,
        value: data?.value,
        sequence: data?.sequence,
        status: data?.status,
      },
      config
    );
    // console.log(response)

    if (response.status === 201) {
      //  return response.json();
      // console.log(response);
      // return response.data
      message.success(" Dekstop Option Create Succesfully");
      // await getImageList();
      return response.status;
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
  } catch (error) {
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

export const EditCategories = async (oldname, create) => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },
  };
  // const data = new FormData();
  // data.append("upload_file",upload_file)

  // let data = new FormData();
  // console.log(docimg + ' ' + 'this is image pathname')
  // data.append('upload_file', docimg);
  // console.log(docimg)

  try {
    const response = await axios.patch(
      `categories/edit/${oldname}`,
      {
        name: create.name,
        value: create.value,
        sequence: create.sequence,
        categories_type: create.categories_type,
      },
      config
    );
    // console.log(response)

    if (response.status === 201) {
      //  return response.json();
      // console.log(response);
      // return response.data
      message.success(response.data.message);
      // await getImageList();
      return response.status;
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
  } catch (error) {
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
export const EditSequence = async (data) => {
  const config = {
    headers: {
      "content-type": "application/json",

      Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
    },
  };
  // const data = new FormData();
  // data.append("upload_file",upload_file)

  // let data = new FormData();
  // console.log(docimg + ' ' + 'this is image pathname')
  // data.append('upload_file', docimg);
  console.log("updated data: ", data);

  const boobs = [];

  for (let i = 0; i < data.length; i++) {
    boobs.push({
      id: parseInt(data[i].p_id),
      sequence: i + 1,
    });
  }

  console.log(boobs);

  try {
    const response = await axios.patch(
      `categories/sequence/edit`,
      { data: boobs },
      config
    );
    // console.log(response)

    if (response.status === 201) {
      //  return response.json();
      // console.log(response);
      // return response.data
      message.success(response.data.message);
      // await getImageList();
      return response.status;
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
  } catch (error) {
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
