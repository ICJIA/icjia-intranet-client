let browserIsIE =
  navigator.userAgent.toUpperCase().indexOf("TRIDENT/") != -1 ||
  navigator.userAgent.toUpperCase().indexOf("MSIE") != -1;

if (browserIsIE)
  document.querySelector("#app").innerHTML = createBanner("ICJIA Intranet");
else require("./main");

// function isIE(ua) {
//   const isIE10orLess = ua.indexOf("MSIE") > -1;
//   const isIE11 = ua.indexOf("Trident/") > -1;
//   return isIE10orLess || isIE11;
// }

function createBanner() {
  // const baseURL = process.env.BASE_URL;

  return `
  <div style="text-align: center; font-size: 0.7em;">
    
    <h1 style="font-weight: 900; font-size: 36px; margin-top: 100px; margin-bottom: 32px; font-family: 'Roboto', sans-serif !important;">
          ICJIA Intranet
        </h1>

    <h1 style='font-family: Lato, sans-serif; margin-top: 50px; padding-top: 20px; padding-bottom:20px; background: #eee;'>
      The ICJIA Intranet site does not support Internet Explorer.
      <br><br>
      Please upgrade to a modern, secure browser such as
      <a href='https://www.google.com/chrome/'>Chrome</a>,
      <a href='https://www.mozilla.org/en-US/firefox/new/'>Firefox</a>, or
      <a href='https://www.microsoft.com/en-us/windows/microsoft-edge'>MS Edge</a>.
    </h1>
   
  </div>`;
}
