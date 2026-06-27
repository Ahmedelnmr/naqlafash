// ملف التفاعل الديناميكي للموقع

document.addEventListener("DOMContentLoaded", () => {
    // 1. تحميل الإعدادات من ملف config.js وحقنها في الصفحة
    initAppConfiguration();

    // 2. تفعيل القائمة المتجاوبة للهواتف (Mobile Menu)
    initMobileMenu();

    // 3. تفعيل الأكورديون للأسئلة الشائعة (FAQ Accordion)
    initFaqAccordion();

    // 4. تفعيل فلتر مناطق الكويت التفاعلي
    initAreasFilter();

    // 5. تأثيرات ظهور العناصر عند التمرير (Scroll Reveal Animations)
    initScrollAnimations();
});

// حقن البيانات من config.js في عناصر HTML
function initAppConfiguration() {
    if (typeof CONFIG === "undefined") {
        console.error("ملف الإعدادات config.js غير موجود أو لم يتم تحميله بشكل صحيح.");
        return;
    }

    // حقن اسم الشركة
    document.querySelectorAll('[data-config="companyName"]').forEach(el => {
        el.textContent = CONFIG.companyName;
    });

    // حقن رقم الهاتف كنص
    document.querySelectorAll('[data-config="phoneNumber"]').forEach(el => {
        el.textContent = CONFIG.phoneNumber;
    });

    // حقن أوقات العمل
    document.querySelectorAll('[data-config="workingHours"]').forEach(el => {
        el.textContent = CONFIG.workingHours;
    });

    // حقن سعر البداية
    document.querySelectorAll('[data-config="startingPrice"]').forEach(el => {
        el.textContent = CONFIG.startingPrice;
    });

    // حقن سنة الحقوق
    document.querySelectorAll('[data-config="copyrightYear"]').forEach(el => {
        el.textContent = CONFIG.copyrightYear;
    });

    // تحديث روابط الاتصال الهاتفي tel:
    document.querySelectorAll('.config-call-href').forEach(link => {
        link.setAttribute('href', `tel:${CONFIG.phoneNumber}`);
    });

    // تحديث روابط الواتساب https://wa.me/
    const encodedMsg = encodeURIComponent(CONFIG.whatsappMessage);
    document.querySelectorAll('.config-whatsapp-href').forEach(link => {
        link.setAttribute('href', `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMsg}`);
    });
}

// قائمة الهاتف المحمول
function initMobileMenu() {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.getElementById("nav-links");
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            menuBtn.classList.toggle("active");
            
            // تغيير أيقونة الزر
            const icon = menuBtn.querySelector("i");
            if (icon) {
                if (navLinks.classList.contains("open")) {
                    icon.className = "fas fa-times";
                } else {
                    icon.className = "fas fa-bars";
                }
            }
        });

        // إغلاق القائمة عند النقر على أي رابط
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuBtn.classList.remove("active");
                const icon = menuBtn.querySelector("i");
                if (icon) icon.className = "fas fa-bars";
            });
        });
    }
}

// الأسئلة الشائعة
function initFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");
    
    faqItems.forEach(item => {
        const questionBtn = item.querySelector(".faq-question");
        
        if (questionBtn) {
            questionBtn.addEventListener("click", () => {
                const isOpen = item.classList.contains("active");
                
                // إغلاق بقية الأسئلة المفتوحة للحفاظ على مظهر نظيف
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove("active");
                });
                
                // فتح أو إغلاق السؤال الحالي
                if (!isOpen) {
                    item.classList.add("active");
                }
            });
        }
    });
}

// فلتر مناطق الكويت
function initAreasFilter() {
    const filterButtons = document.querySelectorAll(".gov-btn");
    const areaCards = document.querySelectorAll(".area-card");
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                // إزالة فئة النشط من جميع الأزرار
                filterButtons.forEach(b => b.classList.remove("active"));
                // إضافة فئة النشط للزر الحالي
                btn.classList.add("active");
                
                const selectedGov = btn.getAttribute("data-gov");
                
                // إخفاء أو إظهار المناطق بناءً على المحافظة
                areaCards.forEach(card => {
                    if (selectedGov === "all" || card.getAttribute("data-gov") === selectedGov) {
                        card.style.display = "flex";
                        // تأثير حركة لطيف عند التصفية
                        card.style.opacity = "0";
                        setTimeout(() => {
                            card.style.opacity = "1";
                        }, 50);
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    }
}

// تأثيرات التمرير وظهور العناصر (Scroll Reveal)
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                observer.unobserve(entry.target); // تشغيل التأثير مرة واحدة فقط
            }
        });
    }, observerOptions);
    
    // إضافة فئة التحضير للتأثير على العناصر
    const revealElements = document.querySelectorAll(".reveal-fade, .reveal-slide-up, .reveal-slide-right, .reveal-slide-left");
    revealElements.forEach(el => {
        observer.observe(el);
    });
}
