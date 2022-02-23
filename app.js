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
            {id: 0, name: "Šnitsel", calories: 1000},
            {id: 1, name: "Küpsis", calories: 450},
            {id: 2, name: "Keedumuna", calories:300}
        ],
        total: 0
    }
    return {
        getItems: function() {
            return data.items
        },
        logData: function() {
            return data;
        }
    }
})();


// UI Controller
const UICtrl = (function (){
    // UI selectors
    const UISelectors = { itemList: '#item-list'}
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
        }
    }
})();


// App Controller
const App = (function (ItemCtrl,  UICtrl) {
    return {
        init: function() {
            console.log("Initializing App")
            // fetch/get items from data structure
            const items = ItemCtrl.getItems();
            // populate items list
            UICtrl.populateItemList(items);
        }
    }
})(ItemCtrl, UICtrl);

// Initialize App
App.init();