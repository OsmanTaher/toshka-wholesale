export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const orderData = req.body;
    const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL;
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return res
        .status(500)
        .json({ success: false, error: "Telegram settings are missing" });
    }

    if (
      !orderData?.message ||
      !Array.isArray(orderData.cart) ||
      orderData.cart.length === 0
    ) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid order data" });
    }

    const orderSummary = orderData.cart
      .map((item, idx) => `${idx + 1}. ${item.name} (عدد: ${item.quantity})`)
      .join(" | ");
    const itemsSubtotal = orderData.cart.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0,
    );
    const deliveryFee = Number(orderData.deliveryFee || 5);
    const grandTotal = itemsSubtotal + deliveryFee;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: orderData.message,
          parse_mode: "MarkdownV2",
        }),
      },
    );

    if (!telegramResponse.ok) {
      const telegramError = await telegramResponse.text();
      throw new Error(`Telegram ${telegramResponse.status}: ${telegramError}`);
    }

    if (GOOGLE_SHEET_URL) {
      const sheetResponse = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_number: orderData.orderNumber,
          name: orderData.name,
          phone: orderData.phone,
          address: orderData.address,
          notes: orderData.notes || "",
          order_summary: orderSummary,
          total: grandTotal,
          items: orderData.cart,
        }),
      });

      const sheetBody = await sheetResponse.text();
      if (!sheetResponse.ok) {
        throw new Error(`Google Sheets ${sheetResponse.status}: ${sheetBody}`);
      }

      try {
        const sheetResult = JSON.parse(sheetBody);
        if (sheetResult.status === "error") {
          throw new Error(
            sheetResult.message || "Google Sheets rejected the order",
          );
        }
      } catch (error) {
        if (error instanceof SyntaxError) {
          throw new Error("Google Sheets returned an invalid response");
        }
        throw error;
      }
    }

    return res
      .status(200)
      .json({ success: true, message: "Order sent successfully" });
  } catch (error) {
    console.error("Order delivery failed:", error);
    return res.status(502).json({
      success: false,
      error: "تعذر إرسال الطلب إلى Telegram أو Google Sheets",
    });
  }
}
