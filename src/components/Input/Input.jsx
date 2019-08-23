import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { SoftKeyConsumer } from '../SoftKey/withSoftKeyManager';
import colors from '../../theme/colors.scss';

import './Input.scss';

const prefixCls = 'kai-inp';

const Input = React.memo(
  props => {
    const {
      label,
      focusColor,
      forwardedRef,
      index,
      onFocusChange,
      placeholder,
      onInputChange,
      value,
      centerText,
      softKeyManager,
      centerCallback,
    } = props;

    const [isFocused, setFocused] = useState(false);
    const inputRef = useRef(null);

    const itemCls = `${prefixCls}-container`;
    const secondaryCls = `${prefixCls}-container-secondary`;

    const handleFocusChange = useCallback(
      isNowFocused => {
        setFocused(isNowFocused);
       if (isNowFocused) {
        onFocusChange(index);
        inputRef.current.focus();
        softKeyManager.setSoftKeyTexts({
          centerText: centerText,
        });
        softKeyManager.setSoftKeyCallbacks({
            centerCallback:()=>{
              centerCallback();
            }
        });
      }
      else{
        inputRef.current.blur();
      }
      },
      [index, onFocusChange, centerCallback, centerText, softKeyManager]
    );


    return (
      <div
        tabIndex="0"
        className={itemCls}
        style={{ backgroundColor: isFocused ? focusColor : colors.white }}
        ref={forwardedRef}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
      >
        {label && (<span className={secondaryCls} 
                          style={{ color: isFocused ? colors.white : colors.black }}>{label}</span>)}
        <input ref={inputRef}
                placeholder={placeholder}
                value={value}
                onChange={(evt) =>{
                  onInputChange(evt.target.value);
                }} />
      </div>
    );
  }
);

Input.propTypes = {
  label: PropTypes.string,
  focusColor: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
  onInputChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  centerText: PropTypes.string,
  centerCallback: PropTypes.func,
};

Input.defaultProps = {
  focusColor: colors.defaultFocusColor,
};

export default React.forwardRef((props, ref) => (
  <SoftKeyConsumer>
  {context => (
    <Input softKeyManager={context} forwardedRef={ref} {...props} />
  )}
</SoftKeyConsumer>
  
));
