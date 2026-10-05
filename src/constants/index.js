export const PRODUCT_STATUS = Object.freeze({
  AVAILABLE: "AVAILABLE",
  OUT_OF_STOCK: "OUT_OF_STOCK",
});

export const USER_ROLES = Object.freeze({
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  DRIVER: "DRIVER",
  STORE: "STORE",
});

export const ORDER_STATUS = Object.freeze({
  CREATED: "CREATED",
  ASSIGNED: "ASSIGNED",
  PICKED_UP: "PICKED_UP",
  IN_TRANSIT: "IN_TRANSIT",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
});

export const DELIVERY_STATUS = Object.freeze({
  ASSIGNED: "ASSIGNED",
});

export const DELIVERY_PRIORITY = Object.freeze({
  LOW: "LOW",
  NORMAL: "NORMAL",
  HIGH: "HIGH",
});

export const MOCK_MAX_QUANTITY = 100;
