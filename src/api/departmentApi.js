import axios from "./axios";

export const getalldepartment=()=>{
    return axios.get("/department/getalldepartments");
};

export const adddepartment=(data)=>{
    return axios.post("/department/add",data);
};

export const updatedepartment=(id,data)=>{
    return axios.put(`/department/${id}`,data);
};

export const deletedepartment=(id,data)=>{
    return axios.delete(`/department/${id}`,data);
};


