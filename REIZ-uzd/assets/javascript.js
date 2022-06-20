import { json } from "express"

document.querySelectorAll('.delete-button').forEach((element) => {
    element.addEventListener('click', () => {
        let id = element.getAttribute('data-id')
        console.log(id)

        fetch('http://localhost:3004/' + id, {
            method: 'DELETE'
        })
            .then(response => {
                window.location.reload()
            })




    })
})

document.querySelector('.ascending').addEventListener('click', () => {

    for (let i = 0; i < jsonData.lenght; i++) {
        console.log(jsonData[i].name)
    }

})

