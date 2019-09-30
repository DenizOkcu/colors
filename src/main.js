// imports the main.scss for rollup-plugin-postcss to generate dist/main.css
import "../styles/main.scss";
// example import from src/sum.js - delete before you start
import { draw } from "./utils";

export default function Lib() {
  return {
    draw: draw
  };
}
