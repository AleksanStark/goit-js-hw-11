export const fetchPosts = searchValue => {
  return fetch(
    `https://pixabay.com/api/?key=42464755-f7d199d1a91f6070a7f813e04&image_type=photo&orientation=horizontal&q=${searchValue}&safesearch=true`
  );
};
