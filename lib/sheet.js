export async function getSheetData() {
  try {
    // For server-side rendering, we need to use the full URL
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-domain.com' 
      : 'http://localhost:3000';
    
    const url = typeof window === 'undefined' 
      ? `${baseUrl}/api/sheet-data` 
      : '/api/sheet-data';
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return [];
  }
}