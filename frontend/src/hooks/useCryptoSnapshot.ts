import { cryptoService, TickerSnapshot } from "@/services";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useTickerSnapshot = (
  ticker: string,
  options?: {
    refetchInterval: number;
  }
): UseQueryResult<TickerSnapshot, Error> => {
  const fetchTickerSnapshot = async () => {
    return await cryptoService.getTickerSnapshot({ ticker });
  };

  return useQuery<TickerSnapshot, Error>({
    queryKey: [`${ticker}-ticker-snapshot`],
    queryFn: fetchTickerSnapshot,
    refetchInterval: options?.refetchInterval,
  });
};
