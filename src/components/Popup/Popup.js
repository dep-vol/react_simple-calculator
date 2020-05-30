import React from 'react';
import styles from './Popup.module.css';

export default function (props) {
  const {msg, onChange, clear} = props;
  const changeInput = (val) => {
    onChange(val);
  }

  const msgs = msg.map((el,i) => {
    return (
      <p key={i+el} onClick={()=>changeInput(el)}>{`${i+1}. ${el}`}</p>
    )
  })

  return (
    <div className={styles.popup}>
      {msgs}
      <div className={styles.clear} onClick={clear} >CLEAR</div>
    </div>
  )
}