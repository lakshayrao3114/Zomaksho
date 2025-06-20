
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Gift, Coins, Target, Star } from "lucide-react";
import { toast } from "sonner";

const GameSection = () => {
  const [userCoins, setUserCoins] = useState(250);
  const [currentStreak, setCurrentStreak] = useState(2);
  const [totalOrders, setTotalOrders] = useState(7);

  const tasks = [
    {
      id: 1,
      title: "Order Streak Master",
      description: "Complete 3 orders in a row",
      progress: currentStreak,
      target: 3,
      reward: "₹50 OFF",
      icon: <Flame className="w-5 h-5" />,
      completed: currentStreak >= 3
    },
    {
      id: 2,
      title: "Spin Wheel Ready",
      description: "Place 5 orders to unlock spin wheel",
      progress: totalOrders,
      target: 5,
      reward: "Mystery Prize",
      icon: <Gift className="w-5 h-5" />,
      completed: totalOrders >= 5
    },
    {
      id: 3,
      title: "Coin Collector",
      description: "Collect 500 food coins",
      progress: userCoins,
      target: 500,
      reward: "₹100 OFF",
      icon: <Coins className="w-5 h-5" />,
      completed: userCoins >= 500
    },
    {
      id: 4,
      title: "Weekend Warrior",
      description: "Order 2 times this weekend",
      progress: 1,
      target: 2,
      reward: "Free Delivery",
      icon: <Target className="w-5 h-5" />,
      completed: false
    }
  ];

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-28">
      <Card className="bg-gradient-to-b from-black via-[#e5383b] to-black border-black backdrop-blur-sm w-full rounded-none border-x-0">
        <CardHeader className="text-center px-4 md:px-6">
          <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-2">
            <Star className="w-8 h-8 text-pink-500" />
            Play Big, Eat Big
            <Star className="w-8 h-8 text-pink-500" />
          </CardTitle>
          <p className="text-gray-300">Complete tasks and earn rewards!</p>
        </CardHeader>
        
        <CardContent className="space-y-6 px-4 md:px-6">
          {/* Coins Display */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-500/30">
              <Coins className="w-6 h-6 text-yellow-500" />
              <span className="text-xl font-bold text-yellow-600">{userCoins} Food Coins</span>
            </div>
          </div>

          {/* Tasks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
            {tasks.map((task) => (
              <div 
                key={task.id}
                className={`
                  p-4 rounded-lg border transition-all duration-300
                  ${task.completed 
                    ? 'bg-green-100/80 border-green-400/50' 
                    : 'bg-white/60 border-gray-400/50'
                  }
                `}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {task.icon}
                    <h4 className="font-semibold text-gray-800">{task.title}</h4>
                  </div>
                  <Badge 
                    variant={task.completed ? "default" : "secondary"}
                    className={task.completed ? "bg-green-600" : "bg-gray-600"}
                  >
                    {task.reward}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-gray-800">{task.progress}/{task.target}</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        task.completed ? 'bg-green-500' : 'bg-pink-500'
                      }`}
                      style={{ width: `${Math.min((task.progress / task.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameSection;
