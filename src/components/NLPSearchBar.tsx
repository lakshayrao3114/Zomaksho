import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mic } from "lucide-react";
import { toast } from "sonner";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface NLPSearchBarProps {
  onSearchResults?: (results: any[]) => void;
}

export const NLPSearchBar = ({ onSearchResults }: NLPSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const foodItems = await callLLM(searchQuery);
      toast.success(`Found ${foodItems.length} results for "${searchQuery}"`);
      if (onSearchResults) {
        onSearchResults(foodItems);
      }
    } catch (err) {
      console.error("LLM search failed", err);
      toast.error("Something went wrong while searching");
    }
    setIsLoading(false);
  };

  const callLLM = async (query: string): Promise<any[]> => {
    const prompt = `Return a list of food items based on this user prompt: "${query}". Format the JSON as an array of objects like this:\n\n[
      {
        "name": "Gulab Jamun",
        "price": 90,
        "description": "Sweet deep-fried dumplings soaked in sugar syrup",
        "isVeg": true,
        "restaurant": "Sweet House"
      }
    ]`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a food recommendation assistant.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();
    const rawText = data.choices[0].message.content;

    try {
      const parsed = JSON.parse(rawText);
      return parsed;
    } catch (e) {
      console.error("Failed to parse LLM response:", rawText);
      return [];
    }
  };

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast.error("Voice search not available");
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      toast.error("Voice search not supported in this browser");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Try: 'Spicy vegetarian dinner under ₹250' or 'Best biryani near me'"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="h-14 pl-12 pr-24 text-lg bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 rounded-xl focus:border-red-500 focus:ring-red-500"
        />

        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
          <Button
            onClick={startVoiceSearch}
            size="sm"
            variant="ghost"
            className={`p-2 hover:bg-gray-700 ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400'}`}
          >
            <Mic className="w-4 h-4" />
          </Button>

          <Button
            onClick={handleSearch}
            size="sm"
            className="bg-red-500 hover:bg-red-600 text-white px-4"
          >
            Search
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center mt-4">
          <DotLottieReact
            src="https://lottie.host/c8085ece-737b-4aa3-a391-68cf44fc59cd/1AOuoGeWBi.lottie"
            loop
            autoplay
          />
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-2 justify-center">
        {["Spicy veg under ₹200", "Best biryani near me", "Healthy salad bowls", "Italian pasta dinner"].map((suggestion) => (
          <Button
            key={suggestion}
            variant="outline"
            size="sm"
            onClick={() => setSearchQuery(suggestion)}
            className="text-xs bg-gray-800/30 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
};
