import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../utils";

export const useCreatePost = (toast, token) => {
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.post(
        `${API_URL}/posts/create-post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    },

    onError: async (error) => {
      toast.error(error?.response?.data?.message ?? error.message);
    },

    onSuccess: async (data) => {
      toast.success(data?.message);

      setTimeout(() => {
        window.location.replace("/contents");
      }, 2000);
    },
  });
};

export const useAnalytics = (toast, token) => {
  return useMutation({
    mutationFn: async (val) => {
      const { data } = await axios.post(
        `${API_URL}/posts/admin-analytics?query=${val}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(data);
      return data;
    },
    onError: (error) => {
      const errMsg = error?.response?.data?.message;
      toast.error(errMsg ?? error.message);
      if (errMsg === "Authentication failed") {
        localStorage.removeItem("user");
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
  });
};

export const useContent = (toast, token) => {
  return useMutation({
    mutationFn: async (page) => {
      const { data } = await axios.post(
        `${API_URL}/posts/admin-content?page=${page}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    },
    onError: (error) => {
      const errMsg = error?.response?.data?.message;
      toast.error(errMsg ?? error.message);
      if (errMsg === "Authentication failed") {
        localStorage.removeItem("user");
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
  });
};

export const useDeletePost = (toast, token) => {
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.delete(`${API_URL}/posts/` + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
  });
};

export const useAction = (toast, token) => {
  return useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await axios.patch(
        `${API_URL}/posts/update-status/${id}`,
        { status: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
  });
};

export const useUpdatePost = (toast, token) => {
  return useMutation({
    mutationFn: async ({ id, desc, title, cat, img }) => {
      console.log(token);
      const { data } = await axios.patch(
        `${API_URL}/posts/update/${id}`,
        { desc, title, cat, img },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);

      window.location.reload();
    },
  });
};

export const usePost = (toast, token) => {
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.post(`${API_URL}/posts/` + id, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? error.message);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
  });
};

export const useComments = () => {
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.get(`${API_URL}/posts/comments/` + id);

      return data;
    },
  });
};

export const useGetPost = () => {
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.get(`${API_URL}/posts/` + id);

      return data?.data;
    },
  });
};

export const useDeleteComment = (token) => {
  return useMutation({
    mutationFn: async ({ id, postId }) => {
      const { data } = await axios.delete(
        `${API_URL}/posts/comment/${id}/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    },
  });
};
