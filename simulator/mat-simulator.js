import { getRandomInt, isValidCoordinates } from "../utils/utils.js";
import { INTERVAL, ROWS, COLUMNS } from "../constants.js";

export class MatSimulator {
  #animations;
  #matrix;

  constructor() {
    this.#animations = [];
    this.#matrix = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0));
  }

  printMatrix() {
    console.clear();
    this.#matrix.forEach((row) => {
      console.log(row.join(" "));
    });
  }

  turnOff(x, y) {
    if (isValidCoordinates(x, y)) {
      this.#matrix[x][y] = 0;
    }
  }

  turnOn(x, y) {
    if (isValidCoordinates(x, y)) {
      this.#matrix[x][y] = 1;
    }
  }

  turnOnRandomPixel() {
    const { x, y } = this.#getRandomCoordinates();
    this.turnOn(x, y);
  }

  turnOffRandomPixel() {
    const { x, y } = this.#getRandomCoordinates();
    this.turnOff(x, y);
  }

  addAnimation(animation) {
    this.#animations.push(animation);
  }

  updateAnimations() {
    this.#animations.forEach((animation) => {
      let { x, y } = animation.getCurrentStep();
      this.turnOff(x, y);

      animation.goToNextStep();

      ({ x, y } = animation.getCurrentStep());
      this.turnOn(x, y);
    });
  }

  #getRandomCoordinates() {
    return {
      x: getRandomInt(0, ROWS - 1),
      y: getRandomInt(0, COLUMNS - 1),
    };
  }

  runSimulation() {
    this.updateAnimations();
    this.printMatrix();
    setInterval(() => {
      this.updateAnimations();
      this.printMatrix();
    }, INTERVAL);
  }
}
