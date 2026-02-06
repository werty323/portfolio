/* ==========================================
   СВЯЗЬ С TELEGRAM (БОТ)
   ========================================== */

// 1. НАСТРОЙКИ (СЮДА ВСТАВИШЬ СВОИ ДАННЫЕ)
const TOKEN = "ТОКЕН_СКРЫТ_ДЛЯ_GITHUB";
const CHAT_ID = "728904606";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

// 2. СЛУШАЕМ ФОРМУ
document
  .getElementById("telegramForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Останавливаем стандартную перезагрузку страницы

    // Получаем данные из полей (this — это сама форма)
    const name = this.name.value;
    const phone = this.phone.value;

    // Формируем сообщение (красиво, с переносами строк)
    const message = `
<b>🔔 НОВАЯ ЗАЯВКА С САЙТА!</b>\n
<b>👤 Имя:</b> ${name}
<b>📱 Телефон:</b> ${phone}
    `;

    // Находим кнопку, чтобы менять на ней текст
    const btn = this.querySelector(".form__btn");
    const initialText = btn.innerHTML; // Запоминаем текст "Отправить заявку"

    // Визуальный эффект "Загрузка..."
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Отправка...';
    btn.style.opacity = "0.7";

    // 3. ОТПРАВЛЯЕМ В ТЕЛЕГРАМ (Магия AJAX)
    axios
      .post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: message,
      })
      .then((res) => {
        // ЕСЛИ ВСЁ ПРОШЛО УСПЕШНО:
        this.reset(); // Очищаем форму
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Готово!';
        btn.style.background = "#10b981"; // Зеленый цвет успеха

        // Через 3 секунды возвращаем кнопку в исходное состояние
        setTimeout(() => {
          btn.innerHTML = initialText;
          btn.style.background = ""; // Возвращаем родной цвет
          btn.style.opacity = "1";
        }, 3000);
      })
      .catch((err) => {
        // ЕСЛИ ОШИБКА:
        console.warn(err);
        btn.innerHTML = "Ошибка!";
        btn.style.background = "#ef4444"; // Красный цвет
      })
      .finally(() => {
        console.log("Запрос завершен");
      });
  });
