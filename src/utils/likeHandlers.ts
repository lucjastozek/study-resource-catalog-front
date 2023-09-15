import axios from "axios";
import { fetchResources } from "./fetchResources";
import { baseUrl } from "../baseUrl";
import { Resource } from "../interface/Resource";
import { fetchFavourites } from "./fetchFavourites";

export const handleLike = async (
    id: number,
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>,
    setFavourites: React.Dispatch<React.SetStateAction<Resource[]>>,
    user_id: number
) => {
    await axios.put(`${baseUrl}/resources/${id}`, { action: "like" });
    fetchResources().then((res) => setResources(res));
    fetchFavourites(user_id).then((fav) => setFavourites(fav));
};

export const handleDislike = async (
    id: number,
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>,
    setFavourites: React.Dispatch<React.SetStateAction<Resource[]>>,
    user_id: number
) => {
    await axios.put(`${baseUrl}/resources/${id}`, { action: "dislike" });
    fetchResources().then((res) => setResources(res));
    fetchFavourites(user_id).then((fav) => setFavourites(fav));
};
