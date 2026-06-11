// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== MODAL ====================
    const modal = document.getElementById('modalOverlay');
    const triggerBtn = document.getElementById('contactTrigger');
    const closeBtn = document.getElementById('closeModalBtn');
    const fakeForm = document.getElementById('fakeForm');

    function openModal() {
        if (modal) modal.style.display = 'flex';
    }

    function closeModal() {
        if (modal) modal.style.display = 'none';
    }

    if (triggerBtn) {
        triggerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Fechar ao clicar fora do conteúdo do modal
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Submit do formulário fake
    if (fakeForm) {
        fakeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('nomeInput')?.value.trim() || '';
            const email = document.getElementById('emailInput')?.value.trim() || '';
            
            if (nome === '' || email === '') {
                alert('Por favor, preencha nome e e-mail.');
                return;
            }
            
            alert(`🌿 Obrigado ${nome}! Sua parceria com o agro sustentável será um grande passo. Em breve retornaremos para ${email}.`);
            closeModal();
            fakeForm.reset();
        });
    }

    // ==================== SCROLL SUAVE ====================
    // Seleciona todos os links que começam com #
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const hash = this.getAttribute('href');
            
            // Evita links vazios ou apenas "#"
            if (hash === '#' || hash === '') return;
            
            const targetId = hash.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                
                // Opcional: atualizar URL sem recarregar a página
                history.pushState(null, null, hash);
            }
        });
    });

    // ==================== ANIMAÇÃO DE ENTRADA (OPCIONAL) ====================
    // Adiciona classe fade-in para elementos quando visíveis
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplica animação em cards e práticas
    const animatedElements = document.querySelectorAll('.card, .practice-item, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
