import React, { Component } from 'react';
import TheFundamentalsOfTawhidRaw from '../../store/TheFundamentalsOfTawhid/raw';

class TranslatorInterface extends Component {
  render() {
    const test = `abc?aaa.abcd?.aabbccc!`;
    const isEndInQuestionMarkOrExclamationMarkOrPeriod = /[a-z]*[?!.]/g;
    const sentencesList = TheFundamentalsOfTawhidRaw.match(isEndInQuestionMarkOrExclamationMarkOrPeriod);
    console.log(sentencesList);
    return (
      <div>
        {
          sentencesList.map((sentence, index) => {
            return <p key={index}>{sentence}</p>;
          })
        }
      </div>
    );
  }
}

export default TranslatorInterface;
