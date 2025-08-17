import {
  Book,
  BookOpen,
  ChevronRight,
  ExternalLink,
  Eye,
  GitCommitHorizontal,
  GitCommitVertical,
  GitFork,
  Github,
  GitPullRequestArrow,
  Star,
} from "lucide-react";
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
import { use, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../auth/form-error";
import { FormSuccess } from "../auth/form-success";

interface GithubStats {
  totalRepos: number;
  totalStars: number;
  totalContributions: number;
  totalPRs: number;
  toplangs: {
    name: string;
    color: string;
    percentage: string;
  };
}

export function GithubStatsCard({
  isLoading,
  user,
  userData,
}: {
  isLoading: Boolean;
  user: any;
  userData: GithubStats;
}) {
  // const [userData, setUserData] = useState<GithubStats>();
  // const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const FormSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log("inside on submit", values.username);
    setUsername(values.username);
  }

  // useEffect(() => {
  //   const fetchUsername = async () => {
  //     const res = await getGithubUsername(user.email);
  //     console.log(res);
  //     if (res) {
  //       setUsername(res.githbUsername ?? "");
  //     }
  //   };
  //   fetchUsername();
  // });
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(`/api/profile/github/${username}`);
  //     const data = await response.json();
  //     if (response.ok) {
  //       setUserData(data);
  //       setIsLoading(false);
  //     } else {
  //       console.error("Error fetching data:", data.error);
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [username]);

  return (
    <Card className="overflow-hidden group hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Github size={16} />
            GitHub Stats
          </CardTitle>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:underline flex items-center"
          >
            {username} <ExternalLink size={12} className="ml-1" />
          </a>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center p-2">
                  <Skeleton className="h-8 w-16 mx-auto mb-1" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
              ))}
            </div>
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-[72px] w-full mt-2" />
          </>
        ) : (
          <>
            {userData ? (
              <>
                <motion.div
                  className="grid grid-cols-2 gap-4 mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="text-center p-2 rounded-lg transition-colors hover:bg-muted"
                    whileHover={{ scale: 1.05 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    <div className="text-2xl font-bold">
                      {userData?.totalContributions}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <GitCommitVertical size={12} /> Contributions
                    </div>
                  </motion.div>
                  <motion.div
                    className="text-center p-2 rounded-lg transition-colors hover:bg-muted"
                    whileHover={{ scale: 1.05 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    <div className="text-2xl font-bold">
                      {userData?.totalRepos}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <Book size={12} /> Repositories
                    </div>
                  </motion.div>
                  <motion.div
                    className="text-center p-2 rounded-lg transition-colors hover:bg-muted"
                    whileHover={{ scale: 1.05 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    <div className="text-2xl font-bold">
                      {userData?.totalStars}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <Star size={12} /> Stars
                    </div>
                  </motion.div>

                  <motion.div
                    className="text-center p-2 rounded-lg transition-colors hover:bg-muted"
                    whileHover={{ scale: 1.05 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    <div className="text-2xl font-bold">
                      {userData?.totalPRs}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <GitPullRequestArrow size={12} /> Pull Requests
                    </div>
                  </motion.div>
                </motion.div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center mb-4 h-full w-full">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-5/6 space-y-6 flex flex-col items-center justify-center"
                    >
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Github Username</FormLabel>
                            <FormControl>
                              <Input placeholder="abcd" {...field} />
                            </FormControl>
                            <FormDescription>
                              This will be used to fetch your Github stats
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">
                        Submit
                      </Button>
                      <FormError message={error} />
                      <FormSuccess message={success} />
                    </form>
                  </Form>
                </div>
              </>
            )}
          </>
        )}
      </CardContent>
      <CardFooter className="px-4 py-3 bg-muted/30 text-xs text-muted-foreground">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:underline ml-auto"
        >
          View on GitHub <ChevronRight size={14} className="ml-1" />
        </a>
      </CardFooter>
    </Card>
  );
}
