// Dokis
import cat_idle from '../assets/sprites/cat_sprites/cat_idle.png';
import cat_happy from '../assets/sprites/cat_sprites/cat_happy.png';
import cat_sleep from '../assets/sprites/cat_sprites/cat_sleep.png';
import fox_idle from '../assets/sprites/fox_sprites/fox_idle.png';
import fox_happy from '../assets/sprites/fox_sprites/fox_happy.png';
import fox_sleep from '../assets/sprites/fox_sprites/fox_sleep.png';
import whitefox_idle from '../assets/sprites/whitefox_sprites/whitefox_idle.png';
import whitefox_happy from '../assets/sprites/whitefox_sprites/whitefox_happy.png';
import whitefox_sleep from '../assets/sprites/whitefox_sprites/whitefox_sleep.png';

// Items
import slime from '../assets/items/slime.png';
import ball from '../assets/items/ball.png';
import leaf from '../assets/items/leaf.png';
import video_game from '../assets/items/videogame.png';
import plushie from '../assets/items/plushie.png';
import flute from '../assets/items/flute.png';
import gold_star from '../assets/items/goldstar.png';
import wand from '../assets/items/wand.png';
import tomato from '../assets/items/tomato.png';

const images = {
  sprites: {
    cat: {
      idle: cat_idle,
      happy: cat_happy,
      sleep: cat_sleep,
    },
    fox: {
      idle: fox_idle,
      happy: fox_happy,
      sleep: fox_sleep,
    },
    whitefox: {
      idle: whitefox_idle,
      happy: whitefox_happy,
      sleep: whitefox_sleep,
    },
  },
  store: {
    'video game': video_game,
    slime,
    ball,
    leaf,
    plushie,
    flute,
    'gold star': gold_star,
    wand,
    tomato,
  },
};

export default images;
