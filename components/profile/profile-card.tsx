import {
  Briefcase,
  Calendar,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { motion } from "motion/react";

export function ProfileCard({
  colorTheme,
}: {
  colorTheme: {
    primary: string;
    accent: string;
    badge: string;
    highlight: string;
  };
}) {
  const isLoading = false;

  return (
    <Card className="md:col-span-1 row-span-2 overflow-hidden group">
      {isLoading ? (
        <>
          <div className="h-32 bg-muted" />
          <CardContent className="pt-16 pb-6 px-6">
            <div className="absolute -top-12 left-6">
              <Skeleton className="h-24 w-24 rounded-full" />
            </div>
            <div className="flex justify-between items-start mb-4 pt-2">
              <div>
                <Skeleton className="h-8 w-32 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-9 w-24" />
            </div>
            <Skeleton className="h-16 w-full mb-6" />
            <div className="flex gap-2 mb-6">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <div className="space-y-5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Skeleton className="h-5 w-20 mb-3" />
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-16" />
                ))}
              </div>
            </div>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader className="relative p-0">
            <motion.div
              className={`h-32 bg-gradient-to-r ${colorTheme.primary} relative overflow-hidden`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=128&width=400')] opacity-20 mix-blend-overlay"></div>
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>
            <motion.div
              className="absolute -bottom-12 left-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                <AvatarImage
                  src="/placeholder.svg?height=96&width=96"
                  alt="Jane Doe"
                />
                <AvatarFallback
                  className={`bg-gradient-to-br ${colorTheme.primary} text-white`}
                >
                  JD
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </CardHeader>
          <CardContent className="pt-16 pb-6 px-6">
            <motion.div
              className="flex justify-between items-start mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div>
                <h2 className="text-2xl font-bold">Jane Doe</h2>
                <p className="text-muted-foreground">@janedoe</p>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Mail size={14} /> Connect
              </Button>
            </motion.div>

            <motion.p
              className="text-sm mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Full Stack Developer specializing in React, Node.js, and cloud
              architecture. Open source contributor and tech community
              organizer.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-2 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="#"
                      className="bg-muted hover:bg-muted/80 transition-all p-2 rounded-full hover:scale-110"
                    >
                      <Github size={18} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>GitHub: @janedoe</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="#"
                      className="bg-muted hover:bg-muted/80 transition-all p-2 rounded-full hover:scale-110"
                    >
                      <Twitter size={18} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Twitter: @janedoe</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="#"
                      className="bg-muted hover:bg-muted/80 transition-all p-2 rounded-full hover:scale-110"
                    >
                      <Linkedin size={18} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>LinkedIn: Jane Doe</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="#"
                      className="bg-muted hover:bg-muted/80 transition-all p-2 rounded-full hover:scale-110"
                    >
                      <Globe size={18} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>janedoe.dev</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>

            <motion.div
              className="space-y-5"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-muted-foreground" />
                <span className="text-sm">Senior Developer @ TechCorp</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-muted-foreground" />
                <span className="text-sm">San Francisco, CA</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-muted-foreground" />
                <span className="text-sm">Joined April 2018</span>
              </div>

              <div className="flex items-center gap-2">
                <Users size={16} className="text-muted-foreground" />
                <span className="text-sm">542 followers · 267 following</span>
              </div>
            </motion.div>

            <motion.div
              className="mt-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-sm font-medium mb-3">Top Skills</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className={colorTheme.badge}>React</Badge>
                <Badge className={colorTheme.badge}>TypeScript</Badge>
                <Badge className={colorTheme.badge}>Node.js</Badge>
                <Badge className={colorTheme.badge}>Python</Badge>
                <Badge className={colorTheme.badge}>AWS</Badge>
                <Badge className={colorTheme.badge}>GraphQL</Badge>
              </div>
            </motion.div>
          </CardContent>
          <CardFooter className="px-6 py-4 bg-muted/50 flex justify-between">
            <Button variant="ghost" size="sm" className="text-xs">
              View Full Profile
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              Download Resume
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
