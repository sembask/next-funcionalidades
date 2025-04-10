import React from "react";
import Head from "next/head";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { GetServerSideProps } from "next";

export default function Login() {
  const { data: session, status } = useSession();

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
      </Head>
      <main className=" main-auto-height flex items-center justify-center">
        <Card className="w-full max-w-sm mx-auto mt-10 shadow-md rounded-lg p-6">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Log in to your account tomorrow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-4">
              <Button
                onClick={() => signIn("discord", { callbackUrl: "/dashboard" })}
                className=" relative flex items-center justify-center p-2 transition-colors duration-300 ease-in-out bg-white text-black hover:bg-gray-100 border border-gray-300 shadow-md"
              >
                {
                  <img
                    className="w-4 absolute left-6 "
                    src="/assets/discord-icon-svgrepo-com.svg"
                    alt="Discord Logo"
                  ></img>
                }
                <span>Login with Discord</span>
              </Button>
            </div>
            <div className="flex flex-col gap-4 mb-4">
              <Button className=" relative flex items-center justify-center transition-colors duration-300 ease-in-out bg-white text-black hover:bg-gray-100 border border-gray-300 shadow-md">
                {
                  <img
                    className="w-4 absolute left-6 "
                    src="/assets/icons8-google-48.png"
                    alt="Discord Logo"
                  ></img>
                }
                <span>Login with Google</span>
              </Button>
            </div>
            <form>
              <div className="flex flex-col gap-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <Button className="font-bold w-full mt-4 p-2 rounded-md transition duration-200">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
