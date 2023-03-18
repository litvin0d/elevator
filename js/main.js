class Elevator {
    constructor() {
        this.floorHeight = 102; // px
        this.currentFloor = 1;
        this.elevatorItem = document.querySelector("#elevator");
        this.posY = 0; // px
        this.direction = 0; // 1 - вверх, -1 - вниз
        this.speed = 2; // px
        this.wait = 500 // ms
        this.destinationFloors = [];
    }

    // ожидание
    pause = async () => new Promise(r => setTimeout(r, this.wait));

    // действия после остановки лифта
    async stop() {
        this.direction = 0;
        this.currentFloor = this.destinationFloors.shift();
        this.elevatorItem.style.opacity = "1";
        if (this.currentFloor !== 1) { // удаление класса active у кнопки
            document.querySelector(`.floor-${this.currentFloor}`).classList.remove("active");
        }
        await this.pause();
        this.elevatorHandler();
    }

    // анимация движения лифта
    async move() {
        if (this.direction === -1) {
            this.elevatorItem.style.opacity = "0.5";
            this.elevatorItem.style.transform = `translateY(${this.posY += this.speed}px)`
            if (this.posY < -(this.destinationFloors[0] - 1) * this.floorHeight) {
                requestAnimationFrame(() => this.move());
            } else {
                await this.stop();
            }
        } else if (this.direction === 1) {
            this.elevatorItem.style.opacity = "0.5";
            this.elevatorItem.style.transform = `translateY(${this.posY -= this.speed}px)`
            if (-this.posY < (this.destinationFloors[0] - 1) * this.floorHeight) {
                requestAnimationFrame(() => this.move());
            } else {
                await this.stop();
            }
        }
    }

    // определяет направление лифта и вызывает анимацию движения
    elevatorHandler() {
        // если текущий этаж меньше, чем назначенный задаёт направление вверх
        if (this.currentFloor < this.destinationFloors[0]) {
            this.direction = 1;
            requestAnimationFrame(() => this.move());
        }

        if (this.currentFloor > this.destinationFloors[0]) {
            this.direction = -1;
            if (this.destinationFloors[1] < this.currentFloor) { // если следующий этаж меньше текущего
                this.destinationFloors.shift(); // удаляет текущий этаж назначения
            }
            requestAnimationFrame(() => this.move());
        }

        if (!this.destinationFloors[0]) {
            this.direction = 0;
        }
    }

    // добавляет номер этажа в список назначений
    callHandler(floorNum) {
        if (this.destinationFloors.indexOf(floorNum) === -1) {
            this.destinationFloors.push(floorNum);
            this.destinationFloors.push(1);
            if (this.direction === 0) {
                this.elevatorHandler();
            }
        }
    }
}

class Floor {
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

const elevator = new Elevator();
(() => [
    new Floor(4, elevator),
    new Floor(3, elevator),
    new Floor(2, elevator),
])();