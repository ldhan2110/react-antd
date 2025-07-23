// Helper function to generate a unique ID with format DDMMYYXXXXXX
export const generateId = (): string => {
  const now = new Date();

  // Get Day, Month, Year
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // getMonth() trả về 0-11
  const year = now.getFullYear().toString().slice(-2); // Lấy 2 ký tự cuối của năm

  // Generate 6 random characters from A-Z and 0-9
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomChars = '';
  for (let i = 0; i < 6; i++) {
    randomChars += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Kết hợp theo format DDMMYYXXXXXX
  return `${day}${month}${year}${randomChars}`;
};
