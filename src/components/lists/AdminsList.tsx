import { Admin, User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import blue from '@/public/images/default-blue.png';

export type AdminType = Admin & User;

const AdminsList = ({
  admins = [],
  title,
}: {
  title: string;
  admins: AdminType[];
}) => {
  // return (
  //   <section className="px-4 md:px-12 mt-4 space-y-8  pb-40  ">
  //     <p className="text-white text-base md:text-lg lg:text-2xl font-semibold mb-4  capitalize">
  //       {title}
  //     </p>
  //     <div className="flex flex-col items-start justify-start gap-2 min-w-full">
  //       {admins.map((admin) => {
  //         return (
  //           <div key={admin.id}>
  //             <span className="flex items-center gap-2  capitalize text-white">
  //               <Image
  //                 src={admin.ima || blue.src}
  //                 alt={admin.name}
  //                 width={30}
  //                 height={30}
  //                 className="rounded-full drop-shadow-2xl object-cover"
  //               />
  //               {admin.name}
  //             </span>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </section>
  // );
};

export default AdminsList;
