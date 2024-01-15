import { Admin, User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import blue from "@/public/images/default-blue.png";
import { TicketIcon } from "@heroicons/react/24/outline";
import { BiCross } from "react-icons/bi";

const UsersList = ({ data = [], title }: { data: User[]; title: string }) => {
  return (
    <section className="px-4 md:px-12 mt-4 space-y-8  pb-40  ">
      <p className="text-white text-base md:text-lg lg:text-2xl font-semibold mb-4  capitalize">
        {title}
      </p>
      <div className="flex flex-col items-start justify-start gap-2 min-w-full">
        {data.map((user) => {
          return (
            <div key={user.id} className="min-w-full flex items-center justify-evenly gap-5 text-white" >
              <span className="flex items-center gap-2  capitalize text-white">
                <Image
                  src={user.image || blue.src}
                  alt={user.name}
                  width={30}
                  height={30}
                  className="rounded-full drop-shadow-2xl object-cover"
                />
                {user.name}
              </span>
              <span>@{user.name}</span>
              <span>{user.email}</span>
              <span>{user.hasNotification ? <TicketIcon /> : <BiCross />}</span>
              <span className="">{user.id}</span>
              <span className="">{user.IsAdmin ? "admin" : "user"}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UsersList;
