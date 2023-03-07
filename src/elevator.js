class Elevator {
    constructor(timeout) {
        this.elevator = document.querySelector("#elevator");
        this.currentFloor = 1;
        this.firstFloorY = 0;
        this.secondFloorY = -104;
        this.thirdFloorY = -208;
        this.fourthFloorY = -312;
        this.activeCalls = [];
        this.destinationFloors = [];
        this.timeout = timeout;
    }

    // добавление активным кнопкам класса call-active
    setActiveCall() {
        this.activeCalls.forEach(activeCall => {
            !activeCall.classList.contains("call-active") && activeCall.classList.add("call-active");
        });
    }

    removeDestination() {
        if (this.destinationFloors.length !== 0 && this.activeCalls !== 0) {
            const activeCall = this.activeCalls.shift();
            const destinationFloor = this.destinationFloors.shift();
            if (+activeCall?.innerText === destinationFloor) activeCall?.classList.remove("call-active");
            console.log("removed:", destinationFloor);
        }
    }

    // заполнение массива активных кнопок и массива этажей назначения
    getDestinationFloors(activeCall) {
        !this.activeCalls.includes(activeCall) && this.activeCalls.push(activeCall);
        !this.destinationFloors.includes(+activeCall.innerText) && this.destinationFloors.push(+activeCall.innerText);
        console.log(this.destinationFloors);
        this.setActiveCall();
    }

    move() {
        const interval = setInterval(() => {
            this.removeDestination();
        }, this.timeout);
        if (this.destinationFloors.length === 0 && this.activeCalls === 0) {
            clearInterval(interval);
        }
    }
}

const elevator = new Elevator(3000);

const buttons = document.querySelectorAll(".call");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        // button.classList.add("call-active");
        elevator.getDestinationFloors(button);
        elevator.move();
    });
});
