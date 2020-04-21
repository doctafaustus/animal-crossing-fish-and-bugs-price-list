enableCacheCookieSaver();

function enableCacheCookieSaver() {
  let asyncAvailable = true;
  try {
    eval('async () => {}');
  } catch (e) {
    if (e instanceof SyntaxError) asyncAvailable = false;
    else throw e; 
  }

  if (!window.caches || !asyncAvailable) {
    return console.log('enableCacheCookieSaver - browser not supported');
  }


  // Save optimizely cookie to a cache name
  const optlyID = getCookie('optimizelyEndUserId');
  console.log('optimizelyEndUserId is', optlyID);

  if (optlyID) return caches.open(`optimizelyEndUserId-${optlyID}`).then(cache => {
      console.log('cookie saved to cache', getCookie('optimizelyEndUserId'));
    });

  console.log('No optly cookie detected');
  initReadCache();
  

  // In Optimizely project JS, read cache and reset cookie
  async function readCache() {
    caches.keys().then(key => {
      const keyName = key[0];
      if (keyName.indexOf('optimizelyEndUserId') > -1) {
        const userID = keyName.match(/\w+-(\w+\.\w+)/)[1];
        setCookie('optimizelyEndUserId', userID);
        console.log('cookie set from cache', userID);
      }
    });
  }

  async function initReadCache() {
    await readCache();
  }

  function getCookie(key) {
    let result;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? (result[1]) : null;
  }

  function setCookie(name, value, days = 7, path = '/') {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path + '; domain =' + window.location.hostname.replace('www', '');
  }
}