function scrollToTop() {
  activeCategory = "all";
  searchQuery = "";

  const searchInput = document.getElementById("searchInput");
  const searchSuggestions = document.getElementById("searchSuggestions");
  if (searchInput) searchInput.value = "";
  if (searchSuggestions) searchSuggestions.innerHTML = "";

  closeSearch();
  closeCategoryMenu();
  document.getElementById("activeCategoryLabel").innerText = "كل الأقسام";
  renderCategoryMenu();
  renderProducts();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Delivery Cost Constant
const DELIVERY_FEE = 5;

let products = [];

// Cart State Object: { productId: quantity }
let cart = loadCart();
let activeCategory = "all";
let searchQuery = "";
let deferredInstallPrompt = null;
const categories = [
  "أدوات الرسم",
  "أقلام و أدوات مكتبية",
  "كشاكيل و كراسات",
  "لانشبوك و زمزمية",
  "مقالم و شنط",
];

// Initialize Page
document.addEventListener("DOMContentLoaded", async () => {
  registerServiceWorker();
  setupInstallPrompt();

  try {
    const response = await fetch("./products.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const loadedProducts = await response.json();
    if (!Array.isArray(loadedProducts)) {
      throw new Error("products.json must contain an array");
    }

    products = loadedProducts;
    renderCategoryMenu();
    renderProducts();
    updateCartUI();
  } catch (error) {
    console.error("Failed to load products:", error);
    document.getElementById("productsGrid").innerHTML =
      '<p class="sm:col-span-2 text-center text-rose-600 py-10">تعذر تحميل المنتجات حاليًا.</p>';
  }

  updateScrollProgress();
  window.addEventListener("scroll", updateScrollProgress, {
    passive: true,
  });
  window.addEventListener("resize", updateScrollProgress);
});

function renderCategoryMenu() {
  const menuItems = document.getElementById("categoryMenuItems");
  const allCategories = [
    { value: "all", label: "كل الأقسام" },
    ...categories.map((category) => ({
      value: category,
      label: category,
    })),
    { value: "order-summary", label: "ملخص الطلب" },
  ];

  if (!isAppInstalled()) {
    allCategories.push({ value: "install-app", label: "تثبيته كتطبيق" });
  }

  menuItems.innerHTML = allCategories
    .map(
      (category) => `
              <button type="button" onclick="selectCategory('${category.value}')" class="w-full text-right px-3 py-2 rounded-lg text-sm transition-colors ${activeCategory === category.value ? "bg-indigo-50 text-indigo-700 font-bold" : "hover:bg-slate-50 text-slate-700"}">
                ${category.label}
              </button>
            `,
    )
    .join("");
}

function toggleCategoryMenu() {
  const menu = document.getElementById("categoryMenu");
  const toggle = document.getElementById("menuToggle");
  const isOpening = menu.classList.contains("hidden");

  menu.classList.toggle("hidden", !isOpening);
  toggle.setAttribute("aria-expanded", String(isOpening));
  toggle.querySelector("i").className = isOpening
    ? "fa-solid fa-xmark"
    : "fa-solid fa-bars";
}

function closeCategoryMenu() {
  const menu = document.getElementById("categoryMenu");
  const toggle = document.getElementById("menuToggle");

  if (menu.classList.contains("hidden")) return;

  menu.classList.add("hidden");
  toggle.setAttribute("aria-expanded", "false");
  toggle.querySelector("i").className = "fa-solid fa-bars";
}

function normalizeSearchText(value) {
  return value
    .toLocaleLowerCase("ar")
    .normalize("NFKD")
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[إأآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .trim();
}

function loadCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem("shoppingCart") || "{}");
    return savedCart && typeof savedCart === "object" ? savedCart : {};
  } catch (error) {
    return {};
  }
}

function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

function clearCart() {
  cart = {};
  localStorage.removeItem("shoppingCart");
  renderProducts();
  updateCartUI();
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.error("Service worker registration failed:", error);
    });
  }
}

