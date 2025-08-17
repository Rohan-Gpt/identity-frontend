import { ChevronRight, Code2, ExternalLink, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { motion } from "motion/react";
import { Badge } from "../ui/badge";

export function HackerRankStatsCard({
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
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Code2 size={16} />
            HackerRank Stats
          </CardTitle>
          <Link
            href="#"
            className="text-xs text-muted-foreground hover:underline flex items-center"
          >
            @janedoe <ExternalLink size={12} className="ml-1" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <>
            <div className="flex justify-center mb-4">
              <div className="grid grid-cols-5 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-6" />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
            <div className="mt-4">
              <Skeleton className="h-5 w-24 mb-2" />
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-24" />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <motion.div
              className="flex justify-center mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid grid-cols-5 gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-6 h-6 flex items-center justify-center"
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <Star className="w-full h-full fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="bg-muted/50 p-3 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-xs text-muted-foreground mb-1">
                  Problem Solving
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="bg-muted/50 p-3 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-xs text-muted-foreground mb-1">Python</div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="bg-muted/50 p-3 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-xs text-muted-foreground mb-1">
                  JavaScript
                </div>
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    >
                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                  >
                    <Star size={14} className="text-muted" />
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                className="bg-muted/50 p-3 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="text-xs text-muted-foreground mb-1">SQL</div>
                <div className="flex">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    </motion.div>
                  ))}
                  {[...Array(2)].map((_, i) => (
                    <motion.div
                      key={i + 3}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1 + i * 0.1 }}
                    >
                      <Star size={14} className="text-muted" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div className="text-sm font-medium mb-2">Certificates</div>
              <div className="flex flex-wrap gap-2">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    Problem Solving (Basic)
                  </Badge>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    JavaScript (Intermediate)
                  </Badge>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <Badge
                    variant="outline"
                    className="bg-purple-50 text-purple-700 border-purple-200"
                  >
                    React (Basic)
                  </Badge>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </CardContent>
      <CardFooter className="px-4 py-3 bg-muted/30 text-xs text-muted-foreground">
        <Link href="#" className="flex items-center hover:underline ml-auto">
          View on HackerRank <ChevronRight size={14} className="ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
