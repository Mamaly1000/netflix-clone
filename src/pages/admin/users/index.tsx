import UsersList from "@/components/lists/UsersList";
import useUsers from "@/hooks/useUsers";
import React from "react";

const UsersPage = () => {
  const { data } = useUsers();
  console.log(data);

  return (
    <div className="min-w-full flex items-start justify-start gap-5 flex-col">
      <UsersList data={data?.users || []} title="Users list" />
    </div>
  );
};

export default UsersPage;
