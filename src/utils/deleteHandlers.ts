import axios from "axios";

import { baseUrl } from "../baseUrl";
import { fetchResources } from "./fetchResources";
import { Resource } from "../interface/Resource";
import { fetchFavourites } from "./fetchFavourites";

export const handleDeleteResource = async (
    idToDelete: number,
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>
) => {
    console.log(`${baseUrl}/resources/${idToDelete}`);
    await axios.delete(`${baseUrl}/resources/${idToDelete}`);
    fetchResources().then((res) => setResources(res));
};

export const handleDeleteFavourites = async (
    idToDelete: number,
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>,
    setFavourites: React.Dispatch<React.SetStateAction<Resource[]>>,
    user_id: number
) => {
    await axios.delete(`${baseUrl}/favourites/${idToDelete}`);
    fetchResources().then((res) => setResources(res));
    fetchFavourites(user_id).then((fav) => setFavourites(fav));
};
