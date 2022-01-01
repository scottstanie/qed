// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2022 all rights reserved


// externals
import React from 'react'
// locals
// context
import { Context } from './context'


// support for terminating a flex
export default () => {
    // flexing support
    const {
        panels, mainExtent, flexingPanel, setFlexingPanel, setDownstreamPanels
    } = React.useContext(Context)

    // when flexing ends
    const endFlex = (evt) => {
        // stop this event from bubbling up
        evt.stopPropagation()
        // and quash any side effects
        evt.preventDefault()

        // if no panel is flexing
        if (flexingPanel == null) {
            // nothing to do
            return
        }

        const refs = Array.from(panels.keys())
        // collect placement and sizing information for all panels
        const extents = new Map(refs.map(ref => [ref, ref.current.getBoundingClientRect()]))

        // go through all the panels and enable flexbox as appropriate
        extents.forEach((extent, panelRef) => {
            // deduce the correct flex: every panel is now frozen to its styled extent,
            // except the ones marked auto
            const { auto } = panels.get(panelRef)
            // compute the appropriate flex
            const flex = auto ? "1 1 auto" : "0 0 auto"
            // get the style of the associated element
            const style = panelRef.current.style
            // apply the flex
            style.flex = flex
            // and make sure the panel style reflects the current actual extent
            style[mainExtent] = `${extent[mainExtent]}px`
            // all done
            return
        })

        // reset the flexing panel
        setFlexingPanel(null)
        // and the pile of downstream panels
        setDownstreamPanels([])

        // all done
        return
    }

    // build and return the context relevant to this panel
    return {
        // end a panel resize sequence
        endFlex
    }
}


// end of file
