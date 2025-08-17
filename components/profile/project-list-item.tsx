import { GitFork, Star } from "lucide-react";
import { Card } from "../ui/card";
import { motion } from "motion/react";
import { Badge } from "../ui/badge";

export function ProjectListItem({ project, colorTheme }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-48 h-32 md:h-auto relative">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:hidden"></div>
        </div>
        <div className="flex-1 p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <h3 className="text-lg font-bold">{project.title}</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <Star size={12} /> {project.stars}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <GitFork size={12} /> {project.forks}
              </div>
              <div className="text-muted-foreground text-xs">
                Updated {project.lastUpdated}
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground my-2">
            {project.description}
          </p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs text-muted-foreground">
                {project.progress}% complete
              </div>
              <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${colorTheme.accent} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
