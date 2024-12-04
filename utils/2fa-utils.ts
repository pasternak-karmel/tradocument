export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendSMS(phoneNumber: string, message: string) {
  // In a real application, you'd integrate with an SMS service provider here
  console.log(`Sending SMS to ${phoneNumber}: ${message}`);
  // Simulate sending SMS
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
