export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971583093948';

export function buildWhatsAppUrl(productName: string, brand: string): string {
  const message = encodeURIComponent(
    `Hi, I'm interested in getting the best price for the ${brand} ${productName}.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}
