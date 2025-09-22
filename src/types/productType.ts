export interface MetaInterface {
    createdAt: string;
    updatedAt: string;
};

export interface ReviewType {
    rating: number;
    comment: string;
    reviewerName: string;
    reviewerEmail: string;
    date: string;
}

export interface productType {
    id: number;
    title: string;
    description: string;
    thumbnail?: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
    meta: MetaInterface;
    images: string[]; 
    brand?: string;
    discountPercentage?: number;
    warrantyInformation?: string;
    shippingInformation?: string;
    reviews?: ReviewType[];
}