import { Button } from "@/src/components/Button";
import { Modal } from "@/src/components/Modal";
import { Text } from "@/src/components/Text";
import { Schedule, Student } from "@/src/service";
import { Receipt, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const Body = ({
  student,
}: {
  student: Student & { schedules: Array<Schedule> };
}) => {
  const { push } = useRouter();
  const handleNavigate = (id: string) => push(`/students/${id}/reciept`);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        body="Deseja apagar esse aluno e todos os seus agendamentos?"
        footerChildren={
          <div className="flex gap-2 justify-around">
            <Button text="Sim" variant="danger-outline" />
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
            {student.schedules?.reduce(
              (accumulator, current) =>
                accumulator + Number(current.amountTime),
              0
            )}
          </Text>
        </div>
        <div className="flex justify-between">
          <Text>Quantidade de aulas não pagas:</Text>
          <Text>
            {student.schedules
              ?.filter((schedule) => !schedule.paid)
              .reduce(
                (accumulator, current) =>
                  accumulator + Number(current.amountTime),
                0
              )}
          </Text>
        </div>
        <div className="flex justify-between">
          <Text>Débito total:</Text>
          <Text>
            {student.schedules
              ?.filter((schedule) => !schedule.paid)
              .reduce(
                (accumulator, current) =>
                  accumulator +
                  Number(current.pricePerTime) * Number(current.amountTime),
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
              student.schedules.some((schedule) => !schedule.paid)
                ? "secondary"
                : "danger"
            }
            onClick={() => setShowModal(true)}
          />
        </div>
        {student.schedules?.some((schedule) => !schedule.paid) && (
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
