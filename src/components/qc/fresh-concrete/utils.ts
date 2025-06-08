
import { FreshTest } from './types';

export const formatPieces = (originalPieces: string) => {
  if (!originalPieces) return originalPieces;
  
  const pieceArray = originalPieces.split(',').map(piece => piece.trim());
  const formattedPieces = pieceArray.map(piece => {
    if (/^[A-Z]{1,2}\d{4}$/.test(piece)) {
      return piece;
    }
    
    const jobMarkMatch = piece.match(/^\d{4}-([A-Z]{1,2}\d{4})$/);
    if (jobMarkMatch) {
      return jobMarkMatch[1];
    }
    
    const simpleMatch = piece.match(/^([A-Z]{1,2})(\d+)$/);
    if (simpleMatch) {
      const productType = simpleMatch[1];
      const pieceNumber = simpleMatch[2].padStart(4, '0');
      return `${productType}${pieceNumber}`;
    }
    
    return piece;
  });
  
  return formattedPieces.join(', ');
};

export const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  
  return `${month}/${day}/${year}`;
};

export const getDateTimeGroup = (tests: FreshTest[], testId: string) => {
  const test = tests.find(t => t.id === testId);
  if (!test) return [testId];
  
  return tests
    .filter(t => t.date === test.date && t.time === test.time)
    .map(t => t.id);
};

export const getReleaseColor = (strengthData: Record<string, any>, testId: string, releaseRequired: string) => {
  const releaseData = strengthData[testId]?.release || '';
  if (!releaseData || !releaseRequired) return '';
  
  let actualValue = releaseData;
  if (releaseData.includes('/')) {
    actualValue = releaseData.split('/')[0];
  }
  
  const actual = parseFloat(actualValue);
  const required = parseFloat(releaseRequired);
  
  if (isNaN(actual) || isNaN(required)) return '';
  
  if (actual >= required) {
    return 'text-green-600 font-semibold';
  } else if (actual >= required - 300) {
    return 'text-yellow-600 font-semibold';
  } else {
    return 'text-red-600 font-semibold';
  }
};

export const getAverageColor = (calculateAverage: (testId: string) => string, testId: string, strengthRequired: string) => {
  const average = calculateAverage(testId);
  if (!average || !strengthRequired) return '';
  
  const averageValue = parseFloat(average);
  const required = parseFloat(strengthRequired);
  
  if (isNaN(averageValue) || isNaN(required)) return '';
  
  if (averageValue >= required) {
    return 'text-green-600 font-semibold';
  } else if (averageValue >= required - 300) {
    return 'text-yellow-600 font-semibold';
  } else {
    return 'text-red-600 font-semibold';
  }
};

export const getPassFailColor = (value: string) => {
  const normalizedValue = value.toLowerCase().trim();
  if (normalizedValue === 'pass') {
    return 'text-green-600 font-semibold';
  } else if (normalizedValue === 'fail') {
    return 'text-red-600 font-semibold';
  }
  return '';
};
