function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function maskPhone(event) {
  const input   = event.target;
  const digits  = input.value.replace(/\D/g, '').slice(0, 11);   // só números, máx 11
  let formatted = '';

  if (digits.length >= 11) {                     // (99) 99999-9999
    formatted = `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7,11)}`;
  } else if (digits.length >= 10) {              // (99) 9999-9999
    formatted = `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6,10)}`;
  } else if (digits.length > 2) {                // (99) 999…
    formatted = `(${digits.slice(0,2)}) ${digits.slice(2)}`;
  } else {                                       // (9
    formatted = digits;
  }

  input.value = formatted;
}

function showError(input, msg) {
  const err = input.closest('.form-group').querySelector('.error-message');
  if (err) err.textContent = msg;
  input.setAttribute('aria-invalid', 'true');
}

function clearError(input) {
  const err = input.closest('.form-group').querySelector('.error-message');
  if (err) err.textContent = '';
  input.removeAttribute('aria-invalid');
}

/* -------- listeners -------- */
document.addEventListener('DOMContentLoaded', () => {
  const form       = document.getElementById('contactForm');
  const phoneInput = form.phone;
  phoneInput.addEventListener('input', maskPhone);
  form.addEventListener('submit', validateForm);
});

/* -------- submit -------- */
const APPSCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzHrV4OJrajEhBeWj2Uir101CQ8pmRnGpWCPZe6vcY4ZafV0TeXnTrrpF2lDPpXr6Vs/exec';

function validateForm(event) {
  event.preventDefault();
  const form         = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalHTML = submitButton.innerHTML;

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const phone   = form.phone.value.trim();
  const message = form.message.value.trim();
  const phoneDigits = phone.replace(/\D/g, '');

  let isValid = true;

  /* validações */
  if (name.length < 3)          { showError(form.name,  'Nome ≥ 3 letras');   isValid = false; } else clearError(form.name);
  if (!validateEmail(email))    { showError(form.email, 'E-mail inválido');    isValid = false; } else clearError(form.email);
  if (phoneDigits.length < 10)  { showError(form.phone, 'Telefone inválido');  isValid = false; } else clearError(form.phone);
  if (message.length < 10)      { showError(form.message,'Mensagem ≥ 10 car.');isValid = false; } else clearError(form.message);

  if (!isValid) return;

  /* feedback UI */
  submitButton.classList.remove('sucesso', 'erro');
  submitButton.classList.add('enviando');
  submitButton.innerHTML = 'Enviando…';
  submitButton.disabled = true;

  /* payload simples → GAS */
  const payload = { name, email, phone: phoneDigits, message };

  fetch(APPSCRIPT_URL, {
    method : 'POST',
    mode   : 'no-cors',                   
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify(payload)
  })
    .then(() => {
      form.reset();
      submitButton.classList.replace('enviando', 'sucesso');
      submitButton.innerHTML = 'Enviado!';
    })
    .catch(err => {
      console.error(err);
      submitButton.classList.replace('enviando', 'erro');
      submitButton.innerHTML = 'Erro. Tente novamente';
    })
    .finally(() => {
      setTimeout(() => {
        submitButton.classList.remove('sucesso', 'erro', 'enviando');
        submitButton.innerHTML = originalHTML;
        submitButton.disabled  = false;
      }, 3000);
    });
}
