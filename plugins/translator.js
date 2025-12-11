if (messageOptions) messageOptions.prepend(htmlToElement(`<button onclick="translateMessage()" data-tip="Translate"><i class="bx bx-translate"></i></button>`));

async function translateMessage() {
    let messageElement = document.querySelector(`[data-id="${selectedMessage}"]`);
    const text = messageElement.dataset.raw;
    if (!text) return;
    try {
        const response = await fetch(`https://translate-pa.googleapis.com/v1/translateHtml`, {
            method: "POST",
            body: JSON.stringify([[[text],"auto","en"],"wt_lib"]),
            headers: { "Content-type": "application/json+protobuf", "X-Goog-API-Key": "AIzaSyATBXajvzQLTDHEQbcpq0Ihe0vWDHmO520" }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const translatedText = data[0][0];
        const detectedLanguage = new Intl.DisplayNames(['en'], { type: 'language' }).of(data[1][0]);
        if (messageElement.classList.contains("message-container")) messageElement = messageElement.querySelector(".text.message");
        messageElement.innerHTML = parseMarkdown(translatedText) + `<p class="subtext" style="display: flex;align-items: center;gap: 5px;"><i class="bx bx-translate"></i>Translated from ${detectedLanguage} - <button class="button" onclick="reverseTranslate(${selectedMessage})" style="padding: 0;height: unset;background: transparent;color: cornflowerblue;">Original</button></p>`;
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