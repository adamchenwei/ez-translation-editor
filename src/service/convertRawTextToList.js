export default function convertRawTextToList(languageName = 'english', rawText = '') {
  let list = [];
  if (languageName === 'chinese') {
    const isEndInQuestionMarkOrExclamationMarkOrPeriodChinese = /.*?[？！。]/g;
    // is end in question mark, esclamation, or period in chinese version,
    // TODO: ( but exclude i.e. and ... or .. )

    // TODO: note this removes i.e. instead of replacing it!
    // NOTE: since its only replacing english, chinese may need resolution, or not, depends on google translate
    let newRawAfterTransformIE = replaceIe(rawText, 'chinese');

    list = newRawAfterTransformIE.match(isEndInQuestionMarkOrExclamationMarkOrPeriodChinese);
  } else {
    const isEndInQuestionMarkOrExclamationMarkOrPeriodEnglish = /.*?[?!.]/g;
    let newRawAfterTransformIE = replaceIe(rawText);
    list = newRawAfterTransformIE.match(isEndInQuestionMarkOrExclamationMarkOrPeriodEnglish);
  }

  return list;
}

function replaceIe(rawText='', lang = 'english') {
  if (lang === 'chinese') {
    return rawText.replace(/i。/g, '举例，');
  }
  return rawText.replace(/i.e./g, 'for example, ');
}



//Failed English Parser with . domain striping

// let newRawAfterTransformIE = replaceIe(rawText, 'chinese');
//   let list = [];
//   if (languageName === 'chinese') {
//     const isEndInQuestionMarkOrExclamationMarkOrPeriodChinese = /.*?[？！。]/g;
//     let splits = newRawAfterTransformIE.split(/(\.(?!com|net|org)|\?|!)/i);
//     splits = splits
//       .map(el => el.trim())
//       .filter(el => el !== '');

//     for (let i = 0; i < splits.length; i++) {
//       splits[i] += splits[i+1];
//       splits.splice(i + 1, 1);
//     }
//     // is end in question mark, esclamation, or period in chinese version,
//     // TODO: ( but exclude i.e. and ... or .. )

//     // TODO: note this removes i.e. instead of replacing it!
//     // NOTE: since its only replacing english, chinese may need resolution, or not, depends on google translate


//     list = newRawAfterTransformIE.match(isEndInQuestionMarkOrExclamationMarkOrPeriodChinese);