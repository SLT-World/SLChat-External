if (messageOptions) messageOptions.prepend(htmlToElement(`<button onclick="translateMessage()" data-tip="Translate"><i class="bx bx-translate"></i></button>`));

async function translateMessage() {
    let messageElement = document.querySelector(`[data-id="${selectedMessage}"]`);
    const text = messageElement.dataset.raw;
    if (!text) return;
    try {
        const response = await fetch(`https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl=en&q=${encodeURIComponent(text)}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const translatedText = data[0][0];
        const detectedLanguage = new Intl.DisplayNames(['en'], { type: 'language' }).of(data[0][1]);
        if (messageElement.classList.contains("message-container")) messageElement = messageElement.querySelector(".text.message");
        messageElement.innerHTML = parseMarkdown(translatedText) + `<p class="subtext" style="display: block;"><i class="bx bx-translate" style="vertical-align: middle;"></i> Translated from ${detectedLanguage} \u2022 <button class="button" onclick="reverseTranslate(${selectedMessage})" style="padding: 0;height: unset;background: transparent;color: cornflowerblue;display: inline-block;">Original</button></p>`;
    }
    catch (err) {
        console.error(err);
        openToast("bx-alert-triangle","Translation failed","red");
    }
    openToast("bx-check","Translated");
}

async function reverseTranslate(id) {
    let messageElement = document.querySelector(`[data-id="${id}"]`);
    originalText = messageElement .dataset.raw;
    if (messageElement.classList.contains("message-container")) messageElement = messageElement.querySelector(".text.message");
    messageElement.innerHTML = parseMarkdown(originalText)
}