// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2022 all rights reserved


// externals
import React from 'react'

// locals
// widgets
import { Activity } from '~/activities'
// my shape
import { Gear } from '~/shapes'
// styles
import styles from './styles'


// sandbox for experimenting with new features
const activity = ({ size, style }) => {
    // paint me
    return (
        <Activity size={size} url="/controls" barStyle={style} style={styles} >
            <Gear />
        </Activity >
    )
}


// publish
export default activity


// end of file
