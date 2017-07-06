import React from 'react';

import { omit } from '../common/util';

export const Form = (props) => {
    let rest = omit(props, ['noValidate']);
    return <form {...rest} noValidate />;
};

