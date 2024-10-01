import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface AnimatedCardProps {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function AnimatedCard({
  title = "Featured Card",
  isActive,
  onClick,
}: AnimatedCardProps) {
  return (
    <motion.div
      className="relative w-64"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="w-full cursor-pointer bg-white" onClick={onClick}>
        <CardContent className="flex flex-col items-center p-6">
          <Star className="h-12 w-12 mb-4 text-yellow-400" />
          <h2 className="text-xl font-semibold text-center">{title}</h2>
        </CardContent>
      </Card>
    </motion.div>
  );
}
