const url = 'http://localhost:5001'

const transferData = async (url, method = 'GET', data = {}) => {
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (method != 'GET') {
        options.body = JSON.stringify(data)
    }

    const resp = await fetch(url, options)

    return resp.json()
}

const getData = () => {

    transferData(url + '/show-data')
        .then(resp => {
            console.log(resp)

            let html = '<ul>'

            resp.forEach(value => {


                html += `<li data-id="${value._id}">
                <span class='content'>${value.content}</span>
                ${value.data}
            <button class="delete-data">Trinti</button>
            <button class="edit-data">Redaguoti</button>
                            
             </li>`
            })

            html += '</ul>'

            document.querySelector('#list').innerHTML = html



            document.querySelectorAll('.delete-data').forEach(element => {
                let id = element.parentElement.getAttribute('data-id')

                element.addEventListener('click', () => {

                    transferData(url + '/delete-data/' + id, 'DELETE')

                        .then(resp => {
                            getData()
                        })
                })
            })

            document.querySelectorAll('.edit-data').forEach(element => {
                let id = element.parentElement.getAttribute('data-id')

                let content = element.parentElement.querySelector('.content').textContent


                element.addEventListener('click', () => {

                    document.querySelector('.form-control').value = content
                    document.querySelector('.form-control').setAttribute('data-id', id)

                })
            })

            document.querySelector('.edit-btn').addEventListener('click', () => {

                let id = document.querySelector('.form-control').getAttribute('data-id')
                let nameValue = document.querySelector('.form-control').value
                let updateObject = { content: nameValue }

                transferData(url + '/edit-data/' + id, 'PUT', updateObject)
                    .then(resp => {
                        getData()
                    })
            })
        })

}



window.addEventListener('load', () => {
    getData()
})




