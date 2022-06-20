
import controler from './controllers/controller.js'
console.log(controler)

function randomSkaicius(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


let a = randomSkaicius(1, 500);
let b = randomSkaicius(1, 500);
console.log(a)
console.log(b)

import { add, deduct, multiply, divide } from './controllers/controller.js'
console.log(add(a, b));
console.log(deduct(a, b));
console.log(multiply(a, b));
console.log(divide(a, b).toFixed(2));



