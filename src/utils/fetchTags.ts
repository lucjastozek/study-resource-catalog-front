import axios from "axios";
import { baseUrl } from "../baseUrl";
import { TagI } from "../interface/Tag";

export async function fetchTags(): Promise<TagI[]> {
    try {
        const response = await axios.get(baseUrl + `/tags`);

        return response.data;
    } catch (error) {
        return [];
    }
}
