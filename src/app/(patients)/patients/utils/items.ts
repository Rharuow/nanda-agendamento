import { ArrowsClockwise, BookBookmark, Person } from "@phosphor-icons/react";

export const items = [
  {
    icon: BookBookmark,
    label: "Agendar",
    route: "/patients/schedules",
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
