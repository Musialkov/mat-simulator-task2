import { CircleAnimation } from "./animations/circle-animation.js";
import { MatSimulator } from "./simulator/mat-simulator.js";

const circleAnimation = new CircleAnimation(7, 7, 7);
const circleAnimation2 = new CircleAnimation(3, 8, 3);
const matSimulator = new MatSimulator();

matSimulator.addAnimation(circleAnimation);
matSimulator.addAnimation(circleAnimation2);
matSimulator.runSimulation();
