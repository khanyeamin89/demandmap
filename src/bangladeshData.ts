import { District, TrendMetric, ForecastingPoint, PlatformBreakdown } from "./types";

export const DIVISIONS = [
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Sylhet",
  "Rangpur",
  "Mymensingh"
];

export const DISTRICTS: District[] = [
  // --- Rangpur Division ---
  { id: "panchagarh", name: "Panchagarh", englishName: "Panchagarh", banglaName: "পঞ্চগড়", division: "Rangpur", x: 25, y: 12, population: 1.1 },
  { id: "thakurgaon", name: "Thakurgaon", englishName: "Thakurgaon", banglaName: "ঠাকুরগাঁও", division: "Rangpur", x: 23, y: 16, population: 1.5 },
  { id: "dinajpur", name: "Dinajpur", englishName: "Dinajpur", banglaName: "দিনাজপুর", division: "Rangpur", x: 26, y: 22, population: 3.1 },
  { id: "nilphamari", name: "Nilphamari", englishName: "Nilphamari", banglaName: "নীলফামারী", division: "Rangpur", x: 32, y: 16, population: 1.9 },
  { id: "lalmonirhat", name: "Lalmonirhat", englishName: "Lalmonirhat", banglaName: "লালমনিরহাট", division: "Rangpur", x: 38, y: 15, population: 1.4 },
  { id: "kurigram", name: "Kurigram", englishName: "Kurigram", banglaName: "কুড়িগ্রাম", division: "Rangpur", x: 43, y: 18, population: 2.2 },
  { id: "rangpur", name: "Rangpur", englishName: "Rangpur", banglaName: "রংপুর", division: "Rangpur", x: 33, y: 20, population: 3.2 },
  { id: "gaibandha", name: "Gaibandha", englishName: "Gaibandha", banglaName: "গাইবান্ধা", division: "Rangpur", x: 38, y: 24, population: 2.5 },

  // --- Rajshahi Division ---
  { id: "joypurhat", name: "Joypurhat", englishName: "Joypurhat", banglaName: "জয়পুরহাট", division: "Rajshahi", x: 32, y: 29, population: 1.0 },
  { id: "bogra", name: "Bogra", englishName: "Bogra", banglaName: "বগুড়া", division: "Rajshahi", x: 37, y: 32, population: 3.7 },
  { id: "naogaon", name: "Naogaon", englishName: "Naogaon", banglaName: "নওগাঁ", division: "Rajshahi", x: 27, y: 32, population: 2.8 },
  { id: "nawabganj", name: "Nawabganj", englishName: "Nawabganj", banglaName: "নবাবগঞ্জ", division: "Rajshahi", x: 18, y: 36, population: 1.8 },
  { id: "rajshahi", name: "Rajshahi", englishName: "Rajshahi", banglaName: "রাজশাহী", division: "Rajshahi", x: 22, y: 41, population: 2.9 },
  { id: "natore", name: "Natore", englishName: "Natore", banglaName: "নাটোর", division: "Rajshahi", x: 29, y: 40, population: 1.8 },
  { id: "sirajganj", name: "Sirajganj", englishName: "Sirajganj", banglaName: "সিরাজগঞ্জ", division: "Rajshahi", x: 40, y: 38, population: 3.4 },
  { id: "pabna", name: "Pabna", englishName: "Pabna", banglaName: "পাবনা", division: "Rajshahi", x: 32, y: 46, population: 2.7 },

  // --- Mymensingh Division ---
  { id: "sherpur", name: "Sherpur", englishName: "Sherpur", banglaName: "শেরপুর", division: "Mymensingh", x: 49, y: 26, population: 1.4 },
  { id: "jamalpur", name: "Jamalpur", englishName: "Jamalpur", banglaName: "জামালপুর", division: "Mymensingh", x: 45, y: 30, population: 2.5 },
  { id: "netrokona", name: "Netrokona", englishName: "Netrokona", banglaName: "নেত্রকোণা", division: "Mymensingh", x: 57, y: 28, population: 2.3 },
  { id: "mymensingh", name: "Mymensingh", englishName: "Mymensingh", banglaName: "ময়মনসিংহ", division: "Mymensingh", x: 52, y: 33, population: 5.6 },

  // --- Sylhet Division ---
  { id: "sunamganj", name: "Sunamganj", englishName: "Sunamganj", banglaName: "সুনামগঞ্জ", division: "Sylhet", x: 68, y: 28, population: 2.6 },
  { id: "sylhet", name: "Sylhet", englishName: "Sylhet", banglaName: "সিলেট", division: "Sylhet", x: 75, y: 31, population: 3.8 },
  { id: "moulvibazar", name: "Moulvibazar", englishName: "Moulvibazar", banglaName: "মৌলভীবাজার", division: "Sylhet", x: 76, y: 38, population: 2.1 },
  { id: "habiganj", name: "Habiganj", englishName: "Habiganj", banglaName: "হবিগঞ্জ", division: "Sylhet", x: 69, y: 39, population: 2.2 },

  // --- Dhaka Division ---
  { id: "tangail", name: "Tangail", englishName: "Tangail", banglaName: "টাঙ্গাইল", division: "Dhaka", x: 46, y: 42, population: 3.8 },
  { id: "kishoreganj", name: "Kishoreganj", englishName: "Kishoreganj", banglaName: "কিশোরগঞ্জ", division: "Dhaka", x: 60, y: 36, population: 3.1 },
  { id: "gazipur", name: "Gazipur", englishName: "Gazipur", banglaName: "গাজীপুর", division: "Dhaka", x: 52, y: 45, population: 3.5 },
  { id: "narsingdi", name: "Narsingdi", englishName: "Narsingdi", banglaName: "নরসিংদী", division: "Dhaka", x: 58, y: 46, population: 2.3 },
  { id: "manikganj", name: "Manikganj", englishName: "Manikganj", banglaName: "মানিকগঞ্জ", division: "Dhaka", x: 44, y: 50, population: 1.4 },
  { id: "dhaka", name: "Dhaka", englishName: "Dhaka", banglaName: "ঢাকা", division: "Dhaka", x: 50, y: 51, population: 14.7 },
  { id: "narayanganj", name: "Narayanganj", englishName: "Narayanganj", banglaName: "নারায়ণগঞ্জ", division: "Dhaka", x: 54, y: 52, population: 3.0 },
  { id: "munshiganj", name: "Munshiganj", englishName: "Munshiganj", banglaName: "মুন্সীগঞ্জ", division: "Dhaka", x: 52, y: 56, population: 1.5 },
  { id: "rajbari", name: "Rajbari", englishName: "Rajbari", banglaName: "রাজবাড়ী", division: "Dhaka", x: 38, y: 51, population: 1.1 },
  { id: "faridpur", name: "Faridpur", englishName: "Faridpur", banglaName: "ফরিদপুর", division: "Dhaka", x: 42, y: 56, population: 2.0 },
  { id: "madaripur", name: "Madaripur", englishName: "Madaripur", banglaName: "মাদারীপুর", division: "Dhaka", x: 47, y: 61, population: 1.2 },
  { id: "shariatpur", name: "Shariatpur", englishName: "Shariatpur", banglaName: "শরীয়তপুর", division: "Dhaka", x: 52, y: 61, population: 1.2 },
  { id: "gopalganj", name: "Gopalganj", englishName: "Gopalganj", banglaName: "গোপালগঞ্জ", division: "Dhaka", x: 41, y: 64, population: 1.3 },

  // --- Khulna Division ---
  { id: "kushtia", name: "Kushtia", englishName: "Kushtia", banglaName: "কুষ্টিয়া", division: "Khulna", x: 27, y: 49, population: 2.1 },
  { id: "meherpur", name: "Meherpur", englishName: "Meherpur", banglaName: "মেহেরপুর", division: "Khulna", x: 21, y: 51, population: 0.7 },
  { id: "chuadanga", name: "Chuadanga", englishName: "Chuadanga", banglaName: "চুয়াডাঙ্গা", division: "Khulna", x: 21, y: 55, population: 1.2 },
  { id: "jhenaidah", name: "Jhenaidah", englishName: "Jhenaidah", banglaName: "ঝিনাইদহ", division: "Khulna", x: 26, y: 56, population: 1.9 },
  { id: "magura", name: "Magura", englishName: "Magura", banglaName: "মাগুরা", division: "Khulna", x: 31, y: 57, population: 1.0 },
  { id: "jashore", name: "Jashore", englishName: "Jashore", banglaName: "যশোর", division: "Khulna", x: 27, y: 63, population: 2.9 },
  { id: "narail", name: "Narail", englishName: "Narail", banglaName: "নড়াইল", division: "Khulna", x: 33, y: 63, population: 0.8 },
  { id: "satkhira", name: "Satkhira", englishName: "Satkhira", banglaName: "সাতক্ষীরা", division: "Khulna", x: 24, y: 73, population: 2.1 },
  { id: "khulna", name: "Khulna", englishName: "Khulna", banglaName: "খুলনা", division: "Khulna", x: 30, y: 71, population: 2.5 },
  { id: "bagerhat", name: "Bagerhat", englishName: "Bagerhat", banglaName: "বাগেরহাট", division: "Khulna", x: 36, y: 73, population: 1.6 },

  // --- Barisal Division ---
  { id: "pirojpur", name: "Pirojpur", englishName: "Pirojpur", banglaName: "পিরোজপুর", division: "Barisal", x: 40, y: 69, population: 1.2 },
  { id: "jhalokati", name: "Jhalokati", englishName: "Jhalokati", banglaName: "ঝালকাঠি", division: "Barisal", x: 44, y: 70, population: 0.7 },
  { id: "barisal", name: "Barisal", englishName: "Barisal", banglaName: "বরিশাল", division: "Barisal", x: 47, y: 68, population: 2.5 },
  { id: "bhola", name: "Bhola", englishName: "Bhola", banglaName: "ভোলা", division: "Barisal", x: 55, y: 72, population: 1.9 },
  { id: "patuakhali", name: "Patuakhali", englishName: "Patuakhali", banglaName: "পটুয়াখালী", division: "Barisal", x: 48, y: 76, population: 1.7 },
  { id: "barguna", name: "Barguna", englishName: "Barguna", banglaName: "বরগুনা", division: "Barisal", x: 44, y: 77, population: 1.0 },

  // --- Chittagong Division ---
  { id: "brahmanbaria", name: "Brahmanbaria", englishName: "Brahmanbaria", banglaName: "ব্রাহ্মণবাড়িয়া", division: "Chittagong", x: 62, y: 45, population: 3.1 },
  { id: "comilla", name: "Comilla", englishName: "Comilla", banglaName: "কুমিল্লা", division: "Chittagong", x: 64, y: 53, population: 5.6 },
  { id: "chandpur", name: "Chandpur", englishName: "Chandpur", banglaName: "চাঁদপুর", division: "Chittagong", x: 58, y: 58, population: 2.5 },
  { id: "lakshmipur", name: "Lakshmipur", englishName: "Lakshmipur", banglaName: "লক্ষ্মীপুর", division: "Chittagong", x: 60, y: 66, population: 1.9 },
  { id: "noakhali", name: "Noakhali", englishName: "Noakhali", banglaName: "নোয়াখালী", division: "Chittagong", x: 64, y: 67, population: 3.3 },
  { id: "feni", name: "Feni", englishName: "Feni", banglaName: "ফেনী", division: "Chittagong", x: 69, y: 62, population: 1.5 },
  { id: "chittagong", name: "Chittagong", englishName: "Chittagong", banglaName: "চট্টগ্রাম", division: "Chittagong", x: 75, y: 70, population: 8.2 },
  { id: "khagrachari", name: "Khagrachari", englishName: "Khagrachari", banglaName: "খাগড়াছড়ি", division: "Chittagong", x: 82, y: 61, population: 0.7 },
  { id: "rangamati", name: "Rangamati", englishName: "Rangamati", banglaName: "রাঙ্গামাটি", division: "Chittagong", x: 86, y: 66, population: 0.6 },
  { id: "bandarban", name: "Bandarban", englishName: "Bandarban", banglaName: "বান্দরবান", division: "Chittagong", x: 85, y: 78, population: 0.4 },
  { id: "coxsbazar", name: "Cox's Bazar", englishName: "Cox's Bazar", banglaName: "কক্সবাজার", division: "Chittagong", x: 81, y: 84, population: 2.5 }
];

