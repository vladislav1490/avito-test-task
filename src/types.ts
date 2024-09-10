export type Advertisement = {
    id: string;
    name: string;
    description?: string;
    price: number;
    createdAt: string;
    views: number;
    likes: number;
    imageUrl?: string;
}

export const OrderStatus = {
    Created: 0,
    Paid: 1,
    Transport: 2,
    DeliveredToThePoint: 3,
    Received: 4,
    Archived: 5,
    Refund: 6
} as const;

export type OrderItem = Advertisement & { count: number; };

export type Order = {
    id: string;
    status: typeof OrderStatus[keyof typeof OrderStatus];
    createdAt: string;
    finishedAt?: string;
    items: Array<OrderItem>;
    deliveryWay: string;
    total: number;
}

export type Image = {
    id: number;
    url: string;
    name: string;
}
