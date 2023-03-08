class Elevator {
    #elevator = document.querySelector("#elevator"); // лифт
    #firstFloorY = 0; // координаты 1 этажа
    #secondFloorY = -104; // координаты 2 этажа
    #thirdFloorY = -208; // координаты 3 этажа
    #fourthFloorY = -312; // координаты 4 этажа
    #activeCalls = []; // массив активных кнопок вызова
    #destinationFloors = []; // массив этажей, на которых был вызван лифт
    #timeout = 3000; // время передвижения и нахождения лифта на этаже

    // добавляет активным кнопкам класс .call-active (подсвечивание кнопки)
    #setActiveCall() {
        this.#activeCalls.forEach(activeCall => {
            // если у кнопки уже есть класс, он не будет добавлятья повторно
            !activeCall.classList.contains("call-active") && activeCall.classList.add("call-active");
        });
    }

    // удаляет кнопку и этаж, где была нажата кнопка из массивов
    #removeDestination(index) {
        // при условии, что массивы не пусты
        if (this.#destinationFloors.length !== 0 && this.#activeCalls.length !== 0) {
            // при условии, что номер кнопки и этаж совпадают
            if (+this.#activeCalls[index].innerText === this.#destinationFloors[index]) {
                this.#activeCalls[index].classList.remove("call-active"); // удаляет класс .call-active у кнопки
                this.#activeCalls.splice(index, 1);  // удаляет кнопку из массива
                this.#destinationFloors.splice(index, 1); // удаляет этаж из массива
            }
        }
    }

    // перемещает лифт на нужный этаж
    #goTo(floorY, index) {
        setTimeout(() => {
            this.#elevator.style.opacity = 0.5; // затемняет лифт при движении
            this.#elevator.style.transform = `translateY(${floorY}px)`;
            setTimeout(() => {
                this.#elevator.style.opacity = 1;
                this.#removeDestination(index); // после достижения этажа, убирает его с массивов
            }, this.#timeout);
        }, this.#timeout * index);
    }

    // возвращает лифт на нужный этаж
    #comeBack() {
        setTimeout(() => {
            this.#elevator.style.opacity = 0.5;
            setTimeout(() => {
                this.#elevator.style.opacity = 1;
            }, this.#timeout);
            this.#elevator.style.transform = `translateY(${this.#firstFloorY}px)`;
        }, this.#timeout * 3);
    }

    // заполнение массива активных кнопок и массива этажей назначения
    getDestinationFloors(activeCall) {
        // при условии, что кнопки ещё нет в списке
        !this.#activeCalls.includes(activeCall) && this.#activeCalls.push(activeCall);
        // при условии, что этажа ещё нет в списке
        !this.#destinationFloors.includes(+activeCall.innerText) && this.#destinationFloors.push(+activeCall.innerText);
        this.#setActiveCall(); // подсвечивает кнопку
    }

    // обрабатывает массив назначеных этажй
    handler() {
        this.#destinationFloors.forEach((destinationFloor, index, destinationFloors) => {
            if (destinationFloor === 2) {
                this.#goTo(this.#secondFloorY, index);
                this.#comeBack();
            } else if (destinationFloor === 3) {
                this.#goTo(this.#thirdFloorY, index);
                if (destinationFloors[index + 1] === 2) { // при условии, что после 3 этажа следует 2
                    this.#goTo(this.#secondFloorY, index + 1);
                    this.#comeBack();
                } else {
                    this.#comeBack();
                }
            } else if (destinationFloor === 4) {
                this.#goTo(this.#fourthFloorY, index);

                if (destinationFloors[index + 1] === 3) { // при условии, что после 4 этажа следует 3
                    this.#goTo(this.#thirdFloorY, index + 1);
                    this.#comeBack();

                    if (destinationFloors[index + 2] === 2) { // при условии, что после 4 этажа следует 3, а после 3 следует 2
                        this.#goTo(this.#secondFloorY, index + 2);
                        this.#comeBack();
                    } else {
                        this.#comeBack();
                    }
                } else if (destinationFloors[index + 1] === 2) { // при условии, что после 4 этажа следует 2
                    this.#goTo(this.#secondFloorY, index + 1);
                    this.#comeBack();
                } else {
                    this.#comeBack();
                }
            }
        });
    }
}

const elevator = new Elevator();

// навешивает на каждую кнопку обработчик событий с методами из класса
const buttons = document.querySelectorAll(".call");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        elevator.getDestinationFloors(button);
        elevator.handler();
    });
});
