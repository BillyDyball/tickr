import { cn } from "@/lib/utils";
import { SlimSidebar } from "./slim-sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={cn("flex bg-gray-800")}>
      <SlimSidebar />
      <main className="flex-1 overflow-hidden p-5">{children}</main>
    </div>
  );
}
