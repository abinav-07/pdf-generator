import { Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { removeToken } from "@/utils";
import { LogoutButton, NavBarDiv, NavBarMenuItem } from "./style";
import { AdminNavbarItems } from "./items";
import Router from "next/router";
import Link from "next/link";

interface props {
  type: "Admin" | "User";
}

const NavBar = ({ type }: props) => {
  const history = Router;
  console.log("here", history.pathname);
  const activeKey =
    history.pathname.split("/")[2] || history.pathname.split("/")[1];

  const logout = () => {
    removeToken("role-token");
    if (type == "Admin") {
      history.push("/login");
    }
  };

  return (
    <NavBarDiv>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[activeKey]}>
        {type == "Admin" &&
          AdminNavbarItems?.map(({ key, label, path, icon }) => (
            <NavBarMenuItem key={key} icon={icon}>
              <Link href={path}>{label}</Link>
            </NavBarMenuItem>
          ))}
        <Menu.Item
          key="Logout"
          icon={<LogoutOutlined />}
          onClick={() => {
            logout();
          }}
        >
          <LogoutButton>Log Out</LogoutButton>
        </Menu.Item>
      </Menu>
    </NavBarDiv>
  );
};

export default NavBar;
