import * as p5 from 'p5';

function arrayShuffle<T>(array: T[]) {
  for (var i = array.length - 1; 0 < i; i--) {
    // 0〜(i+1)の範囲で値を取得
    var r = Math.floor(Math.random() * (i + 1));

    // 要素の並び替えを実行
    var tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}

const sketch = (p: p5) => {
  const animals = [
    'seal',
    'spotted-seal',
    'armadillo',
    'sea-lion',
    'badger',
    'raccoon',
    'anteater',
    'weasel',
    'dog',
    'wild-boar',
    'dolphin',
    'impala',
    'wombat',
    'rabbit',
    'cow',
    'horse',
    'clouded-leopard',
    'wolf',
    'okapi',
    'ermine',
    'fur seal',
    'opossum',
    'orangutan',
    'gemsbok',
    'gazelle',
    'hippopotamus',
    'capibara',
    'serow',
    'platypus',
    'otter',
    'kangaroo',
    'fox',
    'giraffe',
    'whale',
    'bear',
    'koala',
    'panther',
    'bat',
    'coyote',
    'gorilla',
    'serval',
    'rhinoceros',
    'monkey',
    'deer',
    'zebra',
    'jaguar',
    'killer-whale',
    'jackal',
    'dugong',
    'water-buffalo',
    'skunk',
    'finless-porpoise',
    'springbok',
    'walrus',
    'elephant',
    'raccoon-dog',
    'cheetah',
    'chimpanzee',
    'dingo',
    'degu',
    'marten',
    'reindeer',
    'tiger',
    'sloth',
    'gnu',
    'coypus',
    'cat',
    'mouse',
    'hyena',
    'bison',
    'paca',
    'tapir',
    'palm-civet-cat',
    'buffalo',
    'hamster',
    'hedgehog',
    'echidna',
    'giant-panda',
    'beaver',
    'bighorn',
    'sheep',
    'baboon',
    'puma',
    'leopard',
    'fossa',
    'pig',
    'prairie dog',
    'pony',
    'mara',
    'manatee',
    'mongoose',
    'meerkat',
    'mink',
    'flying-squirrel',
    'mouflon',
    'mole',
    'guinea-pig',
    'goat',
    'yak',
    'porcupine',
    'wildcat',
    'lion',
    'camel',
    'mule',
    'lama',
    'squirrel',
    'donkey',
    'wallaby',
  ];
  const inputText = arrayShuffle(animals).join(' ');
  let img: p5.Image;
  const canvasWidth = 768;
  const canvasHeight = 1024;
  let imageWidth: number;
  let imageHeight: number;
  let ratio: number;
  var fontSizeMax = 7;
  const fontSizeMin = 5;
  const spacing = 6; // line height
  const kerning = 0.5; // between letters
  let fontSizeStatic = false;
  let blackAndWhite = false;
  let font: p5.Font;

  p.preload = () => {
    img = p.loadImage(
      'https://raw.githubusercontent.com/yosshitaku067/images-for-stackblitz/main/disney-world-ak.jpg'
    );

    p.loadFont('https://fonts.cdnfonts.com/s/10244/waltographUI.woff', (f) => {
      font = f;
    });
  };

  p.setup = () => {
    ratio = Math.min(canvasWidth / img.width, canvasHeight / img.height);
    imageWidth = img.width * ratio;
    imageHeight = img.height * ratio;
    p.createCanvas(canvasWidth, canvasHeight);
    p.textFont(font);
    p.textAlign(p.LEFT, p.CENTER);
    p.print(img.width + ' ・ ' + img.height);
    // p.image(img, 0, 0, imageWidth, imageHeight);
  };

  p.draw = () => {
    p.background(255);

    let x = 0;
    let y = 10;
    let counter = 0;

    img.loadPixels();

    while (y < p.height) {
      const imgX = p.round(p.map(x, 0, imageWidth, 0, img.width));
      const imgY = p.round(p.map(y, 0, imageHeight, 0, img.height));
      const c = p.color(img.get(imgX, imgY));
      const greyscale = p.round(
        p.red(c) * 0.222 + p.green(c) * 0.707 + p.blue(c) * 0.071
      );

      p.push();
      p.translate(x, y);

      if (fontSizeStatic) {
        p.textSize(fontSizeMax);
        if (blackAndWhite) {
          p.fill(greyscale);
        } else {
          p.fill(c);
        }
      } else {
        // greyscale to fontsize
        let fontSize = p.map(greyscale, 0, 255, fontSizeMax, fontSizeMin);
        fontSize = p.max(fontSize, 1);
        p.textSize(fontSize);
        if (blackAndWhite) {
          p.fill(0);
        } else {
          p.fill(c);
        }
      }

      const letter = inputText.charAt(counter);
      p.text(letter, 0, 0);
      const letterWidth = p.textWidth(letter) + kerning;
      x += letterWidth;

      p.pop();

      // linebreaks
      if (x + letterWidth >= p.width) {
        x = 0;
        y += spacing;
      }

      counter++;
      if (counter >= inputText.length) {
        counter = 0;
      }
    }
    p.noLoop();
  };
};

new p5(sketch);
