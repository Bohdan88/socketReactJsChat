export const ItemTypes = {
  Note: 'note',
};

/* API */
export const END_POINT: string = 'http://localhost:5000/';
export const INIT_PAGE: string = 'http://localhost:5555/';

/* socket emits */
export const JOIN: string = 'join';
export const ADD_NOTE: string = 'addNote';
export const REMOVE_NOTE: string = 'removeNote';
export const UPDATE_NOTE: string = 'updateNote';
export const MOVE_NOTE: string = 'moveNote';

/* socket on connections */
export const INIT_DATA: string = 'initData';
export const ADDED_NOTE: string = 'addedNote';
export const REMOVED_NOTE: string = 'removedNote';
export const MOVED_NOTE: string = 'movedNote';
export const UPDATED_NOTE: string = 'updatedNote';

//
export const DECREMENT: string = 'decrement';
export const INCREMENT: string = 'increment';
export const DEFAULT_USER_COLOR: string = '555555';
