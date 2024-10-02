import Layout from "@/components/layout";
import { useTickerSnapshot } from "@/hooks/useCryptoSnapshot";
import { cryptoService } from "@/services";
import { useEffect } from "react";

export function Home() {
  // const { data, isLoading } = useTickerSnapshot("BTC/USDT", {
  //   refetchInterval: 30000,
  // });

  const fetchPing = async () => {
    await cryptoService.ping();
  };

  useEffect(() => {
    fetchPing();
  }, []);

  return (
    <Layout>
      <button onClick={() => fetchPing()}>click me</button>
      <div>home</div>
    </Layout>
  );
}
