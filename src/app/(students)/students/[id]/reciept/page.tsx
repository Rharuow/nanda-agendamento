import { Reciept } from "@/src/components/domain/Students/Student/Show/Reciept";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="min-h-screen p-3 flex flex-col">
      <Reciept id={params.id} />
    </main>
  );
};

export default page;
