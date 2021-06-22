const Common = {
  en: {
    UP: "Outbound",
    DOWN: "Inbound",
    arr: "Arriving",
    dep: "Departing",
    min: "min",
    etaAlert:
      "ETA information will be refresh every 10 seconds, reference data only.",
    autoBtnOn: "Auto swap",
    autoBtnOff: "Auto swap",
    line: "Line",
    stn: "Station",
    lastUpdate: "Last Update",
    eta: "ETA",
    to: "To ",
    plat: "Platform",
    defaultLine: "Urban Lines",
    saveF: "Save",
    saveT: "Saved",
    tmlInfo: "Tuen Ma Line will open on 27 June 2021.",
  },
  tc: {
    UP: "上行",
    DOWN: "下行",
    arr: "即將到達",
    dep: "正在離開",
    min: "分鐘",
    etaAlert: "到站時間資訊每10秒自動更新，資料只供參考。",
    autoBtnOn: "自動轉",
    autoBtnOff: "自動轉",
    line: "路線",
    stn: "站",
    lastUpdate: "最後更新",
    eta: "到站時間",
    to: "往",
    plat: "月台",
    defaultLine: "市區線",
    saveF: "儲存",
    saveT: "已儲存",
    tmlInfo: "屯馬線將於2021年6月27日通車",
  },
};

const MtrLines = {
  AEL: {
    tc_name: "機場快線",
    en_name: "Airport Express",
    stations: ["HOK", "KOW", "TSY", "AIR", "AWE"],
  },
  TCL: {
    tc_name: "東涌線",
    en_name: "Tung Chung Line",
    stations: ["HOK", "KOW", "OLY", "NAC", "LAK", "TSY", "SUN", "TUC"],
  },
  WRL: {
    tc_name: "西鐵線",
    en_name: "West Rail Line",
    stations: [
      "HUH",
      "ETS",
      "AUS",
      "NAC",
      "MEF",
      "TWW",
      "KSR",
      "YUL",
      "LOP",
      "TIS",
      "SIH",
      "TUM",
    ],
  },
  TKL: {
    tc_name: "將軍澳線",
    en_name: "Tseung Kwan O Line",
    stations: ["NOP", "QUB", "YAT", "TIK", "TKO", "LHP", "HAH", "POA"],
  },
  TML: {
    tc_name: "屯馬線",
    en_name: "Tuen Ma Line",
    stations: [
      "WKS",
      "MOS",
      "HEO",
      "TSH",
      "SHM",
      "CIO",
      "STW",
      "CKT",
      "TAW",
      "HIK",
      "DIH",
      "KAT",
      "SUW",
      "TKW",
      "HOM",
      "HUH",
      "ETS",
      "AUS",
      "NAC",
      "MEF",
      "TWW",
      "KSR",
      "YUL",
      "LOP",
      "TIS",
      "SIH",
      "TUM",
    ],
  },
};

