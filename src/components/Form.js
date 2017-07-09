import React from 'react';

import { omit } from '../common/util';

/**  Create a form with no-validate. */
export const Form = (props) => {
    let rest = omit(props, ['noValidate']);
    return <form {...rest} noValidate />;
};

