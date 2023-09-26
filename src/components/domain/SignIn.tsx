import React, { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

export const SignIn = ({
  setUser,
}: {
  setUser: (value: SetStateAction<string | undefined>) => void;
}) => {
  const { register, handleSubmit } = useForm<{ password: string }>();

  const onSubmit = (data: { password: string }) => {
    const { password } = data;
    if (password === process.env.NEXT_PUBLIC_PASSWORD) {
      Toast.fire({
        icon: "success",
        title: "Sucesso",
      });
      setUser(Cookies.set("user", "Fernanda"));
    } else {
      Toast.fire({
        icon: "error",
        title: "Senha errada",
      });
    }
  };
  return (
    <div className="border p-3 border-slate-200 rounded shadow-sm shadow-slate-200 mx-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="password"
            {...register("password")}
            placeholder="Senha"
            aria-label="password"
          />
          <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 py-1 px-2 rounded">
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};
