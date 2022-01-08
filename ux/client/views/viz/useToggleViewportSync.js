// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2022 all rights reserved


// externals
import React from 'react'

// local
// context
import { Context } from './context'


// viewport registration
export const useToggleViewportSync = (viewport) => {
    // grab the sync table mutator from the context
    const { setSynced } = React.useContext(Context)

    // a handler that toggles whether this {viewport} is synced to the global camera
    const toggle = () => {
        // update the sync table
        setSynced(old => {
            // make a copy of the old table
            const table = new Map(old)
            // add the new viewport with a default state
            table.set(viewport, !old.get(viewport))
            // return the new table
            return table
        })
        // all done
        return
    }

    // return the toggle
    return toggle
}


// end of file
