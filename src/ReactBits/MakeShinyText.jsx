import React from 'react';
import ShinyText from './ShinyText';

const MakeShinyText = ({text}) => {
    return (
       <ShinyText text={text} disabled={false} speed={3} className='custom-class' />
    );
};

export default MakeShinyText;