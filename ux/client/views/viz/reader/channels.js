// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2022 all rights reserved


// externals
import React from 'react'

// project
//widgets
import { Meta } from '~/widgets'

// locals
// hooks
import { useReader } from './useReader'
import { useGetView } from '../viz/useGetView'
// components
import { Channel } from './channel'
// styles
import styles from './styles'


// display the bindings associated with this selector
export const Channels = ({ children }) => {
    // get my reader
    const reader = useReader()
    // and the current view
    const view = useGetView()
    // determine if the channel setting in the view is mine
    const hasChannel = view?.channel && view?.reader?.uuid === reader.uuid
    // make a label that is marked as required when when there is no selected channel
    const label = (
        <span>
            {hasChannel ? null : <span style={styles.required}>*</span>}
            channels
        </span>
    )

    // mix my paint
    const channelStyle = styles.channels()
    // and render
    return (
        <Meta.Entry attribute={label} style={channelStyle}>
            {children.map(channel => (
                <Channel key={channel} channel={channel} />
            ))}
        </Meta.Entry>
    )
}


// end of file
