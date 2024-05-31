"use client";

import { useContext, createContext, useState } from "react";
import { BsArrowBarRight, BsArrowBarLeft } from "react-icons/bs";
import { IoMdHome } from "react-icons/io";
import { ModeToggle } from "./toggle-theme";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

const SidebarContext = createContext<any>(undefined);

interface SidebarItemsProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
}

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const { theme } = useTheme();
  console.log(theme);

  return (
    <main className="flex w-screen h-screen">
      <aside className=" h-screen">
        <nav
          className={`h-full inline-flex flex-col  border-r shadow-sm
        ${theme == "light" ? "bg-white" : "bg-[#121212]"}`}
        >
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src="https://img.logoipsum.com/243.svg"
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
              alt=""
            />
            <Button
              onClick={() => setExpanded((curr) => !curr)}
              className={`p-1.5 rounded-lg bg-transparent  ${
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
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 rounded-md"
            />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs text-gray-600">johndoe@gmail.com</span>
              </div>
              <BsArrowBarLeft size={20} />
            </div>
          </div>
        </nav>
      </aside>

      {children}
    </main>
  );
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
