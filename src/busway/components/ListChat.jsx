import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SoftKeyConsumer } from '../../components/SoftKey/withSoftKeyManager';
import colors from '../../theme/colors.scss';
import moment from 'moment';
import './ListChat.scss';

const prefixCls = 'kai-listchat';

const ListChat = React.memo(
  props => {
    const {
      primary,
      secondary,
      icon,
      focusColor,
      forwardedRef,
      index,
      children,
      onFocusChange,
      leftText,
      centerText,
      rightText,
      centerCallback,
      leftCallback,
      rightCallback,
      backCallback,
      softKeyManager,
      data,
      initial,
      color,
    } = props;

    const [isFocused, setFocused] = useState(false);

    const itemCls = prefixCls;
    const iconCls = `${prefixCls}-icon-${isFocused ? 'focused' : 'unfocused'}`;
    const lineCls = `${prefixCls}-line`;
    const primaryCls = `${prefixCls}-primary`;
    const secondaryCls = `${prefixCls}-secondary ${secondary ? '' : 'hidden'}`;
    const avatarCls = `${prefixCls}-avatar`;

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
              },
              backCallback: (e) => {
                  backCallback(e);
              }
          });
      }
    }
    return (
      <div
        tabIndex="0"
        className={itemCls}
        ref={forwardedRef}
        style={{ backgroundColor: isFocused ? focusColor : colors.white }}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
      >
        <div className={iconCls}>
          <span className={icon}>
            <div className={avatarCls} style={{
              backgroundColor:`#${color}`
            }}>
              {initial}
            </div>
          </span>
        </div>
        <div className={lineCls}>
          <span className={primaryCls}>{primary}</span>
        </div>
      </div>
    );
  }
);

ListChat.propTypes = {
  primary: PropTypes.string.isRequired,
  initial: PropTypes.string,
  secondary: PropTypes.string,
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
  data: PropTypes.object,
};

ListChat.defaultProps = {
  secondary: null,
  focusColor: colors.defaultFocusColor,
};

export default React.forwardRef((props, ref) => (
 <SoftKeyConsumer>
  {context => (
    <ListChat softKeyManager={context} forwardedRef={ref} {...props} />
  )}
</SoftKeyConsumer>
));
