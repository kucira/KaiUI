import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SoftKeyConsumer } from '../SoftKey/withSoftKeyManager';
import colors from '../../theme/colors.scss';

import './TextListItem.scss';

const prefixCls = 'kai-tl';

const TextListItem = React.memo(
  props => {
    const {
      primary,
      secondary,
      tertiary,
      focusColor,
      forwardedRef,
      index,
      onFocusChange,
      leftText,
      centerText,
      rightText,
      centerCallback,
      leftCallback,
      rightCallback,
      softKeyManager,
      stylePrimary,
    } = props;

    const [isFocused, setFocused] = useState(false);

    const itemCls = prefixCls;
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;
    const tertiaryCls = `${prefixCls}-tertiary ${tertiary ? '' : 'hidden'}`;

    const handleFocusChange = isNowFocused => {
      setFocused(isNowFocused);
      if (isNowFocused) {
        onFocusChange(index);
         softKeyManager.setSoftKeyTexts({
                        centerText: centerText,
                        leftText: leftText,
                        rightText: rightText,
          });
          softKeyManager.setSoftKeyCallbacks({
              centerCallback: () => {
                  centerCallback();
              },
              leftCallback: () => {
                  leftCallback();
              },
              rightCallback: () => {
                  rightCallback();
              }
          });
      }
    }

    return (
      <div
        tabIndex="0"
        className={itemCls}
        style={{ backgroundColor: isFocused ? focusColor : colors.white }}
        ref={forwardedRef}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
      >
        <span className={primaryCls} style={stylePrimary}>{primary}</span>
        <label className={secondaryCls}>{secondary}</label>
        <label className={tertiaryCls}>{tertiary}</label>
      </div>
    );
  }
);

TextListItem.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  tertiary: PropTypes.string,
  focusColor: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
  centerText: PropTypes.string,
  leftText: PropTypes.string,
  rightText: PropTypes.string,
  centerCallback: PropTypes.func,
  leftCallback: PropTypes.func,
  rightCallback: PropTypes.func,
  stylePrimary: PropTypes.object,
};

TextListItem.defaultProps = {
  secondary: null,
  tertiary: null,
  focusColor: colors.defaultFocusColor,
    centerCallback: ()=>{},
    leftCallback: ()=>{},
    rightCallback: ()=>{},
};

export default React.forwardRef((props, ref) => (
 <SoftKeyConsumer>
  {context => (
    <TextListItem softKeyManager={context} forwardedRef={ref} {...props} />
  )}
</SoftKeyConsumer>
));
