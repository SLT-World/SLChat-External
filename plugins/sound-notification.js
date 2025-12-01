if (typeof socket !== 'undefined' && socket) {
  const user_id = GetCookie("op");
  const notif_audio = new Audio('https://media.memesoundeffects.com/2021/06/Discord-Notification-Sound-Effect.mp3');
  
  socket.on('prompt', function(prompt) {
    if (document.hidden && prompt.message.owner.id != user_id) {
        notif_audio.play();
    };
  });
}
