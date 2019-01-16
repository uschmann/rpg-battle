import tweener from '../tweener';

export default function blink(target) {
    return new Promise((resolve) => {
        const interval = 0.05

        tweener.add(target)
        .to({ alpha: 0}, interval)
        .to({ alpha: 1}, interval)
        .to({ alpha: 0}, interval)
        .to({ alpha: 1}, interval)
        .then(resolve);
    });
}