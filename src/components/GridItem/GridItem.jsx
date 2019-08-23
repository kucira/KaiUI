import React, { useState , useCallback} from 'react';
import PropTypes from 'prop-types';
import colors from '../../theme/colors.scss';
import { SoftKeyConsumer } from '../SoftKey/withSoftKeyManager';

import './GridItem.scss';

const prefixCls = 'kai-grid-item-container';

const GridItem = React.memo(
  props => {
    const {
      focusColor,
      forwardedRef,
      index,
      onFocusChange,
      type,
      src,
      content,
      softKeyManager,
      centerCallback,
    } = props;

    const [isFocused, setFocused] = useState(false);

    const handleFocusChange = useCallback(
        isNowFocused => {
          setFocused(isNowFocused);
          if (isNowFocused) {
            onFocusChange(index);
            softKeyManager.setSoftKeyTexts({
                centerText: 'select',
              });
              softKeyManager.setSoftKeyCallbacks({
                  centerCallback:()=>{
                    centerCallback();
                  }
              });
          }
          else{
            softKeyManager.unregisterSoftKeys();
          }
        },
        [index, onFocusChange, softKeyManager, centerCallback]
      );

    const borderColor = isFocused ? `0.4rem solid ${focusColor}` : '';
    return (
      <div
        tabIndex="0"
        className={prefixCls}
        ref={forwardedRef}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
      >
        {type === 'item' && <span>{content}</span>}
        {/* {type === 'image' && <img src={src} alt=''/>} */}
        {type === 'image' && <div style={{
            height: '100%',
            width: '100%',
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no repeat',
            backgroundPosition: '0.28rem 0.2rem',
            backgroundSize: 'cover',
        }}>
            {/* cursor  */}
            <div style={{
                height:'100%',
                width:'100%',
                border: borderColor,
                position:'relative',
            }} />
        </div>}

      </div>
    );
  }
);

GridItem.propTypes = {
  focusColor: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  index: PropTypes.number,
  onFocusChange: PropTypes.func,
  src: PropTypes.string,
  type: PropTypes.string,
  centerCallback: PropTypes.func,
};

GridItem.defaultProps = {
  focusColor: colors.defaultFocusColor,
  src:'',
  type:'item',
};

export default React.forwardRef((props, ref) => (
    <SoftKeyConsumer>
        {context => (
        <GridItem softKeyManager={context} forwardedRef={ref} {...props} />
        )}
    </SoftKeyConsumer>
));
