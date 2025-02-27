import ReactDOM from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { ConfigProvider, App as AntdApp } from "antd";
import { routes } from "./router";
import AntdGlobal from "./utils/antd-global";
import "@ant-design/v5-patch-for-react-19";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const Route = () => {
  return useRoutes(routes);
};

const App = () => {
  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
};

root.render(
  <ConfigProvider>
    <AntdApp>
      <AntdGlobal />
      <App />
    </AntdApp>
  </ConfigProvider>
);
