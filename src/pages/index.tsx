import { Inter } from "next/font/google";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { User } from "@prisma/client";
import Navbar from "@/components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async (ctx: NextPageContext) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Home() {
  const { user } = useCurrentUser();
  return (
    <div className=" ">
      <Navbar />
    </div>
  );
}
