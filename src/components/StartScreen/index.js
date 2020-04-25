import { DIV, H1, P, CustomComponent } from '../../my_modules/htmlComponents';
import stylizeButton from '../stylizeElements/stylizeButton';
import style from './style.css';

/* props = {
    onStartClick
  }
*/
class StartScreen extends CustomComponent {
  render() {
    const startButton = stylizeButton({ className: style.button }, ['start']);
    startButton.node.addEventListener('click', this.props.onStartClick)
    
    return (
      DIV({ className: `valign-wrapper ${style.wrapper}`}, [
        DIV({ className: 'container' }, [
          DIV({ className: 'row center' }, [
            DIV({ className: `col s12 m8 offset-m2 z-depth-4 blue-grey darken-3 ${style.message}` }, [
              H1({className: 'blue-grey-text text-lighten-5' }, ['SpeakIt!']),
              P({ className: 'flow-text blue-grey-text text-lighten-3' }, ['Click on a word to hear its sound.']),
              P({ className: 'flow-text blue-grey-text text-lighten-4' }, ['Click and hold the button and speak words into the microphone.']),
              startButton,
            ]),
          ]),
        ]),
      ])
    );
  }
}

export default StartScreen;
