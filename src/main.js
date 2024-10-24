import $ from "jquery";
import food from "./assets/food.png";
import salad from "./assets/salad.png";
import pizza from "./assets/pizza.png";
import renderPage from "./utils/renderPage";
$("#menu-button").on("click", () => {
  $("#mobile-nav").toggle();
});
function createCategoryPage(data) {
  const bannerLogo = [food, salad, pizza];
  const banner = $(
    ` <section class="bg-[#f0ededc0] py-10 space-y-5">

    </section>`,
  );

  const foodLogo = $('<div class=" flex justify-center space-x-4"></div>');
  const desc1 = $(
    '<h1 class="text-sm font-bold text-center">mealapp API website</h1>',
  );
  const desc2 = $(
    '<h1 class="text-3xl font-bold text-center">See All The Delicious Foods</h1>',
  );
  bannerLogo.forEach((logo) => {
    const img = $("<img class='w-[20px] h-20px ' />").attr("src", logo);
    img.appendTo(foodLogo);
  });

  const content = $(
    `<div class="grid min-[480px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-[90%] md:max-w-[800px] mx-auto py-10"></div>`,
  );
  data.categories.forEach((category) => {
    const card = $(
      `
  <div class="hover:cursor-pointer relative rounded-lg shadow-md overflow-hidden h-[100px] ">
    <div class="flex items-center p-4 size-full inset-0 absolute z-10  ">
      <h2 class=" text-lg mx-auto text-center text-white  font-bold">${category.strCategory}</h2>
      </div>
      <div class="absolute inset-0 bg-black opacity-50 size-full"></div>
 <img class="-z-50 absolute -translate-y-1/2 top-1/2" src="${category.strCategoryThumb}" alt="${category.strCategory}">

  </div>`,
    );
    card.appendTo(content).on("click", () => {
      location.href = `/src/pages/categoryDetail.html?category=${category.strCategory}`;
    });
  });
  banner.append(foodLogo).append(desc1).append(desc2);

  const categoryPage = $("<div></div>").append(banner).append(content);

  return categoryPage;
}

$(async () => {
  $("#loading").hide();
  renderPage("category", createCategoryPage);
});
