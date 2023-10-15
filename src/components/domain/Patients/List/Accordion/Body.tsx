import { Button } from "@/src/components/Button";
import { Modal } from "@/src/components/Modal";
import { Text } from "@/src/components/Text";
import { Patient } from "@/src/service";
import { Receipt, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const Body = ({
  patient,
  refetch,
}: {
  patient: Patient;
  refetch: () => void;
}) => {
  const { push } = useRouter();
  const handleNavigate = (id: string) => push(`/patients/${id}/reciept`);

  const [showModal, setShowModal] = useState(false);

  const handleDeletePatient = () => {};

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
              onClick={() => handleDeletePatient()}
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
            {!patient.schedules
              ? 0
              : patient.schedules.reduce(
                  (accumulator, current) =>
                    accumulator + Number(current?.amountTime),
                  0
                )}
          </Text>
        </div>
        <div className="flex justify-between">
          <Text>Quantidade de aulas não pagas:</Text>
          <Text>
            {!patient.schedules
              ? 0
              : patient.schedules
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
            {!patient.schedules
              ? "R$ 0"
              : "R$ " +
                patient.schedules
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
              patient.schedules &&
              patient.schedules.some((schedule) => !schedule?.paid)
                ? "secondary"
                : "danger"
            }
            onClick={() => setShowModal(true)}
          />
        </div>
        {patient.schedules?.some((schedule) => !schedule?.paid) && (
          <div className="flex justify-end">
            <Button
              text="Gerar Recibo"
              iconButton={Receipt}
              sizeIcon={18}
              weigthIcon="fill"
              onClick={() => handleNavigate(String(patient.id))}
              className="text-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};
