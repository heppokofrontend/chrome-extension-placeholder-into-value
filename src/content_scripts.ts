let textField: HTMLTextAreaElement | HTMLInputElement | null = null;
const changeEvent = new Event('change');

chrome.runtime.onMessage.addListener((_, __, sendResponse) => {
  if (textField?.placeholder) {
    textField.value += textField.placeholder;
    textField.dispatchEvent(changeEvent);
  }

  sendResponse(true);

  return true;
});

const resolveTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLTextAreaElement) && !(target instanceof HTMLInputElement)) {
    return null;
  }

  return target;
};

window.addEventListener('contextmenu', ({ target }) => {
  textField = resolveTarget(target);
});
