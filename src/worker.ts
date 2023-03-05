chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    type: 'normal',
    id: 'heppokofrontend.placeholder.into.value',
    title: 'placeholder into value',
    contexts: ['editable'],
  });
});

chrome.contextMenus.onClicked.addListener(async ({ menuItemId }) => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

  if (!tab.id) {
    return;
  }

  const tabId = tab.id;

  if (tab.url?.startsWith('http')) {
    await chrome.tabs.sendMessage(tabId, { menuItemId }).catch((error) => console.log(error, 1));
  }

  return true;
});
