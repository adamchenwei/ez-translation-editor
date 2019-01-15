export default function convertRawTextToList(languageName = 'english', rawText = '') {
  let list = [];
  if (languageName === 'chinese') {
    const isEndInQuestionMarkOrExclamationMarkOrPeriodChinese = /.*?[？！。]/g;
    list = rawText.match(isEndInQuestionMarkOrExclamationMarkOrPeriodChinese);
  } else {
    const isEndInQuestionMarkOrExclamationMarkOrPeriodEnglish = /.*?[?!.]/g;
    list = rawText.match(isEndInQuestionMarkOrExclamationMarkOrPeriodEnglish);
  }

  return list;
}