const url = "http://localhost:3000/users";

window.addEventListener("load", fetchData);

function fetchData() {
  fetch(url)
    .then((result) => result.json())
    .then((users) => {
      if (users.length > 0) {
        let html = `<ul class="w-3/4 my-3 mx-auto flex flex-wrap gap-2 justify-center">`;
        users.forEach((user) => {
          html += `
        <li
          class="bg-${user.color}-200 basis-1/4 text-${user.color}-900 p-2 rounded-md border-2 border-${user.color}-400 flex flex-col justify-between">
<h3 class="text-lg font-semibold">${user.firstName} ${user.lastName}</h3> 
 <p>Position: ${user.position}</p>
 <p>Vikt:  ${user.weight}</p>
 <p>Längd: ${user.length}</p>
  <p>Klubb: ${user.club}</p>
  <p>Färg: ${user.color}</p>
  <p>Bästa fot: ${user.bestfoot}</p>          
          <p>Klubbadress: ${user.club}</p>
          <div>
          <button class="border border-${user.color}-400 rounded-md p-2 text-sm" onclick="setCurrentUser(${user.id})">
          Ändra
        </button>
        <button class="border border-${user.color}-400 rounded-md p-2 text-sm" onclick="deleteUser(${user.id})">
          Ta bort
        </button>
          </div>
        </li>`;
        });
        html += `</ul>`;

        const listContainer = document.getElementById("listContainer");
        listContainer.innerHTML = "";
        listContainer.insertAdjacentHTML("beforeend", html);
      }
    });
}

function setCurrentUser(id) {
  console.log("current", id);

  fetch(`${url}/${id}`)
    .then((result) => result.json())
    .then((user) => {
      console.log(user);
      userForm.firstName.value = user.firstName;
      userForm.lastName.value = user.lastName;
      userForm.position.value = user.position;
      userForm.weight.value = user.weight;
      userForm.length.value = user.length;
      userForm.club.value = user.club;
      userForm.color.value = user.color;
      userForm.bestfoot.value = user.bestfoot;

      localStorage.setItem("currentId", user.id);
    });
}

function deleteUser(id) {
  const confirmed = confirm(`Är du säker på att du vill ta bort?`);
  if (confirmed) {
    console.log("delete", id);
    fetch(`${url}/${id}`, { method: "DELETE" }).then((result) => fetchData());
  }
}

userForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const serverUserObject = {
    firstName: "",
    lastName: "",
    position: "",
    weight: "",
    length: "",
    club: "",
    color: "",
    bestfoot: "",
  };
  serverUserObject.firstName = userForm.firstName.value;
  serverUserObject.lastName = userForm.lastName.value;
  serverUserObject.position = userForm.position.value;
  serverUserObject.weight = userForm.weight.value;
  serverUserObject.length = userForm.length.value;
  serverUserObject.club = userForm.club.value;
  serverUserObject.color = userForm.color.value;
  serverUserObject.bestfoot = userForm.bestfoot.value;

  const id = localStorage.getItem("currentId");
  if (id) {
    serverUserObject.id = id;
  }

  const request = new Request(url, {
    method: serverUserObject.id ? "PUT" : "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(serverUserObject),
  });

  fetch(request).then((response) => {
    fetchData();

    localStorage.removeItem("currentId");
    userForm.reset();
  });
}

const exampleModal = document.getElementById("exampleModal");
if (exampleModal) {
  exampleModal.addEventListener("show.bs.modal", (event) => {});
}
