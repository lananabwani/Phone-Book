let users = [
    {
        name: "Lana Nabwani",
        phone: "052-4563854",
        img: "pfp1",
        age: 19,
        country: "Israel"
    },
    {
        name: "Merna Saab",
        phone: "055-8546378",
        img: "pfp2",
        age: 19,
        country: "Israel"
    },
    {
        name: "Sereen Rizik",
        phone: "054-5167865",
        img: "pfp3",
        age: 19,
        country: "Israel"
    },
]

users.forEach((user) => getUser(user));


function getUser(user){
    const liItem = document.createElement('li');
    const ul = document.getElementById("phone-list");

    liItem.classList.add("flex");
    liItem.innerHTML = `
    <div class="flex " id=${user.phone}>
              <img
                class="profile"
                src="./imgs/${user.img}.jpg"
                alt="user pfp placeholder"
              />
              <h4>${user.name}</h4>
            </div>
            <div class="flex">
                <button class="icon" onclick=showContact("${user.phone}")>
                  <img src="./imgs/info.png" />
                </button>
                <button class="icon" onclick=editContact("${user.phone}")>
                  <img src="./imgs/edit.png" />
                </button>
                <button class="icon" onclick=deleteContact("${user.phone}")>
                  <img src="./imgs/delete.png"/>
                </button>
              </div>
    `
    ul.append(liItem)
}

 function openModal () 
 {
    document.getElementById( 'myModal' ).style.display = 'flex';
 }

 function closeModal ( event ) {
    if ( event.target === document.getElementById( 'myModal' ) || event.target === document.getElementById( 'closeModalBtn' ) ) {
          document.getElementById( 'myModal' ).style.display = 'none';
        }
         document.getElementById('myModal').style.display = 'none';
      } 

function showContact(phoneNumber)
{
    openModal();

    const div = document.getElementById("modal-content");

    const user = users.filter((user)=> user.phone === phoneNumber)[0];
    div.innerHTML = `
    <div class="flex-popup">
              <img
                class="profile"
                src="./imgs/${user.img}.jpg"
                alt="user pfp placeholder"
              />
              <h2>${user.name}</h2>
              <h3>${user.phone}</h3>
              <h3>${user.country}</h3>
              <h3>${user.age}</h3>
              </div>
            <button class="close-btn" id="closeModalBtn" onclick="closeModal(event)">&times;</button>        

    `
}

function editContact(phoneNumber)
{
    openModal();
    const div = document.getElementById("modal-content");
    const user = users.filter((user)=> user.phone === phoneNumber)[0];

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
    <button onclick=saveContact("${user.phone}")>Save</button>
    <button class="close-btn" id="closeModalBtn" onclick="closeModal(event)">&times;</button>  
    `

}

function saveContact(phoneNumber)
{
    const user = users.filter((user)=> user.phone === phoneNumber)[0];


    user.name = document.getElementById("name").value;
    user.phone = document.getElementById("number").value;
    user.age = document.getElementById("age").value;
    user.country = document.getElementById("address").value;
    user.img = document.getElementById("image").value;

    const userDiv = document.getElementById(`${phoneNumber}`).parentElement;

    userDiv.innerHTML = `
    <div class="flex" id=${user.phone}>
              <img
                class="profile"
                src="./imgs/${user.img}.jpg"
                alt="user pfp placeholder"
              />
              <h4>${user.name}</h4>
            </div>
            <div class="flex">
                <button class="icon" onclick=showContact("${user.phone}")>
                  <img src="./imgs/info.png" />
                </button>
                <button class="icon" onclick=editContact("${user.phone}")>
                  <img src="./imgs/edit.png" />
                </button>
                <button class="icon" onclick=deleteContact("${user.phone}")>
                  <img src="./imgs/delete.png"/>
                </button>
              </div>
    `

}

function deleteContacts()
{
    const ul = document.getElementById("phone-list");
    ul.innerHTML = "";
    users = [];
}

function addNewUser(e)
{
    console.log("h")
    e.preventDefault();
    openModal();
    const div = document.getElementById("modal-content");

    div.innerHTML = `
    <form class="edit-form">
    <h2>Add new Contact</h2>
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
    <button class="close-btn" id="closeModalBtn" onclick="closeModal(event)">&times;</button>  
    `
}
function closeModal()
{
    document.getElementById('myModal').style.display = 'none';

}

function saveNewContact()
{
    if(document.getElementById("name").value != "" &&  document.getElementById("number").value != "" && document.getElementById("image").value != "" && document.getElementById("age").value != "" && document.getElementById("address").value != "")
    {
        newUser = { 
            name: document.getElementById("name").value,
            phone: document.getElementById("number").value,
            img: document.getElementById("image").value,
            age: document.getElementById("age").value,
            country: document.getElementById("address").value
        }
    
        getUser(newUser);
        closeModal();
    } else 
        alert("some infos are empty");
}

function deleteContact(phoneNumber)
{
    users = users.filter((user) => user.number !== phoneNumber);
    document.getElementById(`${phoneNumber}`).parentElement.remove();  
}