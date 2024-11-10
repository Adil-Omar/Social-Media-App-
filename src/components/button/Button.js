import React from 'react'

export default function Button({title,onClickHandler}) {
  return (
    <div>
      <button onClick={onClickHandler} >{title}</button>
    </div>
  )
}
