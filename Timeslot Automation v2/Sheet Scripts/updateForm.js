// Notice, some code specific to user preference in terms of form layout. //

function updateForm(response) {
  const details = [...response.values];
  let day = getDay(details);
  let [slot, title] = getSlotAndTitle(details, day);
  let list = getList(title);
  let choices = getChoices(list, slot);
  list.setChoices(choices);
  Logger.log(`Removed slot "${slot}" from ${day}`);
  return details
}