import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import './ListView.scss';

const prefixCls = 'kai-list-view';

const ListView = React.memo(
  props => {
    const itemRefs = [];

    const [activeItem, setActiveItem] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

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
      index => 
      {
        
        const node = itemRefs[index];
        if(node !== null && node !== undefined) {
          if(node.current !== null && node.current !== undefined) {
            node.current.focus();
          }
          if(node.current !== null && node.current !== undefined) {
            node.current.scrollIntoView({
              behavior: "smooth", 
              block: "end", 
            });
          }
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
            index = index - 1 >= 0 ? index - 1 : itemRefs.length - 1;
            setFocusToIndex(index);
            // setCurrentIndex(index);
            break;
          case 'ArrowDown':
            // looping to top
            index = index + 1 < itemRefs.length ? index + 1 : 0;
            setFocusToIndex(index);
            // setCurrentIndex(index);
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
        if(isActive) {
          setFocusToIndex(activeItem)
        }
      },
      [isActive, setFocusToIndex, activeItem]
    );

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
        return React.cloneElement(child, {
          index,
          currentIndex,
          onFocusChange: handleChangeIndex,
          ref: newRef,
        });
      });
    };

  
  const Row = React.forwardRef(({ index, style }, ref) => {
    // const rendChild = renderChildren();
    // return rendChild[index];
    const childrens = React.Children.toArray(children);
    const child = childrens[index];
    if (child.props.separatorText != null) {
      return child;
    }
    const newRef = React.createRef();
    itemRefs[index] = newRef;
    return React.cloneElement(child, {
      index,
      onFocusChange: handleChangeIndex,
      ref: newRef,
      style:{style}
    });
  });

  const innerElementType = React.forwardRef(({ style, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
    />
  ));


    return (
      <div className={prefixCls}>
        {
        //   <AutoSizer>
        //   {({ height, width }) => (
        //     <List className="List"
        //           height={1000}
        //           itemCount={React.Children.toArray(children).length}
        //           itemSize={50}
        //           width={width}
        //           innerElementType={innerElementType}>
        //       {Row}
        //     </List>
        //   )}
          
        // </AutoSizer>
      }
        {
            renderChildren()
        }
      </div>);
  }
);

ListView.propTypes = {
  children: PropTypes.array.isRequired,
  onChangeIndex: PropTypes.func,
  // Refocus on tab change
  isActive: PropTypes.bool,
};

ListView.defaultProps = {
  onChangeIndex: () => {},
  isActive: true,
};

export default ListView;