function isAppInstalled() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function setupInstallPrompt() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    renderCategoryMenu();
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    renderCategoryMenu();
  });
}

async function installApp() {
  closeCategoryMenu();

  if (!deferredInstallPrompt) {
    showToast("التثبيت غير متاح حاليًا من هذا المتصفح", "error");
    return;
  }

  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  renderCategoryMenu();
}

function toggleSearch() {
  const panel = document.getElementById("searchPanel");
  const toggle = document.getElementById("searchToggle");
  const isOpening = panel.classList.contains("hidden");

  panel.classList.toggle("hidden", !isOpening);
  toggle.setAttribute("aria-expanded", String(isOpening));
  toggle.querySelector("i").className = isOpening
    ? "fa-solid fa-xmark"
    : "fa-solid fa-magnifying-glass";

  if (isOpening) document.getElementById("searchInput").focus();
}

function closeSearch() {
  const panel = document.getElementById("searchPanel");
  const toggle = document.getElementById("searchToggle");

  if (panel.classList.contains("hidden")) return;

  panel.classList.add("hidden");
  toggle.setAttribute("aria-expanded", "false");
  toggle.querySelector("i").className = "fa-solid fa-magnifying-glass";
}

function handleSearchInput() {
  searchQuery = document.getElementById("searchInput").value.trim();
  renderSearchSuggestions();
  renderProducts();
}

function renderSearchSuggestions() {
  const container = document.getElementById("searchSuggestions");
  const normalizedQuery = normalizeSearchText(searchQuery);

  if (!normalizedQuery) {
    container.innerHTML = "";
    return;
  }

  const suggestions = products
    .filter(
      (product) =>
        product.isActive &&
        normalizeSearchText(product.name).includes(normalizedQuery),
    )
    .slice(0, 6);

  container.innerHTML = suggestions.length
    ? suggestions
        .map(
          (product) => `
            <button type="button" onclick="selectSearchSuggestion('${product.id}')" class="w-full text-right px-3 py-2 rounded-lg text-sm hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
              ${product.name}
            </button>
          `,
        )
        .join("")
    : '<p class="px-3 py-2 text-xs text-slate-400">لا توجد منتجات مطابقة.</p>';
}

function selectSearchSuggestion(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  searchQuery = product.name;
  document.getElementById("searchInput").value = product.name;
  closeSearch();
  renderProducts();
}

function scrollBelowHeader(element) {
  const header = document.querySelector("header");
  const headerHeight = header ? header.offsetHeight : 0;
  const targetTop =
    element.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

  window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
}

function selectCategory(category) {
  searchQuery = "";
  document.getElementById("searchInput").value = "";
  document.getElementById("searchSuggestions").innerHTML = "";
  closeSearch();

  if (category === "install-app") {
    installApp();
    return;
  }

  if (category === "order-summary") {
    closeCategoryMenu();
    scrollBelowHeader(document.getElementById("cartSummaryList"));
    return;
  }

  activeCategory = category;
  document.getElementById("activeCategoryLabel").innerText =
    category === "all" ? "كل الأقسام" : category;
  renderCategoryMenu();
  renderProducts();
  closeCategoryMenu();
  scrollBelowHeader(document.getElementById("productsGrid"));
}

document.addEventListener("click", (event) => {
  const menuWrapper = document.getElementById("menuWrapper");
  const searchWrapper = document.getElementById("searchWrapper");

  if (!menuWrapper.contains(event.target)) closeCategoryMenu();
  if (!searchWrapper.contains(event.target)) closeSearch();
});

