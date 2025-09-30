function makeEvent(details) {
  let { start, end } = getStart_End(details)
  CALENDAR.createEvent(defEventTitle(details), start, end, 
  {
    description: defEventDesc(details),
    guests : details[DATA_INDEX['email']],
    sendInvites: true
  });
}