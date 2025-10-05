import CryptoJS from 'crypto-js';

export class EncryptionService {
  private key: string;

  constructor(masterPassword: string, email: string) {
    // Derive a key from master password and email
    this.key = CryptoJS.PBKDF2(masterPassword, email, {
      keySize: 256 / 32,
      iterations: 1000
    }).toString();
  }

  encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, this.key).toString();
  }

  decrypt(encryptedText: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedText, this.key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}

// Utility to generate encryption key from user credentials
export const createEncryptionService = (masterPassword: string, email: string): EncryptionService => {
  return new EncryptionService(masterPassword, email);
};