import React from 'react';

import { omit } from '../helpers/util';

/**  Creates a form with no-validate. Its possible to customize the appearence with a CSS Framework (Bootstrap for example). */
export const Form = (props) => {
    let rest = omit(props, ['noValidate']);
    return <form {...rest} noValidate />;
};

