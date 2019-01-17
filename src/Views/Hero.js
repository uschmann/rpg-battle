import  'pixi.js';

import heroSprite from '../gfx/hero.png';
import tweener from '../tweener';
import blink from '../animation/blink';

import { 
    eventBus, 
    EVENT_HERO_ATTACKED, 
    EVENT_HERO_UPDATED,
    EVENT_MONSTER_ATTACKED 
} from '../event';

export default class Hero extends PIXI.Sprite{

    constructor() {
        super(PIXI.loader.resources[heroSprite].texture);
        this.x = Hero.POS_X;
        this.y = Hero.POS_Y;
        this.currentPosition = { x: 1, y: 1 };
        this.state = Hero.STATE_IDLE;
        this.hp = 3;
        this.maxHp = 3;
        this.anchor.set(0.5, 0.5);

        this.onMonsterAttacked = this.onMonsterAttacked.bind(this);

        eventBus.on(EVENT_MONSTER_ATTACKED, this.onMonsterAttacked);
    }

    attack() {
        if(this.state !== Hero.STATE_IDLE) { return; }
        this.state = Hero.STATE_ATTACKING;

        const duration = 0.1;
        
        tweener.add(this)
        .to({ x: Hero.POS_X + 400 - 30 }, duration, Tweener.ease.easeIn)
        .then(() => eventBus.emit(EVENT_HERO_ATTACKED, this))
        .to({ x: Hero.POS_X }, duration, Tweener.ease.easeIn)
        .then(() => this.state = Hero.STATE_IDLE);
    }

    dodge(direction) {
        if(this.state !== Hero.STATE_IDLE) { return; }
        this.state = Hero.STATE_DODGING;

        const waitTime = 0.5;
        const transitionTime = 0.05;
        
        const tween = tweener.add(this);
        
        switch(direction) {
            case Hero.DODGE_DIR_UP: 
                tween.to({ y: Hero.POS_Y - 100 }, transitionTime, Tweener.ease.easeIn)
                .then(() => this.currentPosition = { x: 1, y: 0 })
                break;
            case Hero.DODGE_DIR_DOWN: 
                tween.to({ y: Hero.POS_Y + 100 }, transitionTime, Tweener.ease.easeIn)
                .then(() => this.currentPosition = { x: 1, y: 2 })
                break;
            case Hero.DODGE_DIR_LEFT: 
                tween.to({ x: Hero.POS_X - 100 }, transitionTime, Tweener.ease.easeIn)
                .then(() => this.currentPosition = { x: 0, y: 1 })
                break;
        } 

        tween.wait(waitTime)
        .to({ x: Hero.POS_X, y: Hero.POS_Y }, transitionTime, Tweener.ease.easeIn)
        .then(() => {
            this.currentPosition = { x: 1, y: 1 }
            this.state = Hero.STATE_IDLE;
        });
    }

    onMonsterAttacked(positions) {
        if(this.state === Hero.STATE_DEAD ) { return; }

        const { x, y } = this.currentPosition;

        for(var i = 0; i < positions.length; i++) {
            const position = positions[i];

            if(position.x === x && position.y === y) {
                blink(this);
                this.hp --;
                if(this.hp <= 0) {
                    this.hp = 0;
                    this.rotation = -1.5;
                    this.state = Hero.STATE_DEAD;
                }
                eventBus.emit(EVENT_HERO_UPDATED, this);
                return;
            }
        }
    }

}

Hero.STATE_IDLE = 'idle';
Hero.STATE_ATTACKING = 'attacking';
Hero.STATE_DODGING = 'dodging';
Hero.STATE_DEAD = 'dead';

Hero.DODGE_DIR_UP = 'up';
Hero.DODGE_DIR_LEFT = 'left';
Hero.DODGE_DIR_DOWN = 'down';

Hero.POS_X = 400;
Hero.POS_Y = 200;