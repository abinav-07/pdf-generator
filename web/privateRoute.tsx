import React, { useContext, useEffect, useState } from "react"
import { Layout, Spin, message } from "antd"
import styled from "styled-components"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import NavBar from "./components/nav"
import Router from "next/router"
import { AuthContext } from "./utils"


interface props {
    type: "Admin" | "User"
    children?: any
}

const { Content, Sider, Header } = Layout

const LayoutContent = styled(Content)`
  min-height: 100vh;
  width: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 2rem;
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  margin-top: 40px;
`

const PrivateRoute = (AuthComponent: any, additionalProps: props) => {
    const { type } = additionalProps

    function PrivateComponent({ children }: any) {
        const { authenticated, loading, user } = useContext(AuthContext)
        useEffect(() => {
            const { pathname } = Router
            if (!loading) {
                if (!authenticated) {
                    message.info({ content: "You must be an admin to visit the page." })
                    Router.push("/login")
                    return
                }
                if (authenticated && pathname === "/") {
                    Router.push("/admin/pdf-contents")
                }
            }
        }, [authenticated, loading, user])

        if (loading) {
            return (
                <LoaderWrapper>
                    <Spin size={"large"} className={"loader"} />
                </LoaderWrapper>
            )
        }
        return <>{authenticated && <>{children}</>}</>
    }


    type HigherState = { collapsed: boolean }
    return class Higher extends React.Component<
        Record<string, unknown>,
        HigherState
    > {
        constructor(props: any) {
            super(props)
            this.state = {
                collapsed: false

            }
        }

        toggleSider = () => {
            this.setState((state) => ({
                collapsed: !state.collapsed,
            }))
        }
        render() {
            return <PrivateComponent>
                <Layout
                    style={{
                        backgroundColor: "#fff",
                    }}
                >
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <Header
                            style={{
                                paddingRight: "20px",
                                textAlign: "right",
                            }}
                        >
                            {this.state.collapsed ? (
                                <MenuUnfoldOutlined
                                    style={{ color: "white", fontSize: "1.3rem" }}
                                    onClick={() => {
                                        this.toggleSider()
                                    }}
                                />
                            ) : (
                                <MenuFoldOutlined
                                    style={{ color: "white", fontSize: "1.3rem" }}
                                    onClick={() => {
                                        this.toggleSider()
                                    }}
                                />
                            )}
                        </Header>
                        <NavBar type={type} />
                    </Sider>
                    <LayoutContent>
                        <AuthComponent {...this.props} />
                    </LayoutContent>
                </Layout>
            </PrivateComponent>
        }

    }
}

export default PrivateRoute
