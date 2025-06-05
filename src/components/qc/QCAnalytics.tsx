
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Target, Clock } from "lucide-react";

const QCAnalytics = () => {
  const analyticsData = {
    passRateTrend: {
      current: 94.2,
      previous: 91.8,
      change: 2.4
    },
    averageInspectionTime: {
      current: 23,
      previous: 28,
      change: -5
    },
    topIssues: [
      { type: "Surface Defects", count: 12, trend: "up" },
      { type: "Dimensional", count: 8, trend: "down" },
      { type: "Embed Issues", count: 5, trend: "stable" },
      { type: "Concrete Quality", count: 3, trend: "down" }
    ],
    inspectorPerformance: [
      { name: "Sarah Johnson", inspections: 45, passRate: 96.2, avgTime: 21 },
      { name: "Mike Chen", inspections: 38, passRate: 93.8, avgTime: 25 },
      { name: "David Rodriguez", inspections: 42, passRate: 94.1, avgTime: 22 }
    ],
    weeklyTrends: {
      inspections: [45, 52, 48, 59, 61, 58, 42],
      passRate: [92.1, 94.2, 93.8, 95.1, 94.7, 93.9, 95.2]
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-red-500" />;
      case "down": return <TrendingDown className="h-4 w-4 text-green-500" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">QC Analytics & Insights</h3>
        <p className="text-sm text-gray-600">Performance metrics, trends, and actionable insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="module-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pass Rate</p>
                <p className="text-3xl font-bold text-green-600">
                  {analyticsData.passRateTrend.current}%
                </p>
                <p className={`text-sm ${getTrendColor(analyticsData.passRateTrend.change)}`}>
                  {analyticsData.passRateTrend.change > 0 ? '+' : ''}
                  {analyticsData.passRateTrend.change}% from last month
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="module-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Inspection Time</p>
                <p className="text-3xl font-bold text-blue-600">
                  {analyticsData.averageInspectionTime.current}min
                </p>
                <p className={`text-sm ${getTrendColor(analyticsData.averageInspectionTime.change)}`}>
                  {analyticsData.averageInspectionTime.change}min from last month
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="module-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Issues</p>
                <p className="text-3xl font-bold text-orange-600">28</p>
                <p className="text-sm text-gray-500">Across all projects</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="module-card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Quality Score</p>
                <p className="text-3xl font-bold text-purple-600">A+</p>
                <p className="text-sm text-gray-500">Industry benchmark</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Top Quality Issues</CardTitle>
            <CardDescription>Most frequent defect types this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topIssues.map((issue, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full">
                      <span className="text-sm font-bold text-orange-600">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium">{issue.type}</div>
                      <div className="text-sm text-gray-500">{issue.count} occurrences</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(issue.trend)}
                    <Badge variant="outline">{issue.count}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inspector Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Inspector Performance</CardTitle>
            <CardDescription>Individual inspector metrics and efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.inspectorPerformance.map((inspector, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{inspector.name}</span>
                    <Badge className="bg-green-100 text-green-800">
                      {inspector.passRate}%
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="text-gray-500">Inspections:</span>
                      <span className="ml-1 font-medium">{inspector.inspections}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Avg Time:</span>
                      <span className="ml-1 font-medium">{inspector.avgTime}min</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trends Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Performance Trends</CardTitle>
          <CardDescription>7-day inspection volume and pass rate trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-medium text-gray-700">Interactive Charts Coming Soon</h4>
              <p className="text-sm text-gray-500 mt-2">
                Weekly trends: {analyticsData.weeklyTrends.inspections.reduce((a, b) => a + b, 0)} total inspections
              </p>
              <p className="text-sm text-gray-500">
                Average pass rate: {(analyticsData.weeklyTrends.passRate.reduce((a, b) => a + b, 0) / 7).toFixed(1)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center mr-3">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            AI Quality Insights
          </CardTitle>
          <CardDescription>Automated analysis and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-medium text-green-800">Positive Trend Detected</div>
                <div className="text-sm text-gray-700">
                  Surface defect rates have decreased 23% since implementing new form release procedures
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <div className="font-medium text-orange-800">Attention Required</div>
                <div className="text-sm text-gray-700">
                  Form 7, Section B continues to show correlation with indentation defects - recommend review
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-white rounded-lg">
              <Target className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-800">Optimization Opportunity</div>
                <div className="text-sm text-gray-700">
                  Consider scheduling inspections during 9-11 AM window for 15% faster completion times
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QCAnalytics;
