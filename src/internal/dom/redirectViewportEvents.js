
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/dom/redirectViewportEvents.js
Scrollgrid.prototype.internal.dom.redirectViewportEvents = function () {
    "use strict";

    var self = this,
        int = self.internal,
        dom = int.dom,
        viewport = dom.main.viewport,
        eventHandlers = int.eventHandlers,
        n = eventHandlers.length,
        j,
        eventHandler,
        getRedirectHandler;

    getRedirectHandler = function (dom, eventType) {
        return function (d, i) {
            var mouse,
                svg,
                rpos,
                list,
                target,
                targetEventHandler;

            mouse = d3.mouse(this);

            svg = dom.main.svg.node();
            rpos = svg.createSVGRect();
            rpos.x = mouse[0];
            rpos.y = mouse[1];
            rpos.width = 1;
            rpos.height = 1;

            list = svg.getIntersectionList(rpos, null);
            if (list.length) {
                target = list[0].parentNode;
                targetEventHandler = d3.select(target).on(eventType);
                if (targetEventHandler) {
                    targetEventHandler.apply(target, [d, i]);
                }
            }
        };
    };

    for (j = 0; j < n; j += 1) {
        eventHandler = eventHandlers[j];
        viewport.on(eventHandler.type, getRedirectHandler(dom, eventHandler.type));
        console.log(viewport.eventHandlers);
    }
};
