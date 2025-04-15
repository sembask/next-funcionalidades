import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Task, columns, getColumns } from "@/components/tasks-table/columns";
import { DataTable } from "@/components/tasks-table/data-table";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { db } from "@/services/firebaseConnection";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";
import { RouteMatcher } from "next/dist/server/route-matchers/route-matcher";

interface HomeProps {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

export default function Dashboard({ user }: HomeProps) {
  const router = useRouter();
  const [data, setData] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("teste");
  const [status, setStatus] = useState<"public" | "private">("private");

  useEffect(() => {
    async function loadTasks() {
      const tarefasRef = collection(db, "tasks");
      const q = query(
        tarefasRef,
        orderBy("createdAt", "desc"),
        where("user", "==", user?.email)
      );

      onSnapshot(q, (querySnapshot) => {
        let lista = [] as Task[];

        querySnapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            task: doc.data().task,
            status: doc.data().status,
          });
        });
        setData(lista);
      });
    }
    loadTasks();
  }, [user?.email]);

  async function handleRegisterTask(event: FormEvent) {
    event.preventDefault();

    if (task === "") return;

    try {
      await addDoc(collection(db, "tasks"), {
        task: task,
        status: status,
        createdAt: new Date(),
        user: user?.email,
      });

      setTask("");
      setStatus("private");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteTask(taskId: string) {
    const docTaskRef = doc(db, "tasks", taskId);
    await deleteDoc(docTaskRef);
  }

  function viewTask(taskId: string) {
    router.push(`/task/${taskId}`);
  }

  return (
    <>
      <Head>
        <title className="dark">Dashboard</title>
      </Head>
      <main className="main-auto-height flex flex-col justify-center px-4 md:px-10 lg:px-60">
        <div className="w-full">
          <section>
            <form
              onSubmit={(event) => handleRegisterTask(event)}
              className="flex flex-col gap-4 items-center"
            >
              <h1 className="text-2xl">Create your task</h1>
              <Textarea
                className="resize-none"
                placeholder="Describe your task here..."
                onChange={(e) => setTask(e.target.value)}
                value={task}
              ></Textarea>
              <div className="flex items-center gap-2 w-full">
                <Checkbox
                  onCheckedChange={(checked) => {
                    setStatus(checked ? "public" : "private");
                  }}
                  className="w-5 h-5"
                ></Checkbox>
                <Label className="font-semibold">Public task</Label>
              </div>
              <Button type="submit" className="w-full " variant="default">
                Create
              </Button>
            </form>
          </section>
          <div className="container mx-auto py-10">
            <DataTable
              columns={getColumns(handleDeleteTask, viewTask)}
              data={data}
            />
          </div>
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
    props: {
      user: {
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
      },
    },
  };
};
