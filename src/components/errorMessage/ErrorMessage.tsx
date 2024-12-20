import React from "react";
import './ErrorMessage.css';

interface ErrorMessageProps {
    error: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({error}) => {

    if(!error) return null;
    return <p className="error-message">{error}</p>
}

export default ErrorMessage;