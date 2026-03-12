document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 3. QR Code Generator logic
    const qrModal = document.getElementById('qrModal');
    const generateQRBtn = document.getElementById('generateQRBtn');
    const closeModal = document.getElementById('closeModal');
    const qrcodeContainer = document.getElementById('qrcode-container');
    const displayUrl = document.getElementById('displayUrl');

    let qrCodeInstance = null;

    // Open Modal and generate QR
    generateQRBtn.addEventListener('click', () => {
        qrModal.classList.add('active');
        
        // Use current URL to generate QR, fallback if file protocol
        let currentUrl = window.location.href;
        if(currentUrl.startsWith('file://')) {
            // Placeholder URL if opened locally
            currentUrl = 'https://iglesia-nueva-esperanza.example.com'; 
        }

        displayUrl.textContent = currentUrl;

        // Clear previous QR if exists
        qrcodeContainer.innerHTML = '';
        
        // Generate new QR Code
        qrCodeInstance = new QRCode(qrcodeContainer, {
            text: currentUrl,
            width: 200,
            height: 200,
            colorDark : "#0f172a",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    });

    // Close Modal by button
    closeModal.addEventListener('click', () => {
        qrModal.classList.remove('active');
    });

    // Close modal by clicking outside
    qrModal.addEventListener('click', (e) => {
        if (e.target === qrModal) {
            qrModal.classList.remove('active');
        }
    });
});
