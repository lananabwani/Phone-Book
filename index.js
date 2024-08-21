let users = [
    {
        id:"1",
        name: "Lana Nabwani",
        phone: "052-4563854",
        img: "pfp1",
        age: 19,
        country: "Israel"
    },
    {
        id:"2",
        name: "Merna Saab",
        phone: "055-8546378",
        img: "pfp2",
        age: 19,
        country: "Israel"
    },
    {
        id:"3",
        name: "Sereen Rizik",
        phone: "054-5167865",
        img: "pfp3",
        age: 19,
        country: "Israel"
    },
];


// Render initial user list
users.forEach((user) => getUser(user));

function getUser(user) {
    const liItem = document.createElement('li');
    const ul = document.getElementById("phone-list");

    liItem.classList.add("flex");
    liItem.classList.add(user.id);
    liItem.innerHTML = `
    <div class="flex">
        <img class="profile" src="./imgs/${user.img}.jpg" alt="user pfp placeholder" />
        <h4>${user.name}</h4>
    </div>
    <div class="flex">
        <button class="icon" onclick="showContact('${user.id}')">
            <img src="./imgs/info.png" />
        </button>
        <button class="icon" onclick="editContact('${user.id}')">
            <img src="./imgs/edit.png" />
        </button>
        <button class="icon" onclick="deleteContact('${user.id}')">
            <img src="./imgs/delete.png"/>
        </button>
    </div>
    `;
    ul.appendChild(liItem);
}


const search = document.querySelector(".search-bar");
const ul = document.getElementById("phone-list");

search.addEventListener("input", (e) => {
    const filteredList = users.filter((user) => {
      return user.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
  
    ul.innerHTML = "";
    filteredList.forEach((user) => getUser(user));
  });


function openModal() {
    document.getElementById('myModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

function showContact(contactId) {
    openModal();
    const div = document.getElementById("modal-content");
    div.innerHTML = "";
    const user = users.find((user) => user.id === contactId);
    div.innerHTML = `
    <div class="flex-popup">
        <img class="profile" src="./imgs/${user.img}.jpg" alt="user pfp placeholder" />
        <h2>${user.name}</h2>
        <h3>${user.phone}</h3>
        <h3>${user.country}</h3>
        <h3>${user.age}</h3>
    </div>
    <button class="close-btn" id="closeModalBtn" onclick="closeModal()">&times;</button>
    `;
}

function editContact(contactId) {
    openModal();
    const div = document.getElementById("modal-content");
    div.innerHTML = "";
    const user = users.find((user) => user.id === contactId);

    div.innerHTML = `
    <form class="edit-form">
        <h2>Edit Contact</h2>
        <div>
            <label>Name:</label>
            <input type="text" id="name" value="${user.name}"/>
        </div>
        <div>
            <label>Number:</label>
            <input type="text" id="number" value="${user.phone}"/>
        </div>
        <div>
            <label>Age:</label>
            <input type="number" id="age" value="${user.age}"/>
        </div>
        <div>
            <label>Address:</label>
            <input type="text" id="address" value="${user.country}"/>
        </div>
        <div>
            <label>Image:</label>
            <input type="text" id="image" value="${user.img}"/>
        </div>
    </form>
    <button onclick="saveContact('${user.phone}')">Save</button>
    <button class="close-btn" id="closeModalBtn" onclick="closeModal()">&times;</button>
    `;
}

function saveContact(phoneNumber) {
    const user = users.find((user) => user.phone === phoneNumber);

    user.name = document.getElementById("name").value;
    user.phone = document.getElementById("number").value;
    user.age = document.getElementById("age").value;
    user.country = document.getElementById("address").value;
    user.img = document.getElementById("image").value;

    const userDiv = document.getElementsByClassName(user.id)[0];
    userDiv.innerHTML = `
    <div class="flex">
        <img class="profile" src="./imgs/${user.img}.jpg" alt="user pfp placeholder" />
        <h4>${user.name}</h4>
    </div>
    <div class="flex">
        <button class="icon" onclick="showContact('${user.id}')">
            <img src="./imgs/info.png" />
        </button>
        <button class="icon" onclick="editContact('${user.id}')">
            <img src="./imgs/edit.png" />
        </button>
        <button class="icon" onclick="deleteContact('${user.id}')">
            <img src="./imgs/delete.png"/>
        </button>
    </div>
    `;
    closeModal();
}

function deleteContacts() {
    users = [];
    document.getElementById("phone-list").innerHTML = "";
}

function addNewUser(e) {
    e.preventDefault();
    openModal();
    const div = document.getElementById("modal-content");

    div.innerHTML = `
    <form class="edit-form">
        <h2>Add New Contact</h2>
        <div>


            <label>Name:</label>
            <input type="text" id="name" placeholder="Contact name"/>
        </div>
        <div>
            <label>Number:</label>
            <input type="text" id="number" placeholder="Contact number"/>
        </div>
        <div>
            <label>Age:</label>
            <input type="number" id="age" placeholder="Contact age"/>
        </div>
        <div>
            <label>Address:</label>
            <input type="text" id="address" placeholder="Contact Address"/>
        </div>
        <div>
            <label>Image:</label>
            <input type="text" id="image" placeholder="Contact Image"/>
        </div>
    </form>
    <button onclick="saveNewContact()">Save</button>
    <button class="close-btn" id="closeModalBtn" onclick="closeModal()">&times;</button>
    `;
}

function saveNewContact() {
    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;
    const age = document.getElementById("age").value;
    const address = document.getElementById("address").value;
    const image = document.getElementById("image").value;

    if (name && number && age && address && image) {
        const newUser = { 
            id: users.length+1,
            name,
            phone: number,
            img: image,
            age,
            country: address
        };

        users.push(newUser);
        getUser(newUser);
        closeModal();
    } else {
        alert("Please fill in all fields.");
    }
}

function deleteContact(contactId) {
    users = users.filter((user) => user.id !== contactId);
    document.getElementsByClassName(contactId)[0].remove();
}
