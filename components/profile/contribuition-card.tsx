import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { motion } from "motion/react";

export function ContributionCard({
  colorTheme,
}: {
  colorTheme: {
    primary: string;
    accent: string;
    badge: string;
    highlight: string;
  };
}) {
  return (
    <Card className="overflow-hidden group hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-base flex items-center gap-2">
          <Activity size={16} />
          Contribution Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <>
            <div className="flex items-center justify-center mb-4">
              <Skeleton className="h-16 w-24" />
            </div>
            <div className="flex items-center justify-between mb-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="text-center">
                  <Skeleton className="h-8 w-16 mx-auto mb-1" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </div>
              ))}
            </div>
            <Skeleton className="h-16 w-full mt-4" />
          </>
        ) : (
          <>
            <motion.div
              className="flex items-center justify-center mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-4xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  127
                </motion.div>
                <div className="text-sm text-muted-foreground">
                  Current Streak
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center justify-between mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-xl font-bold">214</div>
                <div className="text-xs text-muted-foreground">
                  Longest Streak
                </div>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-xl font-bold">1,842</div>
                <div className="text-xs text-muted-foreground">
                  Total Contributions
                </div>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-xl font-bold">5.2</div>
                <div className="text-xs text-muted-foreground">
                  Daily Average
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex justify-between text-xs mb-2">
                <span>Last 30 Days</span>
              </div>
              <div className="flex h-16 items-end gap-[2px]">
                {Array.from({ length: 30 }).map((_, i) => {
                  const height = Math.floor(Math.random() * 100);
                  return (
                    <motion.div
                      key={i}
                      className={`w-full ${
                        colorTheme.accent
                      } rounded-t-sm opacity-${Math.max(
                        20,
                        Math.min(100, height)
                      )}`}
                      style={{ height: `${Math.max(10, height)}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.max(10, height)}%` }}
                      transition={{ delay: 0.6 + i * 0.03, duration: 0.5 }}
                      whileHover={{ opacity: 1 }}
                    ></motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
