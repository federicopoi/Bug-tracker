import Starter from "../views/starter/starter.jsx";
import ManageUsersView from "../views/manageusers/manageusers";
import MyTickets from "../views/mytickets/mytickets";
import MyProjects from "../views/myprojects/myprojects";
import ProjectDetail from "../views/projectdetail/projectdetail";
import TicketDetail from "../views/ticketdetail/ticketdetail";
var ThemeRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "mdi mdi-gauge",
    component: Starter,
  },

  {
    path: "/manageusers",
    name: "Manage Users Role",
    icon: "mdi mdi-gauge",
    component: ManageUsersView,
  },
  {
    path: "/projectdetail/:id",
    name: "Project Detail",
    icon: "mdi mdi-sitemap",
    component: ProjectDetail,
  },

  {
    path: "/ticketdetail/:id",
    name: "Ticket Detail",
    icon: "mdi mdi-sitemap",
    component: TicketDetail,
  },

  {
    path: "/myprojects",
    name: "My Projects",
    icon: "mdi mdi-file-document-box",
    component: MyProjects,
  },

  {
    path: "/mytickets",
    name: "My Tickets",
    icon: "mdi mdi-file-document-box",
    component: MyTickets,
  },

  { path: "/", pathTo: "/dashboard", name: "Dashboard", redirect: true },
];

export default ThemeRoutes;