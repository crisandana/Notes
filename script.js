const button = document.getElementById("add"); //"add" matches to the id from <button>(html)
button.addEventListener("click", handleClick); // adding an event listener by using, button.addEventListener()
// syntax addEventListener(type, handleFunction);

function handleClick(){
    const input = document.getElementById("text"); //"text" matches to the id from <input>(html)
    const note = input.value; // const note = findHTMLelement.value

    if(note) {
        const list = document.getElementById("list"); // Select the <ul> element using the id property
        const item = document.cretateElement("li"); // Create a new <item></item> element 
        item.textContent = note; // Add the text content //used to set node of item 
// Syntax: parentNode.appendChild(childNode);       
        list.appendChild(item); // Append the item element to the <ul> element
        input.value = "";  // clear input field
        input.focus();   // specified element can be focused     
    }
}
