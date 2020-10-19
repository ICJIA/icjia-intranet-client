var text = "hello world"; // assume this is the text
var result = [];
var matches = [
  [1, 3],
  [6, 8],
]; // assume these are the matched indices
var pair = matches.shift();
// Build the formatted string
for (var i = 0; i < text.length; i++) {
  var char = text.charAt(i);
  if (pair && i == pair[0]) {
    result.push("<b>");
  }
  result.push(char);
  if (pair && i == pair[1]) {
    result.push("</b>");
    pair = matches.shift();
  }
}
console.log(result.join(""));
// h<b>ell</b>o <b>wor</b>ld
