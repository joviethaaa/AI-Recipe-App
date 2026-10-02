import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { MealAPI } from "../../services/mealAPI";
import { homeStyles } from "../../assets/styles/home.styles";
import { Image } from "expo-image";
import { COLORS } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CategoryFilter from "../../components/CategoryFilter";
import RecipeCard from "../../components/RecipeCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from "axios";
import { PREDICT_URL } from "../../constants/api";

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const HomeScreen = () => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const [mlCategory, setMlCategory] =
    useState(null);

  const [recipes, setRecipes] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [featuredRecipe, setFeaturedRecipe] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const predictCategory = async (
    ingredientCount,
    instructionLength
  ) => {
    try {
      const response = await axios.post(
        PREDICT_URL,
        {
          ingredient_count: ingredientCount,
          instruction_length: instructionLength,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.category;
    } catch (error) {
      if (error.response) {
        console.log(
          "STATUS:",
          error.response.status
        );

        console.log(
          "DATA:",
          error.response.data
        );

        console.log(
          "HEADERS:",
          error.response.headers
        );
      } else if (error.request) {
        console.log(
          "NO RESPONSE:",
          error.request
        );
      } else {
        console.log(
          "ERROR:",
          error.message
        );
      }

      return null;
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);

      const [
        apiCategories,
        randomMeals,
        featuredMeal,
      ] = await Promise.all([
        MealAPI.getCategories(),
        MealAPI.getRandomMeals(12),
        MealAPI.getRandomMeal(),
      ]);

      const transformedCategories =
        apiCategories.map(
          (cat, index) => ({
            id: index + 1,
            name: cat.strCategory,
            image:
              cat.strCategoryThumb,
            description:
              cat.strCategoryDescription,
          })
        );

      setCategories(
        transformedCategories
      );

      if (
        !mlCategory &&
        randomMeals.length > 0
      ) {
        const firstMeal =
          MealAPI.transformMealData(
            randomMeals[0]
          );

        if (firstMeal) {
          predictCategory(
            firstMeal.ingredient_count,
            firstMeal.instruction_length
          )
            .then((category) => {
              if (category) {
                setMlCategory(
                  category
                );
              }
            })
            .catch((err) => {
              console.log(
                "Predict failed:",
                err.message
              );
            });
        }
      }

      const transformedMeals =
        randomMeals
          .map((meal) =>
            MealAPI.transformMealData(
              meal
            )
          )
          .filter(
            (meal) =>
              meal !== null
          );

      setRecipes(
        transformedMeals
      );

      const transformedFeatured =
        MealAPI.transformMealData(
          featuredMeal
        );

      setFeaturedRecipe(
        transformedFeatured
      );
    } catch (error) {
      console.log(
        "Error loading the data",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryData =
    async (category) => {
      try {
        const meals =
          await MealAPI.filterByCategory(
            category
          );

        const transformedMeals =
          meals
            .map((meal) =>
              MealAPI.transformMealData(
                meal
              )
            )
            .filter(
              (meal) =>
                meal !== null
            );

        setRecipes(
          transformedMeals
        );
      } catch (error) {
        console.error(
          "Error loading category data:",
          error
        );

        setRecipes([]);
      }
    };

  const handleCategorySelect =
    async (category) => {
      setSelectedCategory(
        category
      );

      await loadCategoryData(
        category
      );
    };

  const onRefresh = async () => {
    setRefreshing(true);

    await loadData();

    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (
    loading &&
    !refreshing
  ) {
    return (
      <LoadingSpinner message="Loading recipes..." />
    );
  }

  return (
    <View
      style={
        homeStyles.container
      }
    >
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        refreshControl={
          <RefreshControl
            refreshing={
              refreshing
            }
            onRefresh={
              onRefresh
            }
            tintColor={
              COLORS.primary
            }
          />
        }
        contentContainerStyle={
          homeStyles.scrollContent
        }
      >
        <View
          style={
            homeStyles.educationSection
          }
        >
          <Text
            style={
              homeStyles.educationTitle
            }
          >
            Panduan Menambah Berat Badan
          </Text>

          <Text
            style={
              homeStyles.educationText
            }
          >
            Menaikkan berat badan membutuhkan keseimbangan antara asupan nutrisi yang cukup dan pola hidup yang tepat. Tubuh memerlukan energi lebih dari makanan yang dikonsumsi untuk menambah berat badan secara optimal.
          </Text>

          <Text
            style={
              homeStyles.educationSubtitle
            }
          >
            Nutrisi yang Dibutuhkan:
          </Text>

          <Text
            style={
              homeStyles.educationBullet
            }
          >
            • Karbohidrat sebagai sumber energi utama, seperti nasi, kentang, roti, dan pasta
          </Text>

          <Text
            style={
              homeStyles.educationBullet
            }
          >
            • Protein untuk membangun dan memperbaiki jaringan otot, seperti telur, daging, ikan, tahu, dan tempe
          </Text>

          <Text
            style={
              homeStyles.educationBullet
            }
          >
            • Lemak sehat sebagai cadangan energi tambahan, seperti alpukat, kacang-kacangan, dan minyak zaitun
          </Text>

          <Text
            style={
              homeStyles.educationBullet
            }
          >
            • Vitamin dan mineral dari sayur dan buah untuk menjaga fungsi tubuh tetap optimal
          </Text>

          <Text
            style={
              homeStyles.educationText
            }
          >
            Selain pola makan, aktivitas fisik tetap penting, terutama olahraga ringan hingga latihan kekuatan, untuk membantu pembentukan massa otot dan menjaga kesehatan tubuh.
          </Text>
        </View>

        {featuredRecipe && (
          <View
            style={
              homeStyles.featuredSection
            }
          >
            <TouchableOpacity
              style={
                homeStyles.featuredCard
              }
              activeOpacity={0.9}
              onPress={() =>
                router.push(
                  `/recipe/${featuredRecipe.id}`
                )
              }
            >
              <View
                style={
                  homeStyles.featuredImageContainer
                }
              >
                <Image
                  source={{
                    uri: featuredRecipe.image,
                  }}
                  style={
                    homeStyles.featuredImage
                  }
                  contentFit="cover"
                  transition={500}
                />

                <View
                  style={
                    homeStyles.featuredOverlay
                  }
                >
                  <View
                    style={
                      homeStyles.featuredBadge
                    }
                  >
                    <Text
                      style={
                        homeStyles.featuredBadgeText
                      }
                    >
                      Featured
                    </Text>
                  </View>

                  <View
                    style={
                      homeStyles.featuredContent
                    }
                  >
                    <Text
                      style={
                        homeStyles.featuredTitle
                      }
                      numberOfLines={
                        2
                      }
                    >
                      {
                        featuredRecipe.title
                      }
                    </Text>

                    <View
                      style={
                        homeStyles.featuredMeta
                      }
                    >
                      <View
                        style={
                          homeStyles.metaItem
                        }
                      >
                        <Ionicons
                          name="time-outline"
                          size={16}
                          color={
                            COLORS.white
                          }
                        />

                        <Text
                          style={
                            homeStyles.metaText
                          }
                        >
                          {
                            featuredRecipe.cookTime
                          }
                        </Text>
                      </View>

                      <View
                        style={
                          homeStyles.metaItem
                        }
                      >
                        <Ionicons
                          name="people-outline"
                          size={16}
                          color={
                            COLORS.white
                          }
                        />

                        <Text
                          style={
                            homeStyles.metaText
                          }
                        >
                          {
                            featuredRecipe.servings
                          }
                        </Text>
                      </View>

                      {featuredRecipe.area && (
                        <View
                          style={
                            homeStyles.metaItem
                          }
                        >
                          <Ionicons
                            name="location-outline"
                            size={16}
                            color={
                              COLORS.white
                            }
                          />

                          <Text
                            style={
                              homeStyles.metaText
                            }
                          >
                            {
                              featuredRecipe.area
                            }
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {categories.length >
          0 && (
          <CategoryFilter
            categories={
              categories
            }
            selectedCategory={
              selectedCategory
            }
            onSelectCategory={
              handleCategorySelect
            }
          />
        )}

        <View
          style={
            homeStyles.recipesSection
          }
        >
          {recipes.length >
          0 ? (
            <FlatList
              data={recipes}
              renderItem={({
                item,
              }) => (
                <RecipeCard
                  recipe={
                    item
                  }
                />
              )}
              keyExtractor={(
                item
              ) =>
                item.id.toString()
              }
              numColumns={2}
              columnWrapperStyle={
                homeStyles.row
              }
              contentContainerStyle={
                homeStyles.recipesGrid
              }
              scrollEnabled={
                false
              }
            />
          ) : (
            <View
              style={
                homeStyles.emptyState
              }
            >
              <Ionicons
                name="restaurant-outline"
                size={64}
                color={
                  COLORS.textLight
                }
              />

              <Text
                style={
                  homeStyles.emptyTitle
                }
              >
                No recipes found
              </Text>

              <Text
                style={
                  homeStyles.emptyDescription
                }
              >
                Try a different category
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;