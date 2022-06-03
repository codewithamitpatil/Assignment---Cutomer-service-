import { http } from "../Utils/axios";

export const getAll = async () => {
  return await (
    await http.get("/customer")
  ).data;
};

export const Create = async (input) => {
  return await (
    await http.post("/customer", JSON.stringify(input))
  ).data;
};

export const Update = async (cid, input) => {
  return await (
    await http.put(`/customer/${cid}`, JSON.stringify(input))
  ).data;
};

export const Remove = async (cid) => {
  return await (
    await http.delete(`/customer/${cid}`)
  ).data;
};
