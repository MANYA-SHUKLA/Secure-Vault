export interface PasswordOptions {
  length: number;
  includeNumbers: boolean;
  includeLetters: boolean;
  includeSymbols: boolean;
  excludeLookAlikes: boolean;
}

const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const LOOKALIKE_CHARS = '0Oo1lI';

export const generatePassword = (options: PasswordOptions): string => {
  let charset = '';
  
  if (options.includeLetters) {
    charset += LETTERS;
  }
  if (options.includeNumbers) {
    charset += NUMBERS;
  }
  if (options.includeSymbols) {
    charset += SYMBOLS;
  }

  if (charset.length === 0) {
    return 'Select at least one character type';
  }

  if (options.excludeLookAlikes) {
    charset = charset.split('').filter(char => !LOOKALIKE_CHARS.includes(char)).join('');
  }

  let password = '';
  const array = new Uint32Array(options.length);
  crypto.getRandomValues(array);

  for (let i = 0; i < options.length; i++) {
    password += charset[array[i] % charset.length];
  }

  return password;
};

export const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  if (password.length >= 16) strength += 1;
  
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
  
  return Math.min(strength, 8);
};