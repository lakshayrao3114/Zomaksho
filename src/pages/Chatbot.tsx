import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, ArrowLeft, Bot, User, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  foodItems?: FoodItem[];
}

interface FoodItem {
  name: string;
  price: number;
  description: string;
  isVeg: boolean;
  restaurant: string;
}

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Nugget, your personal food buddy. I can help you find dishes based on your preferences. Try asking me something like 'I want spicy vegetarian food under ₹200' or 'suggest healthy bowl options'.",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callLLM = async (query: string): Promise<FoodItem[]> => {
    const prompt = `Return a list of food items based on this user prompt: "${query}". Format the JSON as an array of objects like this:

[
  {
    "name": "Gulab Jamun",
    "price": 90,
    "description": "Sweet deep-fried dumplings soaked in sugar syrup",
    "isVeg": true,
    "restaurant": "Sweet House"
  },
  ...
]`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
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
      }
    );

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

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const foodItems = await callLLM(input);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text:
          foodItems.length > 0
            ? `Great! I found ${foodItems.length} dishes that match your preferences:`
            : "I couldn't find any dishes matching your criteria. Here's what I suggest:",
        isBot: true,
        timestamp: new Date(),
        foodItems: foodItems,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error from LLM:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: "Oops! Something went wrong while fetching dish suggestions.",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    }

    setIsTyping(false);
  };

  const handleOrderItem = (item: FoodItem) => {
    toast.success(`Added ${item.name} to cart! 🛒`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Bot className="w-8 h-8 text-purple-500" />
            <div>
              <h1 className="text-xl font-bold">Nugget</h1>
              <p className="text-sm text-gray-400">Powered by Zomaksho</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-160px)]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isBot ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl ${
                message.isBot ? "order-2" : "order-1"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  message.isBot
                    ? "bg-gray-800 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                {message.foodItems && (
                  <div className="mt-3 space-y-2">
                    {message.foodItems.map((item, index) => (
                      <Card key={index} className="bg-gray-700 border-gray-600">
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold text-white flex items-center">
                                {item.name}
                                {item.isVeg && (
                                  <span className="ml-2 text-green-400">
                                    🌱
                                  </span>
                                )}
                              </h4>
                              <p className="text-xs text-gray-300">
                                {item.restaurant}
                              </p>
                              <p className="text-sm text-gray-400 mt-1">
                                {item.description}
                              </p>
                            </div>
                            <div className="text-right ml-3">
                              <p className="font-bold text-green-400">
                                ₹{item.price}
                              </p>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleOrderItem(item)}
                            size="sm"
                            className="w-full bg-red-500 hover:bg-red-600 text-white"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Order Now
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
              <div
                className={`flex items-center mt-1 ${
                  message.isBot ? "order-2" : "order-1 justify-end"
                }`}
              >
                {message.isBot && (
                  <Bot className="w-4 h-4 text-purple-500 mr-2" />
                )}
                {!message.isBot && (
                  <User className="w-4 h-4 text-red-500 ml-2" />
                )}
                <span className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 p-4">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask me about food... e.g., 'spicy veg under ₹200'"
            className="flex-1 bg-gray-800 border-gray-700 text-white"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-red-500 hover:bg-red-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
