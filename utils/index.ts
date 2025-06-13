export const fetchApi = async (suffix: string, options?: RequestInit) => {
  try {
    console.log('Fetching API:', process.env.NEXT_PUBLIC_API_URL, suffix, options);
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL! + suffix, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch API error:', error);
    throw error;
  }
}