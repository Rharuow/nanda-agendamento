import dayjs from "dayjs";
import React, { useState } from "react";
import Calendar from "react-calendar";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
export const Reservas = () => {
  const [value, onChange] = useState<Value>(dayjs().toDate());
  return (
    <div>
      <Calendar
        onChange={(date) => console.log("date = ", date)}
        value={[dayjs().toDate(), dayjs().add(1, "day").toDate()]}
      />
    </div>
  );
};
