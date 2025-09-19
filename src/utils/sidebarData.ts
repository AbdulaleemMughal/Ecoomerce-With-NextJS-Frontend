import { CalendarArrowUp, Home, UserRound } from "lucide-react";

export const sidebarData = [
  {
    id: 1,
    name: "Home",
    icon: Home,
    path: "/", 
  },
  {
    id: 2,
    name: "Orders",
    icon: CalendarArrowUp,
    path: "/orders", 
  },
  {
    id: 3,
    name: "Customers",
    icon: UserRound,
    path: "/customers",
  },
];