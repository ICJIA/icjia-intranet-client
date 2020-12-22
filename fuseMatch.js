let regionStart = "<span class='highlight'>";
let regionEnd = "</span>";

const _ = require("lodash");

function mergeKeys(arr) {
  return _.chain(arr)
    .groupBy("key")
    .mapValues(function (v) {
      return _.chain(v).orderBy("refIndex").map("value").flattenDeep();
    })
    .value();
}

let text = [
  {
    item: {
      id: "131",
      title: "Flumen terris pertulit rogum istis amori in aquarum ",
      contentType: "news",

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
      id: "130",
      title: "Tamen promissa est viscera ille Tritonida neque",
      contentType: "news",

      section: "news",
      slug: "tamen-promissa-est-viscera-ille-tritonida-neque",
      headings: [
        "Quid quondam iam cur stabantque",
        "Dixit iaces ad leaena stirpi praefert",
        "Nitenti semel inscius cetera os est precari",
      ],
      route: "/news/tamen-promissa-est-viscera-ille-tritonida-neque",
      summary:
        "Visa uno vitae tendebant Cumaeae medio. Ferro genero velaturque in mersum, sufficiunt iunctis magni laceros arma aderat. Test",
      url:
        "https://intranet.icjia.cloud/news/tamen-promissa-est-viscera-ille-tritonida-neque",
    },
    refIndex: 5,
    matches: [
      {
        indices: [[90, 92]],
        value:
          "Visa uno vitae tendebant Cumaeae medio. Ferro genero velaturque in mersum, sufficiunt iunctis magni laceros arma aderat. Test",
        key: "summary",
      },
      {
        indices: [[10, 12]],
        value: "Tamen promissa est viscera ille Tritonida neque",
        key: "title",
      },
      {
        indices: [[22, 24]],
        value: "Dixit iaces ad leaena stirpi praefert",
        key: "headings",
        refIndex: 1,
      },
    ],
    score: 0.5123101137049096,
  },
];
// eslint-disable-next-line no-unused-vars
let matchedText = [];
const results = text.map((t) => {
  let arr = [];
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

    arr.push(highlighted);
  });
  // delete t.item.headings;

  // delete t.item.slug;
  // delete t.item.url;
  // delete t.item.id;
  // let obj = {};
  // obj.key = "original";
  // obj.value = t.item;
  // arr.push(obj);
  delete t.matches;
  t.matched = JSON.parse(JSON.stringify(mergeKeys(arr)));
  return t;
});
// let raw = JSON.parse(JSON.stringify(matchedText));
// console.log(raw[0]);
console.log(results[0]);
