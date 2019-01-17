import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import TextArea from './style/TextArea';

import raw from './../../store/TheFundamentalsOfTawhid/raw.js';
import convertRawTextToList from '../../service/convertRawTextToList';
import FlaggedText from './style/FlaggedText';

class TranslatorInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawContent: {
        chinese: '',
        english: '',
      },
    };
    this.onInput = this.onInput.bind(this);
  }
  onInput(event) {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;
    console.log('value', event.target.value);
    console.log('name', event.target.name);


    let sentencesList = [];
    sentencesList = convertRawTextToList(name, value);

    console.log('sentencesList', sentencesList);

    this.setState(prevState => ({
      ...prevState,
      rawContent: {
        ...prevState.rawContent,
        [name]: value,
      },
      [`${name}SentencesList`]: sentencesList,
    }));
  }

  componentDidMount() {
    console.log(raw)
    this.setState(prevState => ({
      ...prevState,
      chineseSentencesList: convertRawTextToList('chinese', raw.chinese.p1b),
      englishSentencesList: convertRawTextToList('english', raw.english.p1b),
    }));
  }


  render() {
    const chineseList = this.state.chineseSentencesList || [];
    const englishList = this.state.englishSentencesList || [];
    const isCombinableWithoutError = chineseList.length === englishList.length;
    const isCominable = englishList.length > chineseList.length;
    return (
      <React.Fragment>
        <h1>isCombinableWithoutError: { isCombinableWithoutError ? 'true' : 'false'}</h1>
        <h2>isCominable: {isCominable ? 'true' : 'false'}</h2>
        <h2>chineseList: {chineseList.length}</h2>
        <h2>englishList: {englishList.length}</h2>
        <TextArea type="textarea" name='english' onInput={this.onInput} placeholder="english"/>
        <TextArea type="textarea" name='chinese' onInput={this.onInput} placeholder="chinese"/>
        {
          !isEmpty(this.state.chineseSentencesList) ?
            <div>
            {
              isCominable && englishList.length ? this.state.englishSentencesList.map((sentence, index) => {
                return (
                  <section key={index}>
                    <p key={`${index}english`}>{sentence}</p>
                    <p key={`${index}chinese`}>{chineseList[index] || <FlaggedText>missing / mismatch</FlaggedText>}</p>
                    <br />
                  </section>
                );
              }) : null
            }
            </div>
            : null
        }

        {/* {
          !isEmpty(this.state.englishSentencesList) ?
            <div>
            {
              this.state.englishSentencesList.map((sentence, index) => {
                return <p key={index}>{sentence}</p>;
              })
            }
            </div>
            : null
        } */}
      </React.Fragment>);
  }
}

export default TranslatorInterface;
