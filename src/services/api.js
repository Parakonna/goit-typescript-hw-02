import axios from "axios"

const API_KEY = 'cnfjdC1gCcJnhNOHxlGKG2aPnfNs9AT1lgEEJ-Ri_Jg';
const BASE_URL = 'https://api.unsplash.com/search/photos';

export const fetchPhotos = async (query, page = 1, perPage = 12) => {
    const response = await axios.get( BASE_URL, {
        params: {
           query,
            page,
            per_page: perPage,
            client_id: API_KEY,
      }
        },
    )
    return response.data.results;
}

