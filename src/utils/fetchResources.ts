import axios from "axios";
import { Resource } from "../interface/Resource";
import { baseUrl } from "../baseUrl";

export async function fetchResources(): Promise<Resource[]> {
    const response = await axios.get(baseUrl + "/resources");
    return response.data;
}
