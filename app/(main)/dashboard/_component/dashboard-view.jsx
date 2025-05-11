"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Briefcase,
  TrendingUp,
  TrendingDown,
  ActivitySquare,
  ChevronUp,
  ChevronDown,
  Brain,
  BarChart2,
  LineChart as LineChartIcon,
  Calendar,
  ArrowUpRight,
  Sparkles,
  Medal,
  Lightbulb,
  AlertCircle,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "@/lib/motion-wrapper";
import { Button } from "@/components/ui/button";

const DashboardView = ({ insights }) => {
  // Transform salary data for the chart
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  // Format the next update distance
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  // Get icon and color based on outlook
  const getOutlookInfo = (outlook) => {
    switch (outlook) {
      case "Positive":
        return {
          icon: <ChevronUp className="h-5 w-5" />,
          color: "text-blue-500",
          bgColor: "bg-blue-50 dark:bg-blue-500/10",
          border: "border-blue-100 dark:border-blue-500/20",
        };
      case "Negative":
        return {
          icon: <ChevronDown className="h-5 w-5" />,
          color: "text-red-500",
          bgColor: "bg-red-50 dark:bg-red-500/10",
          border: "border-red-100 dark:border-red-500/20",
        };
      default:
        return {
          icon: <ActivitySquare className="h-5 w-5" />,
          color: "text-blue-500",
          bgColor: "bg-blue-50 dark:bg-blue-500/10",
          border: "border-blue-100 dark:border-blue-500/20",
        };
    }
  };

  const outlookInfo = getOutlookInfo(insights.marketOutlook);

  // Get demand level info
  const getDemandInfo = (level) => {
    switch (level) {
      case "Very High":
        return {
          color: "text-blue-500",
          bgColor: "bg-blue-500",
          percentage: 95,
          iconColor: "text-blue-500",
        };
      case "High":
        return {
          color: "text-blue-500",
          bgColor: "bg-blue-500",
          percentage: 75,
          iconColor: "text-blue-500",
        };
      case "Moderate":
        return {
          color: "text-blue-400",
          bgColor: "bg-blue-400",
          percentage: 50,
          iconColor: "text-blue-400",
        };
      case "Low":
        return {
          color: "text-blue-300",
          bgColor: "bg-blue-300",
          percentage: 25,
          iconColor: "text-blue-300",
        };
      default:
        return {
          color: "text-blue-500",
          bgColor: "bg-blue-500",
          percentage: 35,
          iconColor: "text-blue-500",
        };
    }
  };

  const demandInfo = getDemandInfo(insights.demandLevel);

  return (
    <div className="space-y-8 pb-12">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            Career Dashboard
          </h1>
          <p className="text-blue-600 mt-1 font-medium">
            Industry insights and analytics for {insights.industry}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm bg-gradient-to-r from-blue-100 to-white dark:from-blue-900/30 dark:to-blue-900/10 px-4 py-2 rounded-full shadow-sm">
          <Calendar className="h-4 w-4 text-blue-500" />
          <span className="text-blue-600 font-medium">
            Data updated {nextUpdateDistance}
          </span>
        </div>
      </div>

      {/* Insight Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-blue-900/10 dark:to-blue-900/5 rounded-xl">
            <CardHeader className="pb-2 bg-white/80 dark:bg-transparent">
              <div className="flex justify-between">
                <CardTitle className="text-sm font-medium text-blue-600">
                  Market Outlook
                </CardTitle>
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${outlookInfo.bgColor} ${outlookInfo.border}`}
                >
                  {outlookInfo.icon}
                  <span className={`text-xs font-bold ${outlookInfo.color}`}>
                    {insights.marketOutlook}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-end gap-2">
                <div className="flex gap-2 items-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {insights.growthRate.toFixed(1)}%
                  </div>
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                </div>
                <span className="text-sm text-blue-500 font-medium">
                  YoY Growth
                </span>
              </div>
              <Progress
                value={insights.growthRate}
                className="h-2 mt-4 bg-blue-100 dark:bg-blue-900/30"
              />
            </CardContent>
            <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/10 dark:to-blue-900/5 text-xs text-blue-600 font-medium border-t border-blue-100">
              Updated {format(new Date(insights.lastUpdated), "MMM d, yyyy")}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-blue-900/10 dark:to-blue-900/5 rounded-xl">
            <CardHeader className="pb-2 bg-white/80 dark:bg-transparent">
              <div className="flex justify-between">
                <CardTitle className="text-sm font-medium text-blue-600">
                  Demand Level
                </CardTitle>
                <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-xs font-bold text-blue-500">
                  {insights.demandLevel}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div>
                <div className="h-9 flex items-center w-full">
                  <div className="h-2 rounded-full bg-blue-100 dark:bg-blue-900/30 w-full overflow-hidden">
                    <div
                      className={`h-full ${demandInfo.bgColor} rounded-full bg-gradient-to-r from-blue-400 to-blue-600`}
                      style={{ width: `${demandInfo.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 text-sm">
                <span className="text-blue-400 font-medium">Low</span>
                <span className="text-blue-500 font-medium">Moderate</span>
                <span className="text-blue-600 font-medium">High</span>
              </div>
            </CardContent>
            <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/10 dark:to-blue-900/5 text-xs flex items-center gap-1.5 text-blue-600 font-medium border-t border-blue-100">
              <Briefcase className="h-4 w-4" />
              <span>{insights.demandLevel} demand in your region</span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-blue-900/10 dark:to-blue-900/5 rounded-xl">
            <CardHeader className="pb-2 bg-white/80 dark:bg-transparent">
              <CardTitle className="text-sm font-medium text-blue-600">
                Top Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-4">
              <div className="flex flex-wrap gap-2">
                {insights.topSkills.slice(0, 4).map((skill, index) => (
                  <Badge
                    key={skill}
                    className="bg-gradient-to-r from-blue-100 to-white text-blue-600 border-0 px-3 py-1.5 rounded-full font-medium shadow-sm hover:shadow dark:from-blue-900/20 dark:to-blue-900/10 dark:text-blue-200"
                  >
                    {skill}
                  </Badge>
                ))}
                {insights.topSkills.length > 4 && (
                  <Badge className="bg-white text-blue-600 border border-blue-100 px-3 py-1.5 rounded-full font-medium">
                    +{insights.topSkills.length - 4} more
                  </Badge>
                )}
              </div>
            </CardContent>
            <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/10 dark:to-blue-900/5 text-xs flex items-center gap-1.5 text-blue-600 font-medium border-t border-blue-100">
              <Medal className="h-4 w-4" />
              <span>
                Based on {(insights.dataPoints || 10000).toLocaleString()}+ job
                postings
              </span>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Salary Chart */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-blue-900/10 dark:to-blue-900/5 rounded-xl overflow-hidden">
            <CardHeader className="border-b border-blue-100 bg-white/80 dark:bg-transparent">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-blue-600">
                    Salary Ranges
                  </CardTitle>
                  <CardDescription className="text-blue-500">
                    By role (in thousands, USD)
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white border-0 rounded-full px-4"
                >
                  <BarChart2 className="h-4 w-4" />
                  <span>Details</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-1 pt-4">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salaryData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      className="dark:stroke-blue-900/20"
                    />
                    <XAxis
                      dataKey="name"
                      stroke="#3b82f6"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#3b82f6"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "0.5rem",
                        fontSize: "0.875rem",
                        color: "#3b82f6",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                      cursor={{ fill: "rgba(59, 130, 246, 0.05)" }}
                      formatter={(value) => [`$${value}K`, null]}
                    />
                    <Bar
                      dataKey="min"
                      name="Minimum"
                      fill="#93c5fd"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="median"
                      name="Median"
                      fill="#60a5fa"
                      radius={[6, 6, 0, 0]}
                    />
                    <Bar
                      dataKey="max"
                      name="Maximum"
                      fill="#2563eb"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Industry Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-blue-900/10 dark:to-blue-900/5 rounded-xl overflow-hidden">
            <CardHeader className="pb-2 border-b border-blue-100 bg-white/80 dark:bg-transparent">
              <CardTitle className="flex justify-between items-center text-blue-600 font-bold">
                <span>Industry Trends</span>
                <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full text-blue-600 dark:text-blue-200">
                  Q2 2025
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-4">
                {insights.keyTrends.map((trend, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <div
                      className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 
                      bg-gradient-to-r from-blue-400 to-blue-600 shadow-sm"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="text-blue-700 dark:text-blue-300 font-medium">
                      {trend}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Skills Recommendation Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-blue-900/10 dark:to-blue-900/5 rounded-xl overflow-hidden">
          <CardHeader className="pb-2 border-b border-blue-100 bg-white/80 dark:bg-transparent">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-blue-600 font-bold">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  <span>Recommended Skills</span>
                </CardTitle>
                <CardDescription className="text-blue-500">
                  Skills that can boost your marketability
                </CardDescription>
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white border-0 rounded-full px-5 py-2 shadow-md hover:shadow-lg transition-all"
              >
                <Brain className="h-4 w-4 mr-1.5" />
                Skill Assessment
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6 pb-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {insights.recommendedSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="flex items-center gap-3 p-4 rounded-xl border border-blue-100 bg-white dark:bg-blue-900/10 shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                >
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center 
                    bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md"
                  >
                    {index % 4 === 0 ? (
                      <Lightbulb className="h-5 w-5" />
                    ) : index % 4 === 1 ? (
                      <Brain className="h-5 w-5" />
                    ) : index % 4 === 2 ? (
                      <ActivitySquare className="h-5 w-5" />
                    ) : (
                      <Medal className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-blue-700 dark:text-blue-300">
                      {skill}
                    </div>
                    <div className="text-xs font-medium text-blue-500">
                      {index % 3 === 0
                        ? "High demand"
                        : index % 3 === 1
                        ? "Growing quickly"
                        : "Competitive edge"}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-blue-100 py-3 text-sm">
            <div className="flex items-center gap-1.5 text-blue-600">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">
                Skills are recommended based on your industry profile and
                current market trends
              </span>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardView;
