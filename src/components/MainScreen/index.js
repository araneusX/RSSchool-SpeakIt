import { getTranslate } from '../../data';

import { DIV, P, CustomComponent } from '../../my_modules/htmlComponents';
import stylizeButton from '../stylizeElements/stylizeButton';
import Navigation from './Navigation';
import Frame from './Frame';
import Words from './Words';
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
    this.current = null;
    this.pronounced = [];
    this.mode = 'train';

    this.node.addEventListener('click', (event) => {
      if (event.target.dataset.level && event.target.dataset.level !== this.props.level) {
        this.props.onLevelChange(event.target.dataset.level);
      } else if (event.target.dataset.page && event.target.dataset.page !== this.props.page) {
        this.props.onPageChange(event.target.dataset.page);
      } else if (event.target.dataset.current ||event.target.parentNode.dataset.current) {
        this.current = event.target.dataset.current ||event.target.parentNode.dataset.current;
        if (!this.props.list[this.current].translate) {
          getTranslate(this.props.list[this.current].word)
            .then((translate) => {
              this.props.list[this.current].translate = translate;
              this.refreshChildren({current: this.current});
            })
        } else {
          this.refreshChildren({current: this.current});
        }
        if (!this.props.list[this.current].audioSrc) {
          this.props.list[this.current].audioSrc = new Audio(
            `https://raw.githubusercontent.com/araneusx/rslang-data/master/data/${this.props.list[this.current].audio}`
          );
        }
        this.props.list[this.current].audioSrc.play();
      }
    })
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
            current: this.current || null,
            mode: this.mode || 'train',
            list: this.props.list,
          }),
          DIV({ className: 'divider' }),
          DIV({className: style.btnWrapper}, [
            stylizeButton({className: style.button, 'data-action': 'restart'}, [
              'restart',
            ]),
            stylizeButton({className: style.button, 'data-action': 'rec'}, [
              'hold the button pressed and speak the word',
            ]),
            stylizeButton({className: style.button, 'data-action': 'statistics'}, [
              'statistics',
            ]),
          ]),
          new Words({
            list: this.props.list,
            mode: this.mode || 'train',
            pronounced: this.props.pronounced || [],
          }),
        ])
      ])
    );
  }
}

export default MainScreen;
