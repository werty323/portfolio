/* ==========================================
   ОТПРАВКА ФОРМЫ (SMART BUTTON VERSION)
   ========================================== */
const form = document.getElementById("telegramForm");
// 👇 ВСТАВЬ СЮДА СВОЮ ССЫЛКУ ОТ ГУГЛА
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyfAjPf1NI459PYhbc9SusrHbN4DawaL0ec088S8A5zI2MvNdexdqlXC4rpg08Y4gLyqg/exec";

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const btn = form.querySelector(".form__btn");
  const originalText =
    '<i class="fa-solid fa-paper-plane" style="margin-right: 10px"></i> Надіслати';

  // 1. Состояние ЗАГРУЗКИ
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
      // 2. Состояние УСПЕХА
      btn.innerHTML = "✅ Надіслано!";
      btn.classList.add("success");
      form.reset(); // Очищаем поля

      // Через 4 секунды возвращаем кнопку обратно
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove("success");
        btn.disabled = false;
      }, 4000);
    })
    .catch((error) => {
      // 3. Состояние ОШИБКИ
      console.error("Error:", error);
      btn.innerHTML = "❌ Помилка";
      btn.classList.add("error");

      // Через 3 секунды возвращаем кнопку, чтобы можно было попробовать снова
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove("error");
        btn.disabled = false;
      }, 3000);
    });
});
