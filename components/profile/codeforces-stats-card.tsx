import { ChevronRight, ExternalLink, Trophy } from "lucide-react";
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
import { useState, useTransition } from "react";
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

interface CodeForcesStats {
  username: string;
  currentRating: number;
  maxRating: number;
  currentTitle: string;
  maxTitle: string;
  ratedContestCount: number;
  problemsSolved: number;
  contributions: number;
}

export function CodeForcesStatsCard({
  user,
  userData,
}: {
  user: any;
  userData: CodeForcesStats;
}) {
  const [username, setUsername] = useState(userData.username);
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

  return (
    <Card className="overflow-hidden group hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Trophy size={16} />
            CodeForces Stats
          </CardTitle>
          {username ? (
            <></>
          ) : (
            <>
              <a
                href={`https://codeforces.com/profile/${userData.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:underline flex items-center"
              >
                {userData?.username ?? ""}
                <ExternalLink size={12} className="ml-1" />
              </a>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {username ? (
          <>
            <>
              <motion.div
                className="flex items-center justify-center mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-center">
                  <motion.div
                    className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.3,
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    {userData.currentTitle}
                  </motion.div>
                  <motion.div
                    className="mt-2 text-3xl font-bold text-purple-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {userData.currentRating}
                  </motion.div>
                  <div className="text-xs text-muted-foreground">
                    Current Rating
                  </div>
                </div>
              </motion.div>

              {/* <motion.div
                    className="mt-4 relative h-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="absolute inset-0 flex items-end">
                      <div className="h-2 w-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"></div>
                    </div>
                    <motion.div
                      className="absolute bottom-0 w-1 h-6 bg-black"
                      style={{ left: "calc(1914 / 3500 * 100%)" }}
                      initial={{ height: 0 }}
                      animate={{ height: 24 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <motion.div
                        className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        1914
                      </motion.div>
                    </motion.div>
                    <div className="absolute bottom-4 left-0 text-xs text-muted-foreground">
                      0
                    </div>
                    <div className="absolute bottom-4 right-0 text-xs text-muted-foreground">
                      3500
                    </div>
                  </motion.div> */}

              <motion.div
                className="mt-6 grid grid-cols-2 gap-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <motion.div
                  className="bg-muted/50 p-3 rounded-lg"
                  whileHover={{ scale: 1.03 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <div className="text-xs text-muted-foreground">Contests</div>
                  <div className="text-lg font-bold">
                    {userData.ratedContestCount}
                  </div>
                </motion.div>
                <motion.div
                  className="bg-muted/50 p-3 rounded-lg"
                  whileHover={{ scale: 1.03 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <div className="text-xs text-muted-foreground">
                    Max Rating
                  </div>
                  <div className="text-lg font-bold">{userData.maxRating}</div>
                </motion.div>
                <motion.div
                  className="bg-muted/50 p-3 rounded-lg"
                  whileHover={{ scale: 1.03 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <div className="text-xs text-muted-foreground">
                    Problems Solved
                  </div>
                  <div className="text-lg font-bold">
                    {userData.problemsSolved}
                  </div>
                </motion.div>
                <motion.div
                  className="bg-muted/50 p-3 rounded-lg"
                  whileHover={{ scale: 1.03 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <div className="text-xs text-muted-foreground">
                    Contribution
                  </div>
                  <div className="text-lg font-bold">
                    {userData.contributions}
                  </div>
                </motion.div>
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
                        <FormLabel>Codeforces Username</FormLabel>
                        <FormControl>
                          <Input placeholder="abcd" {...field} />
                        </FormControl>
                        <FormDescription>
                          This will be used to fetch your Codeforces stats
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
      </CardContent>
      <CardFooter className="px-4 py-3 bg-muted/30 text-xs text-muted-foreground">
        <a
          href={`https://codeforces.com/profile/${userData.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:underline ml-auto"
        >
          View on CodeForces <ChevronRight size={14} className="ml-1" />
        </a>
      </CardFooter>
    </Card>
  );
}
