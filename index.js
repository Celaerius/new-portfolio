/* ---- Terminal typewriter animation ---- */
(function () {
    const lines = [
        { text: '<span class="t-keyword">const</span> <span class="t-func">developer</span> = {', delay: 0 },
        { text: '  <span class="t-prop">name</span>: <span class="t-string">"Charles-Edouard Robine"</span>,', delay: 60 },
        { text: '  <span class="t-prop">role</span>: <span class="t-string">"Full-Stack Developer"</span>,', delay: 60 },
        { text: '  <span class="t-prop">skills</span>: [', delay: 60 },
        { text: '    <span class="t-string">"JavaScript"</span>, <span class="t-string">"HTML"</span>, <span class="t-string">"CSS"</span>,', delay: 60 },
        { text: '    <span class="t-string">"Node.js"</span>, <span class="t-string">"React"</span>,', delay: 60 },
        { text: '  ],', delay: 60 },
        { text: '  <span class="t-prop">available</span>: <span class="t-value">true</span>,', delay: 60 },
        { text: '', delay: 30 },
        { text: '  <span class="t-func">hello</span>() {', delay: 60 },
        { text: '    <span class="t-keyword">return</span> <span class="t-string">"Bienvenue sur mon portfolio !"</span>;', delay: 60 },
        { text: '  }', delay: 40 },
        { text: '};', delay: 40 },
        { text: '', delay: 30 },
        { text: '<span class="t-comment">// Prêt à relever de nouveaux défis</span>', delay: 60 },
        { text: '<span class="t-func">developer</span>.<span class="t-func">hello</span>();', delay: 60 },
    ];

    const container = document.getElementById('terminal-code');
    if (!container) return;

    let lineIndex = 0;
    let charIndex = 0;
    let currentHTML = '';
    let displayedLines = [];

    const cursor = '<span class="terminal__cursor"></span>';

    function renderLines() {
        container.innerHTML = displayedLines.join('\n') + (currentHTML ? '\n' + currentHTML : '') + cursor;
    }

    function typeNext() {
        if (lineIndex >= lines.length) {
            // Animation terminée, curseur reste visible
            container.innerHTML = displayedLines.join('\n') + cursor;
            return;
        }

        const line = lines[lineIndex];
        // On travaille sur le texte brut pour compter les caractères
        // mais on affiche le HTML enrichi progressivement par ligne complète
        const raw = line.text.replace(/<[^>]+>/g, '');

        if (charIndex === 0 && raw.length === 0) {
            // Ligne vide
            displayedLines.push('');
            lineIndex++;
            renderLines();
            setTimeout(typeNext, line.delay);
            return;
        }

        if (charIndex < raw.length) {
            charIndex++;
            // On révèle le HTML au prorata des caractères visibles
            currentHTML = revealHTML(line.text, charIndex);
            renderLines();
            setTimeout(typeNext, line.delay / raw.length * 2 + 18);
        } else {
            displayedLines.push(line.text);
            currentHTML = '';
            charIndex = 0;
            lineIndex++;
            renderLines();
            setTimeout(typeNext, lines[lineIndex - 1].delay + 80);
        }
    }

    // Révèle les N premiers caractères visibles d'une chaîne HTML
    function revealHTML(html, visibleCount) {
        let visible = 0;
        let result = '';
        let inTag = false;

        for (let i = 0; i < html.length; i++) {
            const ch = html[i];
            if (ch === '<') { inTag = true; }
            if (inTag) {
                result += ch;
                if (ch === '>') inTag = false;
            } else {
                if (visible < visibleCount) {
                    result += ch;
                    visible++;
                } else {
                    break;
                }
            }
        }
        // Ferme les balises ouvertes
        const openTags = [];
        const tagRe = /<(\/?)([\w-]+)[^>]*>/g;
        let m;
        while ((m = tagRe.exec(result)) !== null) {
            if (m[1] === '/') openTags.pop();
            else openTags.push(m[2]);
        }
        for (let i = openTags.length - 1; i >= 0; i--) {
            result += '</' + openTags[i] + '>';
        }
        return result;
    }

    setTimeout(typeNext, 600);
})();