export function getBaselineDemand(query: string = "All Product Trends"): {
  category: string;
  summary: string;
  nationalAverageDemand: number;
  divisionAverages: Record<string, number>;
  districtTrends: Record<string, TrendMetric>;
  forecasting: Record<string, ForecastingPoint[]>;
  platformBreakdown: PlatformBreakdown;
  seasonalAnalysis?: string;
  newsAnalysis?: string;
} {
  const normQuery = query.trim().toLowerCase();
  let category = "General Commerce";
  let summary = `Demand analysis for "${query}" across Bangladesh. High clusters in major urban cities (Dhaka, Chittagong, Sylhet), with specific e-commerce spikes.`;

  // Tailor categories based on standard trending queries
  if (normQuery.includes("cloth") || normQuery.includes("fashion") || normQuery.includes("saree") || normQuery.includes("dress") || normQuery.includes("kurti") || normQuery.includes("cotton") || normQuery.includes("panjabi")) {
    category = "Fashion & Apparel";
    summary = `Fashion demands remain high. Tangail saree, Jamdani, cotton Panjabis, and local boutique kurti brands are experiencing robust social media engagement on Facebook, mostly centered in Dhaka and Chittagong.`;
  } else if (normQuery.includes("food") || normQuery.includes("mango") || normQuery.includes("honey") || normQuery.includes("organic") || normQuery.includes("ghee") || normQuery.includes("grocer") || normQuery.includes("spices")) {
    category = "Agro-Food & Organic Items";
    summary = `Organic foods and regional specialties see peak demand. Rajshahi's mangoes, Sundarbans honey, and ghee are highly trending on social groups, fueled by a consumer shift toward pure, authentic local foods.`;
  } else if (normQuery.includes("phone") || normQuery.includes("gadget") || normQuery.includes("smartwatch") || normQuery.includes("watch") || normQuery.includes("mobile") || normQuery.includes("earbud")) {
    category = "Consumer Electronics & Gadgets";
    summary = `Budget smartphones, noise-canceling earbuds, and budget smartwatches are showing highly interactive demand on e-commerce, with huge search inquiries in urban zones.`;
  } else if (normQuery.includes("cosmetic") || normQuery.includes("skincare") || normQuery.includes("beauty") || normQuery.includes("makeup")) {
    category = "Beauty & Personal Care";
    summary = `K-beauty items, organic hair oils, and local herbal cosmetics see massive influencer-driven demand on Instagram and Facebook pages, centered heavily in Dhaka, Chittagong, and Sylhet.`;
  } else if (normQuery.includes("furniture") || normQuery.includes("decor") || normQuery.includes("craft") || normQuery.includes("clay") || normQuery.includes("jute")) {
    category = "Home & Craft Goods";
    summary = `Handicrafts, jute products, and traditional clay pottery items show rising interest, with export-oriented items also gaining local e-commerce presence in metropolitan areas.`;
  }

  // Create baseline demand scores for divisions
  const baseDivisionScores: Record<string, number> = {
    "Dhaka": 82,
    "Chittagong": 74,
    "Sylhet": 68,
    "Rajshahi": 62,
    "Khulna": 59,
    "Mymensingh": 54,
    "Rangpur": 52,
    "Barisal": 49
  };

  // Enhance division scores based on query keywords
  if (normQuery.includes("saree") || normQuery.includes("tangail")) {
    baseDivisionScores["Dhaka"] += 12; // Tangail is in Dhaka division
  }
  if (normQuery.includes("mango") || normQuery.includes("rajshahi")) {
    baseDivisionScores["Rajshahi"] += 28;
    baseDivisionScores["Rangpur"] += 10;
  }
  if (normQuery.includes("tea") || normQuery.includes("sylhet")) {
    baseDivisionScores["Sylhet"] += 28;
  }
  if (normQuery.includes("honey") || normQuery.includes("sundarban") || normQuery.includes("fish")) {
    baseDivisionScores["Khulna"] += 25;
    baseDivisionScores["Barisal"] += 18;
  }
  if (normQuery.includes("beach") || normQuery.includes("tourism") || normQuery.includes("dry fish") || normQuery.includes("shutki")) {
    baseDivisionScores["Chittagong"] += 22; // Cox's Bazar / Chittagong specialty
  }

  // Normalize division scores between 20 and 98
  Object.keys(baseDivisionScores).forEach(div => {
    baseDivisionScores[div] = Math.max(15, Math.min(98, baseDivisionScores[div]));
  });

  const nationalAverageDemand = Math.round(
    Object.values(baseDivisionScores).reduce((a, b) => a + b, 0) / DIVISIONS.length
  );

  const districtTrends: Record<string, TrendMetric> = {};
  const forecasting: Record<string, ForecastingPoint[]> = {};

  DISTRICTS.forEach(dist => {
    const divScore = baseDivisionScores[dist.division];
    // Add some randomized yet localized variance
    let districtModifier = 0;
    
    // Major division capitals get high urban modifier
    if (["dhaka", "chittagong", "sylhet", "rajshahi", "khulna", "barisal", "rangpur", "mymensingh"].includes(dist.id)) {
      districtModifier += 12;
    }
    
    // Query specific district modifications
    if (normQuery.includes("mango") && dist.id === "rajshahi") districtModifier += 15;
    if (normQuery.includes("mango") && dist.id === "naogaon") districtModifier += 12;
    if (normQuery.includes("saree") && dist.id === "tangail") districtModifier += 25;
    if (normQuery.includes("cotton") && dist.id === "narsingdi") districtModifier += 15;
    if (normQuery.includes("tea") && dist.id === "moulvibazar") districtModifier += 18;
    if (normQuery.includes("honey") && dist.id === "satkhira") districtModifier += 15;
    if (normQuery.includes("leather") && dist.id === "dhaka") districtModifier += 10;

    // Apply seed-like pseudo-randomness based on string length to make it deterministic but diverse
    const rand = (dist.id.length * query.length) % 15 - 7;
    const finalDemand = Math.max(10, Math.min(100, Math.round(divScore + districtModifier + rand)));

    // E-commerce sales proxy, proportional to population and demand
    const salesModifier = dist.population > 5 ? 1.5 : dist.population > 2 ? 1.1 : 0.8;
    const commerceSales = Math.max(5, Math.min(100, Math.round(finalDemand * 0.8 * salesModifier + (rand % 5))));

    // Sentiment positive (60-95%)
    const sentiment = Math.max(55, Math.min(98, Math.round(75 + (rand % 15) + (finalDemand > 70 ? 5 : -5))));

    const topProduct = getTopProductForCategory(category, dist.id);

    districtTrends[dist.id] = {
      districtId: dist.id,
      demandIndex: finalDemand,
      searchVolume: Math.round(finalDemand * 1.2 + (rand % 10)),
      socialMentions: Math.round(finalDemand * 8.5 + (rand * 15)),
      sentimentPositive: sentiment,
      ecommerceSales: commerceSales,
      topECommerceProduct: topProduct,
      growthRate: parseFloat(( (finalDemand > 60 ? 5 : -2) + (rand % 8) / 2 ).toFixed(1))
    };

    // Generate 4-month forecasting points
    const forecastPoints: ForecastingPoint[] = [];
    const months = ["Jul", "Aug", "Sep", "Oct"];
    let currentIdx = finalDemand;
    months.forEach((m, i) => {
      const stepGrowth = districtTrends[dist.id].growthRate * (1 - i * 0.1); // decay or change
      currentIdx = Math.max(10, Math.min(100, Math.round(currentIdx * (1 + stepGrowth / 100))));
      const spread = 5 + i * 3;
      forecastPoints.push({
        month: m,
        demandIndex: currentIdx,
        confidenceInterval: [Math.max(0, currentIdx - spread), Math.min(100, currentIdx + spread)]
      });
    });
    forecasting[dist.id] = forecastPoints;
  });

  const platformBreakdown: PlatformBreakdown = {
    facebook: 45,
    instagram: 20,
    tiktok: 15,
    daraz: 12,
    localEcom: 8
  };

  // Adjust platform breakdown based on category
  if (category === "Fashion & Apparel") {
    platformBreakdown.facebook = 40;
    platformBreakdown.instagram = 35;
    platformBreakdown.tiktok = 10;
    platformBreakdown.daraz = 8;
    platformBreakdown.localEcom = 7;
  } else if (category === "Consumer Electronics & Gadgets") {
    platformBreakdown.facebook = 35;
    platformBreakdown.daraz = 30;
    platformBreakdown.instagram = 10;
    platformBreakdown.tiktok = 10;
    platformBreakdown.localEcom = 15;
  } else if (category === "Agro-Food & Organic Items") {
    platformBreakdown.facebook = 65;
    platformBreakdown.instagram = 10;
    platformBreakdown.tiktok = 5;
    platformBreakdown.daraz = 5;
    platformBreakdown.localEcom = 15;
  }

  let seasonalAnalysis = "Stable Year-Round demand with standard surges during the major festival seasons of Bangladesh (Eid-ul-Fitr and Eid-ul-Adha).";
  let newsAnalysis = "Local trade forums and e-commerce reports indicate standard retail movement with steady demand indices in metropolitan hubs.";

  if (category === "Fashion & Apparel") {
    seasonalAnalysis = "Peak demand observed during the pre-Eid seasons (Spring/Summer) and late Autumn wedding seasons. Traditional handlooms like Tangail and Jamdani experience up to a 180% surge in online boutiques.";
    newsAnalysis = "Recent local news highlights show a renewed consumer interest in 'Made in Bangladesh' sustainable fabrics. Weaver community incentives in Tangail and Sirajganj have boosted production supply and stabilized retail pricing on major F-commerce pages.";
  } else if (category === "Agro-Food & Organic Items") {
    if (normQuery.includes("mango")) {
      seasonalAnalysis = "Highly seasonal Summer (Grishma - May to July) Peak. Demand surges exponentially during the harvesting months, dropping to near-zero in winter.";
      newsAnalysis = "Local news reports favorable dry heat in Rajshahi and Chapainawabganj, leading to a high-yield sweet mango harvest, driving down transport prices and boosting bulk Daraz and Chaldaal delivery volumes.";
    } else {
      seasonalAnalysis = "Peak demand during the winter months (Sharat & Sheet) for products like organic honey, date palm jaggery, and mustard oil, aligning with traditional home baking and pitha-making.";
      newsAnalysis = "Local agricultural news spotlights organic certification initiatives in the Sundarbans and Sylhet, encouraging rising f-commerce organic vendors to expand their regional delivery networks.";
    }
  } else if (category === "Consumer Electronics & Gadgets") {
    seasonalAnalysis = "Steady demand throughout the year, with notable sales peaks during Year-End campaigns (11.11, 12.12) on Daraz BD and early-year student back-to-school periods.";
    newsAnalysis = "Recent national budget announcements on electronics import duties have increased demand for refurbished workstation laptops and budget TWS devices as cost-saving alternatives for freelancers.";
  } else if (category === "Beauty & Personal Care") {
    seasonalAnalysis = "Winter season triggers high demand for intensive cold creams and heavy skin moisturizers, whereas Summer sees a spike in oil-control face washes, soothing gels, and sunscreens.";
    newsAnalysis = "Local skincare influencer campaigns on TikTok have driven a 40% surge in inquiries for authentic import items, pushing f-commerce merchants to secure direct channels from Korea and Japan.";
  } else {
    if (normQuery.includes("tea")) {
      seasonalAnalysis = "High demand during the rainy Monsoon (Barsha) and cool Winter seasons, as warm tea consumption surges across local stalls and urban households.";
      newsAnalysis = "News of increased labor productivity and fresh plucking in Sreemangal tea estates has improved top-grade leaf supply, driving up specialized tea brand searches.";
    } else if (normQuery.includes("fan") || normQuery.includes("cooling")) {
      seasonalAnalysis = "Intense Summer (Grishma) peak demand. Extreme heatwaves in metropolitan areas drive rechargeable fan sales to record highs.";
      newsAnalysis = "Ongoing load-shedding reports and regional humidity spikes have caused stockouts of portable rechargeable fans on Daraz, with local f-commerce sellers sourcing emergency imports.";
    }
  }

  return {
    category,
    summary,
    nationalAverageDemand,
    divisionAverages: baseDivisionScores,
    districtTrends,
    forecasting,
    platformBreakdown,
    seasonalAnalysis,
    newsAnalysis
  };
}

