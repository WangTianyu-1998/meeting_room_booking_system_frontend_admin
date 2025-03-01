import ErrorPage from "@/pages/error-page";
import Index from "@/pages/Index";
import { Login } from "@/pages/login";
import { Menu } from "@/pages/menu";
import { UserManage } from "@/pages/user-manage";

export const routes = [
  {
    path: "/",
    element: <Index></Index>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Menu></Menu>,
        children: [
          {
            path: "user_manage",
            element: <UserManage />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
];
