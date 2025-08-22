// Mock API Service for ToyBox Market
// Simulates REST API endpoints that can be tested with Postman

export interface Toy {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  image: string;
  description: string;
  inStock: boolean;
  rating: number;
}


export const toyCategories = [
  'All',
  'Action Figures',
  'Dolls',
  'Educational',
  'Building Blocks',
  'Vehicles',
  'Plush Toys',
  'Board Games',
  'Electronic',
  'Sports'
];

// JSON Server Base URL
const API_BASE_URL = 'http://localhost:4000';

// API Service Class - Now uses JSON Server
export class ToyApiService {
  
  // GET /toys - Fetch all toys from JSON Server
  static async getAllToys(): Promise<Toy[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/toys`);
      if (!response.ok) throw new Error('Failed to fetch toys');
      return await response.json();
    } catch (error) {
      console.error('Error fetching toys:', error);
      throw error;
    }
  }

  // GET /toys/:id - Fetch single toy
  static async getToyById(id: number): Promise<Toy | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/toys/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching toy:', error);
      return null;
    }
  }

  // POST /toys - Create new toy
  static async createToy(toyData: Omit<Toy, 'id'>): Promise<Toy> {
    try {
      const response = await fetch(`${API_BASE_URL}/toys`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toyData),
      });
      if (!response.ok) throw new Error('Failed to create toy');
      return await response.json();
    } catch (error) {
      console.error('Error creating toy:', error);
      throw error;
    }
  }

  // PUT /toys/:id - Update existing toy
  static async updateToy(id: number, toyData: Partial<Toy>): Promise<Toy | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/toys/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toyData),
      });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error updating toy:', error);
      return null;
    }
  }

  // DELETE /toys/:id - Delete toy
  static async deleteToy(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/toys/${id}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting toy:', error);
      return false;
    }
  }

  // GET /toys - Fetch all categories (derived from toys)
  static async getCategories(): Promise<string[]> {
    try {
      const toys = await this.getAllToys();
      const categories = Array.from(new Set(toys.map(toy => toy.category)));
      return ['All', ...categories];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return ['All', ...toyCategories];
    }
  }

  // GET /toys?q=query - Search toys
  static async searchToys(query: string): Promise<Toy[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/toys?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        // Fallback: fetch all and filter client-side
        const allToys = await this.getAllToys();
        return allToys.filter(toy => 
          toy.name.toLowerCase().includes(query.toLowerCase()) ||
          toy.description.toLowerCase().includes(query.toLowerCase())
        );
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching toys:', error);
      throw error;
    }
  }

  // GET /toys?category=category - Filter by category
  static async getToysByCategory(category: string): Promise<Toy[]> {
    try {
      if (category === 'All') return await this.getAllToys();
      
      const response = await fetch(`${API_BASE_URL}/toys?category=${encodeURIComponent(category)}`);
      if (!response.ok) throw new Error('Failed to fetch toys by category');
      return await response.json();
    } catch (error) {
      console.error('Error fetching toys by category:', error);
      throw error;
    }
  }
}