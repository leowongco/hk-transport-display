const Route = {
  AEL: ["HOK", "KOW", "TSY", "AIR", "AWE"],
  TCL: ["HOK", "KOW", "OLY", "NAC", "LAK", "TSY", "SUN", "TUC"],
  WRL: [
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
  TKL: ["NOP", "QUB", "YAT", "TIK", "TKO", "LHP", "HAH", "POA"],
};

const Common = {
  en: {
    UP: "Up",
    DOWN: "Down",
    arr: "Arriving",
    dep: "Departing",
    min: "min",
    etaAlert:
      "ETA information will be refresh every 10 seconds, reference data only.",
    autoBtnOn: "Swap Language: On",
    autoBtnOff: "Swap Language: Off",
    line: "Line",
    stn: "Station",
    lastUpdate: "Last Update",
  },
  tc: {
    UP: "上行",
    DOWN: "下行",
    arr: "即將到達",
    dep: "正在離開",
    min: "分鐘",
    etaAlert: "到站時間資訊每10秒自動更新，資料只供參考。",
    autoBtnOn: "自動轉語言：開",
    autoBtnOff: "自動轉語言：關",
    line: "路線",
    stn: "站",
    lastUpdate: "最後更新",
  },
};

const Line = {
  en: {
    AEL: "Airport Express",
    TCL: "Tung Chung Line",
    WRL: "West Rail Line",
    TKL: "Tseung Kwan O Line",
  },
  tc: {
    AEL: "機場快線",
    TCL: "東涌線",
    WRL: "西鐵線",
    TKL: "將軍澳線",
  },
};

const Station = {
  en: {
    HOK: "Hong Kong",
    KOW: "Kowloon",
    TSY: "Tsing Yi",
    AIR: "Airport",
    AWE: "AsiaWorld Expo",

    OLY: "Olympic",
    NAC: "Nam Cheong",
    LAK: "Lai King",
    SUN: "Sunny Bay",
    TUC: "Tung Chung",

    HUH: "Hung Hom",
    ETS: "East Tsim Sha Tsui",
    AUS: "Austin",
    MEF: "Mei Foo",
    TWW: "Tsuen Wan West",
    KSR: "Kam Sheung Road",
    YUL: "Yuen Long",
    LOP: "Long Ping",
    TIS: "Tin Shui Wai",
    SIH: "Siu Hong",
    TUM: "Tuen Mun",

    NOP: "North Point",
    QUB: "Quarry Bay",
    YAT: "Yau Tong",
    TIK: "Tiu Keng Leng",
    TKO: "Tseung Kwan O",
    LHP: "LOHAS Park",
    HAH: "Hang Hau",
    POA: "Po Lam",
  },
  tc: {
    HOK: "香港",
    KOW: "九龍",
    TSY: "青衣",
    AIR: "機場",
    AWE: "博覽館",

    OLY: "奧運",
    NAC: "南昌",
    LAK: "荔景",
    SUN: "欣澳",
    TUC: "東涌",

    HUH: "紅磡",
    ETS: "尖東",
    AUS: "柯士甸",
    MEF: "美孚",
    TWW: "荃灣西",
    KSR: "錦上路",
    YUL: "元朗",
    LOP: "朗屏",
    TIS: "天水圍",
    SIH: "兆康",
    TUM: "屯門",

    NOP: "北角",
    QUB: "鰂魚涌",
    YAT: "油塘",
    TIK: "調景嶺",
    TKO: "將軍澳",
    LHP: "康城",
    HAH: "坑口",
    POA: "寶琳",
  },
};

export default { Line, Station, Common, Route };
