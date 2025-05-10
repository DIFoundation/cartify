export default function validateCouponCode(code) {
  const trimmed = code.trim();
  const regex = /^WEB3BRIDGECOHORTx$/;

  if (regex.test(trimmed)) {
    return { valid: true, discount: 0.1 }; // 10% discount
  }

  return { valid: false, discount: 0 };
}
