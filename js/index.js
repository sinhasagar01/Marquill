let text = document.querySelector('#text');
let emojis = document.querySelector('.card-right').children;
let button = document.querySelector('.play-btn');
let engagement = document.querySelector('.engagement');
const delay = (fn, wait, ...args) => setTimeout(fn, wait, ...args);
let input = {
  document: ''
};
text.addEventListener('input', listenEvent);
function listenEvent(event) {
  event.preventDefault();
  button.firstElementChild.classList.add('loading');
  [...emojis].forEach(emoji => {
    emoji.classList.remove('anim1', 'anim2', 'anim3', 'anim4', 'anim5');
  });
  input.document = text.value;
  Algorithmia.client('simGXs4VYCCwICIS1RIwG9hzXy21')
    .algo('nlp/SentimentAnalysis/1.0.5')
    .pipe(input)
    .then(function(output) {
      let score = Number(output.result[0].sentiment.toFixed(1));
      console.log('score..', score);
      if (score === 0) {
        delay(
          () => {
            button.firstElementChild.classList.remove('loading');
            engagement.innerText = '50%';
            emojis[2].classList.add('anim1');
            [...emojis].forEach(emoji => {
              emoji.classList.remove('anim2', 'anim3', 'anim4', 'anim5');
            });
          },
          3000,
          'latter'
        );
      } else if (score >= 0.1 && score <= 0.4) {
        delay(
          () => {
            button.firstElementChild.classList.remove('loading');
            engagement.innerText = '70%';
            emojis[3].classList.add('anim2');
            [...emojis].forEach(emoji => {
              emoji.classList.remove('anim1', 'anim3', 'anim4', 'anim5');
            });
          },
          3000,
          'latter'
        );
      } else if (score >= 0.5 && score <= 1) {
        delay(
          () => {
            button.firstElementChild.classList.remove('loading');
            engagement.innerText = '80%';
            emojis[4].classList.add('anim3');
            [...emojis].forEach(emoji => {
              emoji.classList.remove('anim2', 'anim1', 'anim4', 'anim5');
            });
          },
          3000,
          'latter'
        );
      } else if (score <= -0.1 && score >= -0.4) {
        delay(
          () => {
            button.firstElementChild.classList.remove('loading');
            engagement.innerText = '15%';
            emojis[1].classList.add('anim4');
            [...emojis].forEach(emoji => {
              emoji.classList.remove('anim2', 'anim3', 'anim1', 'anim5');
            });
          },
          3000,
          'latter'
        );
      } else if (score <= -0.5 && score >= -1) {
        delay(
          () => {
            button.firstElementChild.classList.remove('loading');
            engagement.innerText = '1%';
            emojis[0].classList.add('anim5');
            [...emojis].forEach(emoji => {
              emoji.classList.remove('anim2', 'anim3', 'anim4', 'anim1');
            });
          },
          3000,
          'latter'
        );
      } else {
        [...emojis].forEach(emoji => {
          emoji.classList.remove('anim1', 'anim2', 'anim3', 'anim4', 'anim5');
        });
      }
    });
}
let texttag = document.querySelector('#text-tag');
let tagcontainer = document.querySelector('#tags-container');
let keyword = document.querySelector('#default');
texttag.addEventListener('input', listenTag);
function listenTag(event) {
  Algorithmia.client('simGXs4VYCCwICIS1RIwG9hzXy21')
    .algo('nlp/AutoTag/1.0.1') // timeout is optional
    .pipe(texttag.value)
    .then(function(output) {
      let keys = Object.values(output);
      console.log(keys);
      keys[0].forEach((element, index) => {
          keyword.remove();
        tagcontainer.innerHTML += `<span>${element}</span>`;
      });
    });
}
