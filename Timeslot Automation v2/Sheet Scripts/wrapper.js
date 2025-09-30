// Wrapper will be ran on FormSubmit

function wrapper(response) {
  Logger.log('[ Updating Form ]')
  let details = updateForm(response)
  Logger.log('[ Making Calendar Event ]')
  makeEvent(details)
  Logger.log('[ Sending Emails ]')
  makeMail(details)
  Logger.log('[ All Done! ]')
}