function renderProducts() {
  const container = document.getElementById("productsGrid");
  container.innerHTML = products
    .filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
      const matchesSearch = normalizeSearchText(product.name).includes(
        normalizeSearchText(searchQuery),
      );
      return product.isActive && matchesCategory && matchesSearch;
    })
    .map((product) => {
      const qty = cart[product.id] || 0;
      const oldPrice = Number(product.oldPrice);
      const oldPriceMarkup =
        oldPrice > 0
          ? `<span class="text-slate-300 line-through font-normal">${oldPrice} ج</span>`
          : "";
      return `
                    <div class="product-card bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between">
                        <div>
                            <div class="relative h-44 w-full bg-slate-100 overflow-hidden">
                                <img src="${product.image}" alt="${product.name} loading="lazy" onclick="openImageModal(this.src, this.alt)" onkeydown="if (event.key === 'Enter' || event.key === ' ') openImageModal(this.src, this.alt)" tabindex="0" role="button" onerror="this.onerror=null; this.src='https://placehold.co/400x300/e2e8f0/475569?text=صورة+المنتج'" class="product-image w-full h-full object-cover">
                                <span class="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-2">
                                  <span>${product.price.toFixed(2)} ج</span>
                                  ${oldPriceMarkup}
                                </span>
                            </div>
                            <div class="p-4 space-y-1">
                              <span class="inline-block text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">${product.category}</span>
                                <h3 class="font-bold text-slate-900 text-sm leading-snug">${product.name}</h3>
                                <p class="text-xs text-slate-500 line-clamp-2">${product.description}</p>
                            </div>
                        </div>

                        <!-- Quantity Selector Control -->
                        <div class="p-4 pt-0 flex items-center justify-between">
                            <span class="text-xs font-semibold text-slate-400">الكمية (أقصى حد ${product.maxQty}):</span>
                            <div class="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                                <button type="button" onclick="changeQty('${product.id}', -1)" class="w-8 h-8 flex items-center justify-center bg-white text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-all font-bold text-sm">
                                    -
                                </button>
                                <span id="qty-${product.id}" class="w-10 text-center text-xs font-bold text-slate-800">
                                    ${qty}
                                </span>
                                <button type="button" onclick="changeQty('${product.id}', 1)" class="w-8 h-8 flex items-center justify-center bg-white text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-all font-bold text-sm">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                `;
    })
    .join("");

  if (!container.innerHTML) {
    container.innerHTML = `<p class="sm:col-span-2 text-center text-slate-400 py-10">لا توجد منتجات في هذا القسم حالياً.</p>`;
  }
}

function updateScrollProgress() {
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pageHeight > 0 ? window.scrollY / pageHeight : 0;
  document.getElementById("scrollProgress").style.transform =
    `scaleX(${Math.min(progress, 1)})`;
}

// Change Product Quantity with the product-specific maximum limit
function changeQty(productId, delta) {
  const product = products.find((item) => item.id === productId);
  const currentQty = cart[productId] || 0;
  const newQty = currentQty + delta;

  if (delta > 0 && newQty > product.maxQty) {
    showToast(
      `عفواً، الحد الأقصى لهذا المنتج هو ${product.maxQty} قطع!`,
      "error",
    );
    return;
  }

  if (newQty <= 0) {
    delete cart[productId];
  } else {
    cart[productId] = newQty;
  }

  saveCart();

  // Update specific element counter
  const qtyElement = document.getElementById(`qty-${productId}`);
  if (qtyElement) qtyElement.innerText = cart[productId] || 0;

  updateCartUI();
}

