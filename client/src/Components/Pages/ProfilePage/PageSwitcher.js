import React from "react";

export default function PageSwitcher({ currentPageIndex, ...props }) {
    const children = props.children;
    let childToRender = null;
    React.Children.forEach(children, child => {
        if(child.props.index === currentPageIndex) 
            childToRender = child;
    });
    return (
        <div>
            {childToRender}
        </div>
    );
}
