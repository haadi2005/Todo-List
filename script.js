const items_container = document.querySelector(".items");
const item_template = document.querySelector(".itemTemplate");
const add_btn = document.querySelector(".add");
const delete_item = document.querySelector(".deleteItem");

//Give that js array to items when page first loads up or refresh
let items = getItems();

function getItems() {
  //Gets items from localstorage if they exists and if not get an empty array
  const value = localStorage.getItem("todo") || "[]";
  //converts json array to Javascript array
  return JSON.parse(value);
}

// Save the items array to localStorage
function setItems(items) {
  //converts our text to json array to save in localstorage
  const itemsJson = JSON.stringify(items);
  // setting our key and value (items/our todo)
  localStorage.setItem("todo", itemsJson);
}

function addItem() {
  //unshift adds empty array with a checkbox being false in items
  items.unshift({
    description: "",
    completed: false,
  });

  //now set the item/todo to items in our local storage
  setItems(items);
  refreshList();
}

// function to make text save
function updateItem(item, key, value) {
  //Sets the item's value with value we pass, For example:
  // {description: "Buy milk", completed: false} here "buy milk" is value we assigned
  item[key] = value;

  //Saves the item from above in items list
  setItems(items);
  //Updates the DOM, our UI *
  refreshList();
}

function refreshList() {
  //todo sort items

  //every thing up in "items div"*
  items_container.innerHTML = "";

  //we will set layout(html) for every single item/todo
  for (const item of items) {
    //copies the input box and checkbox and assigns to itemElement
    let itemElement = item_template.content.cloneNode(true);
    //Assigns input box to descriptionInput, so we can assign user text to it
    const descriptionInput = itemElement.querySelector(".item-description");
    //Assigns check-box to completedInput, so we can change it later
    const completedInput = itemElement.querySelector(".item-completed");

    // const delete_item = itemElement.querySelector(".deleteItem");

    //set the " description: "" "  to value of descriptionInput
    descriptionInput.value = item.description;
    //set the "completed: false" to the boolan of completedInput (so 0 or 1)
    completedInput.checked = item.completed;

    //when user make changes in description(input box), update it in array
    descriptionInput.addEventListener("change", () => {
      // updates the key, value: {description: "Buy milk"}
      updateItem(item, "description", descriptionInput.value);
    });

    //when user checks the completed(check box), update it in array
    completedInput.addEventListener("change", () => {
      // updates the key, value: {completed: true}
      updateItem(item, "completed", completedInput.checked);
    });

    // finally this will append the our input box and checkbox
    items_container.append(itemElement);

    // Deletes all todo items and local storage
    delete_item.addEventListener("click", () => {
      descriptionInput.remove();
      completedInput.remove();
      localStorage.removeItem("todo");
      items.length = 0;
      refreshList();
    });
  }
}

add_btn.addEventListener("click", addItem);

refreshList();
