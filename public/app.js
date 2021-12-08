// the application "forgets" that chat code is async
// so it just attaches a callback to the button and assumes
// the chat JS has been loaded
document.getElementById('open-chat').addEventListener('click', function () {
  console.log('opening chat')
  // https://docs.tidio.com/docs/other_methods
  if (typeof tidioChatApi !== 'undefined') {
    tidioChatApi.open()
  }
})
