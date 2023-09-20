import axios from "axios";
import { Comment } from "../interface/Comment";
import { baseUrl } from "../baseUrl";

export async function fetchComments(): Promise<Comment[]> {
    const response = await axios.get(baseUrl + "/comments");

    return response.data;
}
