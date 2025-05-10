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
import { motion } from "framer-motion";
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
          color: "text-emerald-500",
          bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
          border: "border-emerald-100 dark:border-emerald-500/20",
        };
      case "Negative":
        return {
          icon: <ChevronDown className="h-5 w-5" />,
          color: "text-rose-500",
          bgColor: "bg-rose-50 dark:bg-rose-500/10",
          border: "border-rose-100 dark:border-rose-500/20",
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
          color: "text-emerald-500",
          bgColor: "bg-emerald-500",
          percentage: 95,
          iconColor: "text-emerald-500",
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
          color: "text-amber-500",
          bgColor: "bg-amber-500",
          percentage: 50,
          iconColor: "text-amber-500",
        };
      case "Low":
        return {
          color: "text-rose-500",
          bgColor: "bg-rose-500",
          percentage: 25,
          iconColor: "text-rose-500",
        };
      default:
        return {
          color: "text-zinc-500",
          bgColor: "bg-zinc-500",
          percentage: 35,
          iconColor: "text-zinc-500",
        };
    }
  };

  const demandInfo = getDemandInfo(insights.demandLevel);

  return (
    <div className="space-y-8 pb-12">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Career Dashboard
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Industry insights and analytics for {insights.industry}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1.5 rounded-full">
          <Calendar className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
          <span className="text-zinc-600 dark:text-zinc-300">
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
          <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Market Outlook
                </CardTitle>
                <div
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${outlookInfo.bgColor} ${outlookInfo.border}`}
                >
                  {outlookInfo.icon}
                  <span className={`text-xs font-medium ${outlookInfo.color}`}>
                    {insights.marketOutlook}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="pt-2 flex items-end gap-2">
                <div className="flex gap-2 items-center">
                  <div className="text-2xl font-bold">
                    {insights.growthRate.toFixed(1)}%
                  </div>
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                </div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  YoY Growth
                </span>
              </div>
              <Progress value={insights.growthRate} className="h-1.5 mt-3" />
            </CardContent>
            <div className="px-6 py-3 bg-zinc-50 dark:bg-zinc-800/50 text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800">
              Updated {format(new Date(insights.lastUpdated), "MMM d, yyyy")}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Demand Level
                </CardTitle>
                <div className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full text-xs font-medium text-zinc-800 dark:text-zinc-200">
                  {insights.demandLevel}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="pt-2">
                <div className="h-9 flex items-center w-full">
                  <div
                    className={`h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 w-full overflow-hidden`}
                  >
                    <div
                      className={`h-full ${demandInfo.bgColor} rounded-full`}
                      style={{ width: `${demandInfo.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">Low</span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  Moderate
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">High</span>
              </div>
            </CardContent>
            <div className="px-6 py-3 bg-zinc-50 dark:bg-zinc-800/50 text-xs flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800">
              <Briefcase className="h-3.5 w-3.5" />
              <span>{insights.demandLevel} demand in your region</span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Top Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-2">
              <div className="flex flex-wrap gap-1.5">
                {insights.topSkills.slice(0, 4).map((skill, index) => (
                  <Badge
                    key={skill}
                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-indigo-200 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800/30"
                  >
                    {skill}
                  </Badge>
                ))}
                {insights.topSkills.length > 4 && (
                  <Badge className="bg-zinc-100 hover:bg-zinc-200 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-700">
                    +{insights.topSkills.length - 4} more
                  </Badge>
                )}
              </div>
            </CardContent>
            <div className="px-6 py-3 bg-zinc-50 dark:bg-zinc-800/50 text-xs flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800">
              <Medal className="h-3.5 w-3.5" />
              <span>
                Based on {insights.dataPoints.toLocaleString()}+ job postings
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
          <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-zinc-900 dark:text-white">
                    Salary Ranges
                  </CardTitle>
                  <CardDescription className="text-zinc-500 dark:text-zinc-400">
                    By role (in thousands, USD)
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 border-zinc-200 dark:border-zinc-800"
                >
                  <BarChart2 className="h-3.5 w-3.5" />
                  <span>Details</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-1">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salaryData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      className="dark:stroke-zinc-800"
                    />
                    <XAxis
                      dataKey="name"
                      stroke="#71717a"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#71717a"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgb(24 24 27 / 0.8)",
                        border: "none",
                        borderRadius: "0.5rem",
                        fontSize: "0.875rem",
                        color: "#f4f4f5",
                      }}
                      cursor={{ fill: "rgb(244 244 245 / 0.05)" }}
                      formatter={(value) => [`$${value}K`, null]}
                    />
                    <Bar
                      dataKey="min"
                      name="Minimum"
                      fill="#c7d2fe"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="median"
                      name="Median"
                      fill="#818cf8"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="max"
                      name="Maximum"
                      fill="#4f46e5"
                      radius={[4, 4, 0, 0]}
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
          <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span className="text-zinc-900 dark:text-white">
                  Industry Trends
                </span>
                <span className="text-xs font-normal bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-full text-zinc-600 dark:text-zinc-400">
                  Q2 2025
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <ul className="space-y-3">
                {insights.keyTrends.map((trend, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <div
                      className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 
                      ${
                        index % 3 === 0
                          ? "bg-indigo-50 dark:bg-indigo-900/30"
                          : index % 3 === 1
                          ? "bg-cyan-50 dark:bg-cyan-900/30"
                          : "bg-purple-50 dark:bg-purple-900/30"
                      }`}
                    >
                      <ArrowUpRight
                        className={`h-3 w-3 
                        ${
                          index % 3 === 0
                            ? "text-indigo-600 dark:text-indigo-400"
                            : index % 3 === 1
                            ? "text-cyan-600 dark:text-cyan-400"
                            : "text-purple-600 dark:text-purple-400"
                        }`}
                      />
                    </div>
                    <span className="text-zinc-700 dark:text-zinc-300">
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
        <Card className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-zinc-900 dark:text-white">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <span>Recommended Skills</span>
                </CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400">
                  Skills that can boost your marketability
                </CardDescription>
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0"
              >
                <Brain className="h-3.5 w-3.5 mr-1.5" />
                Skill Assessment
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-3 pb-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {insights.recommendedSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                >
                  <div
                    className={`h-8 w-8 rounded-md flex items-center justify-center 
                    ${
                      index % 4 === 0
                        ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
                        : index % 4 === 1
                        ? "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400"
                        : index % 4 === 2
                        ? "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400"
                        : "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {index % 4 === 0 ? (
                      <Lightbulb className="h-4 w-4" />
                    ) : index % 4 === 1 ? (
                      <Brain className="h-4 w-4" />
                    ) : index % 4 === 2 ? (
                      <ActivitySquare className="h-4 w-4" />
                    ) : (
                      <Medal className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-white">
                      {skill}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
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
          <CardFooter className="border-t border-zinc-200 dark:border-zinc-800 py-3 text-sm">
            <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>
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
