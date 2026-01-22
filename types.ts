export interface Product {
    id: number;
    title: string;
    category: string;
    price: string;
    image: string;
    color?: string;
    isNew?: boolean;
    isBestSeller?: boolean;
    isLowStock?: boolean;
    description?: string;
}

export interface Article {
    id: number;
    title: string;
    subtitle: string;
    date: string;
    category: string;
    image: string;
    excerpt: string;
}

export interface CartItem extends Product {
    qty: number;
    size: string;
}