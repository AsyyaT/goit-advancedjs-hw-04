export function renderImages(images) {
    const gallery = document.querySelector('.gallery');
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li><a href="${largeImageURL}" class="gallery-item" data-lightbox="image">
            <div class="image-container"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></div>
            <div class="card-description">
                <p class="info"><span>Likes</span> ${likes}</p>
                <p class="info"><span>Views</span> ${views}</p>
                <p class="info"><span>Comments</span> ${comments}</p>
                <p class="info"><span>Downloads</span> ${downloads}</p>
            </div>
        </a></li>
    `).join('');

    gallery.insertAdjacentHTML('beforeend', `<ul class="gallery-list">${markup}</ul>`)
}

export const showLoadMoreButton = () => {
  const loadMoreBtn = document.querySelector('.load-more');
  loadMoreBtn.classList.remove('hidden');
};

export const hideLoadMoreButton = () => {
  const loadMoreBtn = document.querySelector('.load-more');
  loadMoreBtn.classList.add('hidden');
};

export const clearGallery = () => {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
};

export const renderError = () => {
  gallery.innerHTML = '';
};