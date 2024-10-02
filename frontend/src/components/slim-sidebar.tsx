import { useState } from "react";
import { PlusCircle } from "lucide-react";

import BTC from "@/assets/crypto/BTC.svg";
import ETH from "@/assets/crypto/ETH.svg";
import DOGE from "@/assets/crypto/DOGE.svg";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Link } from "react-router-dom";

export function SlimSidebar() {
  const [selected, setSelected] = useState("/");

  const navItems = [
    { icon: BTC, label: "Bitcoin", href: "/" },
    { icon: ETH, label: "Ethereum", href: "/" },
    { icon: DOGE, label: "Dogecoin", href: "/" },
  ];

  return (
    <TooltipProvider>
      <div className="flex flex-col w-20 bg-transparent text-white pt-4 border-r border-r-slate-700">
        <nav className="flex-1">
          <ul className="flex flex-col space-y-2 justify-center items-center">
            {navItems.map((item, index) => (
              <li key={index} className={cn("h-12 w-12")}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={item.href}
                      className={cn(
                        "flex justify-center items-center rounded-lg transition-all duration-200 h-12 w-12 p-2",
                        selected === item.href ? "" : "hover:bg-gray-700"
                      )}
                      onClick={() => setSelected(item.href)}
                    >
                      <img src={item.icon} />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                className="flex justify-center w-full p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                to="/connection"
              >
                <PlusCircle className="w-6 h-6" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Add New Connection</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
