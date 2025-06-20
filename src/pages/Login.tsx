import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, User, Shield } from "lucide-react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

const Login = () => {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [adminForm, setAdminForm] = useState({ username: "", password: "" });

  const handleUserLogin = () => {
    if (!userForm.name || !userForm.email || !userForm.password) {
      toast.error("Please fill all fields");
      return;
    }

    // Simulate login
    localStorage.setItem("zomaUserName", userForm.name);
    localStorage.setItem("userEmail", userForm.email);
    toast.success("Login successful!");
    navigate("/");
  };

  const handleAdminLogin = () => {
    if (adminForm.username === "admin" && adminForm.password === "pass") {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("zomaUserName", "Admin");
      toast.success("Admin login successful!");
      navigate("/admin");
    } else {
      toast.error("Invalid admin credentials");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem("zomaUserName", user.displayName || "Zoma User");
      localStorage.setItem("userEmail", user.email || "");
      toast.success("Google login successful!");
      navigate("/");
    } catch (error) {
      console.error("Google Login Error", error);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>

      {/* Video background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Video background */}
        <video
          className="w-full h-full object-cover"
          src="/img-vid-uploads/zomato-bg-vid.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>

        {/* Optional gradient overlay on top of video */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-orange-900/20 opacity-80"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto p-4">
        {/* Back button */}
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="mb-6 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-red-500 mb-2">
              Welcome to Zoma-ksho
            </CardTitle>
            <p className="text-gray-400">Choose your login method</p>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-800">
                <TabsTrigger
                  value="user"
                  className="data-[state=active]:bg-red-500"
                >
                  <User className="w-4 h-4 mr-2" />
                  User Login
                </TabsTrigger>
                <TabsTrigger
                  value="admin"
                  className="data-[state=active]:bg-red-500"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin Login
                </TabsTrigger>
              </TabsList>

              <TabsContent value="user" className="space-y-4">
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={userForm.name}
                  onChange={(e) =>
                    setUserForm({ ...userForm, name: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={userForm.email}
                  onChange={(e) =>
                    setUserForm({ ...userForm, email: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={userForm.password}
                  onChange={(e) =>
                    setUserForm({ ...userForm, password: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />

                <Button
                  onClick={handleUserLogin}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold"
                >
                  Login / Sign Up
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-gray-900 px-2 text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleGoogleLogin}
                  variant="outline"
                  className="w-full border-gray-700 text-white hover:bg-gray-800"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </TabsContent>

              <TabsContent value="admin" className="space-y-4">
                <Input
                  type="text"
                  placeholder="Username"
                  value={adminForm.username}
                  onChange={(e) =>
                    setAdminForm({ ...adminForm, username: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={adminForm.password}
                  onChange={(e) =>
                    setAdminForm({ ...adminForm, password: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                />

                <Button
                  onClick={handleAdminLogin}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                >
                  Admin Login
                </Button>

                <div className="text-center text-sm text-gray-400">
                  Demo credentials: admin / pass
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
