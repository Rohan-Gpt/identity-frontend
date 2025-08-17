import { GitFork, Github, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { motion } from "motion/react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function ProjectCard({ project, colorTheme }) {
  return (
    <Card className="overflow-hidden group hover:shadow-md transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold text-white">{project.title}</h3>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1 text-white/80 text-xs">
              <Star size={12} /> {project.stars}
            </div>
            <div className="flex items-center gap-1 text-white/80 text-xs">
              <GitFork size={12} /> {project.forks}
            </div>
            <div className="text-white/80 text-xs ml-auto">
              Updated {project.lastUpdated}
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Completion</span>
            <span>{project.progress}%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${colorTheme.accent} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ delay: 0.2, duration: 0.8 }}
            ></motion.div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 bg-muted/30 flex justify-between">
        <Button variant="ghost" size="sm" className="text-xs">
          View Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs flex items-center gap-1"
        >
          <Github size={12} /> View Repo
        </Button>
      </CardFooter>
    </Card>
  );
}
