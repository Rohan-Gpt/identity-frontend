import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { motion } from "motion/react";
import { SkillRadarChart } from "./skill-radar-chart";
import {
  Activity,
  CheckCircle2,
  Code2,
  Github,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";

export const achievements = [
  {
    title: "100 Day Streak",
    description: "Coded for 100 days in a row",
    icon: <Zap size={32} className="text-amber-500" />,
  },
  {
    title: "Open Source Hero",
    description: "100+ contributions to open source",
    icon: <Github size={32} className="text-violet-500" />,
  },
  {
    title: "Problem Solver",
    description: "Solved 300+ coding challenges",
    icon: <Code2 size={32} className="text-blue-500" />,
  },
  {
    title: "Top Contributor",
    description: "Top 1% contributor on GitHub",
    icon: <Trophy size={32} className="text-amber-500" />,
  },
  {
    title: "Early Adopter",
    description: "Early adopter of new technologies",
    icon: <Sparkles size={32} className="text-purple-500" />,
  },
  {
    title: "Code Reviewer",
    description: "Reviewed 50+ pull requests",
    icon: <CheckCircle2 size={32} className="text-green-500" />,
  },
  {
    title: "Bug Hunter",
    description: "Found and fixed 100+ bugs",
    icon: <Activity size={32} className="text-red-500" />,
  },
];

export function AchievementsTab({
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
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Achievements & Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {isLoading
            ? [...Array(12)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <Skeleton className="h-24 w-24 rounded-full mb-2" />
                  <Skeleton className="h-4 w-20 mb-1" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))
            : achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center mb-2 bg-gradient-to-br ${colorTheme.primary} p-1`}
                  >
                    <div className="bg-background rounded-full w-full h-full flex items-center justify-center">
                      {achievement.icon}
                    </div>
                  </div>
                  <h3 className="font-medium text-sm">{achievement.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
        </div>
      </div>

      {/* <div>
        <h2 className="text-2xl font-bold mb-6">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading
            ? [...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))
            : certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {cert.icon}
                        {cert.title}
                      </CardTitle>
                      <CardDescription>{cert.issuer}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        {cert.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span>Issued: {cert.issued}</span>
                        <Badge variant="outline">Verified</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
        </div>
      </div> */}

      <SkillRadarChart isLoading={isLoading} colorTheme={colorTheme} />
    </div>
  );
}
