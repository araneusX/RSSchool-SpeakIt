import { gettranslation } from '../../data';

import { DIV, I, CustomComponent } from '../../my_modules/htmlComponents';
import stylizeButton from '../stylizeElements/stylizeButton';
import Navigation from './Navigation';
import Frame from './Frame';
import Words from './Words';
import Results from './Results';

import style from './style.css';

/* props = {
    level:,
    page:,
    list:,
    onLevelChange:,
    onPageChange:,
  }
*/
class MainScreen extends CustomComponent {
  constructor(props) {
    super(props);
    const mic = this.children[0].children[4].children[1].children[0].node;
    this.current = "Let's start!";
    this.isGame = false;
    this.recognized = [];
    this.isRec = false;

    this.node.addEventListener('click', (event) => {
      if (event.target.dataset.level && event.target.dataset.level !== this.props.level) {
        this.props.onLevelChange(event.target.dataset.level);
      } else if (event.target.dataset.page && event.target.dataset.page !== this.props.page) {
        this.props.onPageChange(event.target.dataset.page);
      } else if (!this.isGame 
        && (event.target.dataset.current ||event.target.parentNode.dataset.current)) {
        this.current = event.target.dataset.current ||event.target.parentNode.dataset.current;
        this.refreshChildren({current: this.current});

        if (!this.props.list[this.current].audioSrc) {
          this.props.list[this.current].audioSrc = new Audio(
            `https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${this.props.list[this.current].audio}`
          );
        }
        this.props.list[this.current].audioSrc.play();
      } else if (event.target.dataset.action) {
        switch (event.target.dataset.action) {
          case 'rec':
            if (this.isGame) {
              if (this.isRec) {
                this.props.recognition.stop();
              } else {
                this.props.recognition.startAndDo(this.onResultGame.bind(this));
              }
              this.refreshChildren({isRec: this.isRec});
            } else {
              this.props.recognition.startAndDo(this.onResultGame.bind(this));
              this.isGame = true;
              this.current = 'Please speak!';
              this.refreshChildren({
                isGame: this.isGame, 
                current: this.current, 
              });
            }
            this.isRec = !this.isRec;
            break;
          case 'restart':
            if (this.isGame) {
              this.props.recognition.stop();
              this.isGame = false;
              this.current = 'Repeat again?';
              this.recognized = [];
              this.isRec = false;
              this.refreshChildren({
                isGame: this.isGame, 
                current: this.current,
                recognized: this.recognized,
              });
            }            
            break;
          case 'result':
            this.refreshChildren({isResult: true, recognized: this.recognized});
            if (this.isRec) {
              this.props.recognition.stop();
            }
            break;
          case 'return':
            if (this.isRec) {
              this.props.recognition.startAndDo(this.onResultGame.bind(this));
            }
            this.refreshChildren({isResult: false});
            break;
          default: console.log(`Pressed ${event.target.dataset.action}`);
        }

        if (this.isRec) {
          mic.classList.add(style.on);
        } else {
          mic.classList.remove(style.on);
        }

      } 

    })
  }

  onResultGame(resultArr) {
    let isNewWord = false;
    this.props.list.forEach((word, i) => {
      if (resultArr.includes(word.word.toLowerCase())
        && !this.recognized.includes(word.word)) {
        this.recognized.push(word.word);
        this.current = i;
        isNewWord = true;
      }
      if (isNewWord) {
        this.refreshChildren({recognized: [...this.recognized], current: this.current});
      } else {
        this.current = resultArr[0].length > 0 ? resultArr[0] : resultArr[1];
        this.refreshChildren({current: this.current + '?'});
      }
    });
  }

  render() {
    return (
      DIV({ className: `valign-wrapper ${style.wrapper}` }, [
        DIV({ className: `container z-depth-1 ${style.container}`}, [
          new Navigation({
            page: this.props.page,
            level: this.props.level,
          }),
          DIV({ className: 'divider' }),
          new Frame({
            current: this.current || "Let's start!",
            isGame: this.isGame || false,
            list: this.props.list,
          }),
          DIV({ className: 'divider' }),
          DIV({className: style.btnWrapper}, [
            stylizeButton({className: style.button, 'data-action': 'restart'}, [
              'restart',
            ]),
            stylizeButton({className: style.button, 'data-action': 'rec'}, [
              I({ className: `material-icons ${style.mic}` }, ['mic']),
              'click on the button and speak',
            ]),
            stylizeButton({className: style.button, 'data-action': 'result'}, [
              'results',
            ]),
          ]),
          new Words({
            list: this.props.list,
            isGame: this.isGame || false,
            recognized: this.recognized || [],
          }),
          new Results({
            list: this.props.list,
            recognized: this.recognized || [],
            isResult: false,
          })
        ])
      ])
    );
  }
}

export default MainScreen;