function getTopProductForCategory(category: string, districtId: string): string {
  if (category === "Fashion & Apparel") {
    if (districtId === "tangail") return "Traditional Handloom Tangail Saree";
    if (districtId === "dhaka") return "Designer Cotton Jamdani Saree";
    if (districtId === "narsingdi") return "Cotton Lungi & Panjabi Fabrics";
    return "Sree Mangal Cotton Fabrics & Dresses";
  }
  if (category === "Agro-Food & Organic Items") {
    if (districtId === "rajshahi" || districtId === "naogaon" || districtId === "bogra") return "Premium Rajshahi Gopalbhog Mangoes";
    if (districtId === "satkhira" || districtId === "bagerhat") return "Pure Sundarban Honey";
    if (districtId === "sylhet" || districtId === "moulvibazar") return "Sreemangal CTC Tea Leaves";
    if (districtId === "bogra") return "Famous Bogra Mishti Doi (Sweet Curd)";
    return "Organic Mustard Oil & Local Ghee";
  }
  if (category === "Consumer Electronics & Gadgets") {
    if (districtId === "dhaka" || districtId === "chittagong") return "Noise Cancelling Earbuds (TWS)";
    return "Budget Fitness Tracker Smartwatch";
  }
  if (category === "Beauty & Personal Care") {
    return "Herbal Hair Care Oil & Korean Clay Mask";
  }
  return "Premium Local Leather Accessories";
}
