function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "instant" });
}

// Delivery Cost Constant
const DELIVERY_FEE = 5;

const products = [
  // 📚 كشاكيل و كراسات
  {
    id: "p1",
    category: "كشاكيل و كراسات",
    isActive: true,
    maxQty: 6,
    name: "كشكول 60 ورقة (دستة)",
    price: 59,
    oldPrice: 72,
    image: "./image/كشاكيل و كراسات/كشكول 60.webp",
    description: "كشكول ورق عالي الجودة - سعر الدستة.",
  },
  {
    id: "p2",
    category: "كشاكيل و كراسات",
    isActive: true,
    maxQty: 6,
    name: "كشكول 80 ورقة (دستة)",
    price: 78,
    oldPrice: 95,
    image: "./image/كشاكيل و كراسات/كشكول 80.webp",
    description: "كشكول ورق فاخر - سعر الدستة.",
  },
  {
    id: "p3",
    category: "كشاكيل و كراسات",
    isActive: true,
    maxQty: 6,
    name: "كشكول سلك صغير 60 ورقة",
    price: 12,
    oldPrice: 15,
    image: "./image/كشاكيل و كراسات/سلك صغير 60.webp",
    description: "كشكول سلك مقاس صغير 60 ورقة.",
  },
  {
    id: "p4",
    category: "كشاكيل و كراسات",
    isActive: true,
    maxQty: 6,
    name: "كشكول سلك صغير 60 ورقة (غلاف مقوى)",
    price: 12,
    oldPrice: 15,
    image: "./image/كشاكيل و كراسات/سلك صغير 60 ورقة.webp",
    description: "كشكول سلك صغير بغلاف مقوى خامة متينة.",
  },
  {
    id: "p5",
    category: "كشاكيل و كراسات",
    isActive: true,
    maxQty: 6,
    name: "كشكول سلك صغير 80 ورقة",
    price: 15,
    oldPrice: 18,
    image: "./image/كشاكيل و كراسات/سلك صغير 80.webp",
    description: "كشكول سلك مقاس صغير 80 ورقة.",
  },
  {
    id: "p6",
    category: "كشاكيل و كراسات",
    isActive: true,
    maxQty: 6,
    name: "كشكول صغير 60 ورقة",
    price: 6,
    oldPrice: 7.5,
    image: "./image/كشاكيل و كراسات/كشكول صغير 60.webp",
    description: "كشكول حجم صغير 60 ورقة.",
  },
  {
    id: "p7",
    category: "كشاكيل و كراسات",
    isActive: true,
    maxQty: 6,
    name: "كشكول صغير 80 ورقة",
    price: 8,
    oldPrice: 9,
    image: "./image/كشاكيل و كراسات/كشكول صغير 80.webp",
    description: "كشكول حجم صغير 80 ورقة.",
  },
  {
    id: "p8",
    category: "كشاكيل و كراسات",
    isActive: true,
    maxQty: 6,
    name: "كشكول كبير 80 ورقة",
    price: 20,
    oldPrice: 24,
    image: "./image/كشاكيل و كراسات/كشكول كبير 80.webp",
    description: "كشكول مقاس كبير 80 ورقة.",
  },
  {
    id: "p9",
    category: "كشاكيل و كراسات",
    isActive: true,
    maxQty: 6,
    name: "كراسة كبيرة 80 ورقة",
    price: 24,
    oldPrice: 28,
    image: "./image/كشاكيل و كراسات/كراسة كبير 80.webp",
    description: "كراسة حجم كبير 80 ورقة ورق أبيض ممتاز.",
  },
  {
    id: "p10",
    category: "كشاكيل و كراسات",
    isActive: true,
    maxQty: 6,
    name: "كراس إيطالي 80 ورقة",
    price: 20,
    oldPrice: 24.,
    image: "./image/كشاكيل و كراسات/كشكول إيطالي 80.webp",
    description: "كراس إيطالي فاخر 80 ورقة.",
  },
  {
    id: "p11",
    category: "كشاكيل و كراسات",
    isActive: true,
    maxQty: 6,
    name: "كشكول سلك 80 ورقة كبير",
    price: 27.5,
    oldPrice: 34,
    image: "./image/كشاكيل و كراسات/كشكول سلك 80.webp",
    description: "كشكول سلك حجم كبير 80 ورقة.",
  },
  {
    id: "p12",
    category: "كشاكيل و كراسات",
    isActive: true,
    maxQty: 6,
    name: "كشكول سلك 100 ورقة",
    price: 31,
    oldPrice: 40,
    image: "./image/كشاكيل و كراسات/كشكول سلك 100.webp",
    description: "كشكول سلك حجم كبير 100 ورقة.",
  },
  {
    id: "p13",
    category: "كشاكيل و كراسات",
    isActive: true,
    maxQty: 4,
    name: "كراسة رسم بياني",
    price: 7,
    oldPrice: 10,
    image: "./image/كشاكيل و كراسات/كراسة رسم بياني.webp",
    description: "كراسة مربعات رسم بياني مخصصة للرياضيات والهندسة.",
  },

  // 🎨 أدوات الرسم
  {
    id: "p14",
    category: "أدوات الرسم",
    isActive: true,
    maxQty: 6,
    name: "ألوان خشب صغير",
    price: 9,
    oldPrice: 12,
    image: "./image/أدوات الرسم/ألوان خشب صغير.webp",
    description: "علبة ألوان خشبية حجم صغير.",
  },
  {
    id: "p15",
    category: "أدوات الرسم",
    isActive: true,
    maxQty: 6,
    name: "علبة ألوان خشب كبير",
    price: 13.5,
    oldPrice: 17,
    image: "./image/أدوات الرسم/علبة ألوان خشب كبير.webp",
    description: "علبة ألوان خشبية حجم كبير ألوان زاهية.",
  },
  {
    id: "p16",
    category: "أدوات الرسم",
    isActive: true,
    maxQty: 6,
    name: "كراسة رسم صغيرة",
    price: 3.5,
    oldPrice: 5,
    image: "./image/أدوات الرسم/رسم صغير.webp",
    description: "كراسة رسم حجم صغير للطلاب.",
  },
  {
    id: "p17",
    category: "أدوات الرسم",
    isActive: true,
    maxQty: 6,
    name: "كراسة رسم كبيرة",
    price: 6.5,
    oldPrice: 9,
    image: "./image/أدوات الرسم/رسم كبير.webp",
    description: "كراسة رسم حجم كبير ورق متين.",
  },
  {
    id: "p18",
    category: "أدوات الرسم",
    isActive: true,
    maxQty: 6,
    name: "مسطرة شفاف",
    price: 2,
    oldPrice: 3,
    image: "./image/أدوات الرسم/مسطرة شفاف.webp",
    description: "مسطرة مدرجة شفافة عالية الدقة.",
  },
  {
    id: "p19",
    category: "أدوات الرسم",
    isActive: true,
    maxQty: 6,
    name: "مسطرة ملون",
    price: 1.5,
    oldPrice: 2.5,
    image: "./image/أدوات الرسم/مسطرة ملون.webp",
    description: "مسطرة بلاستيك مرنة وملونة.",
  },
  {
    id: "p20",
    category: "أدوات الرسم",
    isActive: true,
    maxQty: 2,
    name: "دستة مسطرة شفاف",
    price: 40,
    oldPrice: 48,
    image: "./image/أدوات الرسم/دستة مسطرة شفاف.webp",
    description: "عبوة تحتوي على 24 مسطرة شفافة.",
  },
  {
    id: "p21",
    category: "أدوات الرسم",
    isActive: true,
    maxQty: 2,
    name: "دستة مسطرة ملون",
    price: 30,
    oldPrice: 36,
    image: "./image/أدوات الرسم/دستة مسطرة ملون.webp",
    description: "عبوة تحتوي على 24 مسطرة ملونة متينة.",
  },

  // ✏️ أقلام و أدوات مكتبية
  {
    id: "p22",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "أستيكة صغير",
    price: 0.75,
    oldPrice: 1.25,
    image: "./image/أقلام و أدوات مكتبية/أستيكة صغير.webp",
    description: "ممحاة ناعمة مسح نظيف بدون أثر.",
  },
  {
    id: "p23",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "أستيكة مستطيل",
    price: 1.25,
    oldPrice: 1.75,
    image: "./image/أقلام و أدوات مكتبية/أستيكة مستطيل.webp",
    description: "ممحاة كبيرة عالية الجودة.",
  },
  {
    id: "p24",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 3,
    name: "علبة أستيكة صغير 60 قطعة",
    price: 38,
    oldPrice: 45,
    image: "./image/أقلام و أدوات مكتبية/علبة أستيكة صغير.webp",
    description: "علبة ممحاة حجم صغير بسعر الجملة.",
  },
  {
    id: "p25",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 1,
    name: "علبة أستيكة مستطيل 72 قطعة",
    price: 80,
    oldPrice: 90,
    image: "./image/أقلام و أدوات مكتبية/علبة أستيكة مستطيل.webp",
    description: "علبة أستيكة كبيرة مستطيلة خامة ممتازة.",
  },
  {
    id: "p26",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 10,
    name: "براية صغيرة",
    price: 1.5,
    oldPrice: 2.5,
    image: "./image/أقلام و أدوات مكتبية/براية.webp",
    description: "براية معدنية حادة وقوية.",
  },
  {
    id: "p27",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "براية دائرة",
    price: 1.5,
    oldPrice: 2.5,
    image: "./image/أقلام و أدوات مكتبية/براية دائرة.webp",
    description: "براية بلاستيك شكل دائري بمخزن.",
  },
  {
    id: "p28",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "براية مستطيل",
    price: 3.5,
    oldPrice: 4.5,
    image: "./image/أقلام و أدوات مكتبية/براية مستطيل.webp",
    description: "براية بمخزن شكل مستطيل.",
  },
  {
    id: "p29",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 1,
    name: "علبة براية 80 قطعة",
    price: 110,
    oldPrice: 120,
    image: "./image/أقلام و أدوات مكتبية/علبة براية 80 قطعة.webp",
    description: "عبوة اقتصادية تحتوي على 80 براية.",
  },
  {
    id: "p30",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 1,
    name: "علبة براية دائرة 80 قطعة",
    price: 110,
    oldPrice: 120,
    image: "./image/أقلام و أدوات مكتبية/علبة براية دائرة 80 قطعة.webp",
    description: "عبوة براية دائرة بمخزن 80 قطعة.",
  },
  {
    id: "p31",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "علبة براية مستطيل 48 قطعة",
    price: 150,
    oldPrice: 168,
    image: "./image/أقلام و أدوات مكتبية/علبة براية مستطيل.webp",
    description: "علبة براية مستطيلة بمخزن بسعر الجملة.",
  },
  {
    id: "p32",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 12,
    name: "تكت أسماء",
    price: 1,
    oldPrice: 1.5,
    image: "./image/أقلام و أدوات مكتبية/تكت.webp",
    description: "ملصقات أسماء للكراسات والكتب.",
  },
  {
    id: "p33",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "جلاد كراسات (10 وحدات)",
    price: 11,
    oldPrice: 13.5,
    image: "./image/أقلام و أدوات مكتبية/جلاد.webp",
    description: "باكت يحتوي على 10 وحدات جلاد شفاف للحماية.",
  },
  {
    id: "p34",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "صمغ سائل شفاف",
    price: 5.5,
    oldPrice: 7,
    image: "./image/أقلام و أدوات مكتبية/صغ سائل شفاف.webp",
    description: "صمغ سائل شفاف قوي وسريع الجفاف.",
  },
  {
    id: "p35",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "صمغ روج",
    price: 5.5,
    oldPrice: 7,
    image: "./image/أقلام و أدوات مكتبية/صمغ روج.webp",
    description: "صمغ أصبع جاف وسهل الاستخدام.",
  },
  {
    id: "p36",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "صمغ سائل",
    price: 5.5,
    oldPrice: 7,
    image: "./image/أقلام و أدوات مكتبية/صمغ سائل.webp",
    description: "أنبوب صمغ سائل مخصص للأوراق والأعمال اليدوية.",
  },
  {
    id: "p37",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 2,
    name: "علبة صمغ روج 24 قطعة",
    price: 120,
    oldPrice: 132,
    image: "./image/أقلام و أدوات مكتبية/علبة صمغ روج.webp",
    description: "علبة صمغ روج كبير بسعر اقتصادية.",
  },
  {
    id: "p38",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "علبة صمغ سائل 24 قطعة",
    price: 120,
    oldPrice: 132,
    image: "./image/أقلام و أدوات مكتبية/علبة صمغ سائل.webp",
    description: "علبة صمغ سائل متكاملة للجملة.",
  },
  {
    id: "p39",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "طقم أدوات هندسية",
    price: 38.5,
    oldPrice: 45,
    image: "./image/أقلام و أدوات مكتبية/طقم هندسي.webp",
    description: "علبة أدوات هندسية متكاملة للطلاب.",
  },
  {
    id: "p40",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "قلم جاف أحمر",
    price: 4,
    oldPrice: 5,
    image: "./image/أقلام و أدوات مكتبية/قلم جاف أحمر.webp",
    description: "قلم جاف لون أحمر كتابة سلسة.",
  },
  {
    id: "p41",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "قلم جاف أزرق",
    price: 4,
    oldPrice: 5,
    image: "./image/أقلام و أدوات مكتبية/قلم جاف أزرق.webp",
    description: "قلم جاف لون أزرق كتابة واضحة.",
  },
  {
    id: "p42",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "قلم جاف أسود",
    price: 4,
    oldPrice: 5,
    image: "./image/أقلام و أدوات مكتبية/قلم جاف أسود.webp",
    description: "قلم جاف لون أسود ممتاز.",
  },
  {
    id: "p43",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "علبة قلم جاف أحمر (روتو)",
    price: 38,
    oldPrice: 46.5,
    image: "./image/أقلام و أدوات مكتبية/علبة قلم جاف أحمر.webp",
    description: "عبوة أقلام جاف روتو لون أحمر.",
  },
  {
    id: "p44",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "قلم جاف روتو (عبوة أزرق)",
    price: 38,
    oldPrice: 46.5,
    image: "./image/أقلام و أدوات مكتبية/علبة قلم جاف أزرق.webp",
    description: "عبوة أقلام جاف روتو كتابة سلسة لون أزرق.",
  },
  {
    id: "p45",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "علبة قلم جاف أسود (روتو)",
    price: 38,
    oldPrice: 46.5,
    image: "./image/أقلام و أدوات مكتبية/علبة قلم جاف أسود.webp",
    description: "عبوة أقلام جاف روتو لون أسود.",
  },
  {
    id: "p46",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "قلم رصاص (عبوة 12 قطعة)",
    price: 15,
    oldPrice: 18.5,
    image: "./image/أقلام و أدوات مكتبية/علبة قلم رصاص 12 قطعة.webp",
    description: "عبوة أقلام رصاص ممتازة للرسم والكتابة.",
  },
  {
    id: "47",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "قلم سبورة أحمر",
    price: 8,
    oldPrice: 10,
    image: "./image/أقلام و أدوات مكتبية/قلم سبورة أسود.webp",
    description: "قلم سبورة مسح سريع لون أسود.",
  },
  {
    id: "48",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "قلم سبورة أزرق",
    price: 8,
    oldPrice: 10,
    image: "./image/أقلام و أدوات مكتبية/قلم سبورة أسود.webp",
    description: "قلم سبورة مسح سريع لون أسود.",
  },
  {
    id: "p47",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "قلم سبورة أسود",
    price: 8,
    oldPrice: 10,
    image: "./image/أقلام و أدوات مكتبية/قلم سبورة أسود.webp",
    description: "قلم سبورة مسح سريع لون أسود.",
  },
  {
    id: "p48",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "علبة قلم سبورة أحمر",
    price: 94,
    oldPrice: 115,
    image: "./image/أقلام و أدوات مكتبية/علبة قلم سبورة أحمر.webp",
    description: "عبوة أقلام سبورة روتو أحمر عالي الجودة.",
  },
  {
    id: "p49",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "علبة قلم سبورة أزرق",
    price: 94,
    oldPrice: 115,
    image: "./image/أقلام و أدوات مكتبية/علبة قلم سبورة أزرق.webp",
    description: "عبوة أقلام سبورة روتو أزرق عالي الجودة.",
  },
  {
    id: "p50",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "قلم سبورة روتو (علبة أسود)",
    price: 94,
    oldPrice: 115,
    image: "./image/أقلام و أدوات مكتبية/علبة قلم سبورة أسود.webp",
    description: "عبوة أقلام سبورة روتو عالي الجودة لون أسود.",
  },
  {
    id: "p51",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "قلم كوريكتور",
    price: 7,
    oldPrice: 8.5,
    image: "./image/أقلام و أدوات مكتبية/كوركتير.webp",
    description: "قلم تصحيح جاف لتغطية فورية.",
  },
  {
    id: "p52",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 4,
    name: " علبة كوركتير 12 قطعة",
    price: 75,
    oldPrice: 84,
    image: "./image/أقلام و أدوات مكتبية/علبة كوركتير.webp",
    description: "علبة أقلام تصحيح جاف بسعر الجملة.",
  },
  {
    id: "p53",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "قلم مظهر (هايلتر دستة)",
    price: 25,
    oldPrice: 40,
    image: "./image/أقلام و أدوات مكتبية/هايلتر.webp",
    description: "قلم تحديد نيون فسفوري للكتب والملاحظات.",
  },
  {
    id: "53",
    category: "أقلام و أدوات مكتبية",
    isActive: true,
    maxQty: 6,
    name: "قلم مظهر (هايلتر واحدة)",
    price: 8,
    oldPrice: 10,
    image: "./image/أقلام و أدوات مكتبية/هايلتر.webp",
    description: "قلم تحديد نيون فسفوري للكتب والملاحظات.",
  },

  // 🍱 لانشبوك و زمزمية
  {
    id: "p54",
    category: "لانشبوك و زمزمية",
    isActive: true,
    maxQty: 6,
    name: "زمزمية",
    price: 25,
    oldPrice: 30,
    image: "./image/لانشبوك و زمزمية/زمزمية.webp",
    description: "زجاجة مياه صحية للمدرسة.",
  },
  {
    id: "p55",
    category: "لانشبوك و زمزمية",
    isActive: true,
    maxQty: 4,
    name: "لانش بوكس فقط",
    price: 40,
    oldPrice: 50,
    image: "./image/لانشبوك و زمزمية/لانشبوكس.webp",
    description: "وعاء حفظ طعام مخصص للمدرسة مقاوِم للتسريب.",
  },
  {
    id: "p56",
    category: "لانشبوك و زمزمية",
    isActive: true,
    maxQty: 3,
    name: "لانش بوكس طقم (أزرق)",
    price: 57,
    oldPrice: 70,
    image: "./image/لانشبوك و زمزمية/لانشبوكس طقم  أزرق.webp",
    description: "طقم متكامل لانش بوكس مع زمزمية طقم أزرق.",
  },
  {
    id: "p57",
    category: "لانشبوك و زمزمية",
    isActive: true,
    maxQty: 3,
    name: "لانش بوكس طقم (أخضر)",
    price: 57,
    oldPrice: 70,
    image: "./image/لانشبوك و زمزمية/لانشبوكس طقم أخضر.webp",
    description: "طقم متكامل لانش بوكس مع زمزمية طقم أخضر.",
  },
  {
    id: "p58",
    category: "لانشبوك و زمزمية",
    isActive: true,
    maxQty: 3,
    name: "لانش بوكس طقم (بمبي)",
    price: 57,
    oldPrice: 70,
    image: "./image/لانشبوك و زمزمية/لانشبوكس طقم بنبي.webp",
    description: "طقم متكامل لانش بوكس مع زمزمية طقم بمبي.",
  },

  // 🎒 مقالم و شنط
  {
    id: "p59",
    category: "مقالم و شنط",
    isActive: true,
    maxQty: 6,
    name: "شنطة أديداس كبيرة",
    price: 180,
    oldPrice: 220,
    image: "./image/مقالم و شنط/شنطة أديدس كبير.webp",
    description: "شنطة مدرسية كبيرة متعددة الجيوب خامة ممتازة.",
  },
  {
    id: "p60",
    category: "مقالم و شنط",
    isActive: true,
    maxQty: 6,
    name: "شنطة بناتي وسط برتقالي",
    price: 135,
    oldPrice: 165,
    image: "./image/مقالم و شنط/شنطة بناتي وسط برتقالي.webp",
    description: "حقيبة مدرسية بناتي حجم وسط لون برتقالي.",
  },
  {
    id: "p61",
    category: "مقالم و شنط",
    isActive: true,
    maxQty: 6,
    name: "شنطة بناتي وسط",
    price: 135,
    oldPrice: 165,
    image: "./image/مقالم و شنط/شنطة بناتي وسط.webp",
    description: "حقيبة مدرسية متينة وعملية للبنات.",
  },
  {
    id: "p62",
    category: "مقالم و شنط",
    isActive: true,
    maxQty: 6,
    name: "شنط درس (بناتي)",
    price: 25.5,
    oldPrice: 31,
    image: "./image/مقالم و شنط/شنطة درس بناتي.webp",
    description: "حقيبة دروس خفيفة وعملية تصميم بناتي.",
  },
  {
    id: "p63",
    category: "مقالم و شنط",
    isActive: true,
    maxQty: 6,
    name: "شنط درس (ولادي)",
    price: 25.5,
    oldPrice: 31,
    image: "./image/مقالم و شنط/شنطة درس ولادي.webp",
    description: "حقيبة دروس خفيفة وعملية تصميم ولادي.",
  },
  {
    id: "p64",
    category: "مقالم و شنط",
    isActive: true,
    maxQty: 6,
    name: "شنطة صغيرة بناتي",
    price: 45,
    oldPrice: 55,
    image: "./image/مقالم و شنط/شنطة صغير بناتي.webp",
    description: "شنطة خفيفة للرحلات والأنشطة.",
  },
  {
    id: "p65",
    category: "مقالم و شنط",
    isActive: true,
    maxQty: 6,
    name: "شنطة ولادي كحلي وسط",
    price: 150,
    oldPrice: 183,
    image: "./image/مقالم و شنط/شنطة ولادي كحلي وسط.webp",
    description: "شنطة مدرسية خامة ممتازة لون كحلي.",
  },
  {
    id: "p66",
    category: "مقالم و شنط",
    isActive: true,
    maxQty: 6,
    name: "شنطة ولادي وسط",
    price: 150,
    oldPrice: 183,
    image: "./image/مقالم و شنط/شنطة ولادي وسط.webp",
    description: "حقيبة ظهر خامة عالية الجودة للطلاب.",
  },
  {
    id: "p67",
    category: "مقالم و شنط",
    isActive: true,
    maxQty: 6,
    name: "مقلمة صنف ثالث",
    price: 8,
    oldPrice: 12,
    image: "./image/مقالم و شنط/مقلمة صنف ثالث.webp",
    description: "مقلمة أنيقة بعدة جيوب.",
  },
];

