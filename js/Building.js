import { Floor } from "./Floor.js";

export class Building {
    constructor(floorsNum, elevator) {
        this.floorsNum = floorsNum;
        this.elevator = elevator;
    }

    createFloors() {
        const floors = document.querySelector(".floors");
        let listeners = [];
        for (let i = 2; i <= this.floorsNum; i++) {
            const floor = document.createElement("div");
            floor.classList.add("floor");

            const shaft = document.createElement("div");
            shaft.classList.add("shaft");

            const btnWrapper = document.createElement("div");
            btnWrapper.classList.add("btn-wrapper");

            const floorNum = document.createElement("h2");
            floorNum.textContent = `${i}`;

            const button = document.createElement("button");
            button.classList.add("btn", `floor-${i}`);
            button.innerHTML = "&middot;";

            btnWrapper.appendChild(floorNum);
            btnWrapper.appendChild(button);

            floor.appendChild(shaft);
            floor.appendChild(btnWrapper);

            floors.insertBefore(floor, floors.firstChild);

            listeners.push(new Floor(i, this.elevator))
        }

        return listeners;
    }
}