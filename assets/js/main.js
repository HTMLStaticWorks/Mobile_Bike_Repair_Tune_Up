document.addEventListener('DOMContentLoaded', () => {
    // Theme setup
    const themeToggleBtns = document.querySelectorAll('.theme-toggle, .theme-toggle-mobile');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        updateThemeIcons('dark');
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeIcons(isDark ? 'dark' : 'light');
        });
    });

    function updateThemeIcons(theme) {
        themeToggleBtns.forEach(btn => {
            const hasText = btn.textContent.trim().length > 0;
            if (theme === 'dark') {
                btn.innerHTML = hasText ? '<i class="fa-solid fa-sun"></i> Light' : '<i class="fa-solid fa-sun"></i>';
            } else {
                btn.innerHTML = hasText ? '<i class="fa-solid fa-moon"></i> Dark' : '<i class="fa-solid fa-moon"></i>';
            }
        });
    }

    // RTL Setup
    const rtlToggleBtns = document.querySelectorAll('.rtl-toggle, .rtl-toggle-mobile');
    const currentRtl = localStorage.getItem('rtl');
    
    if (currentRtl === 'true') {
        document.documentElement.setAttribute('dir', 'rtl');
    }

    rtlToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
            if (isRtl) {
                document.documentElement.removeAttribute('dir');
                localStorage.setItem('rtl', 'false');
            } else {
                document.documentElement.setAttribute('dir', 'rtl');
                localStorage.setItem('rtl', 'true');
            }
        });
    });

    // Mobile Sidebar Toggle (Main Site)
    const hamburger = document.querySelector('.hamburger');
    const mobileSidebar = document.querySelector('.mobile-sidebar');
    const mobileSidebarOverlay = document.querySelector('.mobile-sidebar-overlay');
    const closeSidebar = document.querySelector('.close-sidebar');

    function openMobileSidebar() {
        if (mobileSidebar) mobileSidebar.classList.add('show');
        if (mobileSidebarOverlay) mobileSidebarOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileSidebar() {
        if (mobileSidebar) mobileSidebar.classList.remove('show');
        if (mobileSidebarOverlay) mobileSidebarOverlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', openMobileSidebar);
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', closeMobileSidebar);
    }

    if (mobileSidebarOverlay) {
        mobileSidebarOverlay.addEventListener('click', closeMobileSidebar);
    }

    // Dashboard Sidebar Toggle (Mobile/Tablet)
    const sidebarToggleBtn = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    if (sidebarToggleBtn && sidebar && sidebarOverlay) {
        sidebarToggleBtn.addEventListener('click', () => {
            sidebar.classList.add('show');
            sidebarOverlay.classList.add('show');
        });

        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('show');
            sidebarOverlay.classList.remove('show');
        });
    }

    // Form Validation Feedback
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic visual feedback for submit
            const btn = form.querySelector('button[type="submit"]');
            if (btn) {
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
                btn.disabled = true;
                
                setTimeout(() => {
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Success';
                    btn.classList.replace('btn-primary', 'btn-accent');
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.classList.replace('btn-accent', 'btn-primary');
                        btn.disabled = false;
                        form.reset();
                    }, 2000);
                }, 1500);
            }
        });
    });

    // Password strength indicator (Register Page)
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const strengthIndicator = document.getElementById('strength-indicator');
    
    if (passwordInput && strengthIndicator) {
        passwordInput.addEventListener('input', () => {
            const val = passwordInput.value;
            if (val.length === 0) strengthIndicator.style.width = '0';
            else if (val.length < 6) { strengthIndicator.style.width = '33%'; strengthIndicator.style.backgroundColor = '#EF4444'; }
            else if (val.length < 10) { strengthIndicator.style.width = '66%'; strengthIndicator.style.backgroundColor = '#F59E0B'; }
            else { strengthIndicator.style.width = '100%'; strengthIndicator.style.backgroundColor = '#10B981'; }
        });
    }

    // Password match validation
    if (passwordInput && confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', () => {
            if (confirmPasswordInput.value === passwordInput.value) {
                confirmPasswordInput.style.borderColor = '#10B981';
            } else {
                confirmPasswordInput.style.borderColor = '#EF4444';
            }
        });
    }
    
    // Toggle Password Visibility
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
            } else {
                input.type = 'password';
                btn.innerHTML = '<i class="fa-solid fa-eye"></i>';
            }
        });
    });

    // Register Checkbox validation
    const termsCheckbox = document.getElementById('terms');
    const registerBtn = document.getElementById('registerBtn');
    if (termsCheckbox && registerBtn) {
        registerBtn.disabled = !termsCheckbox.checked;
        termsCheckbox.addEventListener('change', () => {
            registerBtn.disabled = !termsCheckbox.checked;
        });
    }
    
    // Auth redirect
    const loginLink = document.querySelectorAll('a[href="login.html"]');
    if (loginLink.length > 0) {
        // Just handling typical links normally
    }

    // Pricing Toggle
    const pricingToggle = document.getElementById('pricingToggle');
    const priceBasic = document.getElementById('priceBasic');
    const priceStandard = document.getElementById('priceStandard');
    const pricePremium = document.getElementById('pricePremium');

    if (pricingToggle && priceBasic && priceStandard && pricePremium) {
        pricingToggle.addEventListener('change', (e) => {
            if (e.target.checked) { // Office
                priceBasic.innerText = '$39';
                priceStandard.innerText = '$59';
                pricePremium.innerText = '$99';
            } else { // Home
                priceBasic.innerText = '$29';
                priceStandard.innerText = '$49';
                pricePremium.innerText = '$89';
            }
        });
    }
});
