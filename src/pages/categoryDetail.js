import $ from "jquery";
import renderPage from "../utils/renderPage";
const currentUrl = new URL(window.location.href);
const category = currentUrl.searchParams.get("category");
$("#menu-button").on("click", () => {
  $("#mobile-nav").toggle();
});
function createCategoryDetailPage(data) {
  console.log(data.meals);
  const categoryPage = $("<div></div>");

  const content = $(
    `<div class="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-4 gap-5 max-w-[800px] mx-auto py-10"></div>`,
  );
  const title = $(`
    <div class="max-w-[90%] md:max-w-[800px]  mx-auto py-4  border-gray-300 border-b-[1px]">
    <div class="flex space-x-4 items-center font-medium">
    <nav class="flex items-center space-x-2"> <img class="size-4" src="../assets/home.svg" alt="${data.meals.strMeal}"/> <a href="/">Homes</a></nav>
   <div class="font-bold text-xl">></div> <nav><span>Foods</span></nav>
    <div class="font-bold text-xl">></div><nav><span class="text-gray-400">${category}</span></nav>
    </div>
    <div class="py-10">
    <h1 class=" text-4xl font-medium">${category} Meals</h1>
    </div>
    </div>

    `);
  data.meals.forEach((meal) => {
    const card = $(
      `
  <div class="hover:cursor-pointer relative rounded-lg shadow-md overflow-hidden mx-auto size-[180px]">
    <div class="flex items-center p-4 size-full inset-0 absolute z-10  ">
      <h2 class=" text-lg mx-auto text-center text-white  font-bold">${meal.strMeal}</h2>
      </div>
      <div class="absolute inset-0 bg-black opacity-50 size-full"></div>
 <img class="-z-50 absolute -translate-y-1/2 top-1/2 size-full" src="${meal.strMealThumb}" alt="${meal.strMeal}">

  </div>`,
    );

    card.appendTo(content).on("click", () => {
      location.href = `/src/pages/mealDetail.html?meal=${meal.idMeal}`;
    });
  });
  categoryPage.append(title).append(content);
  return categoryPage;
}

$(async () => {
  $("#loading").hide();
  renderPage("category-detail", createCategoryDetailPage, category);
});
