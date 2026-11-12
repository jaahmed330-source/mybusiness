
// ==========================================
// MYBUSINESS - MAIN JAVASCRIPT
// ==========================================

// ELEMENTE

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const yearElement = document.getElementById("year");
const backToTop = document.querySelector(".back-to-top");


// ==========================================
// 1. AKTUELLES JAHR
// ==========================================

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// ==========================================
// 2. MOBILE NAVIGATION
// ==========================================

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navigation.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Menü schließen" : "Menü öffnen"
        );
    });

    navigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navigation.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Menü öffnen");
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            navigation.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}


// ==========================================
// 3. SCROLL ANIMATION
// ==========================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}


// ==========================================
// 4. BACK TO TOP
// ==========================================

function updateBackToTop() {
    if (!backToTop) return;

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
}

window.addEventListener("scroll", updateBackToTop, {
    passive: true
});

updateBackToTop();


// ==========================================
// 5. AI IDEA GENERATOR - LOKALE DEMO
// ==========================================

const aiForm = document.getElementById("aiForm");
const aiPrompt = document.getElementById("aiPrompt");
const aiOutput = document.getElementById("aiOutput");
const suggestionButtons = document.querySelectorAll(".suggestion");

function createIdeaResponse(userIdea) {
    const idea = userIdea.toLowerCase();

    let title = "Deine digitale Idee";
    let description = "Starte mit einer klaren Zielgruppe, einem modernen Design und einer einfachen Benutzerführung.";
    let features = "Klare Startseite, intuitive Navigation, responsives Design";

    if (
        idea.includes("restaurant") ||
        idea.includes("essen") ||
        idea.includes("cafe") ||
        idea.includes("café")
    ) {
        title = "Restaurant Website";
        description = "Ein eleganter Online-Auftritt, auf dem Gäste das Restaurant entdecken und wichtige Informationen schnell finden.";
        features = "Speisekarte, Öffnungszeiten, Bildergalerie, Reservierungsanfrage";
    } else if (
        idea.includes("shop") ||
        idea.includes("verkauf") ||
        idea.includes("produkt")
    ) {
        title = "Online-Shop";
        description = "Ein moderner Shop mit einer übersichtlichen Produktdarstellung und einem einfachen Einkaufserlebnis.";
        features = "Produktseiten, Kategorien, Warenkorb-Konzept, Suchfunktion";
    } else if (
        idea.includes("ki") ||
        idea.includes("ai") ||
        idea.includes("künstliche intelligenz") ||
        idea.includes("intelligenz")
    ) {
        title = "AI Web Application";
        description = "Eine intelligente Web-Anwendung, die eine konkrete Aufgabe erleichtert und eine klare Benutzeroberfläche bietet.";
        features = "Chat-Oberfläche, Eingabefeld, Ergebnisbereich, sichere API-Anbindung";
    } else if (
        idea.includes("spiel") ||
        idea.includes("game") ||
        idea.includes("gaming")
    ) {
        title = "Gaming Plattform";
        description = "Eine moderne Plattform, die Spieler, Inhalte und Community-Funktionen übersichtlich verbindet.";
        features = "Spielprofile, Ranglisten, News-Bereich, Community";
    } else if (
        idea.includes("portfolio") ||
        idea.includes("designer") ||
        idea.includes("fotograf")
    ) {
        title = "Personal Portfolio";
        description = "Eine hochwertige persönliche Website, die Projekte und Fähigkeiten professionell präsentiert.";
        features = "Projektgalerie, Über-mich-Bereich, Kontakt, persönliche Marke";
    }

    return {
        title: title,
        description: description,
        features: features
    };
}

function showIdeaResponse(userIdea) {
    const cleanIdea = userIdea.trim();

    if (!cleanIdea) {
        aiOutput.textContent = "Bitte beschreibe zuerst deine Idee.";
        return;
    }

    if (cleanIdea.length < 3) {
        aiOutput.textContent = "Schreib bitte etwas mehr über deine Idee.";
        return;
    }

    const result = createIdeaResponse(cleanIdea);

    // Inhalte sicher als Text darstellen
    aiOutput.replaceChildren();

    const heading = document.createElement("strong");
    heading.textContent = result.title;

    const description = document.createElement("p");
    description.textContent = result.description;

    const features = document.createElement("p");
    features.textContent = "Mögliche Funktionen: " + result.features + ".";

    features.style.marginTop = "8px";

    aiOutput.append(heading, description, features);
}

if (aiForm && aiPrompt && aiOutput) {
    aiForm.addEventListener("submit", function (event) {
        event.preventDefault();

        showIdeaResponse(aiPrompt.value);
    });

    suggestionButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const prompt = button.dataset.prompt;

            aiPrompt.value = prompt;
            showIdeaResponse(prompt);
        });
    });
}


// ==========================================
// 6. KONTAKTFORMULAR - DEMO
// ==========================================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        if (!name || !email || !message) {
            formStatus.textContent = "Bitte fülle alle Felder aus.";
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            formStatus.textContent = "Bitte gib eine gültige E-Mail-Adresse ein.";
            return;
        }

        formStatus.textContent =
            "Danke, " + name + "! Deine Eingaben wurden lokal getestet. Es wurde noch keine Nachricht versendet.";

        contactForm.reset();
    });
}


// ==========================================
// 7. BILDER-FEHLER ABFEDERN
// ==========================================

document.querySelectorAll("img").forEach(function (image) {
    image.addEventListener("error", function () {
        image.style.opacity = "0.25";
        image.alt = "Bild momentan nicht verfügbar";
    });
});
