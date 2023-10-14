import {
  ArrowsClockwise,
  BookBookmark,
  Notebook,
  Student,
} from "@phosphor-icons/react";

export const items = [
  {
    icon: BookBookmark,
    label: "Criar reservas",
    route: "/students/schedules/new",
  },
  {
    icon: Notebook,
    label: "Agendamentos",
    route: "/students/schedules",
  },
  {
    icon: Student,
    label: "Alunos",
    route: "/students",
  },
  {
    icon: ArrowsClockwise,
    label: "Trocar de serviços",
    route: "/",
  },
];
