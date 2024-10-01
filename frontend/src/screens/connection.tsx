import Layout from "@/components/layout";
import { cn } from "@/lib/utils";
import BTC from "@/assets/crypto/BTC.svg";
import ETH from "@/assets/crypto/ETH.svg";
import DOGE from "@/assets/crypto/DOGE.svg";
import { Card, CardContent } from "@/components/ui/card";

const cards = [
  {
    id: 1,
    title: "Bitcoin",
    icon: BTC,
  },
  {
    id: 2,
    title: "Etherium",
    icon: ETH,
  },
  {
    id: 3,
    title: "Dogecoin",
    icon: DOGE,
  },
];

export function Connection() {
  return (
    <Layout>
      <p>Add connections</p>
      <p>Adding connections tells us what you're activly subscribed to</p>
      <div className={cn("flex flex-wrap content-start h-full")}>
        {cards.map((card) => (
          <div className={cn("w-full md:w-1/2 lg:w-1/4 h-40")}>
            <Card key={card.id} className="m-2">
              <CardContent className="flex flex-col items-center p-6">
                <img src={card.icon} alt={card.title} className={cn("h-20")} />
                <h2 className="text-xl font-semibold text-center">
                  {card.title}
                </h2>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </Layout>
  );
}
