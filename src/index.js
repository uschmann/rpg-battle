import './style.css';

import 'pixi.js';
import heroSprite from './gfx/hero.png';
import eyeballSprite from './gfx/eyeball.png';
import Hero from './Views/Hero';
import Monster from './Views/Monster';
import HealthBar from './Views/HealthBar';
import AttackArea from './Views/AttackArea';
import getRandomItem from './utils/getRandomItem';
import randomNumber from './utils/randomNumber';

import { 
  eventBus, 
  EVENT_MONSTER_UPDATED,
  EVENT_HERO_UPDATED
} from './event';

let hero = null;
let monster = null;
let heroHealthbar = null;
let monsterHealthbar = null;
let attackArea = null;

let app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0,
  antialias: true,
});
document.body.appendChild(app.view);

import {
  tackle,
  tackleTop,
  tackleDown
} from './attack';

document.addEventListener('keydown', (e) => {
  const { code } = e;
  e.preventDefault();

  switch(code) {
    case 'Space':
    hero.attack();
      break;
    case 'ArrowLeft':
    case 'KeyA':
      hero.dodge(Hero.DODGE_DIR_LEFT);
      break;
    case 'ArrowUp':
    case 'KeyW':
      hero.dodge(Hero.DODGE_DIR_UP);
      break;
    case 'ArrowDown':
    case 'KeyS':
        hero.dodge(Hero.DODGE_DIR_DOWN);
        break;


    // Monster
    /*
    case 'KeyX':
        monster.attack(tackle);
        break;
    case 'KeyC':
        monster.attack(tackleTop);
        break;
    case 'KeyV':
        monster.attack(tackleDown);
        break;
        */
  }
  
})

PIXI.loader
  .add(heroSprite)
  .add(eyeballSprite)
  .load(() => {
      attackArea = new AttackArea();
      attackArea.x = 250;
      attackArea.y = 150;

      hero = new Hero();
      monster = new Monster();
      heroHealthbar = new HealthBar();
      heroHealthbar.x = 300;
      heroHealthbar.y = 20;
      heroHealthbar.setMaxValue(hero.maxHp);
      heroHealthbar.setValue(hero.hp);

      monsterHealthbar = new HealthBar();
      monsterHealthbar.x = 700;
      monsterHealthbar.y = 20;
      monsterHealthbar.setMaxValue(monster.maxHp);
      monsterHealthbar.setValue(monster.hp);

      app.stage.addChild(attackArea);
      app.stage.addChild(heroHealthbar);
      app.stage.addChild(monsterHealthbar);
      app.stage.addChild(monster);
      app.stage.addChild(hero);

      attack();
  })
  .on("progress", loader => console.log('Progress:', loader.progress));

  eventBus.on(EVENT_MONSTER_UPDATED, monster => {
    monsterHealthbar.setValue(monster.hp);
  });

  eventBus.on(EVENT_MONSTER_UPDATED, monster => {
    monsterHealthbar.setValue(monster.hp);
  });

  eventBus.on(EVENT_HERO_UPDATED, hero => {
    heroHealthbar.setValue(hero.hp);
  });


function attack() {
  const attacks = [ tackle, tackleTop, tackleDown];
  monster.attack(getRandomItem(attacks)).then(() => {
    const nextAttack = randomNumber(500, 2000);
    console.log(`Next attack in ${nextAttack/1000} seconds...`);
    setTimeout(attack, nextAttack);
  });
}