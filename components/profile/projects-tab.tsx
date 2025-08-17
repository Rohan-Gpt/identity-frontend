"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { BarChart3, LineChart } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { motion } from "motion/react";
import { ProjectCard } from "./project-card";
import { ProjectListItem } from "./project-list-item";

export const projects = [
  {
    title: "AI Code Assistant",
    description:
      "A VS Code extension that helps developers write better code using AI",
    tags: ["TypeScript", "React", "Node.js"],
    stars: 142,
    forks: 23,
    lastUpdated: "2 days ago",
    image: "/placeholder.svg?height=200&width=400",
    progress: 85,
  },
  {
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for visualizing complex datasets",
    tags: ["D3.js", "React", "Python"],
    stars: 87,
    forks: 12,
    lastUpdated: "1 week ago",
    image: "/placeholder.svg?height=200&width=400",
    progress: 70,
  },
  {
    title: "E-commerce Platform",
    description: "Fully featured e-commerce solution with payment processing",
    tags: ["Next.js", "Stripe", "Tailwind"],
    stars: 215,
    forks: 34,
    lastUpdated: "3 days ago",
    image: "/placeholder.svg?height=200&width=400",
    progress: 95,
  },
  {
    title: "Machine Learning API",
    description: "RESTful API for machine learning model inference",
    tags: ["Python", "FastAPI", "TensorFlow"],
    stars: 56,
    forks: 8,
    lastUpdated: "2 weeks ago",
    image: "/placeholder.svg?height=200&width=400",
    progress: 60,
  },
  {
    title: "Mobile Fitness App",
    description: "Cross-platform mobile app for fitness tracking",
    tags: ["React Native", "Firebase", "Redux"],
    stars: 124,
    forks: 18,
    lastUpdated: "5 days ago",
    image: "/placeholder.svg?height=200&width=400",
    progress: 80,
  },
  {
    title: "Blockchain Explorer",
    description: "Web application for exploring blockchain transactions",
    tags: ["Vue.js", "Web3.js", "Node.js"],
    stars: 78,
    forks: 15,
    lastUpdated: "1 month ago",
    image: "/placeholder.svg?height=200&width=400",
    progress: 90,
  },
];

export function ProjectsTab({
  isLoading,
  colorTheme,
}: {
  isLoading: boolean;
  colorTheme: {
    primary: string;
    accent: string;
    badge: string;
    highlight: string;
  };
}) {
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("recent");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-muted-foreground">
            Your personal and open source projects
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Sort:{" "}
                {sortBy === "recent"
                  ? "Most Recent"
                  : sortBy === "stars"
                  ? "Most Stars"
                  : "Alphabetical"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("recent")}>
                Most Recent
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("stars")}>
                Most Stars
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("alpha")}>
                Alphabetical
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center border rounded-md overflow-hidden">
            <Button
              variant={view === "grid" ? "default" : "ghost"}
              size="sm"
              className="rounded-none border-0"
              onClick={() => setView("grid")}
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="sm"
              className="rounded-none border-0"
              onClick={() => setView("list")}
            >
              <LineChart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : view === "grid" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} colorTheme={colorTheme} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectListItem project={project} colorTheme={colorTheme} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
