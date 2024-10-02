import TickrLogo from "@/assets/tickr-logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InputIcon } from "./InputIcon";
import { Search } from "lucide-react";

export function Header() {
  return (
    <header className="w-full px-6 py-4 flex justify-between border-b border-b-slate-700 text-white">
      <img src={TickrLogo} alt="Tickr Logo" className="min-h-8 min-w-8" />
      <div className="flex items-center gap-3">
        <InputIcon type="text" placeholder="Search" Icon={Search} />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
