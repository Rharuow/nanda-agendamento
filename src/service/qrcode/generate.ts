import { QrCodePix } from "qrcode-pix";

export const generateDynamicPix = async ({
  value,
  message,
}: {
  value: number;
  message?: string;
}) => {
  const qrCodePix = QrCodePix({
    version: "01",
    key: String(process.env.NEXT_PUBLIC_PIX_KEY),
    name: String(process.env.NEXT_PUBLIC_PIX_NAME),
    city: String(process.env.NEXT_PUBLIC_PIX_CITY),
    transactionId: String(process.env.NEXT_PUBLIC_PIX_TRANSACTION_ID),
    message: message || String(process.env.NEXT_PUBLIC_PIX_MESSAGE),
    value,
  });

  const rawPixStr = qrCodePix.payload();
  const qrCodeBase64 = await qrCodePix.base64();

  return { key: rawPixStr, qrCode: qrCodeBase64 };
};