function updateCartUI() {
  let subtotal = 0;
  let totalItemsCount = 0;
  const cartItemsContainer = document.getElementById("cartSummaryList");
  const clearCartButton = document.getElementById("clearCartButton");

  const selectedItems = Object.keys(cart).map((id) => {
    const product = products.find((p) => p.id === id);
    const qty = cart[id];
    const itemTotal = product.price * qty;
    subtotal += itemTotal;
    totalItemsCount += qty;
    return { ...product, qty, itemTotal };
  });

  // Render Mini Cart List
  if (selectedItems.length === 0) {
    clearCartButton.classList.add("hidden");
    cartItemsContainer.innerHTML = `<p class="text-slate-400 text-center py-4 text-xs">لم تقم بإضافة أي منتج بعد.</p>`;
  } else {
    clearCartButton.classList.remove("hidden");
    cartItemsContainer.innerHTML = selectedItems
      .map(
        (item) => `
                    <div class="flex justify-between items-center py-2">
                        <img src="${item.image}" alt="${item.name}" loading="lazy" onclick="openImageModal(this.src, this.alt)" onkeydown="if (event.key === 'Enter' || event.key === ' ') openImageModal(this.src, this.alt)" tabindex="0" role="button" class="w-10 h-10 rounded-lg object-cover bg-slate-100 cursor-zoom-in" onerror="this.onerror=null; this.src='https://placehold.co/80x80/e2e8f0/475569?text=صورة'">
                        <div class="flex-1 pr-1">
                            <p class="font-medium text-slate-800 text-xs line-clamp-1">${item.name}</p>
                        <div class="flex items-center gap-1.5 mt-1">
                          <button type="button" onclick="changeQty('${item.id}', -1)" aria-label="إنقاص كمية ${item.name}" class="w-6 h-6 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-colors font-bold">−</button>
                          <span class="min-w-5 text-center text-[10px] font-bold text-slate-700">${item.qty}</span>
                          <button type="button" onclick="changeQty('${item.id}', 1)" aria-label="زيادة كمية ${item.name}" class="w-6 h-6 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-colors font-bold">+</button>
                          <span class="text-[10px] text-slate-400">× ${item.price.toFixed(2)} ج</span>
                        </div>
                        </div>
                        <div class="text-left font-bold text-slate-700 text-xs">
                            ${item.itemTotal.toFixed(2)} ج
                        </div>
                    </div>
                `,
      )
      .join("");
  }

  // Update Prices Breakdown
  const grandTotal = subtotal > 0 ? subtotal + DELIVERY_FEE : DELIVERY_FEE;

  document.getElementById("subtotalPrice").innerText =
    `${subtotal.toFixed(2)} ج`;
  document.getElementById("totalPrice").innerText =
    `${grandTotal.toFixed(2)} ج`;
}

async function handleOrderSubmit(event) {
  event.preventDefault();

  const selectedItemsKeys = Object.keys(cart);
  if (selectedItemsKeys.length === 0) {
    showToast("الرجاء اختيار منتج واحد على الأقل قبل إرسال الطلب", "error");
    return;
  }

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const notes = document.getElementById("customerNotes").value.trim();

  if (!/^01(0|1|2|5)\d{8}$/.test(phone)) {
    showToast(
      "أدخل رقم هاتف صحيحًا مكونًا من 11 رقمًا ويبدأ بـ 010 أو 011 أو 012 أو 015",
      "error",
    );
    return;
  }

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>جاري إرسال الطلب...</span>`;

  const orderNumber = generateOrderNumber();

  // Build Telegram Message (MarkdownV2 Formatted)
  let subtotal = 0;
  let itemsText = "";

  selectedItemsKeys.forEach((id, index) => {
    const product = products.find((p) => p.id === id);
    const qty = cart[id];
    const itemTotal = product.price * qty;
    subtotal += itemTotal;
    itemsText += `${index + 1}\\. *${escapeMarkdownV2(product.name)}*\n    └ الكمية: ${qty} \\| السعر: ${escapeMarkdownV2(itemTotal.toFixed(2))} ج\n`;
  });

  const grandTotal = subtotal + DELIVERY_FEE;
  const currentDate = new Date().toLocaleString("ar-SA");

  const message = `🛍️ *طلب جديد \\- جملة توشكى*
━━━━━━━━━━━━━━━━━━

🔢 *رقم الطلب:* \`${orderNumber}\`

👤 *بيانات العميل:*
• *الاسم:* ${escapeMarkdownV2(name)}

• *الهاتف:* \`${escapeMarkdownV2(phone)}\`

• *العنوان:* ${escapeMarkdownV2(address)}
${notes ? `• *ملاحظات:* ${escapeMarkdownV2(notes)}\n` : ""}

📦 *تفاصيل الأدوات المطلوبة:*
${itemsText}

💵 *الفاتورة المالية:*
• *مجموع المنتجات:* ${escapeMarkdownV2(subtotal.toFixed(2))} جنيه
• *خدمة التوصيل:* ${escapeMarkdownV2(DELIVERY_FEE)} جنيه

✨ *الإجمالي المطلوب سداده:* \`${escapeMarkdownV2(grandTotal.toFixed(2))} جنيه\`

━━━━━━━━━━━━━━━━━━


📅 *تاريخ الطلب:* ${escapeMarkdownV2(currentDate)}`;

  const orderItems = selectedItemsKeys.map((id) => {
    const product = products.find((item) => item.id === id);
    return {
      name: product.name,
      price: product.price,
      quantity: cart[id],
    };
  });

  // Send the complete order to the server so it can notify Telegram and Sheets.
  const isSuccess = await sendTelegramMessage({
    message,
    orderNumber,
    name,
    phone,
    address,
    notes,
    deliveryFee: DELIVERY_FEE,
    cart: orderItems,
  });

  submitBtn.disabled = false;
  submitBtn.innerHTML = `<i class="fa-regular fa-paper-plane"></i> <span>تأكيد وإرسال الطلب</span>`;

  if (isSuccess) {
    // Reset Form and Cart
    cart = {};
    document.getElementById("orderForm").reset();
    renderProducts();
    updateCartUI();

    // Show Success Modal
    document.getElementById("successOrderNumber").innerText = orderNumber;
    document.getElementById("successModal").classList.remove("hidden");
  }
}

