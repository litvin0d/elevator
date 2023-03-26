export class Elevator {
    floorHeight = 102; // px
    currentFloor = 1;
    elevatorItem = document.querySelector("#elevator");
    posY = 0; // px
    direction = 0; // 1 - вверх, -1 - вниз
    speed = 2; // px
    wait = 500; // ms
    destinationFloors = [];

    // ожидание
    pause = () => new Promise(r => setTimeout(r, this.wait));

    // действия после остановки лифта
    stop() {
        this.direction = 0;
        this.currentFloor = this.destinationFloors.shift();
        this.elevatorItem.style.opacity = "1";
        if (this.currentFloor !== 1) { // удаление класса active у кнопки
            document.querySelector(`.floor-${this.currentFloor}`).classList.remove("active");
        }
        this.pause().then(() => {
            this.elevatorHandler();
        });
    }

    // анимация движения лифта
    move() {
        this.elevatorItem.style.opacity = "0.5";
        this.elevatorItem.style.transform = `translateY(${this.posY += this.speed * -this.direction}px)`;

        /*
            Пытался сократить функцию без повторений, но начинают появляться баги, например:
            при последовательности нажатий 2, 3, 4 лифт едет на 2 этаж,
            затем, пропуская 3 этаж, едет на 4 и там останавливается.
            Не могу понять в чём конкретно причина.
        */

        // const isMovedDown = this.direction === -1 && this.posY < -(this.destinationFloors[0] - 1) * this.floorHeight;
        // const isMovedUp = this.direction === 1 && -this.posY < (this.destinationFloors[0] - 1) * this.floorHeight;
        // isMovedDown || isMovedUp ? requestAnimationFrame(() => this.move()) : this.stop();

        if (this.direction === -1) {
            if (this.posY < -(this.destinationFloors[0] - 1) * this.floorHeight) {
                requestAnimationFrame(() => this.move());
            } else {
                this.stop();
            }
        } else if (this.direction === 1) {
            if (-this.posY < (this.destinationFloors[0] - 1) * this.floorHeight) {
                requestAnimationFrame(() => this.move());
            } else {
                this.stop();
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
            this.destinationFloors.push(floorNum, 1);
            if (this.direction === 0) {
                this.elevatorHandler();
            }
        }
    }
}