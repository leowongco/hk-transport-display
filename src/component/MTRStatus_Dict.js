const StatusLight = {
  green: {
    tc_name: "服務正常",
    en_name: "Normal Service",
  },
  yellow: {
    tc_name: "服務延誤",
    en_name: "Service Delay",
    tc_rmk: "額外候車及行車時間",
    en_rmk: "Additional waiting and travelling time",
  },
  red: {
    tc_name: "服務受阻",
    en_name: "Service Disruption",
    tc_rmk: "請考慮使用其他交通工具",
    en_rmk: "Consider using other transport",
  },
  typhoon: {
    tc_name: "熱帶氣旋警告信號生效",
    en_name: "Tropical Cyclone Warning Signals issued",
  },
  grey: {
    tc_name: "非服務時間",
    en_name: "Non-service hours",
  },
  pink: {
    tc_name: "服務延誤",
    en_name: "Service Delay",
    tc_rmk: "額外候車及行車時間",
    en_rmk: "Additional waiting and travelling time",
  },
};

export default { StatusLight };
