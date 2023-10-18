import axios from "axios";
import { Post } from "../models/Post";

export const getPosts = () => {
  return axios.get<Post[]>(`${import.meta.env.VITE_API_BASE_URL}/posts`);
};

export const addPost = (data: Post) => {
  return axios.post(`${import.meta.env.VITE_API_BASE_URL}/posts`, data);
};