import axios from "axios"
import { Article } from "../types";

const API_KEY = 'cnfjdC1gCcJnhNOHxlGKG2aPnfNs9AT1lgEEJ-Ri_Jg';
const BASE_URL = 'https://api.unsplash.com/search/photos';

interface FetchPhotosResponse {
  results: Article[];
  total: number;
  total_pages: number;
}

export const fetchPhotos = async (query: string, page = 1, perPage = 12): Promise<Article[]> => {
    const response = await axios.get<FetchPhotosResponse>( BASE_URL, {
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

