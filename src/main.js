// очередь вызовов лифта
let queue = [];

const interval = 3000;

// обработка очереди
setInterval(() => {
    if (queue.length > 0) {
        const event = queue.shift(); // запись в переменную и удаление из массива первого в очереди события
        // console.log(event);
        event(); // выполнение обработчика события
    }
}, interval);

// обработчик события 
const elevator = event => {
    const elevator = document.querySelector(".elevator");
    const destination = +event.target.innerText; // получение номера этажа
    event.target.classList.add("call-active"); // подсвечивание кнопки при вызове

    queue.push(() => {
        // движение на вызов
        const move = distance => {
            elevator.style.opacity = 0.4; // затемнение лифта при движении
            elevator.style.transform = `translateY(${distance.toString()}px)`; // движение лифта к этажу
            setTimeout(() => {
                elevator.style.opacity = 1;
                event.target.classList.remove("call-active");
            }, interval); // через заданное после движения время осветляет лифт и отключает кнопку
            // setTimeout(() => {
            //     elevator.style.opacity = 0.4; // затемнение лифта при движении назад
            //     setTimeout(() => {
            //         elevator.style.opacity = 1;
            //     }, interval); // через заданное после движения время осветляет лифт и отключает кнопку
            //     elevator.style.transform = "translateY(0px)";
            // }, interval * 2); // движется назад на 1ый этаж через заданное время
        };

        // возвращение на 1ый этаж
        const comeBack = () => {
            setTimeout(() => {
                elevator.style.opacity = 0.4; // затемнение лифта при движении назад
                setTimeout(() => {
                    elevator.style.opacity = 1;
                }, interval); // через заданное после движения время осветляет лифт и отключает кнопку
                elevator.style.transform = "translateY(0px)";
            }, interval * 2); // движется назад на 1ый этаж через заданное время
        };

        // определяет на какой этаж двигаться в зависимости от нажатой кнопки
        if (destination === 2) {
            move(-104);
        } else if (destination === 3) {
            move(-208);
        } else if (destination === 4) {
            move(-312);
        }

        comeBack();
    });
};

// навешивание обработчиков событий на каждую кнопку
const buttons = document.querySelectorAll(".call");
buttons.forEach(button => {
    button.addEventListener("click", elevator);
});
