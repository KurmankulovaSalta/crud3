let nameInp = document.querySelector(".name");
let emailInp = document.querySelector(".email");
let imgInp = document.querySelector(".imageUrl");
let phoneInp = document.querySelector(".phone");
let createBtn = document.querySelector(".btn1");
let list = document.querySelector(".task-list");

createBtn.addEventListener("click", () => {
  if (
    !nameInp.value.trim() ||
    !emailInp.value.trim() ||
    !imgInp.value.trim() ||
    !phoneInp.value.trim()
  ) {
    alert("заполните поле");
    return;
  }
  let obj = {
    name: nameInp.value,
    email: emailInp.value,
    img: imgInp.value,
    phone: phoneInp.value,
  };
  setItemToStorage(obj);
  createElement();
  nameInp.value = "";
  emailInp.value = "";
  imgInp.value = "";
  phoneInp.value = "";
});

function setItemToStorage(task) {
  if (!localStorage.getItem("tasks-data")) {
    localStorage.setItem("tasks-data", "[]");
  }

  let data = JSON.parse(localStorage.getItem("tasks-data"));
  data.push(task);
  localStorage.setItem("tasks-data", JSON.stringify(data));
}

function createElement() {
  let newData = JSON.parse(localStorage.getItem("tasks-data"));
  console.log(newData);

  list.innerHTML = "";
  newData.forEach((item, index) => {
    let li = document.createElement("li");
    // let btnDelete = document.createElement("button");
    // let btnEdit = document.createElement("button");
    // li.innerText = Object.values(item);
    // btnDelete.innerText = "Delete";
    // btnEdit.innerText = "Update ";
    console.log(item);

    li.innerHTML += `<div><h3>${item.name}</h3>
    <h6>${item.email}</h6> <p>${item.phone}</p><img src=${item.img} alt="hello" width="150" /><button class='btn-delete' id=${index}>Delete</button><button class='btn-edit' id=${index}>Edit</button></div>`;
    // li.append(btnDelete);
    // li.append(btnEdit);

    // btnEdit.addEventListener("click", () => {
    //   editElement(index);
    // });

    list.append(li);
    // li.innerHTML += `<img src=${imgInp.value} alt="hello" width="150" />`;
  });
  const btnDelete = document.querySelectorAll(".btn-delete");
  console.log(btnDelete);
  btnDelete.forEach((item) => {
    item.addEventListener("click", (e) => {
      let index = e.target.id;
      // console.log(index);
      deleteElement(index);
    });
  });
  const btnEdit = document.querySelectorAll(".btn-edit");
  console.log(btnEdit);
  btnEdit.forEach((item) => {
    item.addEventListener("click", (e) => {
      let index = e.target.id;
      editElement(index);
    });
  });
}
createElement();

function deleteElement(index) {
  let data = JSON.parse(localStorage.getItem("tasks-data"));
  console.log(data);
  data.splice(index, 1);
  localStorage.setItem("tasks-data", JSON.stringify(data));
  createElement();
}

let mainModal = document.querySelector(".main-modal");
let inpEdit1 = document.querySelector(".inp-edit1");
let inpEdit2 = document.querySelector(".inp-edit2");
let inpEdit3 = document.querySelector(".inp-edit3");
let inpEdit4 = document.querySelector(".inp-edit4");
let btnCloser = document.querySelector(".btn-closer");
let btnSave = document.querySelector(".btn-save");

// console.log(mainModal, inpEdit, btnCloser);

function editElement(index) {
  mainModal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("tasks-data"));

  // console.log(index);
  // console.log(data);

  inpEdit1.value = data[index].name;
  inpEdit2.value = data[index].email;
  inpEdit3.value = data[index].img;
  inpEdit4.value = data[index].phone;

  // inpEdit.value = Object.values(data[index]);
  inpEdit1.setAttribute("id", index);
  inpEdit2.setAttribute("id", index);
  inpEdit3.setAttribute("id", index);
  inpEdit4.setAttribute("id", index);

  btnCloser.addEventListener("click", () => {
    mainModal.style.display = "none";
  });
}
btnSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("tasks-data"));
  let index = inpEdit1.id;
  let index1 = inpEdit2.id;
  let index2 = inpEdit3.id;
  let index3 = inpEdit4.id;
  if (
    !inpEdit1.value.trim() ||
    !inpEdit2.value.trim() ||
    !inpEdit3.value.trim() ||
    !inpEdit4.value.trim()
  ) {
    alert("заполните поле!");
    return;
  }
  let editedTask = {
    name: inpEdit1.value,
    email: inpEdit2.value,
    img: inpEdit3.value,
    phone: inpEdit4.value,
  };

  data.splice(index, 4, editedTask);
  localStorage.setItem("tasks-data", JSON.stringify(data));
  mainModal.style.display = "none";
  createElement();
});
