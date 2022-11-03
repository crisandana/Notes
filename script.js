// Model
let notes = [
    // "Note 1",    // { id: "676c9ba771", title: "Title 1", text: "ToDo 1" },
    // "Note 2",    // { id: "dc19d1538f", title: "Title 2", text: "ToDo 2" },
    // "Note 3"     // { id: "fd8c75b4fb", title: "Title 3", text: "ToDo 2" },
    // ...          // ... 
];  
  // View
  // see HTML
  function buildLIItem(note) {    
    const item = document.createElement("li"); // create a item element
    item.id = note.id; // Step 13: implement new model
    item.classList.add("note");
    
    const article = document.createElement("article"); // create a article element
    const title = document.createElement("header"); // Creates a new element node with the given tag(header)
    title.textContent = note.title;
    title.classList.add("note__title");
    const text = document.createElement("p");
    text.textContent = note.text;
    text.classList.add("note__text");

    const controls = document.createElement("div"); // create a new element node with the given tag (<div>)
    controls.classList.add("note__controls");
    const button = document.createElement("button"); // create <button> element
    button.classList.add("note__controls_delete");
    button.addEventListener("click", handleClickDelete(note.id)); // elem.addEventListener ("click", myFunction(event, myObject));
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-trash", "fa-2x");
    
    
    controls.appendChild(button); // parentElem.appendChild(node)

    article.appendChild(title); // parentElem.appendChild(node)
    article.appendChild(text); //Element.append()
    article.appendChild(controls);
    item.appendChild(article);
    return item;
  }  
  // Controller
document.addEventListener("DOMContentLoaded", function (){
    init();    
})

function handleClick() {
    add();
    save();
}

function handleClickDelete(id) {
    return function() {
        const item = document.getElementById(id);
        const list = document.getElementById("list");
        list.removeChild(item);
        const pos = notes.findIndex((note) => note.id === id);
        notes.splice(pos, 1); //splice(start, deleteCount)
        save();
    };
}

function handleRegistration(registration) {
    registration.addEventListener("updatefound", function () {
        if (registration.installing) {
            const worker = registration.installing;
            worker.addEventListener("statechange", function () {
                if (worker.state === "installed") {
                    handleUpdate(worker);
                }
            });
        } else if (registration.waiting) {
            const worker = registration.waiting;
            if (worker.state === "installed") {
                handleUpdate(worker);
            }
        }
    });
}

function handleUpdate(worker) {
    if (navigator.serviceWorker.controller) {
        const modal = document.getElementById("service-worker");
        const button = document.getElementById("service-worker-control");
        button.addEventListener("click", function () {
            worker.postMessage({ action: "skipWaiting" });
            modal.style.display = "none";
        });
        modal.style.display = "block";
    }
}

function add(){
    const title = document.getElementById("title"); //"title" matches to the id from <title>(html)
    const text = document.getElementById("text"); //"text" matches to the id from <text>(html)

    if(title.value || text.value) {
        const list = document.getElementById("list"); // Select the <ul> element using the id property
        const note = createNote(title.value, text.value);
        const item = buildLIItem(note);      
        list.appendChild(item); // Append the item element to the <ul> element
        notes.push(note);
        title.value = "";  // clear input field
        text.value = "";          
    }
}

function createNote(title, text) {
    const id = generateId(title, text);
    return { id, title, text };
}

function generateId(title, text, length = 10) {
    return CryptoJS.SHA256(title + text + newDate())
    .toString()
    .substring(0, length);    
}

function init() {
    registerEventHandlers();
    load();
    draw();
    registerServiceWorker(); // Step 18 add a service worker
  }
  
  function registerEventHandlers() {
    const button = document.getElementById("add");
    button.addEventListener("click", handleClick);
  }
  
  function registerServiceWorker() { // This code checks if the browser supports service workers.
      // Supported!
    if("serviceWorker" in navigator) { 
        let refreshing;
        navigator.serviceWorker.addEventListener("controllerchange", function () {
            if (refreshing) return;
            window.location.reload();
            refreshing = true;
        });
        navigator.serviceWorker
        .register("/notes/sw.js", { scope: "/notes/ " })
        .then((registration) => handleRegistration(registration))
        .catch((error) => console.log("Service Worker registration failed!", error));
    }

  }
  function load() {
    notes = JSON.parse(localStorage.getItem("notes")) || [];
  }
  
  function save() {
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  
  function draw() {
    const list = document.getElementById("list");
    while (list.firstChild) list.removeChild(list.firstChild);
    notes.forEach((note) => list.appendChild(buildLIItem(note)));
  }
