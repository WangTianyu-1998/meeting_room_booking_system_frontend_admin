import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu as AntdMenu, MenuProps } from "antd";
import "./index.css";
import { useMemo } from "react";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "会议室管理",
  },
  {
    key: "2",
    label: "预定管理",
  },
  {
    key: "3",
    label: "用户管理",
  },
  {
    key: "4",
    label: "统计",
  },
];

export function Menu() {
  const nav = useNavigate();
  const location = useLocation();

  const handleMenuItemClick = (info: any) => {
    console.log("🚀 ~ handleMenuItemClick ~ info:", info);
    let path = "";
    switch (info.key) {
      case "1":
        path = "/meeting_room_manage";
        break;
      case "2":
        path = "/booking_manage";
        break;
      case "3":
        path = "/user_manage";
        break;
      case "4":
        path = "/statistics";
        break;
    }
    nav(path);
  };

  const getSelectedKeys = useMemo(() => {
    if (location.pathname === "/user_manage") {
      return ["3"];
    } else if (location.pathname === "/booking_manage") {
      return ["2"];
    } else if (location.pathname === "/meeting_room_manage") {
      return ["1"];
    } else if (location.pathname === "/statistics") {
      return ["4"];
    } else {
      return ["1"];
    }
  }, [location?.pathname]);

  return (
    <div id="menu-container">
      <div className="menu-area">
        <AntdMenu
          defaultSelectedKeys={getSelectedKeys}
          items={items}
          onClick={handleMenuItemClick}
        />
      </div>
      <div className="content-area">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
