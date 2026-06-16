import { FRUIT_VALUES } from "@/components/slot-machine/constants";

export function randomFruit() {
  return FRUIT_VALUES[Math.floor(Math.random() * FRUIT_VALUES.length)];
}
