export interface MetaInterface {
    createdAt: string;
    updatedAt: string;
};

export interface productType {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
    meta: MetaInterface;
    images: string[]; 
}