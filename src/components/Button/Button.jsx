import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { SoftKeyConsumer } from '../SoftKey/withSoftKeyManager';
import colors from '../../theme/colors.scss';

import './Button.scss';

const prefixCls = 'kai-button';

const Button = React.memo(
    props => {
        const {
            text,
            focusColor,
            forwardedRef,
            index,
            onFocusChange,
            centerText,
            leftText,
            rightText,
            softKeyManager,
            centerCallback,
            leftCallback,
            rightCallback,
        } = props;

        const [isFocused, setFocused] = useState(false);

        const containerCls = `${prefixCls}-container`;

        const handleFocusChange = useCallback(
            isNowFocused => {
                setFocused(isNowFocused);
                if (isNowFocused) {
                    onFocusChange(index);
                    softKeyManager.setSoftKeyTexts({
                        centerText: centerText,
                    });
                    softKeyManager.setSoftKeyCallbacks({
                        centerCallback: () => {
                            centerCallback();
                        }
                    });
                }
            },
            [index, onFocusChange, centerCallback, centerText, softKeyManager]
        );


        return (
            <div
			className={containerCls}
			onFocus={() => handleFocusChange(true)}
			onBlur={() => handleFocusChange(false)}
		>
        	<button tabIndex="0"
        			type="button"
        			ref={forwardedRef}
        			style={{ backgroundColor: isFocused ? focusColor : colors.grayscale20 }}>
        		{text}
        	</button>
      </div>
        );
    }
);

Button.propTypes = {
    text: PropTypes.string,
    focusColor: PropTypes.string,
    forwardedRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
    index: PropTypes.number,
    onFocusChange: PropTypes.func,
    centerText: PropTypes.string,
    centerCallback: PropTypes.func,
};

Button.defaultProps = {
    focusColor: colors.defaultFocusColor,
    centerCallback: ()=>{},
    leftCallback: ()=>{},
    rightCallback: ()=>{},
};

export default React.forwardRef((props, ref) => (
    <SoftKeyConsumer>
  {context => (
    <Button softKeyManager={context} forwardedRef={ref} {...props} />
  )}
</SoftKeyConsumer>

));