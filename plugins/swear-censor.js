const originalRenderMessageHTML = renderMessageHTML;

const words = ["fuck", "shit", "bitch", "nigga", "nigger", "pussy", "bastard", "dick", "cunt", "piss", "crap", "slut", "whore", "faggot", "ass", "rape", "sex", "anal", "anus", "penis", "cuck", "cock"];
const regex = new RegExp(words.join('|'), 'i');

renderMessageHTML = function(message) {
  if (regex.test(message.text.replace(/\s/g, ''))) {
    message.text = `<p class="spoiler" onclick="spoiler(this)">${message.text}</p>
      <i class="bx bx-error-circle" style="font-size: 20px; position: relative; bottom: 2px; color: red; vertical-align: middle;"></i>`;
  }
  return originalRenderMessageHTML(message);
};
