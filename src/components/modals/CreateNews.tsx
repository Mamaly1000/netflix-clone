import React, { useState } from "react";
import Modal from "./Modal";
import { useCreateNews } from "@/hooks/useCreateNews";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Select from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../inputs/Input";
import ImageUpload from "../inputs/ImageUpload";
import toast from "react-hot-toast";
import axios from "axios";
import useNewses from "@/hooks/useNewses";
const newsSchema = z.object({
  title: z
    .string({
      required_error: "title is required!",
    })
    .min(4, "min charc is 4"),
  description: z
    .string({
      required_error: "description is required!",
    })
    .min(40, "min charc is 40"),
  coverImage: z.string({
    required_error: "coverImage is required!",
  }),
  authorName: z.string({
    required_error: "authorName is required!",
  }),
  authorEmail: z.string({
    required_error: "author Email is required!",
  }),
  authorProfilePic: z.string({
    required_error: "author profile picture is required!",
  }),
});

const categories = [
  { value: "Action", label: "Action", color: "#00B8D9", isFixed: true },
  { value: "Adventure", label: "Adventure", color: "#00B8D9", isFixed: true },
  { value: "Comedy", label: "Comedy", color: "#00B8D9", isFixed: true },
  { value: "Drama", label: "Drama", color: "#00B8D9", isFixed: true },
  { value: "Fantasy", label: "Fantasy", color: "#00B8D9", isFixed: true },
  { value: "Horror", label: "Horror", color: "#00B8D9", isFixed: true },
  { value: "Mystery", label: "Mystery", color: "#00B8D9", isFixed: true },
  { value: "Romance", label: "Romance", color: "#00B8D9", isFixed: true },
  { value: "Sci-Fi", label: "Sci-Fi", color: "#00B8D9", isFixed: true },
  { value: "Thriller", label: "Thriller", color: "#00B8D9", isFixed: true },
  {
    value: "Documentary",
    label: "Documentary",
    color: "#00B8D9",
    isFixed: true,
  },
  { value: "Animation", label: "Animation", color: "#00B8D9", isFixed: true },
  { value: "Crime", label: "Crime", color: "#00B8D9", isFixed: true },
  { value: "Family", label: "Family", color: "#00B8D9", isFixed: true },
  { value: "History", label: "History", color: "#00B8D9", isFixed: true },
  { value: "Music", label: "Music", color: "#00B8D9", isFixed: true },
  { value: "Sport", label: "Sport", color: "#00B8D9", isFixed: true },
  { value: "War", label: "War", color: "#00B8D9", isFixed: true },
  { value: "Western", label: "Western", color: "#00B8D9", isFixed: true },
];

