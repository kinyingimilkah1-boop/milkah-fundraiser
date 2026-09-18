const amountButtons = document.querySelectorAll('.amount');
const customAmount = document.querySelector('#custom-amount');
const selectedAmount = document.querySelector('#selected-amount');
const supportForm = document.querySelector('#support-form');
const formMessage = document.querySelector('#form-message');

const PAYPAL_BUSINESS = 'YOUR_PAYPAL_EMAIL_OR_ID';

window.addEventListener('pointermove', (event) => {
  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;
  document.body.style.setProperty('--pointer-x', `${x}%`);
  document.body.style.setProperty('--pointer-y', `${y}%`);
});

function updateAmount(value) {
  const amount = Number(value);
  if (!amount || amount < 1) return;
  selectedAmount.textContent = `$${amount.toLocaleString('en-US')}`;
  selectedAmount.dataset.amount = String(amount);
  amountButtons.forEach((button) => button.classList.toggle('active', button.dataset.amount === String(amount)));
}

function buildPaypalUrl(amount, name) {
  const donorName = name ? `&custom=${encodeURIComponent(name)}` : '';
  return `https://www.paypal.com/donate?business=${encodeURIComponent(PAYPAL_BUSINESS)}&amount=${amount}&currency=USD&no_shipping=1&item_name=${encodeURIComponent("Milkah's medical education")}${donorName}`;
}

amountButtons.forEach((button) => {
  button.addEventListener('click', () => {
    customAmount.value = '';
    updateAmount(button.dataset.amount);
  });
});

customAmount.addEventListener('input', () => {
  amountButtons.forEach((button) => button.classList.remove('active'));
  updateAmount(customAmount.value);
});

supportForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const amount = Number(customAmount.value || selectedAmount.dataset.amount || 100);
  const name = document.querySelector('#supporter-name').value.trim();

  if (!amount || amount < 1) {
    formMessage.textContent = 'Please enter a valid amount before continuing.';
    return;
  }

  formMessage.textContent = 'Redirecting to PayPal...';
  window.location.href = buildPaypalUrl(amount, name);
});