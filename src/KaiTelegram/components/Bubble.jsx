import React, { useState } from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';
import moment from 'moment';
import './Bubble.scss';

const prefixCls = 'kai-bubble';
const Bubble = React.memo(
  props => {
    const {
      focusColor,
      forwardedRef,
      index,
      children,
      onFocusChange,
      data,
      isSelf,
    } = props;

    const [isFocused, setFocused] = useState(false);

    const itemCls = prefixCls;

    const handleFocusChange = isNowFocused => {
      setFocused(isNowFocused);
      if (isNowFocused) {
        onFocusChange(index);
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
                    <p>That makes sense.</p>
                    <p>It's a pretty small airport.</p>
                    <time datetime="2009-11-13T20:14">37 mins</time>
                  </div>
                </li>
          )
        }
        {
          !isSelf && (
              <li className="other">
                <div className="messages">
                  <p>that mongodb thing looks good, huh?</p>
                  <p>
                    tiny master db, and huge document store</p>
                  <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
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
};

Bubble.defaultProps = {
  secondary: null,
  focusColor: colors.defaultFocusColor,
};

export default React.forwardRef((props, ref) => (
  <Bubble forwardedRef={ref} {...props} />
));
