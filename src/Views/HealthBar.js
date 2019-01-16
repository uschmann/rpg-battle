const PIXI = require('pixi.js');


class HealthBar extends PIXI.Container {

    constructor() {
        super();
        this.value = 0;

        this.background = new PIXI.Graphics();
        this.foreground = new PIXI.Graphics();
        this.boarder = new PIXI.Graphics();
        this.maxValue = 100;

        this.addChild(this.background);
        this.addChild(this.foreground);
        this.addChild(this.boarder);

        this.drawBackground();
        this.drawForeground();
    }

    drawBackground() {
        this.background.clear();
        this.background.beginFill(HealthBar.BACKGROUND_COLOR);
        this.background.drawRect(0, 0, HealthBar.WIDTH, HealthBar.HEIGHT);
        this.background.endFill();
    }

    drawForeground() {
        const width = (this.value / this.maxValue) * HealthBar.WIDTH;
        this.foreground.clear();
        this.foreground.beginFill(HealthBar.FOREGROUND_COLOR);
        this.foreground.drawRect(0, 0, width, HealthBar.HEIGHT);

        this.boarder.clear();
        this.boarder.lineStyle(4, HealthBar.BOARDER_COLOR, 1, 0);
        this.boarder.drawRect(0, 0, HealthBar.WIDTH, HealthBar.HEIGHT);
    }

    setValue(value) {
        if(this.value != value) {
            this.value = value;
            if(this.value > this.maxValue) {
                this.value = this.maxValue;
            }
            this.drawForeground();
        }
    }

    setMaxValue(maxValue) {
        this.maxValue = maxValue;
    }
}

HealthBar.WIDTH = 200;
HealthBar.HEIGHT = 25;

HealthBar.BACKGROUND_COLOR = 0x333D3C;
HealthBar.FOREGROUND_COLOR = 0x93C8AB;
HealthBar.BOARDER_COLOR = 0xFFFFFF;

module.exports = HealthBar;