export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const orderData = req.body;
  const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL;
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  // ملخص الطلبات لعمود order في الشيت
  const orderSummary = orderData.cart.map((item, idx) => `${idx + 1}. ${item.name} (عدد: ${item.quantity})`).join(' | ');

  // حساب إجمالي الفاتورة (المنتجات + التوصيل)
  const itemsSubtotal = orderData.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = Number(orderData.deliveryFee || 5);
  const grandTotal = itemsSubtotal + deliveryFee;

  // 1. طلب التليجرام
  const telegramPromise = fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: formatTelegramMessage(orderData, grandTotal, itemsSubtotal, deliveryFee),
      parse_mode: 'HTML'
    })
  });

  // 2. طلب Google Sheet
  const sheetPromise = GOOGLE_SHEET_URL ? fetch(GOOGLE_SHEET_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      order_number: orderData.orderNumber,
      name: orderData.name,
      phone: orderData.phone,
      address: orderData.address,
      notes: orderData.notes || "",
      order_summary: orderSummary,
      total: grandTotal,
      items: orderData.cart
    })
  }) : Promise.resolve();

  await Promise.allSettled([telegramPromise, sheetPromise]);

  return res.status(200).json({ success: true, message: 'Order sent successfully' });
}