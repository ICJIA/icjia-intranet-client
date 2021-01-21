if (isIE(window.navigator.userAgent))
  document.querySelector("#app").innerHTML = createBanner(
    "R3: Restore. Reinvest. Renew."
  );
else require("./main");

function isIE(ua) {
  const isIE10orLess = ua.indexOf("MSIE") > -1;
  const isIE11 = ua.indexOf("Trident/") > -1;
  return isIE10orLess || isIE11;
}

function createBanner() {
  // const baseURL = process.env.BASE_URL;

  return `
  <div style="text-align: center; font-size: 0.7em;">
    
    <h1 style="font-weight: 900; font-size: 36px; margin-top: 100px; margin-bottom: 32px; font-family: 'Roboto', sans-serif !important;">
          R<span style="color: #ccaa41">3</span>&nbsp;<span
            >RESTORE. REINVEST. RENEW.</span
          >
        </h1>

    <h1 style='font-family: Lato, sans-serif; margin-top: 50px; padding-top: 20px; padding-bottom:20px; background: #eee;'>
      The R3 site does not support Internet Explorer.
      <br><br>
      Please upgrade to a modern, secure browser such as
      <a href='https://www.google.com/chrome/'>Chrome</a>,
      <a href='https://www.mozilla.org/en-US/firefox/new/'>Firefox</a>, or
      <a href='https://www.microsoft.com/en-us/windows/microsoft-edge'>MS Edge</a>.
    </h1>
    <h2 style="margin-top: 50px;">For additional information about R3 opportunities, please see the Illinois Criminal Justice Information Authority's 
    <a href="https://icjia.illinois.gov/gata">GATA site</a>.</h2>
  </div>`;
}
