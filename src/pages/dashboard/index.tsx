import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-dropdown-menu";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title className="dark">Dashboard</title>
      </Head>
      <main className="main-auto-height flex flex-col justify-center px-4 md:px-10 lg:px-60">
        {/* <h1 className="text-2xl mb-4 ">Create Task</h1> */}
        <div className="w-full">
          <section className="flex flex-col gap-4 items-center">
            <h1 className="text-2xl">Create your task</h1>
            <Textarea
              className="resize-none"
              placeholder="Describe your task here..."
            ></Textarea>
            <div className="flex items-center gap-2 w-full">
              <Checkbox className="w-5 h-5"></Checkbox>
              <Label className="font-semibold">Public task</Label>
            </div>
            <Button className="w-full " variant="default">
              Create
            </Button>
          </section>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    console.log(session);
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
