import React from 'react'

const Prompt = ({ handleSubmit, handleChange, value }) => {
  return (
    <form>
        <textarea 
            name='prompt' 
            rows={1} cols={1} 
            placeholder='Ask CodeWizard...' 
            onChange={handleChange}
            value={value}
        ></textarea>
        <button type='submit' onClick={handleSubmit}>
            <img src='./src/assets/send.svg'/>
        </button>
    </form>
  )
}

export default Prompt