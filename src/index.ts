import { argv } from "process";
import { main } from "./main";

const arg = parseInt(argv[2]);

if (isNaN(arg)) {
  throw new Error(`Incorrect arg given: ${argv[2]}`);
} else {
  main(arg);
}
