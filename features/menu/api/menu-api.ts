import axios from "axios";

// API Base URL - 추후 실제 API 경로로 변경
const API_BASE_URL = "https://api.example.com";

// 개발 환경에서 mock 사용 여부
const USE_MOCK = true;

// Mock 데이터
const MOCK_MENUS: MenuItem[] = [
  { id: "1", menu: "espresso" },
  { id: "2", menu: "matcha latte" },
  { id: "3", menu: "vanilla latte" },
];

// Types
export interface MenuItem {
  id: string;
  menu: string;
}

export interface OrderRequest {
  items: string[];
}

export interface OrderResponse {
  success: boolean;
  orderId: string;
  message: string;
}

// Mock delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 메뉴 목록 조회
export const fetchMenus = async (): Promise<MenuItem[]> => {
  if (USE_MOCK) {
    await delay(500);
    return MOCK_MENUS;
  }

  const response = await axios.get<MenuItem[]>(`${API_BASE_URL}/menus`);
  return response.data;
};

// 주문 제출
export const submitOrder = async (
  request: OrderRequest
): Promise<OrderResponse> => {
  if (USE_MOCK) {
    await delay(800);
    return {
      success: true,
      orderId: `ORD-${Date.now()}`,
      message: `${request.items.join(", ")} 주문이 완료되었습니다!`,
    };
  }

  const response = await axios.post<OrderResponse>(
    `${API_BASE_URL}/orders`,
    request
  );
  return response.data;
};
