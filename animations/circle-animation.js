import { getRandomInt, isValidCoordinates } from "../utils/utils.js";
import { ROWS, COLUMNS } from "../constants.js";

export class CircleAnimation {
  #xCenter;
  #yCenter;
  #radius;
  #animationSequence;
  #currentIndex;

  constructor(xCenter, yCenter, radius) {
    this.#validateParameters(xCenter, yCenter, radius);

    this.#xCenter = xCenter;
    this.#yCenter = yCenter;
    this.#radius = radius;
    this.#animationSequence = [];

    this.#calculateAnimationSequence();
    this.#cleanupAnimationSequence();

    if (this.#animationSequence.length === 0) {
      throw new Error(
        "Invalid parameters: The animation sequence is empty. Ensure the radius and center coordinates result in valid points within the matrix."
      );
    }

    this.#currentIndex = getRandomInt(0, this.#animationSequence.length - 1);
  }

  getCurrentStep() {
    return {
      x: this.#animationSequence[this.#currentIndex].x,
      y: this.#animationSequence[this.#currentIndex].y,
    };
  }

  goToNextStep() {
    this.#currentIndex =
      (this.#currentIndex + 1) % this.#animationSequence.length;
  }

  #validateParameters(xCenter, yCenter, radius) {
    if (xCenter < 0 || xCenter >= ROWS || yCenter < 0 || yCenter >= COLUMNS) {
      throw new Error(
        "Invalid center coordinates: Center must be within the matrix bounds."
      );
    }

    if (radius <= 0) {
      throw new Error("Invalid radius: radius must be greater than 0.");
    }
  }

  #calculateAnimationSequence() {
    let x = 0;
    let y = -this.#radius;
    let p = -this.#radius;

    while (x < -y) {
      if (p > 0) {
        y += 1;
        p += 2 * (x + y) + 1;
      } else {
        p += 2 * x + 1;
      }

      this.#addPointToSequence(this.#xCenter + x, this.#yCenter + y);
      this.#addPointToSequence(this.#xCenter - x, this.#yCenter + y);
      this.#addPointToSequence(this.#xCenter + x, this.#yCenter - y);
      this.#addPointToSequence(this.#xCenter - x, this.#yCenter - y);
      this.#addPointToSequence(this.#xCenter + y, this.#yCenter + x);
      this.#addPointToSequence(this.#xCenter - y, this.#yCenter + x);
      this.#addPointToSequence(this.#xCenter + y, this.#yCenter - x);
      this.#addPointToSequence(this.#xCenter - y, this.#yCenter - x);
      x += 1;
    }
  }

  #cleanupAnimationSequence() {
    this.#animationSequence = Array.from(
      new Map(this.#animationSequence.map((p) => [`${p.x},${p.y}`, p])).values()
    );

    this.#animationSequence = this.#animationSequence.sort((a, b) => {
      const angleA = Math.atan2(a.y - this.#yCenter, a.x - this.#xCenter);
      const angleB = Math.atan2(b.y - this.#yCenter, b.x - this.#xCenter);
      return angleA - angleB;
    });
  }

  #addPointToSequence(x, y) {
    if (isValidCoordinates(x, y)) {
      this.#animationSequence.push({ x, y });
    }
  }
}
