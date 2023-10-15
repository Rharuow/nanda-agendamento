import { Button } from "@/src/components/Button";
import { InputText } from "@/src/components/form/input/Text";
import { useCreatePatient } from "@/src/service/hooks/patients/useCreatePatient";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export type FormCreatePatientType = {
  name: string;
};

export const FormCreatePatient = ({
  setShowModal,
  refetch,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}) => {
  const methods = useForm<FormCreatePatientType>();

  const { handleSubmit } = methods;

  const { mutateAsync: createPatient } = useCreatePatient();

  const onSubmit = (data: FormCreatePatientType) => {
    createPatient(
      { ...data, totalTime: 0, debitTotal: 0, schedules: [] },
      {
        onSuccess: () => {
          toast.success("Paciente cadastrado com sucesso...");
          setShowModal(false);
          refetch();
        },
        onError: () => {
          toast.error("Erro ao cadastrar paciente...");
        },
      }
    );
  };

  return (
    <div className="p-3">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 p-3"
        >
          <InputText name="name" label="Nome do Paciente" required />
          <Button text="Cadastrar" variant="success" />
        </form>
      </FormProvider>
    </div>
  );
};
