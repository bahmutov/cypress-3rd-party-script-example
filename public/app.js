// the application "forgets" that chat code is async
// so it just attaches a callback to the button and assumes
// the chat JS has been loaded
document.getElementById('open-chat').addEventListener('click', function () {
  // https://docs.tidio.com/docs/other_methods
  tidioChatApi.open()
})
