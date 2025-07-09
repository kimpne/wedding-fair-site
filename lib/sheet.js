export async function getSheetData() {
  try {
    const response = await fetch('/api/sheet-data');
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