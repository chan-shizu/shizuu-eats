export const LOCAL_STORAGE_ORDER_IDS_KEY = "orderIds";

export const ORDER_STATUS_TEXT_MAPPING: { [key: string]: string } = {
  INITIAL: "注文完了",
  ACCEPTED: "確認中",
  DENIED: "キャンセル",
  PROGRESS: "移動中",
  COMPLETED: "完了",
};

export const ORDER_STATUS_COLOR_MAPPING: { [key: string]: string } = {
  //   INITIAL: "green-200",
  INITIAL: "border-green-200",
  ACCEPTED: "border-red-200",
  DENIED: "border-yellow-400",
  PROGRESS: "border-pink-300",
  COMPLETED: "border-gray-300",
};
