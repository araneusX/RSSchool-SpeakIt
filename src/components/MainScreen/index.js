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
    let mic = this.children[0].children[4].children[1].children[0].node;
    let results = this.children[0].children[6];

    this.current = "Let's start!";
    this.isGame = false;
    this.recognized = [];
    this.isRec = false;
    this.gameId = Date.now();
    this.savedList = null;

    this.node.addEventListener('click', (event) => {
      if (event.target.dataset.level && event.target.dataset.level !== this.props.level) {
        this.props.onLevelChange(event.target.dataset.level);
      } else if (event.target.dataset.page && event.target.dataset.page !== this.props.page) {
        this.props.onPageChange(event.target.dataset.page);
      } else if (!this.isGame
        && (event.target.dataset.current || event.target.parentNode.dataset.current)) {
        this.current = event.target.dataset.current || event.target.parentNode.dataset.current;
        this.refreshChildren({ current: this.current });

        if (!this.props.list[this.current].audioSrc) {
          this.props.list[this.current].audioSrc = new Audio(
            `https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${this.props.list[this.current].audio}`,
          );
        }
        this.props.list[this.current].audioSrc.play();
      } else if (event.target.dataset.action) {
        switch (event.target.dataset.action) {
          case 'rec':
            if (this.isGame) {
              if (this.isRec) {
                this.props.recognition.stop();
                this.current = 'Game paused...';
              } else {
                this.current = 'Please speak!';
                this.props.recognition.startAndDo(this.onResultGame.bind(this));
              }
              this.refreshChildren({ isRec: this.isRec, current: this.current });
            } else {
              if (this.recognized.length < 10) {
                this.props.recognition.startAndDo(this.onResultGame.bind(this));
                this.isGame = true;
                this.current = 'Please speak!';
              } else {
                this.current = 'Please select next page or restart!';
              }
              this.saveGame();
              this.refreshChildren({
                isGame: this.isGame,
                current: this.current,
              });
            }
            this.isRec = !this.isRec;
            break;
          case 'new':
            if (this.props.page < 59) {
              this.props.onPageChange(Number.parseInt(this.props.page, 10) + 1);
            } else if (this.props.level < 5) {
              this.props.onLevelChange(Number.parseInt(this.props.level, 10) + 1);
            } else {
              this.props.onLevelChange(0);
            }
            break;
          case 'restart':
            if (this.isGame) {
              this.props.onPageChange(Number.parseInt(this.props.page, 10));
            }
            break;
          case 'result':
            this.refreshChildren({
              isResult: true,
              recognized: [...this.recognized],
              list: this.props.list,
              savedShow: false,
            });
            if (this.isRec) {
              this.props.recognition.stop();
            }
            break;
          case 'return':
            if (this.recognized.length < 10) {
              if (this.isRec) {
                this.props.recognition.startAndDo(this.onResultGame.bind(this));
              }
            } else {
              this.current = 'Please select next page or restart!';
            }
            this.refreshChildren({
              list: this.props.list,
              current: this.current,
              isResult: false,
              savedShow: false,
            });
            break;
          case 'saved':
            this.savedList = this.getSaved();
            results.refresh({
              savedShow: true,
              list: this.savedList,
              isResult: true,
              recognized: this.recognized,
            });
            break;
          default: console.log(`Pressed ${event.target.dataset.action}`);
        }

        if (this.isRec) {
          mic.classList.add(style.on);
        } else {
          mic.classList.remove(style.on);
        }
      } else if (event.target.dataset.saved) {
        const current = event.target.dataset.saved;
        results.refresh({
          list: this.savedList[current].list,
          recognized: this.savedList[current].recognized,
          isResult: true,
          savedShow: false,
        });
      }
    });
  }

  saveGame() {
    let isSave = false;
    const game = {
      list: this.props.list.map((item) => (
        {
          word: item.word,
          audio: item.audio,
          image: item.image,
          transcription: item.transcription,
          translation: item.translation,
        }
      )),
      level: this.props.level,
      page: this.props.page,
      current: this.current,
      isGame: this.isGame,
      recognized: this.recognized,
      isRec: this.isRec,
      gameId: this.gameId,
    };

    const saved = localStorage.getItem('saved');
    let savedGames = [];
    if (saved) {
      savedGames = JSON.parse(saved).slice(0, 10);
    }

    for (let i = 0; i < savedGames.length; i += 1) {
      if (savedGames[i].gameId === this.gameId) {
        savedGames[i] = game;
        isSave = true;
      }
    }

    if (!isSave) {
      savedGames.unshift(game);
    }

    localStorage.setItem('saved', JSON.stringify(savedGames));
  }

  getSaved() {
    if (localStorage.getItem('saved')) {
      return JSON.parse(localStorage.getItem('saved')).slice(0, 10);
    }

    return [];
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
    });
    if (isNewWord) {
      if (this.recognized.length === 10) {
        this.props.recognition.stop();
        this.isRec = false;
        (new Audio('/assets/success.mp3')).play();
        setTimeout(() => {
          this.refreshChildren({ isResult: true, recognized: this.recognized });
        }, 2000);
      }
      this.saveGame();
      this.refreshChildren({ recognized: [...this.recognized], current: this.current });
    } else {
      this.current = resultArr[0].length > 0 ? resultArr[0] : resultArr[1];
      this.refreshChildren({ current: `${this.current}?` });
    }
  }

  render() {
    return (
      DIV({ className: `valign-wrapper ${style.wrapper}` }, [
        DIV({ className: `container z-depth-1 ${style.container}` }, [
          new Navigation({
            page: this.props.page,
            level: this.props.level,
          }),
          DIV({ className: 'divider' }),
          new Frame({
            current: this.current || "Let's start!",
            isGame: this.isGame || false,
            list: this.props.list,
            recognized: this.recognized || [],
          }),
          DIV({ className: 'divider' }),
          DIV({ className: style.btnWrapper }, [
            stylizeButton({ className: style.button, 'data-action': 'restart' }, [
              'restart',
            ]),
            stylizeButton({ className: style.button, 'data-action': 'rec' }, [
              I({ className: `material-icons ${style.mic}` }, ['mic']),
              'click on the button and speak',
            ]),
            stylizeButton({ className: style.button, 'data-action': 'result' }, [
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
            savedShow: false,
          }),
        ]),
      ])
    );
  }
}

export default MainScreen;
