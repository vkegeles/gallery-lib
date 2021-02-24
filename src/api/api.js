export async function fetchData(path, cb) {
  fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      cb(myJson);
    });
}