/* ---- EmailJS ---- */
// Remplace les trois valeurs ci-dessous par tes identifiants EmailJS
// (Account > API Keys pour la clé publique, Email Services et Email Templates pour les IDs)
emailjs.init('i-0F8yFDshTFpeu-I');

/* ---- Sécurisation et envoi du formulaire ---- */
(function () {
    const form = document.getElementById('contact-form');
    const errorBox = document.getElementById('form-error');
    const successBox = document.getElementById('form-success');

    function sanitize(str) {
        return str.replace(/[<>"'`]/g, '').trim();
    }

    function isValidEmail(email) {
        return /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(email);
    }

    function showError(msg) {
        errorBox.textContent = msg;
        errorBox.style.display = 'block';
        successBox.style.display = 'none';
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        errorBox.style.display = 'none';
        successBox.style.display = 'none';

        const name = sanitize(document.getElementById('name').value);
        const email = sanitize(document.getElementById('email').value);
        const message = sanitize(document.getElementById('message').value);

        if (name.length < 2) return showError('Le nom doit contenir au moins 2 caractères.');
        if (name.length > 100) return showError('Le nom est trop long (max 100 caractères).');
        if (!isValidEmail(email)) return showError('Adresse email invalide.');
        if (message.length < 10) return showError('Le message doit contenir au moins 10 caractères.');
        if (message.length > 2000) return showError('Le message est trop long (max 2000 caractères).');

        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Envoi en cours...';

        try {
            await emailjs.sendForm('service_78233ad', 'template_jgfp59n', form);
            successBox.style.display = 'block';
            form.reset();
        } catch {
            showError("Erreur lors de l'envoi. Réessayez plus tard.");
        } finally {
            btn.disabled = false;
            btn.textContent = 'Envoyer le message';
        }
    });
})();

/* ---- Particles.js config ---- */
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#0891b2" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#0891b2",
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            out_mode: "out"
        }
    },
    interactivity: {
        events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" }
        },
        modes: {
            grab: { distance: 140, line_linked: { opacity: 0.5 } },
            push: { particles_nb: 4 }
        }
    }
});

/* ---- Slideshow des cartes projet ---- */
document.querySelectorAll('.project-card[data-images]').forEach(function (card) {
    const images = JSON.parse(card.dataset.images);
    let current = 0;
    let animating = false;

    // Déplacer le background-image du card vers un div dédié
    const bg = document.createElement('div');
    bg.className = 'card-bg';
    bg.style.backgroundImage = card.style.backgroundImage;
    card.style.backgroundImage = '';
    card.prepend(bg);

    // Créer les dots
    const dotsContainer = card.querySelector('.card-dots');
    images.forEach(function (_, i) {
        const dot = document.createElement('span');
        dot.className = 'card-dot' + (i === 0 ? ' card-dot--active' : '');
        dot.addEventListener('click', function (e) {
            e.stopPropagation();
            goTo(i);
        });
        dotsContainer.appendChild(dot);
    });

    function goTo(index) {
        if (animating || index === current) return;
        animating = true;
        current = (index + images.length) % images.length;

        bg.style.opacity = '0';
        setTimeout(function () {
            bg.style.backgroundImage = "url('" + images[current] + "')";
            bg.style.opacity = '1';
            dotsContainer.querySelectorAll('.card-dot').forEach(function (d, i) {
                d.classList.toggle('card-dot--active', i === current);
            });
            setTimeout(function () { animating = false; }, 400);
        }, 350);
    }

    card.querySelector('.card-nav--prev').addEventListener('click', function (e) {
        e.stopPropagation();
        goTo(current - 1);
    });

    card.querySelector('.card-nav--next').addEventListener('click', function (e) {
        e.stopPropagation();
        goTo(current + 1);
    });
});

/* ---- Header scroll + smooth scroll ---- */
window.addEventListener('scroll', function () {
    document.querySelector('.header').classList.toggle('header--scrolled', window.scrollY > 50);
});

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        }
    });
});
