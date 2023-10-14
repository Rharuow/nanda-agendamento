import { Button } from "@/src/components/Button";
import { Modal } from "@/src/components/Modal";
import { Text } from "@/src/components/Text";
import { Student } from "@/src/service";
import { useDeleteStudent } from "@/src/service/hooks/student/useDeleteStudent";
import { Receipt, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const Body = ({
  student,
  refetch,
}: {
  student: Student;
  refetch: () => void;
}) => {
  const { push } = useRouter();
  const handleNavigate = (id: string) => push(`/students/${id}/reciept`);

  const [showModal, setShowModal] = useState(false);

  const { mutateAsync: deleteStudent } = useDeleteStudent();

  const handleDeleteStudent = () => {
    deleteStudent(
      { id: String(student.id) },
      {
        onSuccess: () => {
          toast.success("Estudande apagado com sucesso...");
          refetch();
        },
        onError: () => {
          toast.error("Erro ao apagar estudante...", { autoClose: 2000 });
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        body="Deseja apagar esse aluno e todos os seus agendamentos?"
        footerChildren={
          <div className="flex gap-2 justify-around">
            <Button
              text="Sim"
              variant="danger-outline"
              onClick={() => handleDeleteStudent()}
            />
            <Button
              text="Não"
              variant="secondary-outline"
              onClick={() => setShowModal(false)}
            />
          </div>
        }
      />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Text>Quantidade de totais aulas:</Text>
          <Text>
            {!student.schedules
              ? 0
              : student.schedules.reduce(
                  (accumulator, current) =>
                    accumulator + Number(current?.amountTime),
                  0
                )}
          </Text>
        </div>
        <div className="flex justify-between">
          <Text>Quantidade de aulas não pagas:</Text>
          <Text>
            {!student.schedules
              ? 0
              : student.schedules
                  .filter((schedule) => !schedule?.paid)
                  .reduce(
                    (accumulator, current) =>
                      accumulator + Number(current?.amountTime),
                    0
                  )}
          </Text>
        </div>
        <div className="flex justify-between">
          <Text>Débito total:</Text>
          <Text>
            {!student.schedules
              ? "R$ 0"
              : "R$ " +
                student.schedules
                  .filter((schedule) => !schedule?.paid)
                  .reduce(
                    (accumulator, current) =>
                      accumulator +
                      Number(current?.pricePerTime) *
                        Number(current?.amountTime),
                    0
                  )}
          </Text>
        </div>
      </div>
      <div className="flex justify-between gap-2 border-t-2 pt-2">
        <div className="flex justify-end">
          <Button
            iconButton={Trash}
            sizeIcon={18}
            weigthIcon="fill"
            variant={
              student.schedules &&
              student.schedules.some((schedule) => !schedule?.paid)
                ? "secondary"
                : "danger"
            }
            onClick={() => setShowModal(true)}
          />
        </div>
        {student.schedules?.some((schedule) => !schedule?.paid) && (
          <div className="flex justify-end">
            <Button
              text="Gerar Recibo"
              iconButton={Receipt}
              sizeIcon={18}
              weigthIcon="fill"
              onClick={() => handleNavigate(String(student.id))}
              className="text-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};
