import axios from "axios";
import { baseUrl } from "../baseUrl";
import { TagI } from "../interface/Tag";

export async function fetchTags(id: number): Promise<TagI[]> {
    const response = await axios.get(baseUrl + `/tags/${id}`);

    return response.data;
}
