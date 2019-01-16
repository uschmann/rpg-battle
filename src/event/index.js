import { EventEmitter } from 'events';

export const EVENT_HERO_ATTACKED = 'heroAttacked';
export const EVENT_HERO_UPDATED = 'heroUpdated';
export const EVENT_MONSTER_ATTACKED = 'monsterAttacked';
export const EVENT_MONSTER_UPDATED = 'monsterUpdated';

export const eventBus = new EventEmitter();