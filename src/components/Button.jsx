/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

const baseStyles = css`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
`;

const variantStyles = {
  primary: css`
    background-color: #3b82f6;
    color: white;
    &:hover {
      background-color: #2563eb;
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #93c5fd;
    }
  `,
  secondary: css`
    background-color: #6b7280;
    color: white;
    &:hover {
      background-color: #4b5563;
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #d1d5db;
    }
  `,
};

const Button = ({ children, variant, className, ...rest }) => {
  return (
    <button
      css={[baseStyles, variantStyles[variant] || variantStyles.primary]}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  className: PropTypes.string,
};

Button.defaultProps = {
  variant: 'primary',
  className: '',
};

export default Button;
