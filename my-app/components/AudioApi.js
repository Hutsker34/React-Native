import fetch from 'node-fetch';
import fs from 'fs'

async function fetchAllData(initialUrl) {
    let results = []; // Массив для хранения всех данных
    let nextUrl = initialUrl; 
    let count = 0
    
    
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
  
  
    while (nextUrl) {
    
      try {
        const response = await fetch(nextUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        results = results.concat(data.results.map(item => item.name)); // Добавляем полученные данные
        nextUrl = data.headers.next; // Обновляем URL для следующего запроса
        if(count % 10 == 0){
            console.log('pause')
            await delay(1000 * count / 10);
        }
        count++
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
        break; // Прерываем цикл в случае ошибки
      }
    }
    console.log(results)
    return results; // Возвращаем все собранные данные
  }
  
  // Используем функцию
  const apiKey = 'd9dcb351'; // Замените на ваш API ключ
  // const tags = 'rock,electronic'; // Замените на интересующие вас теги
  const initialUrl = `https://api.jamendo.com/v3.0/artists/?client_id=${apiKey}&format=jsonpretty&limit=150`;
  fetchAllData(initialUrl).then((data) => {
    let json = JSON.stringify(data);
    fs.writeFile('../assets/artists.json', json, () => {});
  })

  
  
  
  
  
  