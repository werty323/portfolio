/* ==========================================
   ЧАСТЬ 1. МОДАЛЬНОЕ ОКНО (БОТ-СИМУЛЯТОР)
   ========================================== */
const modal = document.getElementById("botModal");
const chatMessages = document.getElementById("chatMessages");

// Функция открытия окна
function openBotModal(e) {
  if (e) e.preventDefault(); // Останавливаем прыжок вверх
  if (modal) modal.classList.add("active");
}

// Закрытие (Крестик)
const closeBtn = document.getElementById("closeModalBtn");
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });
}

// Закрытие (Фон)
const overlay = document.querySelector(".modal__overlay");
if (overlay) {
  overlay.addEventListener("click", () => {
    modal.classList.remove("active");
  });
}

// Логика чата
function botReply(type) {
  let userText = "",
    botText = "";

  if (type === "price") {
    userText = "💲 Прайс-лист";
    botText =
      "🛠 <b>Прайс на послуги:</b><br>— Заміна масла: 500 грн<br>— Діагностика: 300 грн";
  } else if (type === "contact") {
    userText = "📍 Контакти";
    botText = "📞 <b>Наші контакти:</b><br>+38 (099) 000-00-00";
  }

  addMessage(userText, "user");
  setTimeout(() => addMessage(botText, "bot"), 800);
}

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.classList.add(
    "message",
    sender === "user" ? "message--user" : "message--bot",
  );
  div.innerHTML = `<div class="message__bubble">${text}</div>`;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* ==========================================
   ЧАСТЬ 2. ОТПРАВКА ФОРМЫ (SMART BUTTON)
   ========================================== */
const form = document.getElementById("telegramForm");

// 👇👇👇 ВСТАВЬ ССЫЛКУ НИЖЕ ВНУТРИ КАВЫЧЕК "" 👇👇👇
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzXNEZme58ZfLk6YNUJ7KA3IFqyN570T70SY-67zgnBMPKnClsIMY8fIdgK-_SZhj-VYA/exec";
// 👆👆👆 ПРОВЕРЬ КАВЫЧКИ!!! 👆👆👆

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const btn = form.querySelector(".form__btn");
    const originalText = btn.innerHTML;

    btn.innerHTML =
      '<i class="fa-solid fa-circle-notch fa-spin"></i> Відправка...';
    btn.disabled = true;

    const formData = new FormData(form);
    const data = { name: formData.get("name"), phone: formData.get("phone") };

    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data),
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        btn.innerHTML = "✅ Надіслано!";
        btn.classList.add("success");
        form.reset();
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove("success");
          btn.disabled = false;
        }, 4000);
      })
      .catch((error) => {
        console.error("Error:", error);
        btn.innerHTML = "❌ Помилка";
        btn.classList.add("error");
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove("error");
          btn.disabled = false;
        }, 3000);
      });
  });
}

/* ==========================================
   ЧАСТЬ 3. АВАРИЙНОЕ ПОДКЛЮЧЕНИЕ КНОПКИ
   (Если onclick в HTML не работает)
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Ищем кнопку "Дивитись кейс" в первой карточке
  const botBtns = document.querySelectorAll(".project-card .btn");

  // Берем первую кнопку (это наш бот)
  if (botBtns.length > 0) {
    botBtns[0].addEventListener("click", (e) => {
      // Если это действительно ссылка на бота (проверка по href="#")
      if (botBtns[0].getAttribute("href") === "#") {
        e.preventDefault();
        openBotModal(e);
      }
    });
  }
});
