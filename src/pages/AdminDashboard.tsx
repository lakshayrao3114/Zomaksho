
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, Users, ShoppingCart, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Mock data for analytics
  const revenueData = [
    { day: 'Mon', revenue: 12500, orders: 45 },
    { day: 'Tue', revenue: 15200, orders: 52 },
    { day: 'Wed', revenue: 18400, orders: 67 },
    { day: 'Thu', revenue: 22100, orders: 78 },
    { day: 'Fri', revenue: 25800, orders: 89 },
    { day: 'Sat', revenue: 31200, orders: 112 },
    { day: 'Sun', revenue: 28900, orders: 98 }
  ];

  const cuisineData = [
    { name: 'Indian', orders: 342, percentage: 35 },
    { name: 'Italian', orders: 256, percentage: 26 },
    { name: 'Chinese', orders: 189, percentage: 19 },
    { name: 'American', orders: 124, percentage: 13 },
    { name: 'Others', orders: 67, percentage: 7 }
  ];

  const heatmapData = [
    { hour: '8AM', monday: 12, tuesday: 15, wednesday: 18, thursday: 20, friday: 25, saturday: 35, sunday: 28 },
    { hour: '12PM', monday: 45, tuesday: 52, wednesday: 48, thursday: 55, friday: 62, saturday: 78, sunday: 68 },
    { hour: '6PM', monday: 78, tuesday: 82, wednesday: 85, thursday: 92, friday: 98, saturday: 112, sunday: 95 },
    { hour: '9PM', monday: 65, tuesday: 70, wednesday: 68, thursday: 75, friday: 88, saturday: 95, sunday: 82 }
  ];

  const peakHoursPrediction = [
    { time: '11:30 AM', predicted: 65, actual: 62 },
    { time: '1:00 PM', predicted: 89, actual: 85 },
    { time: '7:30 PM', predicted: 112, actual: 108 },
    { time: '9:00 PM', predicted: 95, actual: 98 }
  ];

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("zomaUserName");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold text-white font-lexend">
              <span className="italic">Zoma-ksho</span> <span className="italic">Admin</span>
            </h1>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-gray-700 text-white">
            Logout
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">₹1,54,100</div>
              <p className="text-xs text-green-500">+12.5% from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">541</div>
              <p className="text-xs text-blue-500">+8.2% from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Users</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1,284</div>
              <p className="text-xs text-purple-500">+15.3% from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Avg. Order Time</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">28 min</div>
              <p className="text-xs text-orange-500">-2.1 min from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="cuisines">Cuisines</TabsTrigger>
            <TabsTrigger value="heatmap">Activity</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-4">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Daily Revenue & Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }} 
                    />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#EF4444" strokeWidth={3} name="Revenue (₹)" />
                    <Line type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={3} name="Orders" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cuisines" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Most Ordered Cuisines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={cuisineData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="orders"
                      >
                        {cuisineData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#FFFFFF'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Orders by Cuisine</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={cuisineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#FFFFFF'
                        }} 
                      />
                      <Bar dataKey="orders" fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-4">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Order Activity Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={heatmapData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="hour" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }} 
                    />
                    <Legend />
                    <Line type="monotone" dataKey="monday" stroke="#FF6B6B" strokeWidth={2} name="Monday" />
                    <Line type="monotone" dataKey="tuesday" stroke="#4ECDC4" strokeWidth={2} name="Tuesday" />
                    <Line type="monotone" dataKey="wednesday" stroke="#45B7D1" strokeWidth={2} name="Wednesday" />
                    <Line type="monotone" dataKey="thursday" stroke="#96CEB4" strokeWidth={2} name="Thursday" />
                    <Line type="monotone" dataKey="friday" stroke="#FFEAA7" strokeWidth={2} name="Friday" />
                    <Line type="monotone" dataKey="saturday" stroke="#DDA0DD" strokeWidth={2} name="Saturday" />
                    <Line type="monotone" dataKey="sunday" stroke="#98D8C8" strokeWidth={2} name="Sunday" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-4">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">AI-Based Peak Hours Prediction (LSTM)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={peakHoursPrediction}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#FFFFFF'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="predicted" fill="#8B5CF6" name="Predicted Orders" />
                    <Bar dataKey="actual" fill="#EF4444" name="Actual Orders" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                  <h4 className="text-lg font-semibold text-white mb-2">Prediction Accuracy: 94.2%</h4>
                  <p className="text-gray-300">LSTM model trained on 6 months of historical data with 92% confidence interval.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
