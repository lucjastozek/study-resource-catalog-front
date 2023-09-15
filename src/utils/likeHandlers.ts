import axios from "axios";
import { fetchResources } from "./fetchResources";
import { baseUrl } from "../baseUrl";
import { Resource } from "../interface/Resource";

export const handleLike = async (
    id: number,
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>
) => {
    await axios.put(`${baseUrl}/resources/${id}`, { action: "like" });
    fetchResources().then((res) => setResources(res));
};

export const handleDislike = async (
    id: number,
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>
) => {
    await axios.put(`${baseUrl}/resources/${id}`, { action: "dislike" });
    fetchResources().then((res) => setResources(res));
};
