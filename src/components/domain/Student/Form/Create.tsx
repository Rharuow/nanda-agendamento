import { Button } from "@/src/components/Button";
import { InputText } from "@/src/components/form/input/Text";
import { useCreateStudent } from "@/src/service/hooks/useCreateStudent";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export type FormCreateStudentType = { name: string };

export const FormCreateStudent = () => {
  const methods = useForm<FormCreateStudentType>();

  const { handleSubmit } = methods;

  const { mutateAsync } = useCreateStudent();

  const onSubmit = (data: FormCreateStudentType) => {
    mutateAsync(data, {
      onSuccess: () => {
        toast.success("Aluno cadastrado com sucesso...");
      },
      onError: () => {
        toast.error("Erro ao cadastrar aluno...");
      },
    });
  };

  return (
    <div className="p-3">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 p-3"
        >
          <InputText name="name" label="Nome do Aluno" required />
          <Button text="Cadastrar" variant="success" />
        </form>
      </FormProvider>
    </div>
  );
};
