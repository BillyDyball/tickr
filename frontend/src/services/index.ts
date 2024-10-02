import axios from "axios";
import { CryptoService } from "./CryptoService/crypto.service";

const http = axios.create({
  baseURL: "https://localhost:7140",
});

const cryptoService = new CryptoService(http);

export { cryptoService };
export * from "./CryptoService";
