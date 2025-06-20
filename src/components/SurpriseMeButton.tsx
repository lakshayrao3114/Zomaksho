
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";

const SurpriseMeButton = () => {
  const [showCoupon, setShowCoupon] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState("");

  const dummyCoupons = [
    { code: "SURPRISE50", discount: "50% OFF", description: "Valid on orders above ₹299" },
    { code: "YUMMY25", discount: "25% OFF", description: "Valid on all restaurants" },
    { code: "FEAST30", discount: "30% OFF", description: "Valid on orders above ₹199" },
    { code: "HUNGRY40", discount: "40% OFF", description: "Valid on weekend orders" },
    { code: "DELISH20", discount: "20% OFF", description: "Valid on first 3 orders" },
    { code: "TASTE35", discount: "35% OFF", description: "Valid on orders above ₹399" },
  ];

  const handleSurpriseMe = () => {
    const randomCoupon = dummyCoupons[Math.floor(Math.random() * dummyCoupons.length)];
    setCurrentCoupon(JSON.stringify(randomCoupon));
    setShowCoupon(true);
    
    // Trigger confetti effect with proper type checking
    if (typeof window !== 'undefined' && window.confetti) {
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const copyCoupon = () => {
    const coupon = JSON.parse(currentCoupon);
    navigator.clipboard.writeText(coupon.code);
    toast.success("Coupon code copied!");
  };

  return (
    <>
      <Button
        onClick={handleSurpriseMe}
        className="w-48 h-48 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 mx-auto flex items-center justify-center relative overflow-hidden group"
        style={{
          boxShadow: '0 0 15px #ef4444, 0 0 30px #ef4444',
        }}
      >
        <div className="absolute inset-0 bg-red-400/20 group-hover:animate-pulse"></div>
        <div className="relative z-10 flex flex-col items-center">
          <Sparkles className="w-8 h-8 mb-2 animate-bounce" />
          <span>Surprise Me</span>
        </div>
      </Button>

      <Dialog open={showCoupon} onOpenChange={setShowCoupon}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-red-500 mb-4">
              Surprise Coupon!
            </DialogTitle>
          </DialogHeader>
          
          {currentCoupon && (
            <div className="text-center space-y-6">
              {(() => {
                const coupon = JSON.parse(currentCoupon);
                return (
                  <>
                    <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-6 rounded-lg border border-red-500/30">
                      <div className="text-3xl font-bold text-red-400 mb-2">
                        {coupon.discount}
                      </div>
                      <div className="text-xl font-mono bg-gray-800 px-4 py-2 rounded border-2 border-dashed border-red-500 inline-block">
                        {coupon.code}
                      </div>
                      <div className="text-sm text-gray-300 mt-2">
                        {coupon.description}
                      </div>
                    </div>
                    
                    <Button
                      onClick={copyCoupon}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Coupon Code
                    </Button>
                    
                    <p className="text-xs text-gray-400">
                      * Terms and conditions apply. Valid for limited time.
                    </p>
                  </>
                );
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SurpriseMeButton;
