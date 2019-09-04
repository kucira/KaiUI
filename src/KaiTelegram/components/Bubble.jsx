import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SoftKeyConsumer } from '../../components/SoftKey/withSoftKeyManager';
import colors from '../../theme/colors.scss';
import moment from 'moment';
import './Bubble.scss';

const prefixCls = 'kai-bubble';
const Bubble = React.memo(
  props => {
    const {
      content,
      time,
      focusColor,
      forwardedRef,
      index,
      children,
      onFocusChange,
      data,
      isSelf,
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
        ref={forwardedRef}
        style={{ backgroundColor: isFocused ? focusColor : colors.white }}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
      >
        {
          isSelf && (
             <li className="self">
                  <div className="messages">
                    <p>{content}</p>
                    <time dateTime={time}>{time}</time>
                  </div>
                </li>
          )
        }
        {
          !isSelf && (
              <li className="other">
                <div className="messages">
                    <p>{content}</p>
                    <time dateTime={time}>{time}</time>
                </div>
              </li>
          )
        }

      </div>
    );
  }
);

Bubble.propTypes = {
  focusColor: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
  data: PropTypes.object,
  centerText: PropTypes.string,
  leftText: PropTypes.string,
  rightText: PropTypes.string,
  centerCallback: PropTypes.func,
  leftCallback: PropTypes.func,
  rightCallback: PropTypes.func,
  content: PropTypes.string,
  time: PropTypes.string,
};

Bubble.defaultProps = {
  secondary: null,
  focusColor: colors.defaultFocusColor,
  centerCallback: ()=>{},
  leftCallback: ()=>{},
  rightCallback: ()=>{},
};

export default React.forwardRef((props, ref) => (
 <SoftKeyConsumer>
  {context => (
    <Bubble softKeyManager={context} forwardedRef={ref} {...props} />
  )}
</SoftKeyConsumer>
));
