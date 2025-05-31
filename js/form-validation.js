// Função para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Função para aplicar máscara de telefone
function maskPhone(event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, '');
    let formattedValue = '';

    if (value.length <= 11) {
        if (value.length > 2) {
            formattedValue += '(' + value.substring(0, 2) + ') ';
            if (value.length > 7) {
                formattedValue += value.substring(2, 7) + '-';
                formattedValue += value.substring(7, 11);
            } else {
                formattedValue += value.substring(2);
            }
        } else {
            formattedValue = value;
        }
    }

    input.value = formattedValue;
}

// Funções auxiliares para mostrar/limpar erros
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
    }
    input.setAttribute('aria-invalid', 'true');
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
    }
    input.removeAttribute('aria-invalid');
}

// Adicionar event listeners
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const phoneInput = form.querySelector('input[name="phone"]');
    
    form.addEventListener('submit', validateForm);
    phoneInput.addEventListener('input', maskPhone);
    
    // Validação em tempo real
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim()) {
                if (this.name === 'email') {
                    if (!validateEmail(this.value)) {
                        showError(this, 'Email inválido');
                    } else {
                        clearError(this);
                    }
                } else if (this.name === 'phone') {
                    const phoneDigits = this.value.replace(/\D/g, '');
                    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
                        showError(this, 'Telefone inválido');
                    } else {
                        clearError(this);
                    }
                }
            }
        });
    });
}); 


function validateForm(event) {
    event.preventDefault();

    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalHTML = submitButton.innerHTML;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    let isValid = true;

    // Validações
    if (name.length < 3) {
        showError(form.name, 'Nome deve ter pelo menos 3 caracteres');
        isValid = false;
    } else {
        clearError(form.name);
    }

    if (!validateEmail(email)) {
        showError(form.email, 'Email inválido');
        isValid = false;
    } else {
        clearError(form.email);
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
        showError(form.phone, 'Telefone inválido');
        isValid = false;
    } else {
        clearError(form.phone);
    }

    if (message.length < 10) {
        showError(form.message, 'Mensagem deve ter pelo menos 10 caracteres');
        isValid = false;
    } else {
        clearError(form.message);
    }

    if (isValid) {
        const webhookURL = 'https://discord.com/api/webhooks/${process.env.DISC_1}/${process.env.DISC_2}';

        submitButton.classList.remove('sucesso', 'erro');
        submitButton.classList.add('enviando');
        submitButton.innerHTML = 'Enviando...';
        submitButton.disabled = true;

        const mensagem = {
        username: "Capitão Brocha",
        embeds: [{
            title: name,
            color: 3498470,
            author: {
                name: "Novo Lead!",
                icon_url: "https://media.istockphoto.com/id/1442450033/vector/rocket-logo-vector-design-illustration.jpg?s=612x612&w=0&k=20&c=rwM6Ct1C1dFkbz0Dg3mNPpxFwcP04_i_fJ1SPPHK9MU="
            },
            fields: [
            {
                name: "Email",
                value: email,
                inline: true
            },
            {
                name: "Telefone (WhatsApp)",
                value: `[📲 Abrir conversa no WhatsApp](https://wa.me/+55${phone.replace(/\D/g, '')})`,
                inline: true
            },
            {
                name: "Mensagem",
                value: "```" + message + "```"
            }
            ],
            footer: {
            text: `Site  •  ${new Date().toLocaleDateString('pt-BR')}, ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
            icon_url: "https://github.com/palaboratory/lp-pa/blob/main/assets/logos/favicon.png?raw=true"
            }
        }]
        };

           fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mensagem)
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao enviar formulário');
            form.reset();
            submitButton.classList.remove('enviando');
            submitButton.classList.add('sucesso');
            submitButton.innerHTML = 'Enviado!';
        })
        .catch(error => {
            console.error('Erro:', error);
            submitButton.classList.remove('enviando');
            submitButton.classList.add('erro');
            submitButton.innerHTML = 'Erro. Tente novamente';
        })
        .finally(() => {
            setTimeout(() => {
                submitButton.classList.remove('sucesso', 'erro', 'enviando');
                submitButton.innerHTML = originalHTML;
                submitButton.disabled = false;
            }, 3000);
        });
    }
}
