const common = {
  scheduleDep: {
    en_name: "Schedule",
    tc_name: "預定班次",
  },
};

const route = {
  506: {
    en_name: "Tuen Mun Ferry Pier to Siu Lun (Circular)",
    tc_name: "屯門碼頭至兆麟 (循環綫)",
  },
  K12: {
    en_name: "Tai Po Market Station to Eightland Garden",
    tc_name: "大埔墟站至八號花園",
  },
  K14: {
    en_name: "Tai Po Mega Mall to Tai Po Market Station",
    tc_name: "大埔超級城至大埔墟站",
  },
  K17: {
    en_name: "Tai Po Market Station to Fu Shin",
    tc_name: "大埔墟站至富善",
  },
  K18: {
    en_name: "Tai Po Market Station to Kwong Fuk",
    tc_name: "大埔墟站至廣福",
  },
  K51: {
    en_name: "Fu Tai to Tai Lam",
    tc_name: "富泰至大欖",
  },
  K52: {
    en_name: "Tuen Mun Station to Lung Kwu Tan",
    tc_name: "屯門站至龍鼓灘",
  },
  K52A: {
    en_name: "Tuen Mun Station to Tsang Tsui",
    tc_name: "屯門站至曾咀",
  },
  K53: {
    en_name: "Tuen Mun Station to So Kwun Wat (Circular)",
    tc_name: "屯門站至掃管笏 (循環綫)",
  },
  K58: {
    en_name: "Fu Tai to Castle Peak Bay",
    tc_name: "富泰至青山灣",
  },
  K65: {
    en_name: "Yuen Long Station to Lau Fau Shan",
    tc_name: "元朗站至流浮山",
  },
  K66: {
    en_name: "Long Ping to Tai Tong Wong Nai Tun Tsuen",
    tc_name: "朗屏至大棠黃泥墩村",
  },
  K65: {
    en_name: "Yuen Long Station to Lau Fau Shan",
    tc_name: "元朗站至流浮山",
  },
  K68: {
    en_name: "Yuen Long Industrial Estate to Yuen Long Park (Circular)",
    tc_name: "元朗工業邨至元朗公園 (循環綫)",
  },
  K73: {
    en_name: "Tin Heng to Yuen Long West",
    tc_name: "天恆至元朗西",
  },
  K74: {
    en_name: "Tin Shui to Au Tau (Circular)",
    tc_name: "天瑞至凹頭 (循環綫)",
  },
  K75A: {
    en_name: "Tin Shui Wai Station to Hung Shui Kiu (Circular)",
    tc_name: "天水圍站至洪水橋 (循環綫)",
  },
  K75P: {
    en_name: "Tin Shui to Hung Shui Kiu (Circular)",
    tc_name: "天瑞至洪水橋 (循環綫)",
  },
  K76: {
    en_name: "Tin Heng to Tin Shui Wai Station",
    tc_name: "天恆至天水圍站",
  },
};

const dest = {
  "K12_TPMS": {
    en_name: "to Tai Po Market Station",
    tc_name: "大埔墟站 方向",
  },
  "K12_EG": {
    en_name: "to Eightland Garden",
    tc_name: "八號花園 方向",
  },
}

