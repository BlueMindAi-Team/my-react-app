export function generateRandomEmail(name: string): string {
  const domains = ['edumail.com', 'teacherbox.net', 'academicmail.org'];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
  const randomNumber = Math.floor(Math.random() * 9999);
  
  return `${cleanName}${randomNumber}@${randomDomain}`;
}

export function generateRandomPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  const symbols = '@#$%&*';
  let password = '';
  
  // Ensure at least one uppercase, one lowercase, one number, and one symbol
  password += chars.charAt(Math.floor(Math.random() * 26)); // Uppercase
  password += chars.charAt(26 + Math.floor(Math.random() * 26)); // Lowercase
  password += chars.charAt(52 + Math.floor(Math.random() * 7)); // Number
  password += symbols.charAt(Math.floor(Math.random() * symbols.length)); // Symbol
  
  // Fill remaining 4 characters
  for (let i = 4; i < 8; i++) {
    const allChars = chars + symbols;
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

export function generateDomain(baseName: string): string {
  const cleanBase = baseName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const randomSuffix = Math.floor(Math.random() * 999);
  return `${cleanBase}${randomSuffix}`;
}