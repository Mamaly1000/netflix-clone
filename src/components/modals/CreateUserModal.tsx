import React, { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import { useCreateUserModal } from "@/hooks/useCteateUser";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import useUsers from "@/hooks/useUsers";
import toast from "react-hot-toast";
import RadioButton from "../inputs/RadioButton";
import useUser from "@/hooks/useUser";

const createUserSchema = z.object({
  name: z
    .string({
      required_error: "name is required",
    })
    .min(3, "minimum character is 3"),
  image: z.string(),
  email: z
    .string({
      required_error: "email is required",
    })
    .email("email is not valid"),
  password: z.string().min(6),
  role: z.string().default("USER"),
});

const CreateUserModal = () => {
  const { onClose, isOpen, type, id } = useCreateUserModal();
  const [isLoading, setLoading] = useState(false);

  const { mutate } = useUsers();
  const { user, mutate: mutateSelectedUser } = useUser(id);

  const form = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      image: "",
      password: "",
      role: "USER",
    },
  });

  useMemo(() => {
    if (user) {
      form.reset({
        email: user.email || "",
        image: user.image || "",
        name: user.name,
        password: "",
        role: "USER",
      });
    }
  }, [user, onClose, id]);

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof createUserSchema>) => {
      try {
        setLoading(true);
        let req;
        if (type === "create") {
          req = async () =>
            await axios
              .post("/api/users", values)
              .then((res) => toast.success(res.data.message));
        } else if (user && id && type === "update") {
          req = async () =>
            await axios.patch(`/api/users/${id}`, values).then((res) => {
              mutateSelectedUser();
              toast.success(res.data.message);
            });
        }
        req &&
          (await req!().then(() => {
            mutate();
            onClose();
            form.reset();
          }));
      } catch (error: any) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("something went wrong!");
        }
      } finally {
        setLoading(false);
        mutate();
        onClose();
        form.reset();
      }
    }
  );

  return (
    <Modal isVisible={isOpen} onClose={onClose} disable={isLoading}>
      <form
        className=" w-[99%]  md:w-[300px] lg:w-[500px] bg-zinc-900 p-5 min-h-full flex flex-col items-start justify-start gap-4 text-white"
        onSubmit={onSubmit}
      >
        <ImageUpload
          label="Profile Image"
          onChange={(src) => form.setValue("image", src)}
          value={form.watch("image")}
          disabled={isLoading}
        />
        <Input
          label="Name"
          name="name"
          onChange={(e) => form.setValue("name", e.target.value)}
          register={form.register("name")}
          value={form.watch("name")}
          disabled={isLoading}
          type="text"
        />{" "}
        <Input
          label="Email"
          name="email"
          onChange={(e) => form.setValue("email", e.target.value)}
          register={form.register("email")}
          value={form.watch("email")}
          disabled={isLoading}
          type="email"
        />{" "}
        <Input
          label="Password"
          name="password"
          onChange={(e) => form.setValue("password", e.target.value)}
          register={form.register("password")}
          value={form.watch("password")}
          disabled={isLoading}
          type="password"
        />
        {type === "update" && (
          <RadioButton
            register={form.register("role")}
            value={form.watch("role")}
            disabled={isLoading}
            onChange={(val: string) => {
              form.setValue("role", val);
            }}
            name="role"
            disPlayedValues={[
              {
                label: "user",
                value: "USER",
              },
              {
                label: "admin",
                value: "ADMIN",
              },
            ]}
          />
        )}
        <div className="min-w-full flex items-center justify-start gap-3 flex-col md:flex-row">
          <button
            className="text-white border-[1px] border-red-600 hover:opacity-80 bg-red-600 px-3 rounded-lg py-2 drop-shadow-2xl hover:bg-opacity-90 transition-all disabled:cursor-not-allowed disabled:opacity-50  capitalize"
            type="submit"
            disabled={isLoading}
          >
            {type}
          </button>
          <button
            className="hover:opacity-80 transition-all border-[1px] border-white text-white bg-transparent px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed  rounded-lg drop-shadow-2xl hover:bg-opacity-90"
            onClick={() => form.reset()}
            disabled={isLoading}
          >
            Reset
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateUserModal;
