import { useQuery } from "@tanstack/react-query";
import { generateDynamicPix } from "../../qrcode/generate";

export const useGenerateQrCode = ({
  value,
  message,
}: {
  value: number;
  message?: string;
}) => {
  return useQuery({
    queryKey: ["pix-qr-code"],
    queryFn: () => generateDynamicPix({ value, message }),
    enabled: !!value,
  });
};
