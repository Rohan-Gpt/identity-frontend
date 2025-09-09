"use client";
import { ChevronRight, Code2, ExternalLink } from "lucide-react";
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
import {
  startTransition,
  use,
  useEffect,
  useState,
  useTransition,
} from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { FormError } from "../auth/form-error";
import { FormSuccess } from "../auth/form-success";
import ProgressRing from "./progress-ring";
import axios from "axios";

interface LeetCodeStats {
  totalSolved: number;
  totalSubmissions: number;
  totalQuestions: number;
  completionRatio: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;

  contestAttend: number;
  contestRating: number;
  contestGlobalRanking: number;
  contestTopPercentage: number;
  contestBadges: object;

  ranking: number;
  contributionPoint: number;
  reputation: number;
  submissionCalendar: any;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export function LeetCodeStatsCard({ leetcodeData }: { leetcodeData?: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const easyPercentage =
    ((leetcodeData?.easySolved ?? 0) / (leetcodeData?.totalEasy ?? 0)) * 100;

  const medPercentage =
    ((leetcodeData?.mediumSolved ?? 0) / (leetcodeData?.totalMedium ?? 0)) *
    100;

  const hardPercentage =
    ((leetcodeData?.hardSolved ?? 0) / (leetcodeData?.totalHard ?? 0)) * 100;
  // const username = "cpcs";

  const totalPercentage =
    ((leetcodeData?.totalSolved ?? 0) / (leetcodeData?.totalQuestions ?? 0)) *
    100;

  console.log("completion ratio", leetcodeData?.completionRatio);

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
    setUsername(values.username);
    startTransition(() => {
      async function fetchLeetCodeData(leetcodeUsername: string) {
        setLoading(true);
        const resp = await axios.post(
          `${BACKEND_URL}${API_BASE}/leetcode`,
          { leetcodeUsername },
          { withCredentials: true }
        );

        if (resp.status === 200) {
          console.log("LeetCode API Response:", resp.data);
          setApiResponse(resp.data);
          setError(resp.data?.error);
          setSuccess(resp.data?.success);
        }
        setLoading(false);
        router.refresh();
      }
      fetchLeetCodeData(values.username);
    });
  }

  return (
    <Card className="overflow-hidden group hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Code2 size={16} />
            LeetCode Stats
          </CardTitle>
          <a
            href={`https://leetcode.com/u/${username}`}
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
            <div className="flex items-center justify-center mb-4">
              <Skeleton className="h-24 w-24 rounded-full" />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-1.5 w-full" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {leetcodeData ? (
              <>
                <>
                  <motion.div
                    className="flex items-center justify-center mb-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="relative w-24 h-24">
                      <ProgressRing
                        progress={leetcodeData?.completionRatio ?? 0}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                          className="text-2xl font-bold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                        >
                          {leetcodeData?.totalSolved}
                        </motion.span>
                        <span className="text-xs text-muted-foreground">
                          Problems
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-3 gap-2 mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.div
                      className="text-center p-2 bg-muted/50 rounded-lg"
                      whileHover={{ y: -5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <div className="text-xl font-bold">
                        {~~(leetcodeData?.contestRating ?? 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Contest Rating
                      </div>
                    </motion.div>
                    <motion.div
                      className="text-center p-2 bg-muted/50 rounded-lg"
                      whileHover={{ y: -5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <div className="text-xl font-bold">
                        {leetcodeData?.contestGlobalRanking}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Global Ranking
                      </div>
                    </motion.div>
                    <motion.div
                      className="text-center p-2 bg-muted/50 rounded-lg"
                      whileHover={{ y: -5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <div className="text-xl font-bold">
                        {leetcodeData?.completionRatio}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Completion
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="space-y-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>{" "}
                          Easy
                        </span>
                        <span>
                          {leetcodeData?.easySolved}/{leetcodeData?.totalEasy}
                        </span>
                      </div>
                      <motion.div
                        className="h-1.5 bg-muted rounded-full overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                      >
                        <motion.div
                          className="h-full bg-green-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${easyPercentage}%` }}
                          transition={{ delay: 0.7, duration: 0.8 }}
                        ></motion.div>
                      </motion.div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>{" "}
                          Medium
                        </span>
                        <span>
                          {leetcodeData?.mediumSolved}/
                          {leetcodeData?.totalMedium}
                        </span>
                      </div>
                      <motion.div
                        className="h-1.5 bg-muted rounded-full overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      >
                        <motion.div
                          className="h-full bg-yellow-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${medPercentage}%` }}
                          transition={{ delay: 0.8, duration: 0.8 }}
                        ></motion.div>
                      </motion.div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>{" "}
                          Hard
                        </span>
                        <span>
                          {leetcodeData?.hardSolved}/{leetcodeData?.totalHard}
                        </span>
                      </div>
                      <motion.div
                        className="h-1.5 bg-muted rounded-full overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                      >
                        <motion.div
                          className="h-full bg-red-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${hardPercentage}%` }}
                          transition={{ delay: 0.9, duration: 0.8 }}
                        ></motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </>
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
                            <FormLabel>LeetCode Username</FormLabel>
                            <FormControl>
                              <Input placeholder="abcd" {...field} />
                            </FormControl>
                            <FormDescription>
                              This will be used to fetch your leetcode stats
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
      {username && (
        <>
          <CardFooter className="px-4 py-3 bg-muted/30 text-xs text-muted-foreground">
            <a
              href={`https://leetcode.com/u/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:underline ml-auto"
            >
              View on LeetCode <ChevronRight size={14} className="ml-1" />
            </a>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
