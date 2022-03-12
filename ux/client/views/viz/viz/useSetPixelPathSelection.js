// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2022 all rights reserved


// externals
import React from 'react'

// local
// context
import { Context } from './context'


// set the selection to a single node
export const useSetPixelPathSelection = ({ viewport, idx }) => {
    // get the selection mutator
    const { activeViewort, setPixelPathSelection } = React.useContext(Context)
    // normalize the viewport
    viewport ??= activeViewort

    // make a handler that manages the current selection in single node mode
    const select = () => {
        // reset the selection to contain just my node
        setPixelPathSelection(old => {
            // make a copy of the table
            const table = [...old]
            // reset my entry
            table[viewport] = new Set([idx])
            // and return the updated table
            return table
        })
        // all done
        return
    }

    // make a handler that toggles my node in multinode mode
    const toggle = () => {
        // reset the selection
        setPixelPathSelection(old => {
            // make a copy of the old table
            const table = [...old]
            // make a copy of my old entry
            const clone = new Set([...table[viewport]])
            // if my node is present in the selection
            if (clone.has(idx)) {
                // remove it
                clone.delete(idx)
            }
            // otherwise
            else {
                // add it
                clone.add(idx)
            }
            // attach the new entry
            table[viewport] = clone
            // return the updated table
            return table
        })
        // all done
        return
    }

    // make a handler that selects a contiguous list
    const selectContiguous = () => {
        // reset the selection
        setPixelPathSelection(old => {
            // make a copy of the old table
            const table = [...old]
            // make a copy of my old entry
            const copy = [...table[viewport]]
            // sort it
            copy.sort((a, b) => a - b)
            // compute the selection start
            const start = copy.length > 0 ? copy[0] : 0
            // this node could be downstream from mine, so adjust the anchor point to make sure
            // we don't compute invalid selection lengths
            const anchor = (idx < start) ? 0 : start
            // form an array big enough to hold all indices in the range [anchor...idx]
            // and fill it with consecutive integers
            const selection = Array(idx - anchor + 1).fill(0).map((_, i) => anchor + i)
            // make a selection out of it
            table[viewport] = new Set(selection)
            // and return the updated table
            return table
        })
        // all done
        return
    }

    // and return the handlers
    return { select, toggle, selectContiguous }
}


// end of file
