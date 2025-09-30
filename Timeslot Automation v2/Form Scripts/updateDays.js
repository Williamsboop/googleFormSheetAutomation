const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TIMEZONE = Session.getScriptTimeZone();

const EXCLUDED_DATES = [
  // YYYY-MM-DD
];

const FORM = FormApp.getActiveForm();

function updateDays() {
  const dayQuestion = FORM.getItems(FormApp.ItemType.LIST)
                    .filter(question => question.getTitle() === "Select a day to meet with us:")[0]
                    .asListItem();

  const week = getWeek(new Date());

  const sections = FORM.getItems(FormApp.ItemType.PAGE_BREAK)
                   .reduce((acc, item) =>{
                      acc[item.getTitle()] = item.asPageBreakItem();
                      return acc
                   }, {});

  const routing = week.map(fullDayText => {
    const dayName = fullDayText.split(' - ')[0];
  
    const section =  sections[dayName];
    if (section) {
      return dayQuestion.createChoice(fullDayText, section);
    } else {
      return dayQuestion.createChoice(fullDayText);
    }
  });

  dayQuestion.setChoices(routing)
}

function getWeek() {
  const week = [];
  let date = new Date();

  while (week.length < dayNames.length) {
    const dayIndex = date.getDay();
    const dayName = dayNames[dayIndex - 1];

    if (dayName) {
      const formattedDate = Utilities.formatDate(date, TIMEZONE, 'MMMM dd, yyyy');
    
      if(!EXCLUDED_DATES.includes(Utilities.formatDate(date, TIMEZONE, 'yyyy-MM-dd'))) {
        week.push(`${dayName} - ${formattedDate}`);
      }
    }
    date.setDate(date.getDate() + 1);
  }

  return week;
}