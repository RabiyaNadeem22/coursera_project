function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-theme");
  var image = document.getElementById("logo");
  if (image.src.match("img/logo.png")) {
    image.src = "img/logo2.png";
  } else {
    image.src = "img/logo.png";
  }
}

var item1 = {
  name: "Ravioli",
  type: "pasta",
  course: "main",
  description: "Delicious filled pasta",
  price: "12$",
};
var item2 = {
  name: "Steak",
  type: "meat",
  course: "main",
  description: "Delicious charcoal grilled beef steak",
  price: "21$",
};
var item3 = new Object();
item3.name = "Rigatoni all’amatriciana";
item3.type = "Pasta";
item3.course = "Main";
item3.description = "Delicious tomato rigatoni";
item3.price = "15$";
const pastaitem = {
  name: "",
  type: "pasta",
  course: "main",
  price: "10$",
};
var item4 = Object.create(pastaitem);
item4.name = "Spaghetti alla carbonara";
item4.description = "Delicious pasta alla carbonara";

const MENU_TYPES = {
  Food: {
    id: "Food",
    proto: {
      related_wine: undefined,
      getRelatedWineId: function () {
        if (typeof this.related_wine !== "undefined") {
          return this.related_wine;
        }
      },
    },
  },
  Drink: {
    id: "Drink",
    proto: {
      name: undefined,
    },
  },
};
const menu_proto = {
  Food: {},
  Drink: {},
  getRelatedDrink(food_id) {
    var food = this.Food[food_id];
    if (food) {
      var related_drink_id = food.getRelatedWineId();
      if (typeof related_drink_id !== "undefined") {
        var relatedDrink = this.Drink[related_drink_id];
        // Append related drink information to the "drinks-menu" div
        var drinksMenuDiv = document.getElementById("drinks-menu");
        var drinkInfo = document.createElement("p");
        drinkInfo.textContent = `Related Drink: ${relatedDrink.name}, ${relatedDrink.description}, Price: ${relatedDrink.price}`;
        drinksMenuDiv.appendChild(drinkInfo);

        return relatedDrink;
      }
    }
  },
};

var menu = Object.create(menu_proto);

fetch("data/menu.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });

function appendData(data) {
  var menudata = data.menu;
  var foodTable = createMenuTable("");
  var drinksTable = createMenuTable("");

  for (var i = 0; i < menudata.length; i++) {
    var menuitem = menudata[i];
    var item_type = menuitem["type"];

    // Create a new row for each menu item
    var row = document.createElement("tr");
    row.innerHTML = `<td>${menuitem.name}</td><td>${menuitem.description}</td><td>${menuitem.price}</td>`;

    // Append the row to the corresponding table
    if (item_type === "Food") {
      foodTable.appendChild(row);
    } else if (item_type === "Drink") {
      drinksTable.appendChild(row);
    }
  }

  // Append the tables to their respective menu sections
  document.getElementById("food-menu").appendChild(foodTable);
  document.getElementById("drinks-menu").appendChild(drinksTable);
}

// Helper function to create a menu table with headers
function createMenuTable(menuType) {
  var table = document.createElement("table");
  var header = table.createTHead();
  var row = header.insertRow(0);
  var headers = ["Name", "Description", "Price"];

  // Create table headers
  headers.forEach(function (headerText) {
    var th = document.createElement("th");
    th.textContent = headerText;
    row.appendChild(th);
  });

  // Set the table caption
  var caption = table.createCaption();
  caption.textContent = menuType;

  return table;
}

console.log(menu);
console.log(menu.getRelatedDrink("3"));

/*var menudata = data.menu;
  for (var i = 0; i < menudata.length; i++) {
    var menu = menudata[i];
    var properties = {};
    for (var key in menu) {
      if (menu.hasOwnProperty(key)) {
        properties[key] = {
          value: menu[key],
          writable: false
        }
      }
    }
    menu_objects[menudata[i].id] = Object.create(menuitem, properties);
    food_objects[fooddata[i].id] = new Object(fooddata[i]);  
  }
  console.log(food_objects);
  console.log(food_objects["R1"].type);

 for (var i = 0; i < drinksdata.length; i++) {
    drinks_objects[drinksdata[i].id] = new Object(drinksdata[i]);*/
