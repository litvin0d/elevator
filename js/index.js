import { Building } from "./Building.js";
import { Elevator } from "./Elevator.js";

const building = new Building(4, new Elevator())
building.createFloors();
