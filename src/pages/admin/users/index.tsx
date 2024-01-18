import AdminsList from "@/components/lists/AdminsList";
import UsersList from "@/components/lists/UsersList";
import CreateUserModal from "@/components/modals/CreateUserModal";
import SideBar from "@/components/sidebar/SideBar";
import Header from "@/components/ui/Header";
import { useSideBar } from "@/hooks/useSideBar";
import useUsers from "@/hooks/useUsers";
import React from "react";
import { BiSidebar } from "react-icons/bi";

const UsersPage = () => {
  const { data } = useUsers();
  const SideBarModal = useSideBar();

  return (
    <div className="min-w-full flex items-start justify-start gap-5 flex-col">
      <Header
        title="Users and Admins Page"
        callBack
        actions={[
          {
            icon: BiSidebar,
            id: 0,
            onClick: () => SideBarModal.onOpen(),
          },
        ]}
      />
      <UsersList data={data?.users || []} title="Users list" create />
      <AdminsList admins={data?.admins || []} title="Admins list" />
      <SideBar isOpen={SideBarModal.isOpen} onClose={SideBarModal.onClose} />
      <CreateUserModal />
    </div>
  );
};

export default UsersPage;
