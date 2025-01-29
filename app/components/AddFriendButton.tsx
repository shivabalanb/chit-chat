"use client";

import { addFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// interface AddFriendButtonProps {
//   email: string;
// }

type FormData = z.infer<typeof addFriendValidator>;

const AddFriendButton = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });
  const addFriend = async (email: string) => {

    try {
      const validatedEmail = addFriendValidator.parse({ email });

      await axios.post("/api/friends/add", {
        email: validatedEmail.email,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("email", { message: error.message });
        return;
      }
      if (error instanceof AxiosError) {
        setError("email", { message: error.response?.data });
        return;
      }
      setError("email", { message: "something went wrong" });
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">add friend by e-mail</label>

      <input {...register("email")} type="text" id="email" />
      <button>Add</button>
      <p className="text-red-600">{errors.email?.message}</p>
    </form>
  );
};

export default AddFriendButton;
