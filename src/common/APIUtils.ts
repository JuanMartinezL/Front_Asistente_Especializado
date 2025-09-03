// Utilidades para manejo de APIs del sistema de salud
export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface HealthQuery {
  id: string;
  query: string;
  category: 'medical' | 'analysis' | 'research';
  timestamp: Date;
  response?: string;
}

export class APIUtils {
  private static baseURL = '/api';

  static async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error en la solicitud');
      }

      return {
        data,
        success: true,
      };
    } catch (error) {
      return {
        data: null as T,
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  static async submitHealthQuery(query: HealthQuery): Promise<APIResponse<string>> {
    return this.makeRequest<string>('/health/query', {
      method: 'POST',
      body: JSON.stringify(query),
    });
  }

  static async getQueryHistory(): Promise<APIResponse<HealthQuery[]>> {
    return this.makeRequest<HealthQuery[]>('/health/history');
  }

  static async uploadFile(file: File): Promise<APIResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.makeRequest<{ url: string }>('/health/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }
}