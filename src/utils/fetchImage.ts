import axios from "axios";

export async function fetchImage(url: string) {
    const response = await axios.get(
        `https://api.linkpreview.net/?key=1c6f4ce9a60e382f3f06cb9a6460653e&q=${url}`
    );

    return response.data.image;
}
