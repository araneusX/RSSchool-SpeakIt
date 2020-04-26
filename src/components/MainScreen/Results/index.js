import { DIV, H2, SPAN, I, CustomComponent } from '../../../my_modules/htmlComponents';
import stylizeButton from '../../stylizeElements/stylizeButton';
import style from './style.css';

/* 
   props = {
      list:
      recognized:
      isResult:
   }
*/
class Results extends CustomComponent {

  refresh(newProps) {
    if (newProps.isResult !== this.props.isResult || this.props.isResult) {
      this.props = newProps;
      this.rerender();
    }
  }

  render() {

    let content = [];

    if (this.props.isResult) {
      const innerContent = [];

      this.props.list.forEach((word, i) => {
        const isRight = this.props.recognized.includes(word.word);
        const item = (
          DIV({ className: `flow-text ${style.item}`, 'data-resultList': i}, [
            I({ className: `small material-icons ${isRight ? style.right : style.wrong}` }, [
              isRight ? 'check' : 'close',
            ]),
            SPAN({}, [word.word]),
            SPAN({}, [word.transcription]),
            SPAN({}, [word.translation]),
            I({ className: 'small material-icons' }, ['volume_up']),
          ])
        );

        if (this.props.recognized.includes(word.word)) {
          innerContent.unshift(item);
        } else {
          innerContent.push(item);
        }
        
      })

      
      content = [
        DIV({ className: style.screen }, [
          DIV({ className: `z-depth-2 ${style.message}` }, [
            H2({ className: style.total }, [`Result: ${this.props.recognized.length}/10`]),
            DIV({ className: style.container }, [
              ...innerContent,
            ]),
            DIV({ className: style.buttonsWrapper }, [
              stylizeButton({'data-action': 'saved'}, ['Saved games']),
              stylizeButton({'data-action': 'new'}, ['New game']),
              stylizeButton({'data-action': 'return'}, ['Return']),
            ])
          ]),
        ])
      ]
    }

    return (
      DIV({ className: style.wrapper }, [
        ...content,
      ])
    );
  }
}

export default Results;
