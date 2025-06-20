
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart, X } from "lucide-react";
import { toast } from "sonner";

interface SearchResult {
  id: number;
  name: string;
  price: number;
  isVeg: boolean;
  isSpicy: boolean;
  cuisine: string;
  image: string;
  rating: number;
  restaurant: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  onClearResults: () => void;
}

const SearchResults = ({ results, onClearResults }: SearchResultsProps) => {
  const handleOrder = (dish: SearchResult) => {
    toast.success(`Added ${dish.name} to cart!`);
    console.log(`Ordering ${dish.name} from ${dish.restaurant}`);
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          Search Results ({results.length} dishes found)
        </h2>
        <Button
          onClick={onClearResults}
          variant="outline"
          size="sm"
          className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
        >
          <X className="w-4 h-4 mr-2" />
          Clear Results
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((dish) => (
          <Card key={dish.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{dish.image}</div>
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <span className="text-sm font-medium">{dish.rating}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">{dish.name}</h3>
              
              <p className="text-gray-400 text-sm mb-2">{dish.restaurant}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  dish.isVeg ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                }`}>
                  {dish.isVeg ? 'VEG' : 'NON-VEG'}
                </span>
                {dish.isSpicy && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-600/20 text-orange-400">
                    SPICY 
                  </span>
                )}
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-600/20 text-blue-400">
                  {dish.cuisine}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-white">₹{dish.price}</span>
                <Button
                  onClick={() => handleOrder(dish)}
                  className="bg-red-500 hover:bg-red-600 text-white"
                  size="sm"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Order Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
