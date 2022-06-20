

const vardas = 'Jonas';
const pavarde = { pavarde: "Petrauskas" }
const adresas = () => {
    return "Savanoriu pr.11"
}

export default { vardas, pavarde, adresas }
//export default vardas

let add = (a, b) => {
    return a + b;
}
console.log(add(2, 5))

let deduct = (a, b) => {
    return a - b
}

let multiply = (a, b) => {
    return a * b
}

let divide = (a, b) => {
    return a / b
}

export { add, deduct, multiply, divide }
