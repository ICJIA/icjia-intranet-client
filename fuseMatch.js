let regionStart = "<span class='highlight'>";
let regionEnd = "</span>";
let matchedText = [];
const _ = require("lodash");

let matches = [
  {
    indices: [[90, 92]],
    value:
      "Visa uno vitae tendebant Cumaeae medio. Ferro genero velaturque in mersum, sufficiunt iunctis magni laceros arma aderat. Test",
    key: "summary",
  },
  {
    indices: [[29, 33]],
    value: "Flumen terris pertulit rogum istis amori in aquarum ",
    key: "title",
  },
  {
    indices: [[29, 33]],
    value: "Nitenti semel inscius cetera Istis os est precari",
    key: "headings",
    refIndex: 3,
  },
  {
    indices: [[0, 4]],
    value: "Istis per siccoque pollue",
    key: "headings",
    refIndex: 2,
  },
  {
    indices: [
      [0, 4],
      [49, 51],
    ],
    value: "Istis subitae conrepta vidit persequitur funes cristata",
    key: "headings",
    refIndex: 1,
  },
  {
    indices: [[0, 4]],
    value: "Istis dum Cerberon amens moderatius siqua",
    key: "headings",
    refIndex: 0,
  },
];

matches.forEach((match) => {
  let pair = match.indices.shift();
  let result = [];
  for (var i = 0; i < match.value.length; i++) {
    let char = match.value.charAt(i);
    if (pair && i == pair[0]) {
      result.push(regionStart);
    }
    result.push(char);
    if (pair && i == pair[1]) {
      result.push(regionEnd);
      pair = match.indices.shift();
    }
  }
  let res = result.join("");
  let highlighted = {};
  highlighted.value = res;
  highlighted.key = match.key;
  if (match.refIndex >= 0) {
    highlighted.refIndex = match.refIndex;
  }
  matchedText.push(highlighted);
});

console.log(matchedText);

function mergeHeadings(arr) {
  return _.chain(arr)
    .groupBy("key")
    .mapValues(function (v) {
      return _.chain(v).orderBy("refIndex").map("value").flattenDeep();
    })
    .value();
}

console.log(JSON.stringify(mergeHeadings(matchedText)));
