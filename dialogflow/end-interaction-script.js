var counter = 1;

(function setInteraction() {
  if (counter > 20) return console.log('Finished!');

  document.querySelectorAll('.list-group > li')[counter-1].querySelector('.intent-name').click();

  waitFor(
    () => document.querySelector('intent-rich-response md-switch'),
    switchEl => {
      setTimeout(() => {
        switchEl.click();

        setTimeout(() => {
          document.querySelector('#multi-button').click();
          setTimeout(() => {
            document.querySelector('#link-list-intents').click();
            waitFor(
              () => document.querySelectorAll('.list-group > li').length,
              () => {
                counter++;
                setInteraction();
              }
            );
          }, 2000);
        }, 1000);
      }, 500);
    }
  );
})();



function waitFor(conditionFn, callback, interval = 50, expiration = 20000) {
  const conditionFnResult = conditionFn();
  if (conditionFnResult) {
    callback(conditionFnResult);
  } else if (expiration <= 0) {
    return;
  } else {
    expiration -= interval;
    return setTimeout(waitFor.bind(null, conditionFn, callback, interval, expiration), interval);
  }
}