// Cart State Object: { productId: quantity }
let cart = {};
let activeCategory = "all";
const categories = [
  "أدوات الرسم",
  "أقلام و أدوات مكتبية",
  "كشاكيل و كراسات",
  "لانشبوك و زمزمية",
  "مقالم و شنط",
];

// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
  renderCategoryMenu();
  renderProducts();
  updateCartUI();
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

function scrollBelowHeader(element) {
  const header = document.querySelector("header");
  const headerHeight = header ? header.offsetHeight : 0;
  const targetTop =
    element.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

  window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
}

function selectCategory(category) {
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
  const menuWrapper = document.getElementById("menuToggle").parentElement;

  if (!menuWrapper.contains(event.target)) closeCategoryMenu();
});

function renderProducts() {
  const container = document.getElementById("productsGrid");
  container.innerHTML = products
    .filter(
      (product) =>
        product.isActive &&
        (activeCategory === "all" || product.category === activeCategory),
    )
    .map((product) => {
      const qty = cart[product.id] || 0;
      return `
                    <div class="product-card bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between">
                        <div>
                            <div class="relative h-44 w-full bg-slate-100 overflow-hidden">
                                <img src="${product.image}" alt="${product.name} loading="lazy" onclick="openImageModal(this.src, this.alt)" onkeydown="if (event.key === 'Enter' || event.key === ' ') openImageModal(this.src, this.alt)" tabindex="0" role="button" onerror="this.onerror=null; this.src='https://placehold.co/400x300/e2e8f0/475569?text=صورة+المنتج'" class="product-image w-full h-full object-cover">
                                <span class="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-2">
                                  <span>${product.price.toFixed(2)} ج</span>
                                  <span class="text-slate-300 line-through font-normal">${product.oldPrice} ج</span>
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

  // Update specific element counter
  const qtyElement = document.getElementById(`qty-${productId}`);
  if (qtyElement) qtyElement.innerText = cart[productId] || 0;

  updateCartUI();
}

function updateCartUI() {
  let subtotal = 0;
  let totalItemsCount = 0;
  const cartItemsContainer = document.getElementById("cartSummaryList");

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
    cartItemsContainer.innerHTML = `<p class="text-slate-400 text-center py-4 text-xs">لم تقم بإضافة أي منتج بعد.</p>`;
  } else {
    cartItemsContainer.innerHTML = selectedItems
      .map(
        (item) => `
                    <div class="flex justify-between items-center py-2">
                        <img src="${item.image}" alt="${item.name}" class="w-10 h-10 rounded-lg object-cover bg-slate-100" onerror="this.onerror=null; this.src='https://placehold.co/80x80/e2e8f0/475569?text=صورة'">
                        <div class="flex-1 pr-1">
                            <p class="font-medium text-slate-800 text-xs line-clamp-1">${item.name}</p>
                            <p class="text-[10px] text-slate-400">${item.qty} × ${item.price.toFixed(2)} ج</p>
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

  // Send to Telegram API
  const isSuccess = await sendTelegramMessage(message);

  submitBtn.disabled = false;
  submitBtn.innerHTML = `<i class="fa-regular fa-paper-plane"></i> <span>تأكيد وإرسال الطلب</span>`;

  if (isSuccess) {
    // Reset Form and Cart
    cart = {};
    document.getElementById("orderForm").reset();
    renderProducts();
    updateCartUI();

    // Show Success Modal
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
async function sendTelegramMessage(textMessage) {
  try {
    const response = await fetch("/api/send-telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: textMessage }),
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
