import './sass/main.scss';
import Notiflix from 'notiflix';
import { getRefs } from './js/refs';
import { NOTIFICATION_FAILURE, NOTIFICATION_END } from './js/constants';
import NewsApiService from './js/api-service';
import imgCardTemplate from './templates/img-card.hbs';


const refs = getRefs();
const API = new NewsApiService();

refs.loadBtn.setAttribute('hidden', true);

refs.searchForm.addEventListener('submit', searchHandler);
refs.loadBtn.addEventListener('click', fetchImages);


function searchHandler(event) {
  event.preventDefault();
  clearImgGallery();   
  API.searchQuery = refs.input.value;

  if (API.searchQuery.trim() === '') {
    return;
  }
    API.resetPage();     
    fetchImages();   
}

async function fetchImages() {
    try {
       const result = await API.fetchImages();
       const { hits, totalHits } = result;
        if (hits.length === 0) {
            refs.loadBtn.setAttribute('hidden', true);
            Notiflix.Notify.failure(NOTIFICATION_FAILURE);
            return;
    }
        if (hits.length > 0 && API.page === 1) {
          Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
        }
       if (totalHits < (API.page*API.per_page)) {
         Notiflix.Notify.info(NOTIFICATION_END);
         refs.loadBtn.setAttribute('hidden', true);
        } 
    
    renderImgCard(hits);
  }
    catch (error) {
       console.log(error);
   } 
}

function renderImgCard(hits) {
    refs.imgGallery.insertAdjacentHTML('beforeend', imgCardTemplate(hits));  
    API.incrementPage();
    refs.loadBtn.removeAttribute('hidden');
}

function clearImgGallery() {
  refs.imgGallery.innerHTML = '';
}



