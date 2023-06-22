// const title = document.getElementById("title");
// const desc = document.getElementById("desc");
// const form = document.querySelector("form");
// const container = document.querySelector(".container");
// const tasks = localStorage.getItem('tasks')?JSON.parse(localStorage.getItem('tasks')):[]
// showalltasks()
// function showalltasks() {
//   tasks.forEach((value, index) => {
//     const div = document.createElement("div");
//     div.setAttribute("class", "task");

//     const innerdiv = document.createElement("div");
//     div.append(innerdiv);

//     const p = document.createElement("p");
//     p.innerText = value.title;
//     innerdiv.append(p);

//     const span = document.createElement("span");
//     span.innerText = value.desc;
//     innerdiv.append(span);

//     const btn = document.createElement("button");
//     btn.setAttribute("class", "delbtn");
//     btn.innerText = "-";

//     btn.addEventListener("click", () => {
//       removetasks();
//       tasks.splice(index, 1);
//       localStorage.setItem("tasks", JSON.stringify(tasks));

//       showalltasks();
//     });

//     div.append(btn);
//     container.append(div);
//   });
// }
// function removetasks() {
//   tasks.forEach(() => {
//     const div = document.querySelector(".task");
//     div.remove();
//   });
// }

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   removetasks();
//   tasks.push({
//     title: title.value,
//     desc: desc.value,
//   });
//   localStorage.setItem("tasks", JSON.stringify(tasks));
//   showalltasks();
// });
// // 
const title = document.getElementById("title");
const desc = document.getElementById("desc");
const form = document.querySelector("form");
const container = document.querySelector(".container");
const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
showAllTasks();

function showAllTasks() {
  tasks.forEach((value, index) => {
    const div = document.createElement("div");
    div.setAttribute("class", "task");

    const innerDiv = document.createElement("div");
    div.append(innerDiv);

    const p = document.createElement("p");
    p.innerText = value.title;
    innerDiv.append(p);

    const span = document.createElement("span");
    span.innerText = value.desc;
    innerDiv.append(span);

    const btn = document.createElement("button");
    btn.setAttribute("class", "delbtn");
    btn.innerText = "-";

    btn.addEventListener("click", () => {
      removeTasks();
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      showAllTasks();
    });

    div.append(btn);
    container.append(div);
  });
}

function removeTasks() {
  const taskDivs = document.querySelectorAll(".task");
  taskDivs.forEach((div) => {
    div.remove();
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const trimmedTitle = title.value.trim();
  const trimmedDesc = desc.value.trim();

  if (trimmedTitle === "" || trimmedDesc === "") {
    showPopup("Title and description cannot contain spaces");
    return;
  }

  if (tasks.some((task) => task.title === trimmedTitle)) {
    // Check for duplicate title
    showPopup("Title must be unique");
    return;
  }


  removeTasks();
  tasks.push({
    title: trimmedTitle,
    desc: trimmedDesc,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showAllTasks();
});
function showPopup(message) {
  const modal = document.getElementById("customModal");
  const popupMessage = document.getElementById("popupMessage");
  popupMessage.textContent = message;

  modal.style.display = "block";
  document.body.classList.add("modal-open");

  const closeBtn = modal.querySelector(".close");
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
    }
  });
}