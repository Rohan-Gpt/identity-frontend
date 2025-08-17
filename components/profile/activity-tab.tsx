import { Code2, GitFork, MessageSquare, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { motion } from "motion/react";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

export function ActivityTab({
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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2">
        <ActivityTimeline isLoading={isLoading} colorTheme={colorTheme} />
      </div>
      <div className="space-y-5">
        <ActivitySummaryCard isLoading={isLoading} colorTheme={colorTheme} />
        <TopRepositoriesCard isLoading={isLoading} colorTheme={colorTheme} />
      </div>
    </div>
  );
}

function ActivityTimeline({
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
  const activities = [
    {
      type: "commit",
      repo: "ai-code-assistant",
      message: "Fix bug in code completion algorithm",
      time: "2 hours ago",
    },
    {
      type: "pr",
      repo: "next.js",
      message: "Add support for new image optimization features",
      time: "1 day ago",
    },
    {
      type: "issue",
      repo: "react-query",
      message: "Reported issue with caching mechanism",
      time: "2 days ago",
    },
    {
      type: "star",
      repo: "tailwindcss",
      message: "Starred the repository",
      time: "3 days ago",
    },
    {
      type: "fork",
      repo: "typescript",
      message: "Forked the repository",
      time: "5 days ago",
    },
    {
      type: "commit",
      repo: "personal-website",
      message: "Update portfolio with new projects",
      time: "1 week ago",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Your recent activity across various platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-muted"></div>
            <div className="space-y-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="relative flex gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-muted"></div>
            <div className="space-y-6">
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  className="relative flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${colorTheme.accent} text-white`}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    {activity.type === "commit" && (
                      <Code2 className="h-5 w-5" />
                    )}
                    {activity.type === "pr" && <GitFork className="h-5 w-5" />}
                    {activity.type === "issue" && (
                      <MessageSquare className="h-5 w-5" />
                    )}
                    {activity.type === "star" && <Star className="h-5 w-5" />}
                    {activity.type === "fork" && (
                      <GitFork className="h-5 w-5" />
                    )}
                  </motion.div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{activity.repo}</span>
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Activity
        </Button>
      </CardFooter>
    </Card>
  );
}

function ActivitySummaryCard({
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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Activity Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-32 w-full" />
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              You&apos;ve been more active than 82% of developers this month.
            </div>
            <div className="h-32 flex items-end gap-1">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, i) => {
                  const height = Math.floor(Math.random() * 80) + 20;
                  return (
                    <div
                      key={day}
                      className="flex-1 flex flex-col items-center"
                    >
                      <motion.div
                        className={`w-full ${colorTheme.accent} rounded-t-sm`}
                        style={{ height: `${height}%` }}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                      ></motion.div>
                      <div className="text-xs mt-1">{day}</div>
                    </div>
                  );
                }
              )}
            </div>
            <div className="space-y-2 pt-2 border-t">
              <div className="flex justify-between text-sm">
                <span>Commits</span>
                <span className="font-medium">32</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Pull Requests</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Issues</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Code Reviews</span>
                <span className="font-medium">15</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TopRepositoriesCard({
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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Top Repositories</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {[
              { name: "ai-code-assistant", stars: 142, language: "TypeScript" },
              { name: "data-viz-dashboard", stars: 87, language: "JavaScript" },
              { name: "e-commerce-platform", stars: 215, language: "Next.js" },
              { name: "machine-learning-api", stars: 56, language: "Python" },
            ].map((repo, index) => (
              <motion.div
                key={repo.name}
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div
                  className={`h-8 w-8 rounded ${colorTheme.accent} flex items-center justify-center text-white`}
                >
                  <Code2 size={16} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{repo.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {repo.language}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star size={14} />
                  <span>{repo.stars}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full text-xs">
          View All Repositories
        </Button>
      </CardFooter>
    </Card>
  );
}
