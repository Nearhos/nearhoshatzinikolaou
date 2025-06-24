// Improved type-on-view implementation that works with your existing HTML
document.addEventListener("scroll", () => {
    document.querySelector(".nav").style.background = "rgba(0, 0, 0, 0.9)";
});

const projects = [
    { name: "Epilepsee - Built models using NumPy and Pandas in Python to classify seizure vs non-seizure data with a highest accuracy rate of 98.48% using an SVM model.", link: "https://github.com/Nearhos/SeeSureAlpha1.0" },
    { name: "Lead2LED - Transforming handwriting into e-ink using a pen attachment using Xiao MCU", link: "https://www.linkedin.com/feed/update/urn:li:activity:7287552690727927809/" },
    { name: "Helping Hand - OpenCV Text to Braille Glove using Arduino", link: "https://www.linkedin.com/feed/update/urn:li:activity:7165458108922720256/" },
    { name: "Tempasure - An LSTM-based temperature prediction model that forecasts future temperatures using historical climate data from the Jena Climate Dataset.", link: "https://github.com/Nearhos/Tempasure/blob/main/tempasure.ipynb" },
    { name: "DieSEEse - Implemented NLP to extract key symptoms from EHR data for disease prediction. Developed a Random Forest Classifier trained on TF-IDF vectorized symptom descriptions. Achieved 89% accuracy on the training dataset for disease classification.", link: "https://github.com/Nearhos/nlpdieaseprediction/blob/main/dieaseprediction.py" },
    { name: "Waiter2Go! - Implemented KMeans clustering to categorize waiters into performance tiers and LSTM models to predict future tipping trends.", link: "https://github.com/Nearhos/Waiter2go-" }
];

function createProjectElements() {
    const container = document.getElementById("projects-container");
    if (!container) return;
    
    container.innerHTML = "";
    projects.forEach((_, index) => {
        const projectDiv = document.createElement("p");
        projectDiv.className = "project-card";
        
        const projectLink = document.createElement("a");
        projectLink.className = "green-link type-effect";
        projectLink.id = "project" + index;
        projectLink.target = "_blank";
        
        projectDiv.appendChild(projectLink);
        container.appendChild(projectDiv);
    });
}

function typeEffect(element) {
    if (element.classList.contains("typed") || element.classList.contains("typing-active")) {
        return;
    }

    element.classList.add("typing-active");
    
    const isProjectElement = element.classList.contains('green-link') && element.id.startsWith('project');
    
    if (isProjectElement) {
        const projectIndex = parseInt(element.id.replace('project', '')) || 0;
        const currentProject = projects[projectIndex];
        
        if (currentProject) {
            let i = 0;
            element.innerHTML = '';
            element.href = currentProject.link;
            
            const typeNextCharacter = () => {
                if (i < currentProject.name.length) {
                    element.textContent += currentProject.name.charAt(i);
                    i++;
                    requestAnimationFrame(typeNextCharacter);
                } else {
                    element.classList.add("typed");
                    element.classList.remove("typing-active");
                }
            };
            
            typeNextCharacter();
        }
        return;
    }
    
    // For non-project elements
    const text = element.innerHTML;
    element.innerHTML = "";

    const span = document.createElement("span");
    span.classList.add("typing");
    element.appendChild(span);

    let i = 0;
    const typeCharacter = () => {
        if (i < text.length) {
            if (text[i] === "<") {
                const endIndex = text.indexOf(">", i);
                if (endIndex !== -1) {
                    span.innerHTML += text.substring(i, endIndex + 1);
                    i = endIndex;
                }
            } else {
                span.innerHTML += text[i];
            }
            i++;
            requestAnimationFrame(typeCharacter);
        } else {
            span.style.borderRight = "none";
            element.classList.add("typed");
            element.classList.remove("typing-active");
        }
    };
    
    typeCharacter();
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight + 100) &&
        rect.bottom >= -100
    );
}

document.addEventListener("DOMContentLoaded", () => {
    createProjectElements();
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Setup IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elements = entry.target.querySelectorAll?.(".type-effect:not(.typing-active):not(.typed)") || [];
                elements.forEach(el => {
                    if (isElementInViewport(el)) {
                        typeEffect(el);
                    }
                });
                
                if (entry.target.classList?.contains("type-effect") && 
                    !entry.target.classList.contains("typing-active") && 
                    !entry.target.classList.contains("typed")) {
                    typeEffect(entry.target);
                }
            }
        });
    }, { threshold: 0.05, rootMargin: "100px 0px 100px 0px" });

    // Observe all sections and type-effect elements
    document.querySelectorAll(".section, .type-effect").forEach(element => {
        observer.observe(element);
    });

    // Initial check after load
    setTimeout(() => {
        document.querySelectorAll(".type-effect:not(.typing-active):not(.typed)").forEach(el => {
            if (isElementInViewport(el)) {
                typeEffect(el);
            }
        });
    }, 500);

    // Backup periodic check
    const backupCheck = setInterval(() => {
        const elements = document.querySelectorAll(".type-effect:not(.typing-active):not(.typed)");
        if (elements.length === 0) {
            clearInterval(backupCheck);
            return;
        }
        elements.forEach(el => {
            if (isElementInViewport(el)) {
                typeEffect(el);
            }
        });
    }, 1000);
});

// Contact form handling function
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link with form data
    const mailtoLink = `mailto:nearhos.hatzinikolaou22@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Email client opened! Please send the message.', 'success');
    
    // Reset form
    event.target.reset();
}

// Notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#50fa7b' : '#ff79c6'};
        color: ${type === 'success' ? '#000' : '#fff'};
        padding: 15px 20px;
        border-radius: 5px;
        font-family: "Courier New", Courier, monospace;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
} 