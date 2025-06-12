var Food = [
  "Burger",
  "Pizza",
  "Donuts",
  "Pizza",
  "Koshary",
  "Donuts",
  "Seafood",
  "Burger",
];
var FoodSet = new Set(Food); // remove duplicates from food
FoodSet.add("pasta");
console.log(FoodSet);
FoodSet.delete("Burger");
console.log(FoodSet);
function ClearSet(set) {
  if (set.size > 2) {
    set.clear();
  }
}
ClearSet(FoodSet);
console.log(FoodSet);

// task2
class Vehicle {
  constructor(wheels, speed) {
    this.wheels = wheels;
    this.speed = speed;
  }
}
class Bike extends Vehicle {
  static count = 0;

  constructor() {
    super(2, "fast enough");
    Bike.count++;
  }

  static getCreatedCount() {
    return Bike.count;
  }
}
const b1 = new Bike();
const b2 = new Bike();
const b3 = new Bike();

console.log(Bike.getCreatedCount());

//task 3
const content = document.getElementById("page-content");
const loader = document.getElementById("loader");


function loadFood(type) {
  loader.style.display = "flex";
  content.innerHTML = "";

  fetch(`https://forkify-api.herokuapp.com/api/search?q=${type}`)
    .then(res => res.json())
    .then(data => {
      setTimeout(() => {
        loader.style.display = "none";

        if (!data.recipes || data.recipes.length === 0) {
          content.innerHTML = "<p>No recipes found.</p>";
          return;
        }

        data.recipes.forEach(recipe => {
          const div = document.createElement("div");
          div.className = "recipe";
          div.innerHTML = `
            <img src="${recipe.image_url}" alt="${recipe.title}" />
            <h3>${recipe.title}</h3>
          `;
          content.appendChild(div);
        });
      }, 1000); 
    })
    .catch(err => {
      loader.style.display = "none";
      content.innerHTML = "<p>Error loading data.</p>";
      console.error(err);
    });
}


loadFood("pizza");


document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const food = link.getAttribute("data-food");
    loadFood(food);
  });
});
