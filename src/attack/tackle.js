import { 
    eventBus, 
    EVENT_MONSTER_ATTACKED
} from '../event';
import blink from '../animation/blink';
import Tweener from 'tweener';
import tweener from '../tweener';
import Monster from '../Views/Monster';

export default function tackle(monster) {
    return new Promise(resolve => {
        const positions = [
            { x: 0, y: 1},
            { x: 1, y: 1}
        ];
        
        blink(monster).then(() => {
            tweener.add(monster)
            .to({ x: monster.x - 420 }, 0.2, Tweener.ease.backInOut)
            .then(() => eventBus.emit(EVENT_MONSTER_ATTACKED, positions))
            .to({ x: Monster.POS_X }, 0.2, Tweener.ease.easeIn)
            .then(resolve);
        });
    });
}