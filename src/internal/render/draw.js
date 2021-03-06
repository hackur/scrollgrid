
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/draw.js
Scrollgrid.prototype.internal.render.draw = function (clearCache) {
    "use strict";

    var int = this.internal,
        render = int.render,
        interaction = int.interaction,
        sizes = int.sizes,
        dom = int.dom,
        virtual = sizes.virtual,
        physical = sizes.physical,
        physicalViewArea = render.getVisibleRegion.call(this),
        viewArea = render.getDataBounds.call(this, physicalViewArea),
        totalWidth,
        totalHeight,
        fixedSize = {},
        p = viewArea.physical,
        v = viewArea.virtual,
        y = {
            top: { top: 0, bottom: virtual.top },
            middle: { top: virtual.top + v.top, bottom: virtual.top + v.bottom },
            bottom: { top: virtual.outerHeight - virtual.bottom, bottom: virtual.outerHeight }
        },
        x = {
            left: { left: 0, right: virtual.left },
            middle: { left: virtual.left + v.left, right: virtual.left + v.right },
            right: { left: virtual.outerWidth - virtual.right, right: virtual.outerWidth }
        };

    // Draw the separate regions
    render.renderRegion.call(this, dom.top.left, {}, x.left, y.top, clearCache);
    render.renderRegion.call(this, dom.top, { x: p.x }, x.middle, y.top, clearCache);
    render.renderRegion.call(this, dom.top.right, {}, x.right, y.top, clearCache);
    render.renderRegion.call(this, dom.left, { y: p.y }, x.left, y.middle, clearCache);
    render.renderRegion.call(this, dom.main, { x: p.x, y: p.y }, x.middle, y.middle, clearCache);
    render.renderRegion.call(this, dom.right, { y: p.y }, x.right, y.middle, clearCache);
    render.renderRegion.call(this, dom.bottom.left, {}, x.left, y.bottom, clearCache);
    render.renderRegion.call(this, dom.bottom, { x: p.x }, x.middle, y.bottom, clearCache);
    render.renderRegion.call(this, dom.bottom.right, {}, x.right, y.bottom, clearCache);

    // Add resize handles
    if (interaction.allowColumnResizing) {
        interaction.addResizeHandles.call(this, dom.top.left, x.left);
        interaction.addResizeHandles.call(this, dom.top, x.middle, p.x);
        interaction.addResizeHandles.call(this, dom.top.right, x.right);
    }

    // Calculate if the rendering means that the width of the
    // whole table should change and layout accordingly
    totalWidth = (physical.left + physical.totalInnerWidth + physical.right + physical.verticalScrollbarWidth);
    fixedSize.width = (totalWidth < dom.parent.node().offsetWidth ? totalWidth : null);
    totalHeight = (physical.top + physical.totalInnerHeight + physical.bottom + physical.horizontalScrollbarHeight);
    fixedSize.height = (totalHeight < dom.parent.node().offsetHeight ? totalHeight : null);
    dom.layoutDOM.call(this, fixedSize);

};