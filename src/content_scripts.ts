import { MENU_ITEM_ID } from './constants';

type TextField = HTMLInputElement | HTMLTextAreaElement;

let currentTextField: TextField | null = null;

const setNativeValue = ({ field, value }: { field: TextField; value: string }) => {
  const prototype =
    field instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(prototype, 'value')?.set?.call(field, value);
};

chrome.runtime.onMessage.addListener((message: unknown, _sender, sendResponse) => {
  const menuItemId = (() => {
    if (
      typeof message !== 'object' ||
      message === null ||
      !('menuItemId' in message) ||
      typeof message.menuItemId !== 'string'
    ) {
      return undefined;
    }

    return message.menuItemId;
  })();

  if (menuItemId !== MENU_ITEM_ID) {
    sendResponse(false);
    return false;
  }

  if (currentTextField === null || currentTextField.placeholder === '') {
    sendResponse(false);
    return false;
  }

  const { placeholder } = currentTextField;

  setNativeValue({ field: currentTextField, value: currentTextField.value + placeholder });
  currentTextField.dispatchEvent(
    new InputEvent('input', {
      bubbles: true,
      cancelable: true,
      inputType: 'insertText',
      data: placeholder,
    }),
  );
  currentTextField.dispatchEvent(new Event('change', { bubbles: true }));

  sendResponse(true);
  return false;
});

const resolveTarget = (target: EventTarget | null | undefined): TextField | null => {
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
    return target;
  }
  return null;
};

window.addEventListener('contextmenu', (event) => {
  const path = event.composedPath();
  currentTextField = resolveTarget(path[0] ?? event.target);

  // フォーカスせずにコンテキストメニューを開いた場合`setNativeValue`が動作しないケースがある
  currentTextField?.focus();
});
