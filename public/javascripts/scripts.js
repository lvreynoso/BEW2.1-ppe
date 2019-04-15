// scripts.js

if (document.querySelector('#new-pet')) {
    document.querySelector('#new-pet').addEventListener('submit', (event) => {
        event.preventDefault()

        let pet = {}
        const inputs = document.querySelectorAll('.formControl')
        for (const input of inputs) {
            pet[input.name] = input.value
        }

        axios.post('/pets', pet)
            .then(function (response) {
                window.location.replace(`/pets/${response.data.pet._id}`)
            })
            .catch(function (error) {
                const alert = document.getElementById('alert')
                alert.classList.add('alert-warning')
                alert.textContent = 'Oops, something went wrong saving your pet. Please check your information and try again.'
                alert.style.display = 'block'
            })
    })
}