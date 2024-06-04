"use client";
import { AppWrapper } from "@/context";
import { RequireAuth } from "@/context/auth/RequireAuth";
import ModalProvider from "@/providers/ModalProvider";
import { ThemeProvider } from "next-themes";
import Sidebar from "../components/Sidebar";

const protectedLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <RequireAuth>
      <AppWrapper>
        <ModalProvider />
        <Sidebar>{children}</Sidebar>
      </AppWrapper>
    </RequireAuth>
  );
};

export default protectedLayout;
