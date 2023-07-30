const BASE_URL = "http://www.themealdb.com/api/json/v1/1/filter.php?";

export const getData = {
  category: async (categoryId) => {
    const get = await fetch(BASE_URL + "c=" + categoryId);
    const resp = await get.json();
    return resp;
  },
  categories: async () => {
    const getCut = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const resp = await getCut.json();
    return resp.categories;
  },
  recipe: async (idMeal) => {
    const get = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    const resp = await get.json();
    return resp;
  },

  area: async (areaId) => {
    const get = await fetch(BASE_URL + "a=" + areaId);
    const resp = await get.json();
    return resp;
  },
  ingridient: async (ingridientId) => {
    const get = await fetch(BASE_URL + "i=" + ingridientId);
    const resp = await get.json();
    return resp;
  },

  letter: async (letter) => {
    const get = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?f=" + letter
    );
    const resp = await get.json();
    return resp;
  },
};
