const translate = require('@vitalets/google-translate-api');
const data = require("./translate-data.json");

/**
 * Translate data
 * @param args {"text":"hello","from":"en","to":["zh-TW"]}
 * @returns {Promise<void>}
 */
const t = async (args) => {
  if (typeof args.to === 'object' && Array.isArray(args.to)) {
    await Promise.all(
      args.to.map(to => translate(args.text, {
        from: args.from,
        to: to
      }))
    )
      .then(data => {
        let message = {};
        data.map((x, i) => message = {
          ...message,
          [args.to[i]]: {
            from: args.from,
            to: args.to[i],
            text: x.text,
            pronunciation: x.pronunciation,
            autoCorrected: x.from.text.autoCorrected,
            correct: x.from.text.value,
            didYouMean: x.from.text.didYouMean
          }
        });
        console.log(JSON.stringify(message, null, 2))
      })
      .catch(e => console.log(e));
  }
};



t(data);