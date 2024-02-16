
// const apiKey = 'd9dcb351';
// const trackName = 'Press+Record'; // Укажите название трека для поиска
// const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${apiKey}&format=jsonpretty&limit=5&order=relevance&namesearch=${trackName}`;



// fetch(url)
//   .then(response => response.json()) // Преобразуем ответ в формат JSON
//   .then(data => {
//     return data.results
//   })
//   .then(data => {
//     console.log(data.reduce((el, item) => {
//       el.push(item.name)
//       return el
//     },[]));
// })
//   .catch(error => console.error('Ошибка при запросе к Jamendo API:', error));
const apiKey = 'd9dcb351'; // Замените на ваш API ключ
const tags = 'rock,electronic'; // Замените на интересующие вас теги
const url = `https://api.jamendo.com/v3.0/artists/?client_id=${apiKey}&format=jsonpretty&limit=100&offset=48000`;

fetch(url)
  .then(response => response.json())
  .then(data => {
  return data.results
   
  })
.then(data => {
  console.log(data.reduce((el, item) => {
    el.push(item.name)
    return el
  },[]));
  })
  .catch(error => console.error('Ошибка при запросе:', error));