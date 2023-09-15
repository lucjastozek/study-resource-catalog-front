import axios from "axios";
import { User } from "../interface/User";
import { baseUrl } from "../baseUrl";

export async function fetchUsers(): Promise<User[]> {
    const response = await axios.get(baseUrl + "/users");
    return response.data;
}
