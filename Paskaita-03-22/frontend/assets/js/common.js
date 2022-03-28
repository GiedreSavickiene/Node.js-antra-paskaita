fetch('http://localhost:5001')
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp)

        let html = '<h2>Nepavyko priimti duomenu</h2>'

        if (resp.status === 'success' && resp.data) {
            html = `<table>
                        <thead>
                            <th>City</th>
                            <thEmail></th>
                            <th>Name</th>
                            <th>OrderId</th>
                            <th>Phone</th>
                            <th>Street</th>
                        </thead>
                    <tbody>`
            resp.data.forEach(value => {
                html += `<tr>
                            <td>${value.city}</td>
                            <td>${value.email}</td>
                            <td>${value.name}</td>
                            <td>${value.orderId}</td>
                            <td>${value.phone}</td>
                            <td>${value.street}</td>

                        </tr>`

            })

            html += `</tbody></table>`
        }

        document.querySelector('#app').innerHTML = html
    })






