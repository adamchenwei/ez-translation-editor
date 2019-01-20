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
      rawTextCollectionChinese: '',
      rawTextCollectionEnglish: '',
      currentCollectionName: 'p1a',
    };
    this.onInput = this.onInput.bind(this);
    this.onChangeCollectionName = this.onChangeCollectionName.bind(this);
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
    console.log(raw);
    this.updateCollectionDisplay();
  }

  updateCollectionDisplay() {
    let rawTextCollectionChinese = '';
    let rawTextCollectionEnglish = '';

    rawTextCollectionChinese = raw.chinese[this.state.currentCollectionName];
    rawTextCollectionEnglish = raw.english[this.state.currentCollectionName];

    // Object.keys(raw.chinese).forEach(key => {
    //   console.log(key);
    //   rawTextCollectionChinese = rawTextCollectionChinese.concat(`${key}。
    //   `);
    //   rawTextCollectionChinese = rawTextCollectionChinese.concat(raw.chinese[key]);
    // });

    // Object.keys(raw.english).forEach(key => {
    //   rawTextCollectionEnglish = rawTextCollectionEnglish.concat(`${key}.
    //   `);
    //   rawTextCollectionEnglish = rawTextCollectionEnglish.concat(raw.english[key]);
    // });

    this.setState(prevState => ({
      ...prevState,
      chineseSentencesList: convertRawTextToList('chinese', rawTextCollectionChinese),
      englishSentencesList: convertRawTextToList('english', rawTextCollectionEnglish),
      rawTextCollectionChinese,
      rawTextCollectionEnglish,
    }));
  }

  onChangeCollectionName(name) {
    this.setState(prevState => ({
      ...prevState,
      currentCollectionName: name,
    }));
    this.updateCollectionDisplay();
  }

  render() {
    const chineseList = this.state.chineseSentencesList || [];
    const englishList = this.state.englishSentencesList || [];
    const isCombinableWithoutError = chineseList.length === englishList.length;

    const englishLonger = englishList.length > chineseList.length;
    const sameLength = englishList.length === chineseList.length;
    const whichLanguageLonger = sameLength ? 'same' : (englishLonger ? 'english' : 'chinese');
    const COLLECTIONS_NAMES_LIST = [
      'p1a',
      'p1b',
      'p1c',
      'p2a',
      'p2b',
      'p2c',
    ]
    const mapperLanguageName = whichLanguageLonger === 'same' ? 'english' : (englishLonger ? 'english' : 'chinese');
    return (
      <React.Fragment>
        <h1>isCombinableWithoutError: { isCombinableWithoutError ? 'true' : 'false'}</h1>
        <h2>whichLanguageLonger: {whichLanguageLonger} </h2>
        <h2>chineseList: {chineseList.length}</h2>
        <h2>englishList: {englishList.length}</h2>
        <p>
        {
          COLLECTIONS_NAMES_LIST.map((name, index) => {
            return (
              <button key={index} onClick={() => {
                this.onChangeCollectionName(name);
              }}>{name}</button>
            )
          })
        }
        </p>
        <TextArea type="textarea" name='english' onInput={this.onInput} placeholder="english"/>
        <TextArea type="textarea" name='chinese' onInput={this.onInput} placeholder="chinese"/>
        {
          !isEmpty(this.state.chineseSentencesList) ?
            <div>
            {
              englishList.length ? this.state[`${mapperLanguageName}SentencesList`].map((sentence, index) => {
                return (
                  <section key={index}>
                    <p key={`${index}english`}>Google： {this.state.englishSentencesList[index] || <FlaggedText>missing / mismatch</FlaggedText>}</p>
                    <p key={`${index}chinese`}>Google： {this.state.chineseSentencesList[index] || <FlaggedText>missing / mismatch</FlaggedText>}</p>
                    {/* <p key={`${index}translatorSpace`}>Adam:</p> */}
                    <br />
                  </section>
                );
              }) : null
            }
            </div>
            : null
        }
      </React.Fragment>);
  }
}

export default TranslatorInterface;
