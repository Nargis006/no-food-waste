import { Card, CardBody, CardHeader } from '../../components/common';
import { mockAnalytics, mockAssignments } from '../../services/mockData';
import { 
  TrendingUp, Package, MapPin, Truck, Users, 
  Calendar, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';

export function AnalyticsPage() {
  const stats = [
    {
      title: 'Total Food Saved',
      value: mockAnalytics.totalFoodSaved,
      change: '+12%',
      changeType: 'positive',
      icon: Package,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Hunger Spots Served',
      value: mockAnalytics.hungerSpotsServed,
      change: '+5',
      changeType: 'positive',
      icon: MapPin,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Drivers',
      value: mockAnalytics.activeDrivers,
      change: '+2',
      changeType: 'positive',
      icon: Truck,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      title: 'Total Deliveries',
      value: mockAnalytics.totalDeliveries,
      change: '+24',
      changeType: 'positive',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const weeklyData = [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 52 },
    { day: 'Wed', value: 38 },
    { day: 'Thu', value: 65 },
    { day: 'Fri', value: 48 },
    { day: 'Sat', value: 72 },
    { day: 'Sun', value: 35 },
  ];

  const maxValue = Math.max(...weeklyData.map((d) => d.value));

  const statusBreakdown = [
    { status: 'Verified', count: mockAssignments.filter(a => a.status === 'verified').length, color: 'bg-emerald-500' },
    { status: 'Delivered', count: mockAssignments.filter(a => a.status === 'delivered').length, color: 'bg-green-500' },
    { status: 'Submitted', count: mockAssignments.filter(a => a.status === 'submitted').length, color: 'bg-purple-500' },
    { status: 'In Progress', count: mockAssignments.filter(a => a.status === 'reached').length, color: 'bg-yellow-500' },
    { status: 'Assigned', count: mockAssignments.filter(a => a.status === 'assigned').length, color: 'bg-blue-500' },
  ];

  const totalAssignments = mockAssignments.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-500">Comprehensive view of platform performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardBody>
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Chart */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Weekly Food Collection (kg)</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              This Week
            </div>
          </CardHeader>
          <CardBody>
            <div className="flex items-end justify-between gap-2 h-48">
              {weeklyData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-emerald-500 rounded-t-sm transition-all hover:bg-emerald-600"
                    style={{ height: `${(item.value / maxValue) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">{item.day}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Status Breakdown */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-gray-900">Delivery Status Breakdown</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {statusBreakdown.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">{item.status}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {item.count} ({Math.round((item.count / totalAssignments) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${(item.count / totalAssignments) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Period Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">This Week</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {mockAnalytics.thisWeek.foodSaved}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {mockAnalytics.thisWeek.deliveries} deliveries
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {mockAnalytics.thisMonth.foodSaved}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {mockAnalytics.thisMonth.deliveries} deliveries
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default AnalyticsPage;
