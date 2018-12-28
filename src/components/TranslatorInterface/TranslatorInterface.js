import React, { Component } from 'react';
import TheFundamentalsOfTawhidRaw from '../../store/TheFundamentalsOfTawhid/raw';

class TranslatorInterface extends Component {
  render() {
    const raw = TheFundamentalsOfTawhidRaw;
    console.log("raw", raw);
    const isEndInQuestionMarkOrExclamationMarkOrPeriod = /.*?[?!.]/g;
    const sentencesList = raw.match(isEndInQuestionMarkOrExclamationMarkOrPeriod);
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
