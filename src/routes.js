import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports

import FaceMask from "views/admin/faceMask";
import Behavior from "views/admin/behavior";
import Crowd from "views/admin/crowd";
import Expression from "views/admin/expresion";
import AllProduct from "views/admin/AllOrders";

import DataTables from "views/admin/dataTables";


// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  // {
  //   name: "Main Dashboard",
  //   layout: "/admin",
  //   path: "/default",
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: MainDashboard,
  // },
  {
    name: "Face Mask Detection",
    layout: "/admin",
    path: "/face-mask",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: FaceMask,
    secondary: true,
  },
  {
    name: "Customer Behavior",
    layout: "/admin",
    path: "/behavior",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: Behavior,
    secondary: true,
  },{
    name: "Customer Expression",
    layout: "/admin",
    path: "/expression",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: Expression,
    secondary: true,
  },
  {
    name: "Crowd",
    layout: "/admin",
    path: "/crowd",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: Crowd,
    secondary: true,
  },
  {
    name: "All Products",
    layout: "/admin",
    path: "/crowd",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: AllProduct,
    secondary: true,
  },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
  //   path: "/data-tables",
  //   component: DataTables,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  //   component: Profile,
  // },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "/sign-in",
  //   icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  //   component: SignInCentered,
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: RTL,
  // },
];

export default routes;
