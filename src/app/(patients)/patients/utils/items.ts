import {
  ArrowsClockwise,
  BookBookmark,
  Notebook,
  Person,
} from "@phosphor-icons/react";

export const items = [
  {
    icon: Notebook,
    label: "Agendamentos",
    route: "/patients/schedules",
  },
  {
    icon: BookBookmark,
    label: "Agendar",
    route: "/patients/schedules/new",
  },
  {
    icon: Person,
    label: "Pacientes",
    route: "/patients",
  },
  {
    icon: ArrowsClockwise,
    label: "Trocar de serviços",
    route: "/",
  },
];
