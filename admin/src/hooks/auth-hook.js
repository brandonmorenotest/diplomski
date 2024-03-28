import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../utils";


export const useSignin = (toast, toggle) => {
  return useMutation({
    mutationFn: async (formData) => {
      toggle();
      const { data } = await axios.post(`${API_URL}/auth/login`, formData);
      localStorage.setItem("user", JSON.stringify(data));

      return data;
    },
    onError: (error) => {
      toggle();
      toast.error(error?.response?.data?.message ?? error.message);
    },
    onSuccess: (data) => {
      toggle();
      toast.success(data?.message);

      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    },
  });
};


export const useUpdateUser = (toast, token) => {
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.put(
        `${API_URL}/users/update-user/`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(data));

      return data;
    },
    onError: (error, data) => {
      toast.error(error?.response?.data?.message ?? error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  });
};
