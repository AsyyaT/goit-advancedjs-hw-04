import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getPhotos, incrementPage } from './js/pixabay-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderImages, clearGallery, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';


const simpleGallery = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0.8,
  captions: true,
  captionDelay: 250,
  captionPosition: 'bottom',
  captionType: 'attr',
  captionsData: 'alt',
});

let currPage = 1;
let query = '';

const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('#loader');

const submitHandler = async e => {
  e.preventDefault();

  const form = e.target;
  const sumbittedQuery = form.elements.query.value.trim();

  if (!sumbittedQuery) {
    return;
  } else if (query === sumbittedQuery) {
    incrementPage();
  } else {
    query = sumbittedQuery;
    currPage = 1;
  }

    form.reset();
    loader.classList.remove('hidden');

  try {
    const { data } = await getPhotos(query, currPage);

    if (data.total === 0) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    } else {
      renderImages(data.hits);
    }

    if (data.totalHits <= 15 * currPage) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }

    simpleGallery.refresh();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
    });
    clearGallery();
  }

  loader.classList.add('hidden');
};

searchForm.addEventListener('submit', submitHandler);

const loadMoreHandler = async () => {
  currPage += 1;
  hideLoadMoreButton();
  loader.classList.remove('hidden');

  try {
    const { data } = await getPhotos(query, currPage);

    renderImages(data.hits);
    if (data.totalHits <= 15 * currPage) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
    const card = document.querySelector('.gallery-list a');
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      left: 0,
      behavior: 'smooth',
    });
    simpleGallery.refresh();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
    });
    clearGallery();
  }

  loader.classList.add('hidden');
};

loadMoreBtn.addEventListener('click', loadMoreHandler);