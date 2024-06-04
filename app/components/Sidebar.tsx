"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { BsArrowBarRight, BsArrowBarLeft } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { BounceLoader, HashLoader } from "react-spinners";
import { useAuth } from "@/context/auth";
import toast from "react-hot-toast";
import { CiLogout } from "react-icons/ci";

const SidebarContext = createContext<any>(undefined);

interface SidebarItemsProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
}

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [theme1, setTheme] = useState<string | undefined>(undefined);
  const { theme } = useTheme();
  const { logout, user, setUser } = useAuth();

  useEffect(() => {
    setTheme(theme);
    setUser(user);
  }, [theme, user]);

  if (theme1 != undefined) {
    return (
      <main className="flex w-screen h-screen">
        <aside className=" h-full">
          <nav
            className={`h-full inline-flex flex-col  border-r shadow-sm
  ${theme == "light" ? "bg-white" : theme == "dark" ? "bg-[#121212]" : ""} `}
          >
            <div className={`p-4 pb-2 flex justify-between items-center `}>
              <img
                src="https://www.insightlab.ufc.br/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/02/LogoInsight.png.webp"
                className={`overflow-hidden transition-all ${
                  expanded
                    ? `w-32 ${
                        theme == "light" ? "bg-indigo-500 rounded-lg p-2" : ""
                      }`
                    : "w-0"
                }`}
                alt=""
              />
              <Button
                onClick={() => setExpanded((curr) => !curr)}
                className={`p-2 rounded-lg bg-transparent  ${
                  theme == "light"
                    ? "text-gray-900 hover:bg-gray-300"
                    : "text-white hover:bg-gray-700"
                }`}
              >
                {expanded ? (
                  <BsArrowBarLeft size={22} />
                ) : (
                  <BsArrowBarRight size={22} />
                )}
              </Button>
            </div>

            <SidebarContext.Provider value={{ expanded }}>
              <ul className="flex-1 px-3 ">
                <SidebarItem icon={<IoMdHome />} text="Home" active />
              </ul>
            </SidebarContext.Provider>

            <div className="border-t flex p-3">
              <div className="bg-indigo-300 font-bold flex items-center justify-center min-w-[40px] p-2 text-black rounded-lg">
                {user?.username.substr(0, 1).toLocaleUpperCase()}
              </div>

              <div
                className={`
        flex justify-between items-center
        overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
    `}
              >
                <div className="leading-4">
                  <h4 className="font-semibold">{user?.username}</h4>
                  <span
                    className={`text-xs text-gray-600 ${
                      theme == "dark" ? "!text-gray-200" : "text-black"
                    }`}
                  >
                    {user?.email}
                  </span>
                </div>
                <Button
                  className={`p-2 rounded-lg bg-transparent  ${
                    theme == "light"
                      ? "text-gray-900 hover:bg-gray-300"
                      : "text-white hover:bg-gray-700"
                  }`}
                  onClick={() => {
                    setIsLogoutLoading(true);
                    setTimeout(() => {
                      logout();

                      setIsLogoutLoading(false);
                      toast.success("Logout efetuado com sucesso!");
                    }, 1000);
                  }}
                >
                  {isLogoutLoading ? (
                    <HashLoader size={25} color="#36d7b7" />
                  ) : (
                    <CiLogout title="Logout" size={25} />
                  )}
                </Button>
              </div>
            </div>
          </nav>
        </aside>
        {children}
      </main>
    );
  } else {
    return (
      <main className="flex w-full h-full items-center justify-center">
        <BounceLoader color="#6366F1" />
      </main>
    );
  }
}

export function SidebarItem({ icon, text, active, alert }: SidebarItemsProps) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center justify-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