const CreateNews = () => {
  const [isLoading, setLoading] = useState(false);
  const { onClose, isOpen, type, id } = useCreateNews();

  const { mutate: newsMutate } = useNewses();

  const form = useForm({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "",
      description: "",
      coverImage: "",
      authorName: "",
      authorEmail: "",
      authorProfilePic: "",
    },
  });
  const [tags, setTags] = useState([]);

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof newsSchema>) => {
      try {
        setLoading(true);
        let req;
        if (type === "create") {
          req = await axios.post("/api/news", values).then((res) => {
            toast.success(res.data.message);
            // todo => mutate news
          });
        } else if (type === "update") {
          req = await axios.patch(`/api/news/${id}`).then((res) => {
            toast.success(res.data.message);
            // mutate news and single news
          });
        }
      } catch (error: any) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("something went wrong!");
        }
      } finally {
        setLoading(false);
        onClose();
        form.reset();
        newsMutate();
      }
    }
  );

  return (
    <Modal isVisible={isOpen} disable={isLoading} onClose={onClose}>
      <form
        className="w-screen md:w-[500px] lg:w-[600px] max-w-full overflow-x-hidden overflow-y-auto   bg-zinc-900 p-5 md:max-h-[70vh] min-h-full flex flex-col items-start justify-start gap-4 text-white"
        onSubmit={onSubmit}
      >
        <Input
          label="title"
          name="title"
          onChange={(e) => form.setValue("title", e.target.value)}
          register={form.register("title", {
            required: true,
          })}
          value={form.watch("title")}
          disabled={isLoading}
          type="text"
        />
        <Select
          isMulti
          placeholder="tags"
          name="tags"
          isDisabled={isLoading}
          value={tags}
          options={categories as any}
          className="basic-multi-select bg-neutral-700   min-w-full text-white z-50"
          classNamePrefix="select"
          styles={{
            control: (base) => {
              return {
                ...base,
                background: "rgb(64 64 64 )",
                borderColor: "#fff",
                ":hover": {
                  borderColor:
                    "rgb(185 28 28 / var(--tw-text-opacity)) !important",
                  boxShadow: "none !important",
                },
                boxShadow: "none !important",
                color: "#fff",
                overflow: "hidden",
              };
            },
            input: (base) => {
              return {
                ...base,
                color: "#fff",
              };
            },
            group: (base) => {
              return {
                ...base,
                background: "red",
              };
            },
            menu: (base) => {
              return {
                ...base,
                background: "rgb(64 64 64)",
                opacity: 1,
                color: "#fff",
              };
            },
            menuList: (base) => {
              return {
                ...base,
                background: "rgb(64 64 64)",
                color: "#fff",
                opacity: 1,
              };
            },
            valueContainer: (base) => {
              return {
                ...base,
                background: "rgb(64 64 64 )",
                color: "#fff",
              };
            },
            multiValue: (base) => {
              return {
                ...base,
                background: "rgb(185 28 28)",
                color: "#ffffff !important",
              };
            },
            multiValueLabel: (base) => {
              return {
                ...base,
                color: "#fff",
              };
            },
            option: (base) => {
              return {
                ...base,
                background: "rgb(64 64 64)",
                color: "#fff",
                ":hover": {
                  background: "red",
                },
                cursor: "pointer",
              };
            },
          }}
          onChange={(val) => {
            setTags(val as any);
          }}
        />
        <Input
          label="description"
          name="description"
          onChange={(e) => form.setValue("description", e.target.value)}
          register={form.register("description", {
            required: true,
          })}
          value={form.watch("description")}
          disabled={isLoading}
          type="text"
        />
        <ImageUpload
          label="coverImage"
          onChange={(e) => form.setValue("coverImage", e)}
          value={form.watch("coverImage")}
          disabled={isLoading}
        />
        <Input
          label="author Name"
          name="authorName"
          onChange={(e) => form.setValue("authorName", e.target.value)}
          register={form.register("authorName", {
            required: true,
          })}
          value={form.watch("authorName")}
          disabled={isLoading}
          type="text"
        />
        <Input
          label="author Email"
          name="authorEmail"
          onChange={(e) => form.setValue("authorEmail", e.target.value)}
          register={form.register("authorEmail", {
            required: true,
          })}
          value={form.watch("authorEmail")}
          disabled={isLoading}
          type="text"
        />
        <ImageUpload
          label="author profile pic"
          onChange={(e) => form.setValue("authorProfilePic", e)}
          value={form.watch("authorProfilePic")}
          disabled={isLoading}
        />
        <div className="min-w-full flex items-center justify-start gap-3 flex-col md:flex-row">
          <button
            className="w-full md:w-fit text-white border-[1px] border-red-600 hover:opacity-80 bg-red-600 px-3 rounded-lg py-2 drop-shadow-2xl hover:bg-opacity-90 transition-all disabled:cursor-not-allowed disabled:opacity-50 "
            type="submit"
            disabled={isLoading}
          >
            Update
          </button>
          <button
            className="w-full md:w-fit hover:opacity-80 transition-all border-[1px] border-white text-white bg-transparent px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed  rounded-lg drop-shadow-2xl hover:bg-opacity-90"
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

export default CreateNews;
