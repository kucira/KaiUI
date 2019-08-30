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
      softKeyManager,
      data,
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
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className={avatarCls} />
          </span>
        </div>
        <div className={lineCls}>
          <span className={primaryCls}>{primary}</span>
          <label className={secondaryCls}>{secondary}</label>
          <div style={{
            position:'relative',
            top:secondary ? '1rem' : '1.8rem',
            width:'100vw',
            borderBottom: '1px solid lightgray',
          }}/>
        </div>
        <div>
          <div>{ data && moment(data.last_message.date).format('HH:mm')}</div>
          <div style={{
            borderRadius:'1rem',
            backgroundColor:'lightblue',
            textAlign:'center',
          }}>{data && data.unread_count > 0 && data.unread_count}</div>
        </div>
      </div>
    );
  }
);

ListChat.propTypes = {
  primary: PropTypes.string.isRequired,
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
