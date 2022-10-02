// Model
const notes = [
    // "Note 1",
    // "Note 2",
    // "Note 3"
    // ...
  ];
  
  // View
  // see HTML
  function buildLIItem(note) {
    const item = document.createElement("li");
    item.textContent = note;
    item.addEventListener("click", handleClickLIItem);
    return item;
  }
  
  // Controller
document.addEventListener("DOMContentLoaded", function (){
    const button = document.getElementById("add"); //"add" matches to the id from <button>(html)
    button.addEventListener("click", handleClick); // adding an event listener by using, button.addEventListener()
// syntax addEventListener(type, handleFunction);
    const input = document.getElementById("text"); //"text" matches to the id from <input>(html)
    input.addEventListener("keydown", handleKeyDown);
})

function handleClick() {
    add();
}

function handleKeyDown(event) {
    if(event.key === "Enter") {
        add();
    }
}

function handleClickItem(event) {
    const list = document.getElementById("list");
    list.removeChild(event.target);
}

function add(){
    const input = document.getElementById("text"); //"text" matches to the id from <input>(html)
    const note = input.value; // const note = findHTMLelement.value
    if(note) {
        const list = document.getElementById("list"); // Select the <ul> element using the id property
        const item = buildLIItem(note);      
        list.appendChild(item); // Append the item element to the <ul> element
        notes.push(note);
        input.value = "";  // clear input field
        input.focus();   // specified element can be focused     
    }
}
