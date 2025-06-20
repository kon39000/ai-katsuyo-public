// Countdown Timer
function updateCountdown() {
    const eventDate = new Date('2025-06-28T11:30:00+09:00');
    const now = new Date();
    const timeLeft = eventDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    } else {
        document.getElementById('countdown').innerHTML = '<p style="color: white; font-weight: bold;">🎉 イベント開催中！</p>';
    }
}

// Dynamic seat counter
function updateSeatCounter() {
    const totalSeats = 500;
    const baseBooked = 318; // 64% of 500
    const randomVariation = Math.floor(Math.random() * 10) - 5;
    const currentBooked = Math.min(totalSeats - 5, baseBooked + randomVariation);
    const remaining = totalSeats - currentBooked;
    const percentage = (currentBooked / totalSeats) * 100;
    
    document.getElementById('remaining-seats').textContent = `残り${remaining}席`;
    document.querySelector('.seats-filled').style.width = `${percentage}%`;
    document.querySelector('.seats-text').textContent = `${totalSeats}名定員の${Math.round(percentage)}%が埋まりました`;
}

// FAQ Toggle
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to schedule items
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to schedule items
document.addEventListener('DOMContentLoaded', () => {
    const scheduleItems = document.querySelectorAll('.schedule-item');
    
    scheduleItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Add hover effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click tracking for analytics (placeholder)
    const applyButton = document.querySelectorAll('a[href*="peatix.com"]');
    applyButton.forEach(button => {
        button.addEventListener('click', () => {
            // Analytics tracking can be added here
            console.log('申し込みボタンがクリックされました');
        });
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    updateSeatCounter();
    initFAQ();
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    
    // Update seat counter every 30 seconds
    setInterval(updateSeatCounter, 30000);
});

// Mobile menu handling (if needed for future expansion)
const handleResize = () => {
    const width = window.innerWidth;
    if (width <= 768) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
};

window.addEventListener('resize', handleResize);
handleResize(); // Initial call