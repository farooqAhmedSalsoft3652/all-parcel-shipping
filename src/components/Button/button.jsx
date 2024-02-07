import React from 'react'
import "./button.css"

const SiteButton = (props) => {
  return (
    <>
        <button 
          type={props.type ? props.type : 'button'} 
          onClick={props.onClick} 
          className={`${props.className ? props.className : ''}`}
          disabled={props.load ? true : false}
        >
          {props.load ? (
            <>
              <div
                className="spinner-border text-white spinner-border-sm"
                role="status"
              ></div>
              &nbsp;
            </>
          ):""}

            {props.children}
        </button>
    </>
  )
}
export default SiteButton;
