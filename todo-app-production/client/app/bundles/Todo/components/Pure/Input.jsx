// @flow
import React from 'react';
import MaskedInput from 'react-maskedinput';
import classNames from 'classnames';

import css from './Input.scss';

type Props = {
  className?: string,
  size?: string, // size for grid
  inputSize?: number | string, // size of actually inlining the size style on the input
  mask?: string,
  error?: boolean,
};

const Input = ({ className, mask, size, inputSize, error, ...otherProps }: Props) => (
  mask
    ? (
      <MaskedInput
        className={classNames(size && `pure-u-${size}`, error && css.error, className)}
        mask={mask}
        size={inputSize}
        {...otherProps}
      />
    )
    : <input className={classNames(size && `pure-u-${size}`, error && css.error, className)} {...otherProps} />
);

export default Input;
