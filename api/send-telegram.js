function escapeMarkdownV2(value) {
  return String(value).replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const orderData = req.body || {};
    const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL;
    const GOOGLE_SHEET_URL_CONFIRM =
      process.env.GOOGLE_SHEET_URL_CONFIRM || GOOGLE_SHEET_URL;
    const GOOGLE_SHEET_URL_CANCEL =
      process.env.GOOGLE_SHEET_URL_CANCEL || GOOGLE_SHEET_URL;
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return res
        .status(500)
        .json({ success: false, error: "Telegram settings are missing" });
    }

    const isQuickAction =
      String(orderData.source || "").toLowerCase() === "quick-action";
    const action = String(orderData.action || orderData.type || "")
      .trim()
      .toLowerCase();
    const phone = String(orderData.phone || "").trim();
    const orderNumber = String(
      orderData.orderNumber || orderData.order_number || "",
    ).trim();

    if (isQuickAction) {
      if (!["confirm", "cancel"].includes(action)) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid action" });
      }

      if (!/^01(0|1|2|5)\d{8}$/.test(phone) || !/^\d{4}$/.test(orderNumber)) {
        return res
          .status(400)
          .json({
            success: false,
            error: "Phone must be 11 digits and order number must be 4 digits",
          });
      }

      const label = action === "confirm" ? "تأكيد الطلب" : "إلغاء الطلب";
      const telegramText = `🔔 *${label}*
• رقم الهاتف: ${escapeMarkdownV2(phone)}
• رقم الطلب: ${escapeMarkdownV2(orderNumber)}`;

      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramText,
            parse_mode: "MarkdownV2",
          }),
        },
      );

      if (!telegramResponse.ok) {
        const telegramError = await telegramResponse.text();
        throw new Error(
          `Telegram ${telegramResponse.status}: ${telegramError}`,
        );
      }

      return res.status(200).json({
        success: true,
        message: `${label} sent successfully`,
      });
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
