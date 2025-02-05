import { CircleAnimation } from "./animations/circle-animation.js";
import { MatSimulator } from "./simulator/mat-simulator.js";

// You can adjust the size of the mat and the refresh interval in constants.js

// Create a circle animation with parameters:
// (x: 7, y: 7, radius: 3)
// You can add multiple animations to the simulator.
const circleAnimation = new CircleAnimation(7, 7, 3);

//const circleAnimation2 = new CircleAnimation(7, 14, 3);

const matSimulator = new MatSimulator();

matSimulator.addAnimation(circleAnimation);
//matSimulator.addAnimation(circleAnimation2);
matSimulator.runSimulation();
