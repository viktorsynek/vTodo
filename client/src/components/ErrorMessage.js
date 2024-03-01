import React, { useState, useEffect } from 'react';

const ErrorMessage = ({ errorMsg }) => {
    const [isVisible, setIsVisible] = useState(false); 

    useEffect(() => {
        if (errorMsg)
            setIsVisible(true); 
    }, [errorMsg]);

    return (
        <div
        className={`error-box`}
        style={{ display: isVisible ? 'inline-block' : 'none' }}
      >
        <p>{errorMsg}</p>
      </div>
    );
}

export default ErrorMessage;
