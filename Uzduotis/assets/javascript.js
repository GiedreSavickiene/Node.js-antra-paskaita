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