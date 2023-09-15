import axios from "axios";
import { baseUrl } from "../baseUrl";
import { Resource } from "../interface/Resource";

export async function fetchFavourites(id: number): Promise<Resource[]> {
    const response = await axios.get(baseUrl + `/favourites/${id}`);

    console.log(response.data);

    return response.data;
}
