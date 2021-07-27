export const BASE_URL = 'https://pixabay.com/api';
export const PERSONAL_KEY = '22624965-297697bc75a5089bebc4e5f11';
export const SEARCH_PARAMS = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',  
});
export const NOTIFICATION_END = "We're sorry, but you've reached the end of search results.";
export const NOTIFICATION_FAILURE = 'Sorry, there are no images matching your search query. Please try again.';