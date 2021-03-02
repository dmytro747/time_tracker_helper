import React from 'react';

import CopyIcon from './icons/copy';
import css from './style.module.css';

const Code = ({ code, label, className }) => {

  const handleCodeClick = () => {
    navigator.clipboard.writeText(code).then(() => {  alert('Copied!');})
  }

  return (
    <div className={`${css.root} ${className}`} onClick={handleCodeClick}>
      <p className={css.label}>{label}</p>
      <code className={css.code}>
        {code}
      </code>
      <CopyIcon />
    </div>
  )
}


export default Code;
