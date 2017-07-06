import React from 'react';

import { omit } from '../common/Util';

export const Form = (props) => {
    let rest = omit(props, ['noValidate']);
    return <form {...rest} noValidate />;
};

