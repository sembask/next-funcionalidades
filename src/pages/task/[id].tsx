import { GetServerSideProps } from "next";
import Head from "next/head";
import { db } from "@/services/firebaseConnection";
import { doc, getDoc, query, where, collection } from "firebase/firestore";
import { getSession } from "next-auth/react";

export default function Task() {
  return (
    <div>
      <Head>
        <title>Task</title>
        <meta name="description" content="Task page" />
      </Head>

      <main>
        <h1 className="text-2xl font-bold">Task</h1>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  console.log("session", session);
  const id = params?.id as string;
  const docTaskRef = doc(db, "tasks", id);
  const docTaskSnap = await getDoc(docTaskRef);
  if (docTaskSnap.data() === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (
    docTaskSnap.data()?.status !== "public" &&
    session?.user?.email !== docTaskSnap.data()?.user
  ) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      id: params?.id,
    },
  };
};
