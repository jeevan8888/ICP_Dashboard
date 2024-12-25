export const formatCurrency = (value) => {
  if (value === null || isNaN(value)) return '-';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercentage = (value) => {
  if (value === null || isNaN(value)) return '-';
  
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const getChangeColor = (change) => {
  if (change === null || isNaN(change)) return 'text-gray-600';
  if (change > 0) return 'text-green-600';
  if (change < 0) return 'text-red-600';
  return 'text-gray-600';
};