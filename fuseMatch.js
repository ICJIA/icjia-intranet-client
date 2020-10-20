let regionStart = "<span class='highlight'>";
let regionEnd = "</span>";

// const _ = require("lodash");
let raw = [];

let text = [
  {
    item: {
      id: "131",
      title: "Flumen terris pertulit rogum istis amori in aquarum ",
      contentType: "news",
      searchMeta: "",
      section: "news",
      slug: "flumen-terris-pertulit-rogum-istis-amori-in-aquarum",
      headings: [
        "Istis dum Cerberon amens moderatius siqua",
        "Istis subitae conrepta vidit persequitur funes cristata",
        "Istis per siccoque pollue",
        "Nitenti semel inscius cetera Istis os est precari",
      ],
      route: "/news/flumen-terris-pertulit-rogum-istis-amori-in-aquarum",
      summary:
        "Flumen terris pertulit rogum; amori in aquarum rupisset, leonibus et. Arcesius nomenque sumpsere hederae, in aquam Libys principio sororum hortaturque Inarimen. Threicio cantato. Meta finita, visa vitam, membrisque: committi sinus. Rubefactaque census aequor: non iniqui Typhoeus sorbent vectabantur inermi dubiaque tellurem sumusve.",
      url:
        "https://intranet.icjia.cloud/news/flumen-terris-pertulit-rogum-istis-amori-in-aquarum",
    },
    refIndex: 6,
    matches: [
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
    ],
    score: 0.00008846822538155009,
  },
  {
    item: {
      id: "18",
      title: "Tristique Est Et Tempus Semper Est",
      contentType: "events",
      type: "general",
      searchMeta: "at nunc commodo",
      section: "events",
      slug: "tristique-est-et-tempus-semper-est",
      headings: [],
      route: "/events/tristique-est-et-tempus-semper-est",
      summary: "Sed vel enim sit amet nunc viverra dapibus.",
      url:
        "https://intranet.icjia.cloud/events/tristique-est-et-tempus-semper-est",
    },
    refIndex: 24,
    matches: [
      {
        indices: [[2, 5]],
        value: "Tristique Est Et Tempus Semper Est",
        key: "title",
      },
    ],
    score: 0.2026843601314348,
  },
];
let matchedText = [];
text.forEach((t) => {
  t.matches.forEach((match) => {
    let highlighted = {};
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

    highlighted.value = res;
    highlighted.key = match.key;
    if (match.refIndex >= 0) {
      highlighted.refIndex = match.refIndex;
    }
    matchedText.push(highlighted);
    console.log(matchedText);
  });
  //console.log(t.item.id, matchedText);
  // let obj = {};
  // obj.id = t.item.id;
  // obj.matches = JSON.stringify(matchedText);
  // raw.push(obj);
});

console.log(raw);

// console.log(matchedText);

// function mergeHeadings(arr) {
//   return _.chain(arr)
//     .groupBy("key")
//     .mapValues(function (v) {
//       return _.chain(v).orderBy("refIndex").map("value").flattenDeep();
//     })
//     .value();
// }

// console.log(JSON.stringify(mergeHeadings(matchedText)));
