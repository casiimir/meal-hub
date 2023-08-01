import { db } from "@/firebase/config";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { localStorageManager } from "./localStorage";

const BASE_URL = "http://www.themealdb.com/api/json/v1/1/filter.php?";

export const getData = {
  nations: async () => {
    const get = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    const resp = await get.json();
    return resp.meals;
  },
  categories: async () => {
    const get = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const resp = await get.json();
    return resp.categories;
  },
  category: async (categoryId) => {
    const get = await fetch(BASE_URL + "c=" + categoryId);
    const resp = await get.json();
    return resp.meals;
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
  mealById: async (id) => {
    const get = await fetch(
      "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
    );
    const resp = await get.json();
    return resp.meals;
  },
};

export const recipeManager = {
  saveAdd: async (recipeId) => {
    const userLocal = await localStorageManager.getData("user");
    const savedRef = doc(db, "saved", userLocal?.uid);
    await updateDoc(savedRef, {
      saved: arrayUnion(recipeId),
    })
      .catch((err) => console.log("ERR : ", err))
      .then((res) => {
        console.log(res);
      });
  },
  removeAdd: async (recipeId) => {
    const userLocal = await localStorageManager.getData("user");
    const savedRef = doc(db, "saved", userLocal?.uid);
    await updateDoc(savedRef, {
      saved: arrayRemove(recipeId),
    })
      .catch((err) => console.log("ERR : ", err))
      .then((res) => {
        console.log(res);
      });
  },
};