const stops = {
  //route 506
  "506-U010": {
    tc_name: "屯門碼頭",
    en_name: "Tuen Mun Ferry Pier",
    lat: "22.372986",
    lon: "113.966502",
  },
  "506-U020": {
    tc_name: "美樂花園",
    en_name: "Melody Garden",
    lat: "22.375834",
    lon: "113.960628",
  },
  "506-U030": {
    tc_name: "輕鐵蝴蝶站",
    en_name: "LR Butterfly Stop",
    lat: "22.378364",
    lon: "113.961965",
  },
  "506-U040": {
    tc_name: "輕鐵車廠站",
    en_name: "Light Rail Depot Stop",
    lat: "22.382203",
    lon: "113.96359",
  },
  "506-U050": {
    tc_name: "輕鐵龍門站",
    en_name: "LR Lung Mun Stop",
    lat: "22.385399",
    lon: "113.965222",
  },
  "506-U060": {
    tc_name: "輕鐵青雲站",
    en_name: "LR Tsing Wun Stop",
    lat: "22.393627",
    lon: "113.96752",
  },
  "506-U070": {
    tc_name: "輕鐵建安站",
    en_name: "LR Kin On Stop",
    lat: "22.395064",
    lon: "113.969953",
  },
  "506-U080": {
    tc_name: "港鐵屯門站",
    en_name: "MTR Tuen Mun Station",
    lat: "22.394117",
    lon: "113.973992",
  },
  "506-U090": {
    tc_name: "屯門市中心",
    en_name: "Tuen Mun Town Centre",
    lat: "22.391352",
    lon: "113.975474",
  },
  "506-U100": {
    tc_name: "安定&#37032;",
    en_name: "On Ting Estate",
    lat: "22.387312",
    lon: "113.975341",
  },
  "506-U110": {
    tc_name: "輕鐵三聖站",
    en_name: "LR Sam Shing Stop",
    lat: "22.382916",
    lon: "113.976276",
  },
  "506-D010": {
    tc_name: "兆麟",
    en_name: "Siu Lun",
    lat: "22.38551",
    lon: "113.9767",
  },
  "506-D020": {
    tc_name: "友愛&#37032;",
    en_name: "Yau Oi Estate",
    lat: "22.387783",
    lon: "113.975189",
  },
  "506-D030": {
    tc_name: "輕鐵市中心站",
    en_name: "LR Town Centre Stop",
    lat: "22.392125",
    lon: "113.975128",
  },
  "506-D040": {
    tc_name: "輕鐵屯門站 (港鐵屯門站)",
    en_name: "LR Tuen Mun Stop (MTR Tuen Mun Station)",
    lat: "22.393937",
    lon: "113.973896",
  },
  "506-D050": {
    tc_name: "輕鐵建安站",
    en_name: "LR Kin On Stop",
    lat: "22.394687",
    lon: "113.970746",
  },
  "506-D060": {
    tc_name: "輕鐵青雲站",
    en_name: "LR Tsing Wun Stop",
    lat: "22.393382",
    lon: "113.967707",
  },
  "506-D070": {
    tc_name: "聖彼得堂",
    en_name: "SKH St. Peter's Church",
    lat: "22.391722",
    lon: "113.967726",
  },
  "506-D080": {
    tc_name: "富健花園",
    en_name: "Glorious Garden",
    lat: "22.383618",
    lon: "113.964478",
  },
  "506-D090": {
    tc_name: "新屯門中心",
    en_name: "Sun Tuen Mun Centre",
    lat: "22.382269",
    lon: "113.963833",
  },
  "506-D100": {
    tc_name: "輕鐵蝴蝶站",
    en_name: "LR Butterfly Stop",
    lat: "22.377547",
    lon: "113.961481",
  },
  "506-D110": {
    tc_name: "蝴蝶&#37032;蝶心樓",
    en_name: "Tip Sum House, Butterfly Estate",
    lat: "22.374219",
    lon: "113.962106",
  },
  "506-D120": {
    tc_name: "湖景&#37032;湖碧樓",
    en_name: "Wu Pik House, Wu King Estate",
    lat: "22.373549",
    lon: "113.964341",
  },
  "506-D130": {
    tc_name: "海翠花園",
    en_name: "Pierhead Garden",
    lat: "22.373192",
    lon: "113.966053",
  },
  "506-U011": {
    tc_name: "屯門碼頭",
    en_name: "Tuen Mun Ferry Pier",
    lat: "22.372986",
    lon: "113.966502",
  },
  //Route K12
  "K12-U010": {
    tc_name: "大埔墟站",
    en_name: "Tai Po Market Station",
    lat: "22.444414",
    lon: "114.169471",
  },
  "K12-U020": {
    tc_name: "大埔超級城",
    en_name: "Tai Po Mega Mall",
    lat: "22.450971",
    lon: "114.169957",
  },
  "K12-U030": {
    tc_name: "八號花園",
    en_name: "Eightland Garden",
    lat: "22.452836",
    lon: "114.166496",
  },
  "K12-D010": {
    tc_name: "八號花園",
    en_name: "Eightland Garden",
    lat: "22.452836",
    lon: "114.166496",
  },
  "K12-D020": {
    tc_name: "大埔超級城",
    en_name: "Tai Po Mega Mall",
    lat: "22.451278",
    lon: "114.170087",
  },
  "K12-D030": {
    tc_name: "新達廣場",
    en_name: "Uptown Plaza",
    lat: "22.443712",
    lon: "114.16991",
  },
  "K12-D040": {
    tc_name: "大埔墟站",
    en_name: "Tai Po Market Station",
    lat: "22.444414",
    lon: "114.169471",
  },
  //Route K14
  "K14-D010": {
    tc_name: "大埔超級城",
    en_name: "Tai Po Mega Mall",
    lat: "22.451278",
    lon: "114.170087",
  },
  "K14-D020": {
    tc_name: "新達廣場",
    en_name: "Uptown Plaza",
    lat: "22.443712",
    lon: "114.16991",
  },
  "K14-D030": {
    tc_name: "大埔墟站",
    en_name: "Tai Po Market Station",
    lat: "22.444414",
    lon: "114.169471",
  },
};

export default { common, route, stops, dest };
