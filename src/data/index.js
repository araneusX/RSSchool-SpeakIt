export const getTranslate = (word) => new Promise((resolve) => {
  fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200424T234902Z.8d014bf73bf57d47.f9e7b25f34ed56ebfa19624ddee02238e63d3865&text=${word}&lang=en-ru`)
    .then((res) => {
      res.json()
        .then((json) => {
          resolve(json.text[0]);
        })
    })
    .catch(() => {
      resolve('Перевод временно не доступен.')
    })
});

export const getList = (level, page) => new Promise((resolve) => {
    const set = Math.floor(page / 2);
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${set}&group=${level}`;
    fetch(url)
      .then((res) => {
        res.json()
          .then((json) => {
            const list = page % 2 ? json.slice(0, 10) : json.slice(-10);
            const result = list.map((item) => {
              const word = {
                word: item.word,
                audio: item.audio.slice(6),
                image: item.image.slice(6),
                transcription: item.transcription,
                translation: '',
              }
              getTranslate(word.word).then((res) => {
                word.translation = res;
              });
              return word;
            })
            resolve(result);
          });
      })
      .catch((err) => {
        console.log(err);
        
      })
});

// getList(1, 1)
//   .then((list) => {
//     console.log(list);

//     const img = new Image;
//     img.src = `https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${list[1].image}`;
//     console.log(img);

//     const aud = new Audio(`https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${list[1].audio}`);
//     aud.play();

//     getTranslate(list[1].word)
//       .then((translate) => {
//         console.log(translate);
//       })
//   });