
import { Button } from "@/components/ui/button";

interface FoodCategoriesProps {
  isVegMode: boolean;
}

const FoodCategories = ({ isVegMode }: FoodCategoriesProps) => {
  const allCategories = [
    { name: "All", isVeg: false },
    { name: "Pizza", isVeg: false },
    { name: "Burger", isVeg: false },
    { name: "Italian", isVeg: false },
    { name: "Chinese", isVeg: false },
    { name: "Indian", isVeg: true },
    { name: "Healthy", isVeg: true },
    { name: "Desserts", isVeg: true },
  ];

  const categories = isVegMode 
    ? allCategories.filter(cat => cat.isVeg || cat.name === "All")
    : allCategories;

  return (
    <div className="mb-12">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category, index) => (
            <Button
              key={category.name}
              variant="outline"
              className={`
                h-16 px-6 bg-gray-800/50 border-gray-700 hover:bg-gray-700 text-white
                ${index === 0 ? 'border-red-500 bg-red-500/20' : ''}
              `}
            >
              <div className="flex flex-col items-center space-y-1">
                <span className="text-2xl">{category.emoji}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodCategories;
