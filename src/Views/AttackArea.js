import 'pixi.js'

import AttackField from './AttackField';

export default class AttackArea extends PIXI.Container {

    constructor() {
        super();
        this.fields = [];

        for(let y = 0; y < AttackArea.HEIGHT; y ++) {
            const row = [];
            for(let x = 0; x < AttackArea.WIDTH; x++) {
                const field = new AttackField(x, y);
                row.push(field);
                this.addChild(field);
            }
            this.fields.push(row);
        }
    }
 
}

AttackArea.WIDTH = 2;
AttackArea.HEIGHT = 3;