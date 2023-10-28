const fs = require('fs');
const path = require('path');

const musicFolderPath = path.join(__dirname, 'assets', 'music');
const outputFilePath = path.join(__dirname, 'assets', 'music', 'music.json');

fs.readdir(musicFolderPath, (err, files) => {
  if (err) {
    console.error('Could not list the directory.', err);
    process.exit(1);
  }

  const musicFiles = files.filter(file => file.endsWith('.mp3'));
  const jsonData = JSON.stringify({ files: musicFiles }, null, 2);

  fs.writeFile(outputFilePath, jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Could not write the JSON file.', err);
      process.exit(1);
    }

    console.log('musicFiles.json has been updated!');
  });
});