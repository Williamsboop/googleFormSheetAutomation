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
  if (interests.length > 1) {
    return `They are interested in ${interests[0]} and ${interests[1]}.`
  } else if (interests.length === 1) {
    return `They are interested in ${interests[0]}.`
  } else {
  return ''
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