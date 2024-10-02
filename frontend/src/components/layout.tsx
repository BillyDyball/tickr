import { GradientCircle } from "./GradientCircle";
import { Header } from "./header";
import { SlimSidebar } from "./slim-sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

// https://dribbble.com/shots/22990752-Cryptocurrency-Web-App-dashboard

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col relative max-h-screen bg-black">
      <GradientCircle className="bg-slate-500 opacity-15 -top-16 -left-20 h-2/3 w-1/2" />
      <Header />
      <div className={"flex flex-1 overflow-hidden"}>
        <SlimSidebar />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
