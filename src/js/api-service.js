import axios from 'axios';
import { BASE_URL, PERSONAL_KEY, SEARCH_PARAMS } from './constants';

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;
    }
    
    async fetchImages() {
        const url = `${BASE_URL}/?key=${PERSONAL_KEY}&q=${this.searchQuery}&${SEARCH_PARAMS}&page=${this.page}&per_page=${this.per_page}`;
        const response = await axios.get(url);
        return response.data;
    }

    incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
  
}