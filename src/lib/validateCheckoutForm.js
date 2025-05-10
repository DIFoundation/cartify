export default function validateCheckoutForm(form) {
  const { name, email, cardNumber, expiry, cvv } = form;

  if (!name || !email || !cardNumber || !expiry || !cvv) {
    return 'Please fill in all fields';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email address';
  }

  if (!/^\d{16}$/.test(cardNumber)) {
    return 'Card number must be 16 digits';
  }

  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
    return 'Invalid expiry date. Use MM/YY format';
  }

  if (!/^\d{3}$/.test(cvv)) {
    return 'Invalid CVV';
  }

  return null; // valid
}
