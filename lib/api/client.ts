// API client for frontend use

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  price: string;
  image: string;
  description?: string;
  specifications?: any;
  features?: string[];
  inStock: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  brand: {
    id: string;
    name: string;
  };
}

export interface ApiProject {
  id: string;
  name: string;
  slug: string;
  client: string;
  location: string;
  area: string;
  year: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  mainImage: string;
  images: string[];
  features: string[];
  featured: boolean;
}

export interface ApiBrand {
  id: string;
  name: string;
  logo: string;
  lightLogo?: string;
  tagline: string;
  subtitle: string;
  description: string;
  heroImage: string;
  gradient: string;
  accentColor: string;
}

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  href: string;
  subcategories: string[];
  brand: ApiBrand;
  _count?: {
    products: number;
  };
}

// Fetch functions
export async function fetchProducts(params?: {
  category?: string;
  brand?: string;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  
  if (params?.category) searchParams.append('category', params.category);
  if (params?.brand) searchParams.append('brand', params.brand);
  if (params?.limit) searchParams.append('limit', params.limit.toString());

  const response = await fetch(`${API_BASE_URL}/api/products?${searchParams}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json() as Promise<ApiProduct[]>;
}

export async function fetchProduct(id: string) {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
  
  if (!response.ok) {
    throw new Error('Product not found');
  }
  
  return response.json() as Promise<ApiProduct>;
}

export async function fetchProjects(params?: {
  category?: string;
  featured?: boolean;
}) {
  const searchParams = new URLSearchParams();
  
  if (params?.category) searchParams.append('category', params.category);
  if (params?.featured) searchParams.append('featured', 'true');

  const response = await fetch(`${API_BASE_URL}/api/projects?${searchParams}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  
  return response.json() as Promise<ApiProject[]>;
}

export async function fetchBrands() {
  const response = await fetch(`${API_BASE_URL}/api/brands`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch brands');
  }
  
  return response.json() as Promise<ApiBrand[]>;
}

export async function fetchCategories(brandId?: string) {
  const searchParams = new URLSearchParams();
  
  if (brandId) searchParams.append('brandId', brandId);

  const response = await fetch(`${API_BASE_URL}/api/categories?${searchParams}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return response.json() as Promise<ApiCategory[]>;
}

// Admin functions (require authentication)
export async function createProduct(data: any) {
  const token = localStorage.getItem('auth-token');
  
  const response = await fetch(`${API_BASE_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Failed to create product');
  }
  
  return response.json();
}

export async function updateProduct(id: string, data: any) {
  const token = localStorage.getItem('auth-token');
  
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  
  return response.json();
}

export async function deleteProduct(id: string) {
  const token = localStorage.getItem('auth-token');
  
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
  
  return response.json();
}