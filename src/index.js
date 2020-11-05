URL = 'http://localhost:3000/dogs'
const tableBody = document.getElementById("table-body")
const form = document.querySelector("form")
const dogArray = []

function fetchDogs(){
    fetch(URL)
    .then(resp => resp.json())
    .then(json => {
        json.forEach(dog => {
            dogArray.push(dog)
        })
        renderDogs(dogArray)
    
    })
}

function renderDogs(dogs){
    dogs.forEach(dog => {
        renderDog(dog)
    })
}

function renderDog(d){
    const tr = document.createElement("tr")
    tr.innerHTML = `<td>${d.name}</td> <td>${d.breed}</td> <td>${d.sex}</td> <td><button data-id=${d.id}>Edit Dog</button></td>`


    tableBody.appendChild(tr)
}

function editListener(){
    document.addEventListener("click", event => {
        if (event.target.tagName === 'BUTTON'){
            const editDog = dogArray.find(dog => dog.id == event.target.dataset.id)

            form['name'].value = editDog.name
            form['breed'].value = editDog.breed
            form['sex'].value = editDog.sex
        }
    })
}

function formListener(){
    form.addEventListener("submit", event => {
        event.preventDefault()
        editDog(event)
    })
}

function editDog(event){
    const configDog = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: form['name'].value,
            breed: form['breed'].value,
            sex: form['sex'].value
        })
    }

    const doggoID = dogArray.find(dog => dog.name == form['name'].value).id

    fetch(`${URL}${doggoID}`, configDog)
    .then(resp => resp.json())
    .then(json => updateDog(json))

}

function updateDog(d){
    const dogRow = tableBody.children[d.id-1]

    dogRow.innerHTML = `<td>${d.name}</td> <td>${d.breed}</td> <td>${d.sex}</td> <td><button data-id=${d.id}>Edit Dog</button></td>`

}

function main(){
    fetchDogs()
    editListener()
    formListener()

}
{/* <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr> */}

main()
