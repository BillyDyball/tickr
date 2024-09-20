import { AxiosError } from "axios";

export const handleAxiosError = (error: AxiosError): Error => {
  if (error.response) {
    // The request was made, and the server responded with a status code outside the range of 2xx
    console.error("Error Status:", error.response.status);
    console.error("Error Data:", error.response.data);
    console.error("Error Headers:", error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error("No response received:", error.request);
  } else {
    // Something happened in setting up the request that triggered an error
    console.error("Error Message:", error.message);
  }
  console.error("Config:", error.config);
  throw new Error("Axios Error");
};

export const handleServiceError = (
  error: unknown,
  functionName?: string
): Error => {
  if (error instanceof AxiosError) {
    return handleAxiosError(error);
  } else if (functionName !== undefined) {
    throw new Error(`${functionName}: Something went wrong!`);
  } else {
    throw new Error("Something went wrong");
  }
};
