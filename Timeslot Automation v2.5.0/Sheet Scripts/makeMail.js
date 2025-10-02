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