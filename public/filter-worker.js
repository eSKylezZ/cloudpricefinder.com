// Web Worker for filtering and sorting operations
// This offloads heavy computation from the main thread

self.onmessage = function(e) {
  const { type, data } = e.data;
  
  switch (type) {
    case 'filter':
      const { instances, filters } = data;
      const filtered = filterInstances(instances, filters);
      self.postMessage({ type: 'filtered', data: filtered });
      break;
      
    case 'sort':
      const { instances: sortInstances, field, direction } = data;
      const sorted = sortInstances.sort((a, b) => {
        let aVal = a[field];
        let bVal = b[field];
        
        // Handle nested fields
        if (field.includes('.')) {
          const keys = field.split('.');
          aVal = keys.reduce((obj, key) => obj?.[key], a);
          bVal = keys.reduce((obj, key) => obj?.[key], b);
        }
        
        // Handle null values
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return direction === 'asc' ? 1 : -1;
        if (bVal == null) return direction === 'asc' ? -1 : 1;
        
        // Numeric comparison for known numeric fields
        const numericFields = ['vCPU', 'memoryGiB', 'diskSizeGB', 'priceUSD_hourly', 'priceUSD_monthly'];
        if (numericFields.includes(field)) {
          const aNum = Number(aVal);
          const bNum = Number(bVal);
          if (!isNaN(aNum) && !isNaN(bNum)) {
            return direction === 'asc' ? aNum - bNum : bNum - aNum;
          }
        }
        
        // String comparison
        const comparison = String(aVal).localeCompare(String(bVal));
        return direction === 'asc' ? comparison : -comparison;
      });
      
      self.postMessage({ type: 'sorted', data: sorted });
      break;
  }
};

function filterInstances(instances, filters) {
  return instances.filter(instance => {
    // Provider filter
    if (filters.providers?.length && !filters.providers.includes(instance.provider)) {
      return false;
    }
    
    // Instance type filter
    if (filters.instanceTypes?.length && !filters.instanceTypes.includes(instance.type)) {
      return false;
    }
    
    // vCPU filter
    if (instance.vCPU < filters.minVCPU || instance.vCPU > filters.maxVCPU) {
      return false;
    }
    
    // Memory filter
    if (instance.memoryGiB < filters.minMemory || instance.memoryGiB > filters.maxMemory) {
      return false;
    }
    
    // Price filter
    const price = instance.priceUSD_hourly || instance.priceEUR_hourly_net || 0;
    if (price > filters.maxPrice) {
      return false;
    }
    
    return true;
  });
}