import Starter from "../views/starter/starter.jsx";
import ManageTeamsView from "../views/manageteams/manageteams";
import MyTickets from "../views/mytickets/mytickets";
import MyProjects from "../views/myprojects/myprojects";
import ProjectDetail from "../views/projectdetail/projectdetail";
import TeamDetail from "../views/teamdetail/teamdetail";
import TicketDetail from "../views/ticketdetail/ticketdetail";
import ManageUsersView from "../views/manageusers/manageusers";
export var ThemeRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "mdi mdi-gauge",
    component: Starter,
  },

  {
    path: "/manageusers",
    name: "Manage Users Role",
    icon: "mdi mdi-account-multiple",
    component: ManageUsersView,
  },

  {
    path: "/manageteams",
    name: "Teams",
    icon: "mdi mdi-human-greeting",
    component: ManageTeamsView,
  },
  {
    path: "/projectdetail/:id",
    name: "Project Detail",
    icon: "mdi mdi-sitemap",
    component: ProjectDetail,
  },
  {
    path: "/teamdetail/:id",
    name: "Team Detail",
    icon: "mdi mdi-sitemap",
    component: TeamDetail,
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

export var ThemeRoutesSidebar = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "mdi mdi-gauge",
    component: Starter,
  },
  {
    path: "/myprojects",
    name: "Projects",
    icon: "mdi mdi-file-document-box",
    component: MyProjects,
  },

  {
    path: "/manageteams",
    name: "Teams",
    icon: "mdi mdi-human-greeting",
    component: ManageTeamsView,
  },

  {
    path: "/mytickets",
    name: "Tickets",
    icon: "mdi mdi-file-document",
    component: MyTickets,
  },
  {
    path: "/manageusers",
    name: "Manage Users Role",
    icon: "mdi mdi-account-multiple",
    component: ManageUsersView,
  },

  { path: "/", pathTo: "/dashboard", name: "Dashboard", redirect: true },
];

export var ThemeRoutesSidebarTeams = [
  {
    path: "/manageteams",
    name: "My Team",
    icon: "mdi mdi-human-greeting",
    component: ManageTeamsView,
  },

  { path: "/", pathTo: "/manageteams", name: "My Team", redirect: true },
];

export var ThemeRoutesSidebarProjects = [
  {
    path: "/myprojects",
    name: "My Projects",
    icon: "mdi mdi-file-document-box",
    component: MyProjects,
  },

  { path: "/", pathTo: "/myprojects", name: "My Projects", redirect: true },
];

export var ThemeRoutesSidebarUpdaters = [
  {
    path: "/mytickets",
    name: "My Tickets",
    icon: "mdi mdi-file-document-box",
    component: MyTickets,
  },
  { path: "/", pathTo: "/mytickets", name: "My Tickets", redirect: true },
];
