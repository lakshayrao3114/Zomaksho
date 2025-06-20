import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SurpriseMeButton from "@/components/SurpriseMeButton";
import GameSection from "@/components/GameSection";
import DishShowcase from "@/components/DishShowcase";
import { NLPSearchBar } from "@/components/NLPSearchBar";
import SearchResults from "@/components/SearchResults";

const Index = () => {
  const navigate = useNavigate();
  const [isVegMode, setIsVegMode] = useState(false);
  const [userName, setUserName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("zomaUserName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
    setShowResults(results.length > 0);
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden font-lexend bg-black">
      {/* Background doodle line */}
      <img
        src="/img-vid-uploads/doodle_line.avif"
        alt="Doodle background"
        className="absolute z-0 opacity-20"
        style={{
          top: "0%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1500px", // ⬅️ Increase size here
          maxWidth: "100%",
          pointerEvents: "none",
        }}
      />

      {/* Floating food items */}
      <div
        className="absolute animate-float"
        style={{
          top: "25%", // Random vertical position
          left: "20%", // Random horizontal position
          transform: "translate(-50%, -50%)", // Center from position
          animationDelay: "0.5s", // Optional: stagger float
        }}
      >
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img
            src="/img-vid-uploads/burger-floater.avif"
            alt="Burger"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div
        className="absolute animate-float"
        style={{
          top: "25%", // Random vertical position
          right: "20%", // Random horizontal position
          transform: "translate(-50%, -50%)", // Center from position
          animationDelay: "0.5s", // Optional: stagger float
        }}
      >
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img
            src="/img-vid-uploads/pizza-floater.avif"
            alt="pizza slice"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div
        className="absolute animate-float"
        style={{
          top: "16%", // Random vertical position
          right: "12%", // Random horizontal position
          transform: "translate(-50%, -50%)", // Center from position
          animationDelay: "0.5s", // Optional: stagger float
        }}
      >
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src="/img-vid-uploads/leaf-floater.avif"
            alt="Burger"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div
        className="absolute animate-float"
        style={{
          top: "16%", // Random vertical position
          left: "12%", // Random horizontal position
          transform: "translate(-50%, -50%)", // Center from position
          animationDelay: "0.5s", // Optional: stagger float
        }}
      >
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img
            src="/img-vid-uploads/momos-floater.avif"
            alt="Burger"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div
        className="absolute animate-float"
        style={{
          top: "2%", // Random vertical position
          left: "50%", // Random horizontal position
          transform: "translate(-50%, -50%)", // Center from position
          animationDelay: "0.5s", // Optional: stagger float
        }}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src="/img-vid-uploads/tomato-floater.avif"
            alt="Burger"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between p-4 md:p-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white font-lexend italic">
              Zoma-ksho
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-gray-300">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-lexend">Deliver to Home</span>
            </div>

            <div className="flex items-center space-x-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isVegMode}
                  onChange={(e) => setIsVegMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div
                  className={`
                  w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer 
                  peer-checked:after:translate-x-full peer-checked:after:border-white 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all 
                  peer-checked:bg-green-600 transition-all duration-300
                  ${
                    isVegMode
                      ? "shadow-[0_0_20px_#22c55e,0_0_40px_#22c55e,0_0_60px_#22c55e] ring-4 ring-green-500/30"
                      : ""
                  }
                `}
                ></div>
              </label>
              <span
                className={`text-sm font-medium font-lexend transition-all duration-300 ${
                  isVegMode
                    ? "text-green-400 drop-shadow-[0_0_8px_#22c55e]"
                    : "text-green-400"
                }`}
              >
                VEG MODE
              </span>
            </div>

            <Button
              onClick={() => navigate("/login")}
              className="bg-transparent border border-white/20 hover:bg-white/10 text-white font-lexend"
            >
              {userName ? <User className="w-4 h-4 mr-2" /> : null}
              {userName || "Login"}
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 md:px-6 py-8">
          {/* Hero Section */}
          {!showResults && (
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-lexend">
                Feeling Hungry?
                <br />
                <span className="text-gray-300">
                  Let us pick your next bite!
                </span>
              </h2>

              <SurpriseMeButton />
            </div>
          )}

          {/* NLP Search Bar */}
          <div className="mb-12">
            <NLPSearchBar onSearchResults={handleSearchResults} />
          </div>

          {/* Search Results */}
          {showResults && (
            <SearchResults
              results={searchResults}
              onClearResults={() => {
                setShowResults(false);
                setSearchResults([]);
              }}
            />
          )}

          {/* Dish Showcase - Hidden when showing search results */}
          {!showResults && <DishShowcase />}

          {/* Game Section - Hidden when showing search results */}
          {!showResults && <GameSection />}

          {/* Quick Actions - Hidden when showing search results */}
          {!showResults && (
            <div className="mt-12 flex justify-center">
              <Button
                onClick={() => navigate("/chatbot")}
                className="h-20 px-8 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold text-lg font-lexend transform transition-transform duration-300 hover:scale-105"
              >
                Talk to Nugget 🥔
              </Button>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-800/50">
          <p className="text-gray-400 text-sm font-lexend">
            Ordering Food On Big Screens Made Easier With Zomaksho
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
