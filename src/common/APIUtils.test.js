import { describe, it, expect, vi, beforeEach } from 'vitest';
import { APIUtils } from './APIUtils';

// Mock fetch
global.fetch = vi.fn();

describe('APIUtils', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should make successful API request', async () => {
    const mockResponse = { data: 'test data' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await APIUtils.makeRequest('/test');
    
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockResponse);
  });

  it('should handle API errors', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Error de prueba' }),
    });

    const result = await APIUtils.makeRequest('/test');
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('Error de prueba');
  });

  it('should submit health query', async () => {
    const mockQuery = {
      id: '1',
      query: 'Test query',
      category: 'medical',
      timestamp: new Date(),
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => 'Response data',
    });

    const result = await APIUtils.submitHealthQuery(mockQuery);
    
    expect(fetch).toHaveBeenCalledWith('/api/health/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockQuery),
    });
    expect(result.success).toBe(true);
  });
});