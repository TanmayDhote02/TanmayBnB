// Premium UI Animations

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // 1. 3D Tilt Effect for Property Cards
    // ----------------------------------------------------
    const cards = document.querySelectorAll(".listing-card");

    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse X position within element
            const y = e.clientY - rect.top;  // Mouse Y position within element

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation. Adjust multiplier for stronger/weaker effect
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        // Reset transform on mouse leave
        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        });
    });

    // ----------------------------------------------------
    // 2. Magnetic Buttons Effect
    // ----------------------------------------------------
    // Select prominent buttons, filter pills, etc.
    const magneticElements = document.querySelectorAll('.filter, .btn, .nav-user');

    magneticElements.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const h = rect.width / 2;
            const v = rect.height / 2;

            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - v;

            // Move the button slightly towards the cursor
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            // Smoothly snap back to original position
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // ----------------------------------------------------
    // 3. Heart Burst Animation
    // ----------------------------------------------------
    const hearts = document.querySelectorAll('.heart');

    hearts.forEach(heart => {
        heart.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default link behavior if inside anchor

            // Add bursting animation class
            this.classList.add('heart-burst');

            // Optional: Toggle color visually immediately for feedback 
            // (Assuming black/red overlap logic exists, this just ensures a visual pop)
            if (this.classList.contains('heart-b')) {
                this.style.opacity = '0';
                const siblingRed = this.parentElement.querySelector('.heart-r');
                if (siblingRed) {
                    siblingRed.classList.add('heart-burst');
                    siblingRed.style.opacity = '1';
                }
            } else {
                this.style.opacity = '0';
                const siblingBlack = this.parentElement.querySelector('.heart-b');
                if (siblingBlack) {
                    siblingBlack.style.opacity = '1';
                }
            }

            // Remove class after animation completes so it can be triggered again
            setTimeout(() => {
                this.classList.remove('heart-burst');
                const siblingRed = this.parentElement.querySelector('.heart-r');
                if (siblingRed) siblingRed.classList.remove('heart-burst');
            }, 600); // Matches CSS animation duration
        });
    });
});
