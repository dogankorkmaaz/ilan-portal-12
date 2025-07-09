
export interface Listing {
  id: number;
  user_id: number;
  title: string;
  price: number;
  currency: string;
  location: string;
  category: string;
  image_url: string;
  created_at: string; // MySQL TIMESTAMP will be a string
}

export interface User {
  id: number;
  email: string;
}
