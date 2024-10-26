const gallery = document.querySelector('.gallery');

const createImageCard = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => `
<li>
  <a href="${largeImageURL}">
    <div class="image-container">
      <img class="image-preview" src="${webformatURL}" alt="${tags}" />
    </div>
    <div class="card-description">
      <span class="attribute"><span>Likes</span> ${likes}</span>
      <span class="attribute"><span>Views</span> ${views}</span>
      <span class="attribute"><span>Comments</span> ${comments}</span>
      <span class="attribute"><span>Downloads</span> ${downloads}</span>
    </div>
  </a>
</li>
  `;

export const renderImages = images => {
  const cards = images.map(createImageCard).join('');

  gallery.innerHTML = `<ul class="gallery-list">${cards}</ul>`;
};

export const addImages = images => {
  const cards = images.map(createImageCard).join('');
  const galleryList = document.querySelector('.gallery-list');

  galleryList.insertAdjacentHTML('beforeend', cards);
};

export const showLoadMoreButton = () => {
  const loadMoreBtn = document.querySelector('.load-more');
  loadMoreBtn.classList.remove('hidden');
};

export const hideLoadMoreButton = () => {
  const loadMoreBtn = document.querySelector('.load-more');
  loadMoreBtn.classList.add('hidden');
};

export const clearGallery = () => {
  gallery.innerHTML = '';
};
