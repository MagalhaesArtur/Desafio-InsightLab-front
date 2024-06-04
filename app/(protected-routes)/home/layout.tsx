"use client";

import { ModeToggle } from "../../components/toggle-theme";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full overflow-x-auto max-h-screen p-2">
      <div className="flex w-full justify-end">
        <div className="flex justify-center items-center">
          <ModeToggle />
        </div>
      </div>

      {children}
    </div>
  );
}
