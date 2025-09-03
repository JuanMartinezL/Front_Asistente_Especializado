// Utilidades para manejo de APIs del sistema de salud
export class APIUtils {
  static baseURL = '/api';

  static async makeRequest(endpoint, options = {}) {
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
        data: null,
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  static async submitHealthQuery(query) {
    return this.makeRequest('/health/query', {
      method: 'POST',
      body: JSON.stringify(query),
    });
  }

  static async getQueryHistory() {
    return this.makeRequest('/health/history');
  }

  static async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    return this.makeRequest('/health/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
  }
}