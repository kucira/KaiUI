import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './GridView.scss';

const prefixCls = 'kai-grid-view';

const GridView = React.memo(
    props => {
        const itemRefs = [];

        const [activeItem, setActiveItem] = useState(0);

        const {
            children,
            onChangeIndex,
            isActive,
        } = props;

        const handleChangeIndex = itemIndex => {
            setActiveItem(itemIndex);
            onChangeIndex(itemIndex);
        };

        const setFocusToIndex = useCallback(
            index => {

                const node = itemRefs[index];
                if (node !== null) {
                    if (node.current !== null || !node.current) {
                        node.current.focus();
                    }

                }
                if (node !== null && node.current !== null) {
                    node.current.scrollIntoView({
                        behavior: "smooth",
                        block: "end",
                        inline: "nearest"
                    });
                }
            },
            [itemRefs]
        );

        const handleKeyDown = useCallback(
            e => {
                let index = activeItem;
                if (!isActive) {
                    return;
                }

                switch (e.key) {
                    case 'ArrowUp':
                        // looping to bottom

                        index = (index < 3) ? (itemRefs.length - 1) - index : index - 3;
                        setFocusToIndex(index);
                        break;
                    case 'ArrowDown':
                        // looping to top
                        index = (index > itemRefs.length - 3 && index < itemRefs.length - 1) ? 0 : index + 3;
                        setFocusToIndex(index);
                        break;
                    case 'ArrowLeft':
                        // looping to left
                        index = index - 1 >= 0 ? index - 1 : itemRefs.length - 1;
                        setFocusToIndex(index);
                        break;
                    case 'ArrowRight':
                        // looping to right
                        index = index + 1 < itemRefs.length ? index + 1 : 0;
                        setFocusToIndex(index);
                        break;
                    default:
                        break;
                }
            },
            [isActive, activeItem, setFocusToIndex, itemRefs]
        );

        useEffect(
            () => {
                document.addEventListener('keydown', handleKeyDown);
                return () => document.removeEventListener('keydown', handleKeyDown);
            },
            [handleKeyDown]
        );

        useEffect(
            () => {
                if (isActive) {
                    setFocusToIndex(activeItem)
                }
            },
            [isActive, setFocusToIndex, activeItem]
        );

        const gridItemCls = `${prefixCls}-item`

        const renderChildren = () => {
            let index = -1;
            return React.Children.map(children, child => {
                // Don't focus on separators
                if (child.props.separatorText != null) {
                    return child;
                }
                index++;
                const newRef = React.createRef();
                itemRefs[index] = newRef;
                return (
                    <div className={gridItemCls}>
                {
                    React.cloneElement(child, {
                        index,
                        onFocusChange: handleChangeIndex,
                        ref: newRef,
                        })
                }       
            </div>
                )
            });
        };

        return (
            <div className={prefixCls}>
            {renderChildren()}
        </div>
        );
    }
);

GridView.propTypes = {
    children: PropTypes.array.isRequired,
    onChangeIndex: PropTypes.func,
    // Refocus on tab change
    isActive: PropTypes.bool,
};

GridView.defaultProps = {
    onChangeIndex: () => {},
    isActive: true,
};

export default GridView;