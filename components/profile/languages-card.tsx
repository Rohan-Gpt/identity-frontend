import { Code2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { motion } from "motion/react";
import { Badge } from "../ui/badge";

interface GithubStats {
  totalRepos: number;
  totalStars: number;
  totalContributions: number;
  totalPRs: number;
  topLanguages: [
    {
      name: string;
      color: string;
      percentage: string;
    }
  ];
}

export function LanguagesCard({
  userData,
  isLoading,
}: {
  userData: GithubStats;
  isLoading: Boolean;
}) {
  const languages = [
    { name: "JavaScript", percentage: 35, color: "bg-yellow-400" },
    { name: "TypeScript", percentage: 25, color: "bg-blue-500" },
    { name: "Python", percentage: 20, color: "bg-green-500" },
    { name: "HTML/CSS", percentage: 15, color: "bg-orange-500" },
    { name: "Other", percentage: 5, color: "bg-gray-500" },
  ];

  return (
    <Card className="overflow-hidden group hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-base flex items-center gap-2">
          <Code2 size={16} />
          Languages & Technologies
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Skeleton className="h-5 w-40 mb-2" />
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-16" />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {userData.topLanguages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span>{lang.name}</span>
                    <span className="font-medium">{lang.percentage}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      style={{ backgroundColor: lang.color }}
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${lang.percentage}%` }}
                      transition={{
                        delay: 0.4 + index * 0.1,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-4 pt-4 border-t"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h4 className="text-sm font-medium mb-2">
                Frameworks & Libraries
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "Node.js",
                  "Express",
                  "Django",
                  "TensorFlow",
                ].map((framework, index) => (
                  <motion.div
                    key={framework}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <Badge variant="secondary">{framework}</Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
