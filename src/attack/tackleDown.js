import { 
    eventBus, 
    EVENT_MONSTER_ATTACKED
} from '../event';
import Tweener from 'tweener';
import tweener from '../tweener';
import Monster from '../Views/Monster';

export default function tackleDown(monster) {
    return new Promise(resolve => {
        const positions = [
            { x: 0, y: 2},
            { x: 1, y: 2},
            { x: 0, y: 1},
            { x: 1, y: 1}
        ];
        
        tweener.add(monster)
        .to({ y: monster.y + 50 }, 0.5, Tweener.ease.backInOut)
        .to({ x: monster.x - 420 }, 0.2, Tweener.ease.backInOut)
        .then(() => eventBus.emit(EVENT_MONSTER_ATTACKED, positions))
        .to({ x: Monster.POS_X }, 0.2, Tweener.ease.easeIn)
        .to({ y: Monster.POS_Y  }, 0.2, Tweener.ease.easeIn)
        .then(resolve);
    });
}