import axios from "axios";
import { baseUrl } from "../baseUrl";

export async function fetchUserName(id: number) {
    const response = await axios.get(baseUrl + `/users/${id}`);

    return response.data[0].name;
}
