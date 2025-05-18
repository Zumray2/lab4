document.addEventListener('DOMContentLoaded', () => {
    const cvDataFromLocalStorage = localStorage.getItem('cvData');
    const cvData = cvDataFromLocalStorage ? JSON.parse(cvDataFromLocalStorage) : {
      "Şəxsi məlumatlar": {
        "Ad": "Şərifova Zümray",
        "Status": "Tələbə",
        "Doğum tarixi": "16.07.2007",
        "Telefon": "051-627-33-55",
        "Email": "zumraysherifova@gmail.com",
        "Ünvan": "Bakı şəhəri, Yasamal rayonu, Mətbuat prospekti 56"
      },
      "Bacarıqlar": [
        "Linux əməliyyat sistemi ilə işləmək",
        "Proqramlaşdırma dilləri (Python, C++ və s.)",
        "Frontend Texnologiyaları (HTML, CSS və s.)",
        "Ofis Proqramları (Word, Excel, PowerPoint)",
        "Komanda ilə işləmək və ünsiyyət bacarığı",
        "Zamanı düzgün idarə etmək və planlama bacarığı"
      ],
      "Dillər": [
        { "Dil": "English", "Səviyyə": "Elementary" },
        { "Dil": "Türk", "Səviyyə": "Çox yaxşı" },
        { "Dil": "Azərbaycan", "Səviyyə": "Çox yaxşı" }
      ],
      "Təhsil": [
        { "məktəb": "Qəbələ rayon Həmzəlli kənd tam orta məktəbi", "müddət": "(2013–2024)" },
        { "universitet": "Azərbaycan Texniki Universiteti", "ixtisas": "İnformasiya Təhlükəsizliyi", "müddət": "(2024–2028)" }
      ],
      "Şəxsi Keyfiyyətlər": [
        "Yüksək məsuliyyət və etibarlılıq",
        "Yeni biliklər öyrənməyə və inkişaf etdirməyə açıq",
        "Planlı və məqsədyönlü şəkildə işləmək",
        "Yaradıcı yanaşma və problem həll etmə bacarığı",
        "Komandada işləmək və müstəqil qərarlar verə bilmək",
        "Sakit, amma effektiv ünsiyyət bacarığı",
        "Təhlükəsizlik və məlumat mühafizəsi mövzusunda diqqətçil",
        "Gərgin şəraitdə sakit qalaraq səmərəli nəticə əldə edə bilmək"
      ],
      "Haqqımda": "Özünü inkişaf etdirməyə çalışan,məsuliyyətli və səbirli bir insanam.Hal-hazırda informasiya təhlükəsizliyi sahəsində təhsil alıram və bu sahədə peşəkar olmaq üçün daim yeni biliklər öyrənməyə çalışıram.Texnologiyalara marağım böyükdür və praktiki təcrübə qazanmaq üçün fərdi layihələr üzərində işləyirəm. Komandada işləməyi bacarıram, amma müstəqil işləyərkən də məsuliyyətlə yanaşıram. Eyni zamanda sakit və diqqətli xarakterə sahibəm.",
      "İş təcrübəsi": "Yoxdur",
      "Hobbi və Maraqlar": [ // Changed to array
        "Kitab oxumaq və yeni biliklər əldə etmək",
        "Musiqi dinləmək",
        "Xarici dillər öyrənmək",
        "Texnologiya və kibertəhlükəsizlik sahəsində araşdırmalar aparmaq",
        "Yemək bişirməyə maraq göstərmək"
      ]
    };

    // --- Element Getters ---
    const nameEl = document.getElementById('name');
    const statusEl = document.getElementById('status');
    const dateEl = document.getElementById('date');
    const phoneEl = document.getElementById('phone');
    const emailEl = document.getElementById('email');
    const locationEl = document.getElementById('location');

    const skillsListEl = document.getElementById('skills-list');
    const newSkillInputEl = document.getElementById('new-skill-input');
    const addSkillBtnEl = document.getElementById('add-skill-btn');

    const languagesListEl = document.getElementById('languages-list');
    const newLangInputEl = document.getElementById('new-language-input');
    const newLangLevelInputEl = document.getElementById('new-language-level-input');
    const addLangBtnEl = document.getElementById('add-language-btn');

    const educationContentEl = document.getElementById('education-content'); // Remains for hardcoded/simple text
    const personalQualitiesListEl = document.getElementById('personal-qualities-list');
    const aboutContentEl = document.getElementById('about-content');
    const experienceContentEl = document.getElementById('experience-content');
    
    const hobbiesListEl = document.getElementById('hobbies-list'); // New
    const newHobbyInputEl = document.getElementById('new-hobby-input'); // New
    const addHobbyBtnEl = document.getElementById('add-hobby-btn'); // New


    const saveToLocalStorageBtnEl = document.getElementById('save-to-localstorage-btn');

    saveToLocalStorageBtnEl.addEventListener('click', (e) => {
        e.target.innerHTML = 'Saved!';
        localStorage.setItem('cvData', JSON.stringify(cvData));
    });

    // --- Render Functions ---
    function renderSkills() {
        skillsListEl.innerHTML = '';
        cvData.Bacarıqlar.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillsListEl.appendChild(li);
        });
    }

    function renderLanguages() {
        languagesListEl.innerHTML = '';
        cvData.Dillər.forEach(lang => {
            const li = document.createElement('li');
            li.textContent = `${lang.Dil} - ${lang.Səviyyə}`;
            languagesListEl.appendChild(li);
        });
    }

    function renderPersonalQualities() {
        personalQualitiesListEl.innerHTML = '';
        cvData['Şəxsi Keyfiyyətlər'].forEach(quality => {
            const li = document.createElement('li');
            li.textContent = quality;
            personalQualitiesListEl.appendChild(li);
        });
    }

    const editDateBtnEl = document.getElementById('edit-date-btn');
    const editEmailBtnEl = document.getElementById('edit-email-btn');
    
    function validateDate(date) {
        const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
        return dateRegex.test(date);
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function editDate() {
        const newDate = prompt('Yeni doğum tarixi:', dateEl.textContent);
        if (newDate) {
            if (!validateDate(newDate)) {
                alert('Yanlış tarix formatı! (dd.mm.yyyy)');
                return;
            }
            cvData['Şəxsi məlumatlar']['Doğum tarixi'] = newDate;
            dateEl.textContent = newDate;
            localStorage.setItem('cvData', JSON.stringify(cvData));
        }
    }

    function editEmail() {
        const newEmail = prompt('Yeni email:', emailEl.textContent);
        if (newEmail) {
            if (!validateEmail(newEmail)) {
                alert('Yanlış email formatı!');
                return;
            }
            cvData['Şəxsi məlumatlar']['Email'] = newEmail;
            emailEl.textContent = newEmail;
            localStorage.setItem('cvData', JSON.stringify(cvData));
        }
    }

    editDateBtnEl.addEventListener('click', editDate);
    editEmailBtnEl.addEventListener('click', editEmail);


    function renderHobbies() { // New function
        hobbiesListEl.innerHTML = '';
        cvData['Hobbi və Maraqlar'].forEach(hobby => {
            const li = document.createElement('li');
            li.textContent = hobby;
            hobbiesListEl.appendChild(li);
        });
    }

    // --- Initial Data Population ---
    function populateCV() {
        const personalInfo = cvData['Şəxsi məlumatlar'];
        nameEl.textContent = personalInfo.Ad;
        statusEl.textContent = personalInfo.Status;
        dateEl.textContent = personalInfo['Doğum tarixi'];
        phoneEl.textContent = personalInfo.Telefon;
        emailEl.textContent = personalInfo.Email;
        locationEl.textContent = personalInfo.Ünvan;

        renderSkills();
        renderLanguages();
        renderPersonalQualities();
        renderHobbies(); // Call new render function

        // For Təhsil, using hardcoded HTML. If you want it dynamic:
        // educationContentEl.innerHTML = ''; // Clear existing
        // cvData.Təhsil.forEach(edu => {
        //     const p = document.createElement('p');
        //     if (edu.məktəb) { p.textContent = `${edu.məktəb} ${edu.müddət}`; }
        //     else if (edu.universitet) { p.textContent = `${edu.universitet} - ${edu.ixtisas} ${edu.müddət}`; }
        //     educationContentEl.appendChild(p);
        // });

        aboutContentEl.textContent = cvData.Haqqımda;
        experienceContentEl.textContent = cvData['İş təcrübəsi'];
    }

    // --- Event Listeners for Adding Items ---
    addSkillBtnEl.addEventListener('click', () => {
        const newSkill = newSkillInputEl.value.trim();
        if (newSkill) {
            cvData.Bacarıqlar.push(newSkill);
            renderSkills();
            newSkillInputEl.value = '';
        }
    });

    addLangBtnEl.addEventListener('click', () => {
        const newLang = newLangInputEl.value.trim();
        const newLevel = newLangLevelInputEl.value.trim();
        if (newLang && newLevel) {
            cvData.Dillər.push({ "Dil": newLang, "Səviyyə": newLevel });
            renderLanguages();
            newLangInputEl.value = '';
            newLangLevelInputEl.value = '';
        }
    });

    addHobbyBtnEl.addEventListener('click', () => { // New event listener
        const newHobby = newHobbyInputEl.value.trim();
        if (newHobby) {
            cvData['Hobbi və Maraqlar'].push(newHobby);
            renderHobbies();
            newHobbyInputEl.value = '';
        }
    });

    // --- Accordion Functionality ---
    const accordionBtns = document.querySelectorAll(".accordion-btn");
    accordionBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const panel = btn.nextElementSibling;
            const isActive = btn.classList.contains('active');

            accordionBtns.forEach(otherBtn => {
                otherBtn.classList.remove('active');
                otherBtn.nextElementSibling.style.display = "none";
            });

            if (!isActive) {
                btn.classList.add('active');
                panel.style.display = "block";
            }
        });
    });

    // --- Initialize ---
    populateCV();

});