import { Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { removeToken } from "@/utils";
import { LogoutButton, NavBarDiv, NavBarMenuItem } from "./style";
import { AdminNavbarItems } from "./items";
import Router from "next/router";
import Link from "next/link";
import { useCallback } from "react";

interface props {
  type: "Admin" | "User";
}

const NavBar = ({ type }: props) => {
  const history = Router;
  const activeKey =
    history.pathname.split("/")[2] || history.pathname.split("/")[1];

  const logout = useCallback(() => {
    removeToken("role-token");
    if (type == "Admin") {
      history.push("/login");
    }
  }, [history, type]);

  return (
    <NavBarDiv>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[activeKey]}>
        {type == "Admin" &&
          AdminNavbarItems?.map(({ key, label, path, icon }) => (
            <NavBarMenuItem key={key} icon={icon}>
              <Link href={path} passHref>
                <a>{label}</a>
              </Link>
            </NavBarMenuItem>
          ))}
        <Menu.Item key="Logout" icon={<LogoutOutlined />} onClick={logout}>
          <LogoutButton>Log Out</LogoutButton>
        </Menu.Item>
      </Menu>
    </NavBarDiv>
  );
};

export default NavBar;