function generateOrderNumber() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

function escapeMarkdownV2(value) {
  return String(value).replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}

// Send API Request to Telegram Bot using ENV variables
// إرسال الطلب إلى سيرفر Vercel الآمن بدلاً من التلجرام مباشرة
async function sendTelegramMessage(orderData) {
  try {
    const response = await fetch("/api/send-telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    if (result.success) {
      return true;
    } else {
      console.error("Server API Error:", result.error);
      showToast(
        `خطأ في الإرسال: ${result.error || "تعذر معالجة الطلب"}`,
        "error",
      );
      return false;
    }
  } catch (err) {
    console.error("Network Error:", err);
    showToast("تعذر الاتصال بالسيرفر. تحقق من شبكة الإنترنت", "error");
    return false;
  }
}

function closeSuccessModal() {
  document.getElementById("successModal").classList.add("hidden");
}

function openLocationModal() {
  const modal = document.getElementById("locationModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
}

function closeLocationModal(event) {
  if (event && event.target !== event.currentTarget) return;

  const modal = document.getElementById("locationModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
}

function openImageModal(imageSource, imageAlt) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");

  modalImage.src = imageSource;
  modalImage.alt = imageAlt;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
}

function closeImageModal(event) {
  if (event && event.target !== event.currentTarget) return;

  const modal = document.getElementById("imageModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
}

function openAboutModal() {
  const modal = document.getElementById("aboutModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("overflow-hidden");
}

function closeAboutModal(event) {
  if (event && event.target !== event.currentTarget) return;

  const modal = document.getElementById("aboutModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("overflow-hidden");
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeImageModal();
    closeLocationModal();
    closeAboutModal();
  }
});

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");

  const bgColor =
    type === "error"
      ? "bg-rose-600"
      : type === "success"
        ? "bg-emerald-600"
        : "bg-slate-800";
  const icon =
    type === "error"
      ? "fa-circle-exclamation"
      : type === "success"
        ? "fa-circle-check"
        : "fa-info-circle";

  toast.className = `pointer-events-auto ${bgColor} text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs max-w-sm transition-all duration-300 transform translate-y-2 opacity-0`;
  toast.innerHTML = `
                <i class="fa-solid ${icon} text-base"></i>
                <span class="flex-1">${message}</span>
            `;

  container.appendChild(toast);

  // Animate In
  setTimeout(() => {
    toast.classList.remove("translate-y-2", "opacity-0");
  }, 10);

  // Animate Out & Remove
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
