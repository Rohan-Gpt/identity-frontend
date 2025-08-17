import React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { Avatar } from "../../components/ui/avatar";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-6 w-full max-w-md shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <div className="flex flex-col gap-4">
          <Button className="bg-red-500 text-white">Login with Google</Button>
          <Button className="bg-gray-800 text-white">Login with GitHub</Button>
          <Button className="bg-blue-700 text-white">
            Login with LinkedIn
          </Button>
          <form className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Email"
              className="border border-gray-300 p-2 rounded"
            />
            <Input
              type="password"
              placeholder="Password"
              className="border border-gray-300 p-2 rounded"
            />
            <Button type="submit" className="bg-green-500 text-white">
              Login
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
