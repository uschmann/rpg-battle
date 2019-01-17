import 'pixi.js';
import tweener from '../tweener';
import {
    eventBus,
    EVENT_MONSTER_ATTACKED
} from '../event';

export default class AttackField extends PIXI.Graphics {

    constructor(x, y) {
        super();
        
        this.positionX = x;
        this.positionY = y;
        this.x = AttackField.FIELD_WIDTH * x + (4 * x);
        this.y = AttackField.FIELD_HEIGHT * y + (1 * y);
        this.alpha = 0;
        this.beginFill(AttackField.FIELD_COLOR);
        this.drawRect(0, 0, AttackField.FIELD_WIDTH, AttackField.FIELD_HEIGHT);
        this.endFill();

        this.onMonsterAttacked = this.onMonsterAttacked.bind(this);

        eventBus.on(EVENT_MONSTER_ATTACKED, this.onMonsterAttacked);
    }

    onMonsterAttacked(positions) {
        positions.forEach((p) => {
            const { positionX, positionY } = this;
            if(p.x == positionX && p.y == positionY) {
                tweener.add(this)
                .to({ alpha: 1}, 0.1)
                .to({ alpha: 0}, 0.1)
            }
        });
    }

}

AttackField.FIELD_COLOR = 0xaa0000;
AttackField.FIELD_WIDTH = 100;
AttackField.FIELD_HEIGHT = 50;