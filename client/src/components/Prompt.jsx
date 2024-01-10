import React from 'react'

const Prompt = ({ handleSubmit, handleChange, value, isTyping }) => {
  return (
    <form>
        <textarea 
            name='prompt' 
            rows={1} cols={1} 
            placeholder='Ask CodeWizard...' 
            onChange={handleChange}
            value={value}
        ></textarea>
        <button className='submit-button' type='submit' onClick={handleSubmit}>
            <img className='prompt-button' src={isTyping ? './src/assets/align-justify.svg' : './src/assets/send.svg'}/>
        </button>
    </form>
  )
}

export default Prompt