import React, { useState } from 'react'

const ToggleVisibility = ({ children }) => {
    const [show, setShow] = useState(true)

    return (
        <React.Fragment>
            <div className='toggle'>
                {show && children}
                <button onClick={() => setShow(!show)}>
                    {show ? 'Close' : 'Add Exercise'}
                </button>
            </div>
        </React.Fragment>
    )
}

export default ToggleVisibility