import { AndroidOutlined, UserOutlined } from "@ant-design/icons";

export const AdminNavbarItems = [
  {
    name: "PDF Contents",
    key: "pdf-contents",
    label: "PDF Contents",
    path: `/admin/pdf-contents`,
    icon: <AndroidOutlined />,
  },
  {
    name: "Members",
    key: "members",
    label: "Members",
    path: `/admin/members`,
    icon: <UserOutlined />,
  },
];
