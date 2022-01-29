import React from 'react';

const Container:React.FC = ({children}) => {
    return <div className="px-2 md:px-10 lg:px-16 xl-20">{children}</div>
}

export default Container