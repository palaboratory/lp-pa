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

// Função para validar o formulário
function validateForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();
    
    let isValid = true;
    
    // Validar nome
    if (name.length < 3) {
        showError(form.name, 'Nome deve ter pelo menos 3 caracteres');
        isValid = false;
    } else {
        clearError(form.name);
    }
    
    // Validar email
    if (!validateEmail(email)) {
        showError(form.email, 'Email inválido');
        isValid = false;
    } else {
        clearError(form.email);
    }
    
    // Validar telefone
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
        showError(form.phone, 'Telefone inválido');
        isValid = false;
    } else {
        clearError(form.phone);
    }
    
    // Validar mensagem
    if (message.length < 10) {
        showError(form.message, 'Mensagem deve ter pelo menos 10 caracteres');
        isValid = false;
    } else {
        clearError(form.message);
    }
    
    if (isValid) {
        const webhookURL = 'https://discord.com/api/webhooks/1346199326040522802/8MOVGB_VX8MDvWLmGsvnj_BdLS8GvSXthjsGMT4NSl-3DnTBq-TiG-cZRCiOKYyXNlPY';

        // Mostrar indicador de carregamento
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        const mensagem = {
            embeds: [{
                title: "🚀 Novo Lead - Site",
                color: 0x00ff00,
                fields: [
                    {
                        name: "Nome",
                        value: name,
                        inline: true
                    },
                    {
                        name: "Email",
                        value: email,
                        inline: true
                    },
                    {
                        name: "Telefone",
                        value: phone,
                        inline: true
                    },
                    {
                        name: "Mensagem",
                        value: message
                    }
                ],
                timestamp: new Date().toISOString()
            }]
        };

        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mensagem)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar formulário');
            }
            alert('Formulário enviado com sucesso!');
            form.reset();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao enviar formulário. Por favor, tente novamente.');
        })
        .finally(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
    }
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