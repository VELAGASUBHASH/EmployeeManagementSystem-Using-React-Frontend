import axios from "./axios";

export const getalldepartment=()=>{
    return axios.get("/department/getalldepartments");
};

export const adddepartment=(data)=>{
    return axios.post("/department/add",data);
};

export const updatedepartment = (id, data) => {
  return axios.put(`/department/department/${id}`, data);
};

export const deletedepartment = (id) => {
  return axios.delete(`/department/department/${id}`);
};


