class Elevator {
    constructor() {
        this.elevatorEl = document.querySelector(".elevator");
        this.duration = 1000;
        this.currentFloor = 1;
        this.destinationFloor = null;
        this.floorHeight = 102 * (this.destinationFloor - 1);
        this.isMoving = false;
        this.queue = [];
        // this.move();
    }

    // move(timestamp) {
    //     // if (!this.isMoving && this.queue.length > 0) {
    //     //     this.isMoving = true;
    //     //     this.destinationFloor = this.queue.shift();
    //     //     if (this.destinationFloor > this.currentFloor) {
    //     //         this.moveUp()
    //     //     } else if (this.destinationFloor > this.currentFloor) {
    //     //         this.moveDown()
    //     //     }
    //     // }
    //     let start, previousStamp;
    //     if (!start) start = timestamp;
    //     const elapsed = timestamp - start;
    //     if (elapsed < this.duration) {
    //         const progress = elapsed / this.duration;
    //         const delta = this.destinationFloor * progress
    //     }
    //
    //     requestAnimationFrame(() => this.move())
    // }

    // moveUp() {
    //     this.currentFloor++;
    //     this.checkDestination();
    // }
    //
    // moveDown() {
    //     this.currentFloor--;
    //     this.checkDestination();
    // }

    // checkDestination() {
    //     if (this.currentFloor === this.destinationFloor) {
    //         this.isMoving = false;
    //         this.destinationFloor = null;
    //     }
    // }

    call(floorNum) {
        if (this.queue.indexOf(floorNum) === -1) {
            this.queue.push(floorNum);
            this.queue.push(1);
            console.log(this.queue)
        }
    }
}

class Floor {
    constructor(floorNum, elevator) {
        this.floorNum = floorNum;
        this.elevator = elevator;
        this.callButton = document.querySelector(`.floor-${this.floorNum}`);
        this.callButton.addEventListener("click", () => this.callElevator());
    }

    callElevator() {
        if (this.elevator.currentFloor !== this.floorNum) {
            this.elevator.call(this.floorNum);
            // console.log(this.floorNum)
        }
    }
}

// document.querySelector(".elevator").style.transform = "translateY(-306px)"

const elevator = new Elevator();
const floors = [
    new Floor(4, elevator),
    new Floor(3, elevator),
    new Floor(2, elevator),
]
