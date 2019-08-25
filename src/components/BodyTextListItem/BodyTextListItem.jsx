import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SoftKeyConsumer } from '../SoftKey/withSoftKeyManager';
import colors from '../../theme/colors.scss';

import './BodyTextListItem.scss';

const prefixCls = 'kai-btl';

const BodyTextListItem = React.memo(
  props => {
    const {
      header,
      body,
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
    } = props;

    const [isFocused, setFocused] = useState(false);

    const itemCls = prefixCls;
    const headerCls = `${prefixCls}-header`;
    const bodyCls = `${prefixCls}-body ${body ? '' : 'hidden'}`;

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
        <span className={headerCls}>{header}</span>
        <label className={bodyCls}>{body}</label>
      </div>
    );
  }
);

BodyTextListItem.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.string,
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
};

BodyTextListItem.defaultProps = {
  body: null,
  focusColor: colors.defaultFocusColor,
    centerCallback: ()=>{},
    leftCallback: ()=>{},
    rightCallback: ()=>{},
};

export default React.forwardRef((props, ref) => (
 <SoftKeyConsumer>
  {context => (
    <BodyTextListItem softKeyManager={context} forwardedRef={ref} {...props} />
  )}
</SoftKeyConsumer>
));
