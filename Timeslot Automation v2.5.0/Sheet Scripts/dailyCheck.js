function dailyCheck() {
  Logger.log("[ RUNNING dailyCheck() ]")

  let slots = {
    'Monday': [],
    'Tuesday': [],
    'Wednesday': [],
    'Thursday': [],
    'Friday': [],
  };

  SHEET.getDataRange().getValues().slice(1).forEach(row => {
    for (let day of Object.keys(slots)) {
      let slot = row[DATA_INDEX[day]];
      if (slot) {
        slots[day].push(slot);
      }
    }
  });

  for (let day of Object.keys(slots)) {
    let title = getTitle(day);
    let list = getList(title);
    let new_slots = dailySlots(slots, day);
    let choices = dailyChoices(new_slots, list);

    list.setChoices(choices);
    Logger.log(`Updated ${day} slots: ${new_slots.join(", ")}`);
  }
  Logger.log("[ ALL DONE! ]")
}