const MtrStations = {
  HOK: {
    tc_name: "香港",
    en_name: "Hong Kong",
    lag: "",
    lon: "",
    active: "1",
  },
  KOW: {
    tc_name: "九龍",
    en_name: "Kowloon",
    lag: "",
    lon: "",
    active: "1",
  },
  TSY: {
    tc_name: "青衣",
    en_name: "Tsing Yi",
    lag: "",
    lon: "",
    active: "1",
  },
  AIR: {
    tc_name: "機場",
    en_name: "Airport",
    lag: "",
    lon: "",
    active: "1",
  },
  AWE: {
    tc_name: "博覽館",
    en_name: "AsiaWorld Expo",
    lag: "",
    lon: "",
    active: "1",
  },
  OLY: {
    tc_name: "奧運",
    en_name: "Olympic",
    lag: "",
    lon: "",
    active: "1",
  },
  NAC: {
    tc_name: "南昌",
    en_name: "Nam Cheong",
    lag: "",
    lon: "",
    active: "1",
  },
  LAK: {
    tc_name: "荔景",
    en_name: "Lai King",
    lag: "",
    lon: "",
    active: "1",
  },
  SUN: {
    tc_name: "欣澳",
    en_name: "Sunny Bay",
    lag: "",
    lon: "",
    active: "1",
  },
  TUC: {
    tc_name: "東涌",
    en_name: "Tung Chung",
    lag: "",
    lon: "",
    active: "1",
  },
  WKS: {
    tc_name: "烏溪沙",
    en_name: "Wu Kai Sha",
    lag: "",
    lon: "",
    active: "1",
  },
  MOS: {
    tc_name: "馬鞍山",
    en_name: "Ma On Shan",
    lag: "",
    lon: "",
    active: "1",
  },
  HEO: {
    tc_name: "恆安",
    en_name: "Heng On",
    lag: "",
    lon: "",
    active: "1",
  },
  TSH: {
    tc_name: "大水坑",
    en_name: "Tai Shui Hang",
    lag: "",
    lon: "",
    active: "1",
  },
  SHM: {
    tc_name: "石門",
    en_name: "Shek Mun",
    lag: "",
    lon: "",
    active: "1",
  },
  CIO: {
    tc_name: "第一城",
    en_name: "City One",
    lag: "",
    lon: "",
    active: "1",
  },
  STW: {
    tc_name: "沙田圍",
    en_name: "Sha Tin Wai",
    lag: "",
    lon: "",
    active: "1",
  },
  CKT: {
    tc_name: "車公廟",
    en_name: "Che Kung Temple",
    lag: "",
    lon: "",
    active: "1",
  },
  TAW: {
    tc_name: "大圍",
    en_name: "Tai Wai",
    lag: "",
    lon: "",
    active: "1",
  },
  HIK: {
    tc_name: "顯徑",
    en_name: "Hin Keng",
    lag: "",
    lon: "",
    active: "1",
  },
  DIH: {
    tc_name: "鑽石山",
    en_name: "Diamond Hill",
    lag: "",
    lon: "",
    active: "1",
  },
  KAT: {
    tc_name: "啟德",
    en_name: "Kai Tak",
    lag: "",
    lon: "",
    active: "1",
  },
  SUW: {
    tc_name: "宋皇臺",
    en_name: "Sung Wong Toi",
    lag: "",
    lon: "",
    active: "1",
  },
  TKW: {
    tc_name: "土瓜灣",
    en_name: "To Kwa Wan",
    lag: "",
    lon: "",
    active: "1",
  },
  HOM: {
    tc_name: "何文田",
    en_name: "Ho Man Tin",
    lag: "",
    lon: "",
    active: "1",
  },
  HUH: {
    tc_name: "紅磡",
    en_name: "Hung Hom",
    lag: "",
    lon: "",
    active: "1",
  },
  ETS: {
    tc_name: "尖東",
    en_name: "East Tsim Sha Tsui",
    lag: "",
    lon: "",
    active: "1",
  },
  AUS: {
    tc_name: "柯士甸",
    en_name: "Austin",
    lag: "",
    lon: "",
    active: "1",
  },
  MEF: {
    tc_name: "美孚",
    en_name: "Mei Foo",
    lag: "",
    lon: "",
    active: "1",
  },
  TWW: {
    tc_name: "荃灣西",
    en_name: "Tsuen Wan West",
    lag: "",
    lon: "",
    active: "1",
  },
  KSR: {
    tc_name: "錦上路",
    en_name: "Kam Sheung Road",
    lag: "",
    lon: "",
    active: "1",
  },
  YUL: {
    tc_name: "元朗",
    en_name: "Yuen Long",
    lag: "",
    lon: "",
    active: "1",
  },
  LOP: {
    tc_name: "朗屏",
    en_name: "Long Ping",
    lag: "",
    lon: "",
    active: "1",
  },
  TIS: {
    tc_name: "天水圍",
    en_name: "Tin Shui Wai",
    lag: "",
    lon: "",
    active: "1",
  },
  SIH: {
    tc_name: "兆康",
    en_name: "Siu Hong",
    lag: "",
    lon: "",
    active: "1",
  },
  TUM: {
    tc_name: "屯門",
    en_name: "Tuen Mun",
    lag: "",
    lon: "",
    active: "1",
  },
  NOP: {
    tc_name: "北角",
    en_name: "North Point",
    lag: "",
    lon: "",
    active: "1",
  },
  QUB: {
    tc_name: "鰂魚涌",
    en_name: "Quarry Bay",
    lag: "",
    lon: "",
    active: "1",
  },
  YAT: {
    tc_name: "油塘",
    en_name: "Yau Tong",
    lag: "",
    lon: "",
    active: "1",
  },
  TIK: {
    tc_name: "調景嶺",
    en_name: "Tiu Keng Leng",
    lag: "",
    lon: "",
    active: "1",
  },
  TKO: {
    tc_name: "將軍澳",
    en_name: "Tseung Kwan O",
    lag: "",
    lon: "",
    active: "1",
  },
  LHP: {
    tc_name: "康城",
    en_name: "LOHAS Park",
    lag: "",
    lon: "",
    active: "1",
  },
  HAH: {
    tc_name: "坑口",
    en_name: "Hang Hau",
    lag: "",
    lon: "",
    active: "1",
  },
  POA: {
    tc_name: "寶琳",
    en_name: "Po Lam",
    lag: "",
    lon: "",
    active: "1",
  },
};

export default { Common, MtrLines, MtrStations };
