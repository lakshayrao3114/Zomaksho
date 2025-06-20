import { Card, CardContent } from "@/components/ui/card";
import { Clock, Star, Flame, Heart } from "lucide-react";

interface Dish {
  id: number;
  name: string;
  rating: number;
  estimatedTime: string;
  image: string;
  ingredients: string[];
  spiciness: number; // 0-3 scale
  healthScore: number; // 0-100
  category: string;
}

const DishShowcase = () => {
  const dishes: Dish[] = [
    {
      id: 1,
      name: "Butter Chicken",
      rating: 4.5,
      estimatedTime: "25-30 mins",
      image: "/img-vid-uploads/butterChicken.avif",
      ingredients: ["Chicken", "Butter", "Tomatoes", "Cream", "Spices"],
      spiciness: 2,
      healthScore: 75,
      category: "Indian",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      rating: 4.3,
      estimatedTime: "20-25 mins",
      image: "/img-vid-uploads/margherita-pizza.jpg",
      ingredients: ["Mozzarella", "Tomato Sauce", "Basil", "Olive Oil"],
      spiciness: 0,
      healthScore: 68,
      category: "Italian",
    },
    {
      id: 3,
      name: "Chicken Burger",
      rating: 4.6,
      estimatedTime: "15-20 mins",
      image: "/img-vid-uploads/burger.jpg",
      ingredients: ["Chicken Patty", "Lettuce", "Tomato", "Mayo", "Bun"],
      spiciness: 1,
      healthScore: 62,
      category: "Fast Food",
    },
    {
      id: 4,
      name: "Pad Thai",
      rating: 4.4,
      estimatedTime: "30-35 mins",
      image: "/img-vid-uploads/padThai.jpg",
      ingredients: ["Rice Noodles", "Shrimp", "Bean Sprouts", "Peanuts"],
      spiciness: 2,
      healthScore: 72,
      category: "Thai",
    },
    {
      id: 5,
      name: "Caesar Salad",
      rating: 4.2,
      estimatedTime: "10-15 mins",
      image: "/img-vid-uploads/caesar.jpg",
      ingredients: ["Lettuce", "Croutons", "Parmesan", "Caesar Dressing"],
      spiciness: 0,
      healthScore: 85,
      category: "Healthy",
    },
    {
      id: 6,
      name: "Sushi Platter",
      rating: 4.7,
      estimatedTime: "20-25 mins",
      image: "/img-vid-uploads/sushi.avif",
      ingredients: ["Fresh Fish", "Rice", "Nori", "Wasabi", "Ginger"],
      spiciness: 1,
      healthScore: 88,
      category: "Japanese",
    },
  ];

  const getSpicynessIndicator = (level: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Flame
        key={i}
        className={`w-3 h-3 ${
          i < level ? "text-red-500 fill-current" : "text-gray-400"
        }`}
      />
    ));
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-orange-400";
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Recommended For You
        </h2>
        <p className="text-gray-400">
          Discover delicious dishes from top-rated restaurants
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-28">
        {dishes.map((dish) => (
          <div key={dish.id} className="group perspective-1000 h-64">
            <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
              {/* Front of Card */}
              <Card className="absolute inset-0 w-full h-[22rem] bg-gray-800/50 border-gray-700 backface-hidden">
                <CardContent className="p-6  flex flex-col">
                  {/* Image placeholder */}
                  <div className="w-full h-44 bg-gray-700/50 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {dish.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-yellow-400">
                          <Star className="w-4 h-4 fill-current mr-1" />
                          <span className="text-sm font-medium">
                            {dish.rating}
                          </span>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-600/20 text-blue-400">
                          {dish.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-400 mt-4">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{dish.estimatedTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Back of Card */}
              <Card className="absolute inset-0 w-full h-full bg-gray-800/50 border-gray-700 backface-hidden rotate-y-180">
                <CardContent className="p-6 h-full flex flex-col">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {dish.name}
                  </h3>

                  <div className="space-y-4 flex-1">
                    {/* Ingredients */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">
                        Ingredients:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {dish.ingredients.map((ingredient, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded-full text-xs bg-gray-700/50 text-gray-300"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Spiciness */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">
                        Spiciness:
                      </h4>
                      <div className="flex items-center gap-1">
                        {getSpicynessIndicator(dish.spiciness)}
                        <span className="text-xs text-gray-400 ml-2">
                          {dish.spiciness === 0
                            ? "Mild"
                            : dish.spiciness === 1
                            ? "Light"
                            : dish.spiciness === 2
                            ? "Medium"
                            : "Hot"}
                        </span>
                      </div>
                    </div>

                    {/* Health Score */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">
                        AI Health Score:
                      </h4>
                      <div className="flex items-center gap-2">
                        <Heart
                          className={`w-4 h-4 ${getHealthScoreColor(
                            dish.healthScore
                          )}`}
                        />
                        <span
                          className={`font-bold ${getHealthScoreColor(
                            dish.healthScore
                          )}`}
                        >
                          {dish.healthScore}/100
                        </span>
                        <div className="flex-1 bg-gray-700 rounded-full h-2 ml-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              dish.healthScore >= 80
                                ? "bg-green-500"
                                : dish.healthScore >= 60
                                ? "bg-yellow-500"
                                : "bg-orange-500"
                            }`}
                            style={{ width: `${dish.healthScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DishShowcase;
