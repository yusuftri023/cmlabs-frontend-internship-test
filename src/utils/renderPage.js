import $ from "jquery";
export default async function renderPage(page, createPageCallback, queryParam) {
  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  let url = "";
  let data;

  switch (page) {
    case "category":
      url = `https://www.themealdb.com/api/json/v1/1/categories.php`;
      data = await fetchData(url);
      break;
    case "category-detail":
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${queryParam}`;
      data = await fetchData(url);

      break;
    case "meal-detail":
      url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${queryParam}`;
      data = await fetchData(url);
      break;
    default:
      break;
  }

  const createdPage = await createPageCallback(data);
  $("#app").append(createdPage);
}
