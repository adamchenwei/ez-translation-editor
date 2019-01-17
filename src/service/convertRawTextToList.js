export default function convertRawTextToList(languageName = 'english', rawText = '') {
  let list = [];
  if (languageName === 'chinese') {
    const isEndInQuestionMarkOrExclamationMarkOrPeriodChinese = /.*?[？！。]/g;
    // is end in question mark, esclamation, or period in chinese version,
    // TODO: ( but exclude i.e. and ... or .. )
    let newRawAfterTransformIE = rawText.match(/(.*)\bFoo\b(.*)/g).join('');
    list = newRawAfterTransformIE.match(isEndInQuestionMarkOrExclamationMarkOrPeriodChinese);
  } else {
    const isEndInQuestionMarkOrExclamationMarkOrPeriodEnglish = /.*?[?!.]/g;
    list = rawText.match(isEndInQuestionMarkOrExclamationMarkOrPeriodEnglish);
  }

  return list;
}