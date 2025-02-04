import { ROWS, COLUMNS } from "../constants.js";

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isValidCoordinates(x, y) {
  return x >= 0 && x < ROWS && y >= 0 && y < COLUMNS;
}
