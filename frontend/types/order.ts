export type HistoryOrder = {
  id: string;
  orderName: string;
  orderRemark: string;
  orderBudget: string;
  customInfoConfirm: boolean;
  status: string;
  comment: string;
  estimatedArrivalTime: string;
  createdAt: string;
};

export type AdminOrder = {
  id: string;
  distance: string;
  walkingTime: string;
  bicyclingTime: string;
  driveTime: string;
  orderName: string;
  orderRemark: string;
  orderBudget: string;
  customInfoName: string;
  customInfoRemark: string;
  customInfoConfirm: boolean;
  status: string;
  comment: string;
  customerLatitude: number;
  customerLongitude: number;
  customerAreaName: string;
  shizuyaLatitude: number;
  shizuyaLongitude: number;
  shizuyaAreaName: string;
  estimatedArrivalTime: string;
  createdAt: string;
  updatedAt: string;
};
