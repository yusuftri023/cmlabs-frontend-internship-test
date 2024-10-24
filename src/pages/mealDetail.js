import $ from "jquery";
import renderPage from "../utils/renderPage";
const currentUrl = new URL(window.location.href);
const meal = currentUrl.searchParams.get("meal");
$("#menu-button").on("click", () => {
  $("#mobile-nav").toggle();
});
function createMealDetailPage(data) {
  const mealDetail = data.meals[0];
  const mealDetailPage = $("<div></div>");
  const cuisineArea = $(
    `<div class="max-w-[90%] md:max-w-[800px] mx-auto my-4 font-medium text-red-500">${mealDetail.strArea} Culinary</div>`,
  );
  const title = $(`
    <div class="max-w-[90%] md:max-w-[800px] mx-auto py-4  border-gray-300 border-b-[1px]">
    <div class="flex space-x-4 items-center font-medium">
    <nav class="flex items-center space-x-2"> <img class="size-4" src="../assets/home.svg" alt="${mealDetail.strMeal}"/> <a href="/">Homes</a></nav>
   <div class="font-bold text-xl">></div> <nav><span>Foods</span></nav>
    <div class="font-bold text-xl">></div><nav><a href="/src/pages/categoryDetail.html?category=${mealDetail.strCategory}">${mealDetail.strCategory}</a></nav>
    <div class="font-bold text-xl hidden min-[480px]:block">></div><nav><span class="text-gray-400 hidden min-[480px]:block">${mealDetail.strMeal}</span></nav>
    </div>
    <div class="py-10">
    <h1 class=" text-4xl font-medium">${mealDetail.strMeal}</h1>
    </div>
    </div>

    `);
  const instructionParagraph = $(
    `<div class="space-y-4"><h1 class="font-medium text-3xl">Instructions</h1><p class="text-sm">${mealDetail.strInstructions}</p></div>`,
  );
  const recipeComponent = $(
    `<div class=" w-full  space-y-4">
    <h1 class="text-3xl font-medium">Recipes</h1>
    </div>`,
  );
  const recipeListComponent = $(`<ul class="list-disc list-item ml-4"></ul>`);
  for (let i = 1; i <= 20; i++) {
    if (
      mealDetail[`strIngredient${i}`] !== "" &&
      mealDetail[`strMeasure${i}`] !== ""
    ) {
      const recipeListItem = $(
        `<li>
        <span>${mealDetail[`strMeasure${i}`]} ${mealDetail[`strIngredient${i}`]}</span> </li>`,
      );
      recipeListComponent.append(recipeListItem);
    } else break;
  }
  recipeComponent.append(recipeListComponent);

  const contentLayout = $(`
  <div class="md:flex max-w-[90%] md:max-w-[800px] mx-auto py-5 md:space-x-10"></div>`);
  const image = $(
    `<div class="w-full md:w-[45%] "><img class="w-full rounded-2xl overflow-hidden" src="${mealDetail.strMealThumb}" alt="${mealDetail.strMeal}"/></div>`,
  );
  const instructions = $(`
  <div class="w-full md:w-[55%]"></div>`);
  instructions.append(instructionParagraph).append(recipeComponent);
  contentLayout.append(image).append(instructions);

  const tutorials = $(
    `<div class="max-w-[90%] md:max-w-[800px] mx-auto text-center py-5 font-medium"><h1 class="text-3xl font-medium">Tutorials</h1>


    <iframe class="my-5 w-full h-[240px] min-[480px]:h-[360px] md:h-[480px]" src="${mealDetail.strYoutube.replace("watch?v=", "embed/")}"></iframe>
    </div>`,
  );

  mealDetailPage
    .append(title)
    .append(cuisineArea)
    .append(contentLayout)
    .append(tutorials);
  return mealDetailPage;
}

$(async () => {
  $("#loading").hide();
  renderPage("meal-detail", createMealDetailPage, meal);
});
