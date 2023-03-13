function MoviesApi() {
  return fetch('https://api.nomoreparties.co/beatfilm-movies', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    throw new Error(res.status);
  });
  // .then((data) => { // TEST
  //   console.log(data); // TEST
  // }); // TEST
}

export default MoviesApi;
