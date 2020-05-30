import React from 'react';
import styles from './App.module.css';
import Popup from "../Popup/Popup";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.display = React.createRef();
  }
  state = {
    inpValue : '',
    lastOp : []
  };
  makeResult = () => {
    let result;
    let input = {...this.state};

    try {
      result =  eval(this.state.inpValue);
      input.lastOp.push(input.inpValue);
      input.inpValue = result;
      this.setState(input);
    }
    catch (e) {

    }

  }
  onChangeInp = (e) => {
    let value = e.target.value;

    if (this.checkInp(value)) {
      this.setState({inpValue: value})
    } else {
      return null
    }
  }
  onEnterPress = (e) => {
    if (e.key==='Enter') {
      this.makeResult()
    }
  }
  onCalcElClick = (el) => {
    let input = {...this.state};
    input.inpValue += el;
    if (this.checkInp(input.inpValue)) this.setState(input);
  };
  checkInp = (value) => {
    const regCheck = /^[\d+\-/*().]+$/;
    const wrongs = ['--','++','**','//','-+','-*','-/','+-','+*','+/','/*','/-','/+','*-','*+','*/','..'];
    const checkWrongs = ()=> {
      return wrongs.some(el=>value.includes(el))
    }
    return regCheck.test(value) & !checkWrongs() & !isNaN(parseInt(value))
  }
  onChangeDisplay = (el) => {
    let input = {...this.state};
    input.inpValue = el;
    this.setState(input)
  }
  clearOpList = () => {
    let lastOp = [];
    this.setState({lastOp})
  }
  makeBackspace = () => {
    let input = {...this.state}
    input.inpValue = input.inpValue.slice(0,-1);
    this.setState(input);
  }
  elements = [
    {
      id:1,
      el:'AC',
      elClass: 'clear',
      onClick: ()=>{
        let input = {...this.state};
        input.inpValue = '';
        this.setState(input)
      }
    },
    {
      id:2,
      el:'Back',
      elClass: 'back',
      onClick: ()=>this.makeBackspace()
    },
    {
      id:3,
      el:' ',
      elClass: 'display'
    },
    {
      id:4,
      el:'7',
      elClass: 'seven'
    },
    {
      id:5,
      el:'8',
      elClass: 'eight'
    },
    {
      id:6,
      el:'9',
      elClass: 'nine'
    },
    {
      id:7,
      el:'/',
      elClass: 'divide'
    },
    {
      id:8,
      el:'4',
      elClass: 'four'
    },
    {
      id:9,
      el:'5',
      elClass: 'five'
    },
    {
      id:10,
      el:'6',
      elClass: 'six'
    },
    {
      id:11,
      el:'*',
      elClass: 'multiply'
    },
    {
      id:12,
      el:'1',
      elClass: 'one'
    },
    {
      id:13,
      el:'2',
      elClass: 'two'
    },
    {
      id:14,
      el:'3',
      elClass: 'three'
    },
    {
      id:15,
      el:'-',
      elClass: 'minus'
    },
    {
      id:16,
      el:'0',
      elClass: 'zero'
    },
    {
      id:17,
      el:'.',
      elClass: 'dot'
    },
    {
      id:18,
      el:'=',
      elClass: 'equal',
      onClick: this.makeResult
    },
    {
      id:19,
      el:'+',
      elClass: 'plus'
    }
  ];


  componentDidUpdate(prevProps, prevState, snapshot) {
    this.display.current.focus()
  }

  render() {

    const calcElems = this.elements.map((el) => {
      if (el.elClass === 'display') {
        return <input type='text' key={el.id+el.el}
                      className={styles[el.elClass]}
                      value = {this.state.inpValue}
                      onChange={(e)=>this.onChangeInp(e)}
                      onKeyPress={(e)=>this.onEnterPress(e)}
                      autoFocus
                      ref={this.display}/>
      }
      else {
        return (
          <div key={el.id+el.el}
               className={styles[el.elClass]}
               onClick={el.onClick ? el.onClick : ()=>this.onCalcElClick(el.el)}
          >{el.el}</div>
        )
      }

    })
    return (
      <>
        <div className={styles.main}>
          <div className={styles.calc}>
            {calcElems}
          </div>
        </div>
        <Popup msg={this.state.lastOp} onChange = {this.onChangeDisplay} clear = {this.clearOpList} />
      </>
    );
  }

}

export default App;
