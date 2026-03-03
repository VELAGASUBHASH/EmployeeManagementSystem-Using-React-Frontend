import axios from "./axios";

export const getallemployees = () => {
  return axios.get("/employee/allemployees");
};
export const addemployeee=(data)=>{
  return axios.post("/employee/add",data);
};

export const updateemployee=(id,data)=>{
  return axios.put(`/employee/employee/${id}`,data);
};
export const deleteemployee=(id,data)=>{
  return axios.delete(`/employee/employee/${id}`,data);
};

