
let currentTime = new Date();

//creamos una clase llamada hand que tenga 3 propiedades

class hand {
  constructor(element, initialAngle, rotationAngle) {
    this.element = element;
    this.initialAngle = initialAngle;
    this.rotationAngle = rotationAngle;
  }
}

let hourHand;
let minuteHand;
let secondHand;

const days = [
  "DOMINGO",
  "LUNES",
  "MARTES",
  "MIÉRCOLES",
  "JUEVES",
  "VIERNES",
  "SÁBADO",
];

const months = [
  "ENE",
  "FEB",
  "MAR",
  "ABR",
  "MAY",
  "JUN",
  "JUL",
  "AGO",
  "SEP",
  "OCT",
  "NOV",
  "DIC",
];
const elementos = {
  mode: document.getElementById("mode"),
  cuerpoDom: document.querySelector("body"),
  container: document.querySelector(".container"),
  reloj: document.querySelector(".reloj"),
  center: document.querySelector(".center"),
  time: document.querySelector(".time"),
  date: document.querySelector(".date"),
  link: document.querySelector(".link"),
}


//creamos una función para inicializar las propiedades de cada objeto

function initHands() {
  element1 = document.querySelector(".hour");
  angle1 = currentTime.getHours() * 30;
  rotation1 = 1/120;

  element2 = document.querySelector(".minute");
  angle2 = currentTime.getMinutes() * 6;
  rotation2 = 0.1;

  element3 = document.querySelector(".second");
  angle3 = currentTime.getSeconds() * 6 + 6;
  rotation3 = 6;

  hourHand = new hand(element1, angle1, rotation1);
  minuteHand = new hand(element2, angle2, rotation2);
  secondHand = new hand(element3, angle3, rotation3);

  //creamos un bucle para crear los números del reloj
  const numbersContainer = document.querySelector(".numbers");
  const radius = 140; // Radio del círculo que contendrá los números
  const centerX = 160; // Coordenada X del centro del círculo
  const centerY = 160; // Coordenada Y del centro del círculo

  for (let i = 1; i <= 12; i++) {
    const number = document.createElement("div");
    number.textContent = i;
    number.classList.add("number");
    numbersContainer.appendChild(number);

    const angle = ((i - 3) * 30 * Math.PI) / 180; // Ángulo en radianes
    const x = centerX + radius * Math.cos(angle) - 10;
    const y = centerY + radius * Math.sin(angle) - 10;

    number.style.left = `${x}px`;
    number.style.top = `${y}px`;
  }
}
initHands();

//creamos una función que se ejecute cada segundo para actualizar el reloj

function updateClock() {
  //creamos un setInterval que se ejecute cada segundo

  setInterval(() => {

    //actualizamos la hora actual
    currentTime = new Date();

    //actualizamos el valor de la propiedad element de cada objeto
    hourHand.element.style.transform = `rotate(${hourHand.initialAngle - 90}deg)`;
    minuteHand.element.style.transform = `rotate(${minuteHand.initialAngle - 90}deg)`;
    secondHand.element.style.transform = `rotate(${secondHand.initialAngle - 90}deg)`;

    //actualizamos el valor de la propiedad initialAngle de cada objeto
    hourHand.initialAngle += hourHand.rotationAngle;
    minuteHand.initialAngle += minuteHand.rotationAngle;
    secondHand.initialAngle += secondHand.rotationAngle;
    
//usar innerHTML para mostrar la hora, día, mes y fecha

elementos.time.innerHTML = `<p>${currentTime.toLocaleTimeString("en-US")}</p>`;
elementos.date.innerHTML = `<p>${days[currentTime.getDay()]}, ${months[currentTime.getMonth()]} ${currentTime.getDate()}</p>`;
  }, 1000);
}

updateClock();


//creamos una función para cambiar el modo de la página

let isClicked = false;

function changeMode() {
  elementos.mode.addEventListener("click", darkMode);
}

//agregamos un nuevo elemento al objeto elementos
elementos.number = document.querySelectorAll(".number");
console.log(elementos.number);

changeMode();

function darkMode(){
  if(!isClicked){
    elementos.cuerpoDom.className = "active-dark";
    elementos.mode.className = "mode active-dark hand-dark";
    elementos.container.className = "container bg-dark";
    elementos.reloj.className = "reloj border-dark";
    elementos.center.className = "center active-dark hand-dark";
    hourHand.element.className = "hour active-dark hand-dark";
    minuteHand.element.className = "minute active-dark hand-dark";
    elementos.number.forEach(element => {
      element.className = "number active-dark";
    });
    elementos.link.className = "link active-dark";
    isClicked = true;
  }else{
    elementos.cuerpoDom.className = "";
    elementos.mode.className = "mode";
    elementos.container.className = "container";
    elementos.reloj.className = "reloj";
    elementos.center.className = "center";
    hourHand.element.className = "hour";
    minuteHand.element.className = "minute";
    elementos.number.forEach(element => {
      element.className = "number";
    });
    elementos.link.className = "link";
    isClicked = false;
  }
}