import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Page = PageView => {
  return props =>
    <div className="page">
      <ReactCSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={100}
        transitionEnterTimeout={100}
        transitionLeaveTimeout={100}
        transitionName='SlideIn'
      >
        <PageView {...props} />
      </ReactCSSTransitionGroup>
    </div>;
};
export default Page;