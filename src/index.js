
document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/dogs')
  .then(res => res.json())
  .then(json => {
    const dogs = json
    const div = document.querySelector('#table-body')
    dogs.forEach(dog => {
      div.innerHTML +=
      `<tr><td> ${dog.name} </td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id=${dog.id} class="dog-edit">Edit</button></td></tr>`

    })
    const form = document.querySelector("#dog-form")
    const submitButton = form.lastElementChild
    submitButton.addEventListener('click', () => {
      let name = form.name.value
      let breed = form.breed.value
      let sex = form.sex.value
      let id = submitButton.dataset.id

      var form = new FormData(document.getElementById('table-body'));
        fetch(`http://localhost:3000/dogs/${id}`, {
          method :"PATCH",
          body: form
        })
        // .then(res => res.json())
        // .then(json => {
        //   document.querySelector('.random').innerText +=  json
        // })
          // .then(response => response.json())
          // .then(json =>  console.log(JSON.parse(json)))
        //   {
        //   method: "POST",
        //   body: form
        // });

    })
    const table = document.querySelector('#table-body')
    table.addEventListener('click', ()=> {
      if (event.target.className === "dog-edit"){
        const dog = event.target.parentElement.parentElement;
        const dogName = dog.firstChild
        const dogBreed = dogName.nextElementSibling
        const dogSex = dogBreed.nextElementSibling

        form.name.placeholder = dogName.innerText
        form.breed.placeholder = dogBreed.innerText
        form.sex.placeholder = dogSex.innerText
        submitButton.dataset.id = event.target.dataset.id
        }
      })
    })
  })
