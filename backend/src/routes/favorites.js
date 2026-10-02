// backend/src/routes/favorites.js

import { db } from "../config/db.js";
import { favoritesTable } from "../schema/schema.js";

export async function addFavorite(req, res) {
  try {
    const { userId, recipeId } = req.body;

    if (!userId || !recipeId) {
      return res.status(400).json({ message: "userId dan recipeId wajib diisi" });
    }

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
    );
    const data = await response.json();
    const recipe = data.meals[0];

    if (!recipe) {
      return res.status(404).json({ message: "Recipe tidak ditemukan" });
    }

    const ingredientCount = Array.from({ length: 20 }).reduce((acc, _, i) => {
      return recipe[`strIngredient${i + 1}`] ? acc + 1 : acc;
    }, 0);

    const instructionLength = recipe.strInstructions?.length || 0;

    const heavyKeywords = [
      "chicken", "beef", "rice", "curry", "pasta",
      "noodle", "lasagna", "steak", "fish", "fried", "meat", "biryani"
    ];
    const lightKeywords = [
      "cake", "cookie", "pie", "tart", "salad", "toast",
      "pancake", "sandwich", "smoothie", "fries", "dessert, pudding"
    ];

    const titleLower = recipe.strMeal.toLowerCase();
    let category = "makanan_berat"; // default
    if (lightKeywords.some(w => titleLower.includes(w))) {
      category = "makanan_ringan";
    } else if (heavyKeywords.some(w => titleLower.includes(w))) {
      category = "makanan_berat";
    }

    await db.insert(favoritesTable).values({
      userId,
      recipeId: recipe.idMeal,
      title: recipe.strMeal,
      image: recipe.strMealThumb,
      ingredientCount,
      instructionLength,
      category
    });

    return res.status(200).json({ message: "Favorite berhasil ditambahkan!" });
  } catch (err) {
    console.error("Error addFavorite:", err);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}
