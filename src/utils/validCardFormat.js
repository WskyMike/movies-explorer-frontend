function validCardFormat(movie) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    id,
    nameRU,
    nameEN,
  } = movie;

  const formatCard = {
    country: country || 'Страна неизвестна',
    director: director || 'Режисер неизвестен',
    duration: duration || 0,
    year: year || 'Год неизвестен',
    description: description || 'Описание отсутствует',
    image: `https://api.nomoreparties.co/${image.url}`,
    trailerLink,
    thumbnail:
      thumbnail || `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
    id,
    nameRU: nameRU || 'Без названия',
    nameEN: nameEN || 'Untitled',
  };

  return formatCard;
}

export default validCardFormat;
