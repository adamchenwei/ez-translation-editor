export default function convertRawTextToList(languageName = 'english', rawText = '') {
  let list = [];
  if (languageName === 'chinese') {
    const isEndInQuestionMarkOrExclamationMarkOrPeriodChinese = /.*?[？！。]/g;
    // is end in question mark, esclamation, or period in chinese version,
    // TODO: ( but exclude i.e. and ... or .. )

    // TODO: note this removes i.e. instead of replacing it!
    // NOTE: since its only replacing english, chinese may need resolution, or not, depends on google translate
    let newRawAfterTransformIE = replaceIe(rawText);

    list = newRawAfterTransformIE.match(isEndInQuestionMarkOrExclamationMarkOrPeriodChinese);
  } else {
    const isEndInQuestionMarkOrExclamationMarkOrPeriodEnglish = /.*?[?!.]/g;
    let newRawAfterTransformIE = replaceIe(rawText);
    list = newRawAfterTransformIE.match(isEndInQuestionMarkOrExclamationMarkOrPeriodEnglish);
  }

  return list;
}

function replaceIe(rawText='') {
  return rawText.replace('i.e.', 'for example, ');
}