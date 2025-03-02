import BookingManage from "@/pages/booking-manage";
import ErrorPage from "@/pages/error-page";
import Index from "@/pages/Index";
import { Login } from "@/pages/login";
import MeetingRoomManage from "@/pages/meeting-room-manage";
import { Menu } from "@/pages/menu";
import Statistics from "@/pages/statistics";
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
          { path: "/", element: <MeetingRoomManage /> },
          { path: "user_manage", element: <UserManage /> },
          { path: "meeting_room_manage", element: <MeetingRoomManage /> },
          { path: "booking_manage", element: <BookingManage /> },
          { path: "statistics", element: <Statistics /> },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
];
