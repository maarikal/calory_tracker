// Storage Controller
// create later


// Item Controller
const ItemCtrl =(function () {
    // Item Constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    };
    // Data Structure
    const data = {
        items: [
           // {id: 0, name: "Šnitsel", calories: 1000},
            // {id: 1, name: "Küpsis", calories: 450},
            // {id: 2, name: "Keedumuna", calories:300}
        ],
        total: 0
    }
    return {
        getItems: function() {
            return data.items
        },
        addItem: function (name, calories) {
            let ID;
            // Create ID
            if(data.items.length > 0) {
                ID = data.items[data.items.length -1].id +1
            } else {
                ID = 0
            }
            // calories to number
            calories = parseInt(calories);
            // create new item
            newItem = new Item(ID, name, calories);
            // add to items array
            data.items.push(newItem);
           // return new item
            return newItem
        },
        getTotalCalories: function() {
            let total = 0;
            // look through items and add calories
            data.items.forEach(function (item) {
                total = total + item.calories;
            });
            // set total calories in data structure
            data.total = total;
            console.log(data.total)
            return data.total;
        },
        logData: function() {
            return data;
        }
    }
})();


// UI Controller
const UICtrl = (function (){
    // UI selectors
    const UISelectors = {
        itemList: '#item-list',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        addButton: '.add-btn',
        totalCalories: '.total-calories'
    }
    return {
        populateItemList: function(items) {
            // create HTML content
            let html = "";
            // parse data and create list items html
            items.forEach(function (item) {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong> ${item.name}: </strong> <em> ${item.calories} Calories </em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
                </li>`;
                })
            // insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function () {
            return UISelectors;
        },
        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function (item) {
            // create li element
            const li = document.createElement('li');
            // add class
            li.className = 'collection-item';
            // add ID
            li.id = `item-${item.id}`;
            // add HTML
            li.innerHTML = `<strong>${item.name}: </strong>
                <em>${item.calories} Calories </em>
                <a href='#' class='secondary-content'>
                    <i class='edit-item fa fa-pencil'> </i>
                </a>`;
            // insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },
        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = ''
        },
        showTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        }
    }
})();


// App Controller
const App = (function (ItemCtrl,  UICtrl) {
    // Load event listeners
    const loadEventListeners = function () {
        // get UI selectors
        const UISelectors = UICtrl.getSelectors();
        // add item event
        document.querySelector(UISelectors.addButton).addEventListener('click', itemAddSubmit);
    }
        // item add submit function
        const itemAddSubmit = function (event) {
            // get form input from UI COntroller
            const input = UICtrl.getItemInput()
            // check for name and calorie input
            if(input.name !== '' && input.calories !== '') {
                const newItem = ItemCtrl.addItem(input.name, input.calories)
                UICtrl.addListItem(newItem)
                // get total calories
                const totalCalories = ItemCtrl.getTotalCalories();
                // add total calories to UI
                UICtrl.showTotalCalories(totalCalories);
                // clear fields
                UICtrl.clearInput();
            }
            event.preventDefault()
        }
    return {
        init: function() {
            console.log("Initializing App")
            // fetch/get items from data structure
            const items = ItemCtrl.getItems();
            // populate items list
            UICtrl.populateItemList(items);
            // load event listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl);


// Initialize App
App.init();