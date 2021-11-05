export interface AddExpRequest {
  userId: string;
  amount: number;
  password: string;
  shopName: string;
  shopId: number;
}

export interface Shop {
  name: string;
  password: string;
}

export interface Site {
  name: string;
  answer: number;
}

export interface SendAnswerRequest {
  userId: string;
  answer: number;
  siteId: number;
  siteName: string;
}

export interface ApiResponse {
  status: Status;
  message: string;
}

export type Status = "success" | "fail";
