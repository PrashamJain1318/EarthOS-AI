export interface ScanHistoryItem {
  id: string;
  timestamp: number;
  status: 'success' | 'failed';
  category: string;
  image: string | null;
  barcode: string | null;
  ocrData: any;
  aiResult: any;
  carbonEstimate: any;
}

class ScanHistoryService {
  private readonly STORAGE_KEY = 'earthos_scan_history';

  /**
   * Retrieves all scan history items from local storage.
   */
  public getHistory(): ScanHistoryItem[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('ScanHistoryService - Failed to load history:', error);
      return [];
    }
  }

  /**
   * Saves scan history items to local storage.
   */
  private saveHistory(history: ScanHistoryItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('ScanHistoryService - Failed to save history:', error);
    }
  }

  /**
   * Adds a new scan record to the history.
   */
  public addScan(scan: Omit<ScanHistoryItem, 'id' | 'timestamp'>): ScanHistoryItem {
    const history = this.getHistory();
    const newScan: ScanHistoryItem = {
      ...scan,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
    };

    history.unshift(newScan); // Add to beginning of list
    this.saveHistory(history);
    return newScan;
  }

  /**
   * Deletes a specific scan record by id.
   */
  public deleteScan(id: string): void {
    const history = this.getHistory();
    const updated = history.filter(item => item.id !== id);
    this.saveHistory(updated);
  }

  /**
   * Deletes all scan history records.
   */
  public clearHistory(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('ScanHistoryService - Failed to clear history:', error);
    }
  }

  /**
   * Paginated, searched, and filtered history list query.
   */
  public queryHistory(params: {
    page: number;
    limit: number;
    search?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const history = this.getHistory();
    let filtered = [...history];

    // Filter by category
    if (params.category && params.category !== 'ALL') {
      filtered = filtered.filter(item => 
        item.category.toUpperCase() === params.category?.toUpperCase()
      );
    }

    // Filter by search query (on barcode, category, name)
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(item => 
        (item.barcode && item.barcode.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q) ||
        (item.aiResult?.productType && item.aiResult.productType.toLowerCase().includes(q))
      );
    }

    // Filter by date range
    if (params.startDate) {
      const start = new Date(params.startDate).getTime();
      filtered = filtered.filter(item => item.timestamp >= start);
    }
    if (params.endDate) {
      // Add 1 day to end date to include all of that day
      const end = new Date(params.endDate).getTime() + 86400000;
      filtered = filtered.filter(item => item.timestamp <= end);
    }

    // Paginate
    const total = filtered.length;
    const totalPages = Math.ceil(total / params.limit);
    const offset = (params.page - 1) * params.limit;
    const paginatedItems = filtered.slice(offset, offset + params.limit);

    return {
      items: paginatedItems,
      pagination: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages,
        hasNextPage: params.page < totalPages,
        hasPrevPage: params.page > 1
      }
    };
  }
}

export const scanHistoryService = new ScanHistoryService();
export default scanHistoryService;
