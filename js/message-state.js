const messageState = {
  preventEvents: [],
};

const setPreventEvents = (value) => {
  messageState.preventEvents = value;
};

const resetPreventEvents = () => {
  messageState.preventEvents.forEach((evt) => {
    document.removeEventListener(evt.type, evt.cb);
  });
};

const recoverPreventEvents = () => {
  messageState.preventEvents.forEach((evt) => {
    document.addEventListener(evt.type, evt.cb);
  });
};

export { recoverPreventEvents, resetPreventEvents, setPreventEvents };
