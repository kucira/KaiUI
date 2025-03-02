import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';
import { SoftKeyConsumer } from '../SoftKey/withSoftKeyManager';
import './CheckboxListItem.scss';

const prefixCls = 'kai-cbl';

const CheckboxListItem = React.memo(
  props => {
    const {
      primary,
      secondary,
      initCheckboxVal,
      onInputChange,
      checkboxSide,
      focusColor,
      onFocusChange,
      index,
      forwardedRef,
      softKeyManager
    } = props;

    // Managed vs self-managed radio buttons
    const [isChecked, setChecked] = useState(initCheckboxVal);
    const [isFocused, setFocused] = useState(false);

    const itemCls = prefixCls;
    const boxCls = `${prefixCls}-box`;
    const lineCls = `${prefixCls}-line ${
      checkboxSide === 'left' ? 'right' : 'left'
    }`;
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;
    const inputCls = `${boxCls}-input-${isFocused ? 'focused' : 'unfocused'}`;

    useEffect(() => {
        const centerText = isChecked ? 'Deselect' : 'Select';
        if (isFocused) {
          softKeyManager.setCenterText(centerText);
        }
      },
      [isFocused, isChecked, softKeyManager]
    );

    const handleInvertCheck = () => setChecked(wasChecked => !wasChecked);

    const handleInputChange = e => {
      setChecked(e.target.checked);
      onInputChange(e.target.checked);
    };

    // We want to avoid losing focus on the parent element
    const handleCheckFocus = e => {
      e.preventDefault();
      if (e.relatedTarget) {
        // Revert focus back to previous blurring element
        e.relatedTarget.focus();
      } else {
        // No previous focus target, blur instead
        e.currentTarget.blur();
      }
    };

    const handleFocusChange = isNowFocused => {
      setFocused(isNowFocused);
      if (isNowFocused) {
        const centerText = isChecked ? 'Deselect' : 'Select';
        softKeyManager.setSoftKeyTexts({ centerText });
        softKeyManager.setSoftKeyCallbacks({
          centerCallback: handleInvertCheck,
        });
        onFocusChange(index);
      } else {
        softKeyManager.unregisterSoftKeys();
      }
    };

    const checkbox = (
      <div className={boxCls}>
        <input
          className={inputCls}
          tabIndex="-1"
          type="checkbox"
          checked={props.isChecked !== null ? props.isChecked : isChecked}
          onChange={() => {}}
          onFocus={handleCheckFocus}
          onClick={handleInputChange}
        />
      </div>
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
        {checkboxSide === 'left' ? checkbox : null}
        <div className={lineCls}>
          <span className={primaryCls}>{primary}</span>
          <label className={secondaryCls}>{secondary}</label>
        </div>
        {checkboxSide === 'right' ? checkbox : null}
      </div>
    );
  }
);

CheckboxListItem.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  // Used for unmanaged checkboxes
  initCheckboxVal: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  // For direct management over the checkbox value
  isChecked: PropTypes.bool,
  checkboxSide: PropTypes.oneOf(['left', 'right']).isRequired,
  focusColor: PropTypes.string,
  // For ListView navigation
  onFocusChange: PropTypes.func,
  index: PropTypes.number,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

CheckboxListItem.defaultProps = {
  secondary: null,
  isChecked: null,
  focusColor: colors.defaultFocusColor,
};

export default React.forwardRef((props, ref) => (
  <SoftKeyConsumer>
    {context => (
      <CheckboxListItem
        softKeyManager={context}
        forwardedRef={ref}
        {...props}
      />
    )}
  </SoftKeyConsumer>
));
