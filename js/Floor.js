export class Floor {
    constructor(floorNum, elevator) {
        this.floorNum = floorNum;
        this.elevator = elevator; // объект лифта
        this.callButton = document.querySelector(`.floor-${this.floorNum}`);
        this.callButton.addEventListener("click", () => this.callElevator());
    }

    // добавляет класс active кнопке и передаёт номер этажа объекту лифта
    callElevator() {
        if (this.elevator.currentFloor !== this.floorNum) {
            this.callButton.classList.add("active");
            this.elevator.callHandler(this.floorNum);
        }
    }
}