/* ==========================================
   ЧАСТЬ 1. МОДАЛЬНОЕ ОКНО (БОТ-СИМУЛЯТОР)
   ========================================== */
const modal = document.getElementById("botModal");
const chatMessages = document.getElementById("chatMessages");

// 1. ОТКРЫТЬ ОКНО
function openBotModal(e) {
  e.preventDefault(); // Запрещаем прыжок вверх
  modal.classList.add("active"); // Показываем окно
}

// 2. ЗАКРЫТЬ ОКНО (Крестик)
document.getElementById("closeModalBtn").addEventListener("click", () => {
  modal.classList.remove("active");
});

// Закрытие по клику на темный фон
document.querySelector(".modal__overlay").addEventListener("click", () => {
  modal.classList.remove("active");
});

// 3. ЛОГИКА ЧАТА (ОТВЕТЫ)
function botReply(type) {
  let userText = "";
  let botText = "";

  if (type === "price") {
    userText = "💲 Прайс-лист";
    botText =
      "🛠 <b>Прайс на послуги:</b><br>— Заміна масла: 500 грн<br>— Діагностика: 300 грн<br>— Ремонт ходової: від 1200 грн";
  } else if (type === "contact") {
    userText = "📍 Контакти";
    botText =
      "📞 <b>Наші контакти:</b><br>+38 (099) 000-00-00<br>м. Київ, вул. Механізаторів 2";
  }

  addMessage(userText, "user");

  setTimeout(() => {
    addMessage(botText, "bot");
  }, 800);
}

// Вспомогательная функция добавления сообщения
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

// 👇👇👇 НЕ ЗАБУДЬ ВСТАВИТЬ СЮДА СВОЮ ССЫЛКУ ОТ ГУГЛА! 👇👇👇
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxjgXZYIjyb8wptomaPFDP1r9ui-KW1nMNQGc20OD829Fe9SMdSHVdzolnBR0fLTlwCRw/exec";

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const btn = form.querySelector(".form__btn");
  const originalText =
    '<i class="fa-solid fa-paper-plane" style="margin-right: 10px"></i> Надіслати';

  // Состояние ЗАГРУЗКИ
  btn.innerHTML =
    '<i class="fa-solid fa-circle-notch fa-spin"></i> Відправка...';
  btn.disabled = true;

  const formData = new FormData(form);
  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
  };

  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(data),
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
  })
    .then(() => {
      // УСПЕХ
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
      // ОШИБКА
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
