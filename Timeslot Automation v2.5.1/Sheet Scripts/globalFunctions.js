// RESPONSE FUNCTIONS //

function getDay(details){
  return String(details[DATA_INDEX['day']]).split(' - ')[0].trim()
}

function getSlotAndTitle(details, day){
  return [ String(details[DATA_INDEX[day]]), String(`[${day}] Select a time slot that works for you:`)]
}

// DUMMY FUNCTIONS //

function getTitle(day) {
  return String(`[${day}] Select a time slot that works for you:`)
}

function getList(title) {
  return FORM.getItems(FormApp.ItemType.LIST)
             .filter(question => question.getTitle() === title)[0]
             .asListItem();
}

function getChoices(list, slot) {
  return list
         .getChoices()
         .filter(choice => choice.getValue() !== slot);
}

function getLastYear() {
  let today = new Date();
  let lastYear =  today.getFullYear() - 1;
  return lastYear;
}

// DAILY RESET FUNCTIONS //

function dailySlots(slots, day){
  return DEFAULT_SLOTS.filter(slot => !slots[day].includes(slot));
}

function dailyChoices(new_slots, list){
  return new_slots.map(slot => list.createChoice(slot));
}

// EVENT & EMAIL FUNCTIONS //

function defSubject(details) {
  let name = details[DATA_INDEX['name']]; 
  let timestamp = details[DATA_INDEX['timestamp']]
  let meetingType = details[DATA_INDEX['meeting_type']];

  return `${meetingType} meeting with ${name} scheduled. [ ${timestamp} ]`
}

function defEventTitle(details) {
  let name = details[DATA_INDEX['name']];
  let meetingType = details[DATA_INDEX['meeting_type']];
  let [day, date, time] = defDayDateTime(details)
  
  return `${meetingType} meeting with ${name} scheduled on ${date}.`
}

function defEventDesc(details) {
  let name = details[DATA_INDEX['name']];
  let meetingType = details[DATA_INDEX['meeting_type']];
  let [day, date, time] = defDayDateTime(details)
  
  return `
Meeting with ${name} scheduled on ${day}, ${date} from ${time}.

Meeting Type: ${meetingType}`
}

function defBody(details) {
  let name = details[DATA_INDEX['name']];
  let meetingType = details[DATA_INDEX['meeting_type']];
  let [day, date, time] = defDayDateTime(details)
  let email = details[DATA_INDEX['email']]
  
  return `
${name} has scheduled an ${meetingType} meeting on ${day}, ${date} from ${time}.

You can email them at ${email}.

${defInterests(details[DATA_INDEX['interests']])}

A calendar event has been made, and ${name} was invited.`
}

function defInterests(interests) {
  interests = interests.split(',').map(element => element.trim());
  interestsLen = interests.length;
  switch(interestsLen) {
    case 0:
      return "They didn't specify any interests.";
    case 1:
      return `They're interested in ${interests[0]}.`;
    default:
      let lastElm = interests.pop();
      if (interestsLen > 2) {
        return `They're interested in ${interests.join()},and ${lastElm}.`.replace(/,/g, ', ');
      } else {
        return `They're interested in ${Array.join} and ${lastElm}.`;
    } 
  }
}

function defDayDateTime(details) {
  let day = details[DATA_INDEX['day']]
  return [day.split(' - ')[0].trim(), day.split(' - ')[1].trim(), details[DATA_INDEX[day.split(' - ')[0].trim()]]]
}

function getStart_End(details) {
  const day = details[DATA_INDEX['day']];
  const slot = details[DATA_INDEX[day.split(" - ")[0].trim()]];
  const date = day.split(" - ")[1].trim();
  let [startTime, endTime] = slot.split(" - ").map((element) => element.trim());

  const start = new Date(`${date} ${startTime}`);
  const end = new Date(`${date} ${endTime}`);

  return { start, end };
}

function clearLastYear() {
    Logger.log('[ Checking Month ]');
    if (new Date().getMonth() !== 0) {
      Logger.log("[ It's not January, Terminating. ]");
      return;
    } // This should only run every year.
    Logger.log("[ Happy New Year! ]");

    let lastYear = getLastYear();
    let start = new Date(lastYear, 0, 1, 0, 0, 0); 
    let end = new Date(lastYear, 11, 31, 23, 59, 59);
    let events = CALENDAR.getEvents(start, end);

    if (events.length === 0) {
      Logger.log(`[ No Events found for ${lastYear}. ]`);
      return;
    }

    let eventNum = 0;
    events.forEach( event => {
      let eventDate = Utilities.formatDate(
        event.getStartTime(),
        TIMEZONE,
        "EEEE, MMMM dd, yyyy hh:mm a",
      );
      Logger.log(`[ Deleting Event on ${eventDate} ]`);
      event.deleteEvent();
      eventNum++;
    });
  Logger.log(`[ Deleted ${eventNum} Events. ]`);
}