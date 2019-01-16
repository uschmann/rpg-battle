import 'pixi.js'
import eyeballSprite from '../gfx/eyeball.png';
import tweener from '../tweener';
import blink from '../animation/blink';
import { 
    eventBus, 
    EVENT_HERO_ATTACKED, 
    EVENT_MONSTER_UPDATED,
    EVENT_MONSTER_ATTACKED
} from '../event';

export default class Monster extends PIXI.Sprite {

    constructor() {
        super(PIXI.loader.resources[eyeballSprite].texture);
        
        this.x = Monster.POS_X;
        this.y = Monster.POS_Y;
        this.state = Monster.STATE_IDLE;
        this.hp = 5;
        this.maxHp = 5;
        this.anchor.set(0.5, 0.5);

        this.onHeroAttack = this.onHeroAttack.bind(this);

        eventBus.on(EVENT_HERO_ATTACKED, this.onHeroAttack);
    }

    onHeroAttack(hero) {
        if(this.state !== Monster.STATE_IDLE) { return; }

        blink(this);
        
        this.hp -= 1;
        if(this.hp <= 0) {
            this.hp = 0;
            this.state = Monster.STATE_DEAD; 
            this.rotation = 1;
        }
        eventBus.emit(EVENT_MONSTER_UPDATED, this);
    }

    attack() {
        if(this.state !== Monster.STATE_IDLE) { return; }

        this.state = Monster.STATE_ATTACKING;
        blink(this).then(() => {
            const positions = [
                { x: 1, y: 1},
                { x: 0, y: 1}
            ];
    
            tweener.add(this)
            .to({ x: this.x - 420 }, 0.2, Tweener.ease.backInOut)
            .then(() => eventBus.emit(EVENT_MONSTER_ATTACKED, positions))
            .to({ x: Monster.POS_X }, 0.2, Tweener.ease.easeIn)
            .then(() => this.state = Monster.STATE_IDLE);
        });
    }
}

Monster.POS_X = 800;
Monster.POS_Y = 200;

Monster.STATE_IDLE = 'idle';
Monster.STATE_ATTACKING = 'attacking';
Monster.STATE_DEAD = 'dead';