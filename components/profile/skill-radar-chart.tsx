import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkillRadarChart({
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
        <CardTitle>Skill Radar</CardTitle>
        <CardDescription>
          Your skill distribution across different domains
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        {isLoading ? (
          <Skeleton className="h-[300px] w-[300px] rounded-full" />
        ) : (
          <div className="relative h-[300px] w-[300px]">
            {/* Radar background circles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-muted rounded-full"
                style={{
                  width: `${(i + 1) * 20}%`,
                  height: `${(i + 1) * 20}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              ></motion.div>
            ))}

            {/* Radar axes */}
            {[
              "Frontend",
              "Backend",
              "DevOps",
              "Data Science",
              "Mobile",
              "Design",
            ].map((skill, i) => {
              const angle = (Math.PI * 2 * i) / 6;
              const x = Math.sin(angle) * 150;
              const y = -Math.cos(angle) * 150;
              return (
                <motion.div
                  key={skill}
                  className="absolute top-1/2 left-1/2 h-[150px] w-0 border-l border-dashed border-muted"
                  style={{
                    transform: `translate(-50%, 0%) rotate(${i * 60}deg)`,
                    transformOrigin: "bottom",
                  }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "150px" }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                >
                  <div
                    className="absolute whitespace-nowrap text-xs"
                    style={{
                      transform: `translate(-50%, -100%) rotate(${-(
                        i * 60
                      )}deg)`,
                      left: "50%",
                      top: 0,
                    }}
                  >
                    {skill}
                  </div>
                </motion.div>
              );
            })}

            {/* Radar data polygon */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <svg width="100%" height="100%" viewBox="-150 -150 300 300">
                <motion.polygon
                  points="0,-120 130,-60 90,90 -90,90 -130,-60"
                  className={`fill-${
                    colorTheme.accent.split("-")[1]
                  }-500/20 stroke-${colorTheme.accent.split("-")[1]}-500`}
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                />
                {[
                  { skill: "Frontend", value: 0.8, angle: 0 },
                  { skill: "Backend", value: 0.85, angle: 60 },
                  { skill: "DevOps", value: 0.6, angle: 120 },
                  { skill: "Data Science", value: 0.6, angle: 180 },
                  { skill: "Mobile", value: 0.6, angle: 240 },
                  { skill: "Design", value: 0.7, angle: 300 },
                ].map((item, i) => {
                  const angle = (item.angle * Math.PI) / 180;
                  const x = Math.sin(angle) * 150 * item.value;
                  const y = -Math.cos(angle) * 150 * item.value;
                  return (
                    <motion.circle
                      key={item.skill}
                      cx={x}
                      cy={y}
                      r="4"
                      className={`fill-${colorTheme.accent.split("-")[1]}-500`}
                      initial={{ opacity: 0, r: 0 }}
                      animate={{ opacity: 1, r: 4 }}
                      transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                    />
                  );
                })}
              </svg>
            </motion.div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
