import axios from "axios";

export async function fetchImage(url: string) {
    try {
        const response = await axios.get(
            `https://get-link-thumbnail.onrender.com/image?link=${url}`
        );

        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}
