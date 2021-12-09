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
        logData: function() {
            return data;
        }
    }
})();


// UI Controller
const UICtrl = (function (){
    console.log("UICtrl")
})();


// App Controller
const  App = (function (ItemCtrl, UICtrl) {
    return {
        init: function() {
            console.log("Initializing App")
        }
    }
})(ItemCtrl, UICtrl);

// Initialize App
App.init();