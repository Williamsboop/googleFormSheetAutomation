// MailApp Version [ Daily Limit of 1,500 Emails ]
function makeMail(details) {
  RECIPIENTS.forEach(target =>{
    MailApp.sendEmail(
      {
        to: target,
        subject: defSubject(details),
        body: defBody(details),
        name: ''/*ALIAS NAME FOR EMAIL TIED TO SCRIPT HERE | Ex. 'Form Handler'*/,
        from: ''/*EMAIL TIED TO SCRIPT HERE*/,
      }
    )
  });
}

// Gmail API Version [ Increases Daily Limit to 10,000 Emails ]
function makeMail(details) {
    RECIPIENTS.forEach( target =>{
      Logger.log(`[ Sending Appointment Email to ${target} ]`)
      try {
        let mail = Utilities.base64EncodeWebSafe(
          'From: ' + ALIAS + '\r\n' +
          'To: ' + target + '\r\n' +
          'Subject: ' + defSubject(details) + '\r\n\r\n' + 
          defBody(details)
        );
      
        Gmail.Users.Messages.send(
        { raw: mail},
        'me'
        );
      } catch (err) {
        Logger.log(`[ Failed to Send Email to ${target} ]`)
      }
      Utilities.sleep(100);
    });
}