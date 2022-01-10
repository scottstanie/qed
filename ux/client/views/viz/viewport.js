// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2022 all rights reserved


// externals
import React from 'react'

// project
// widgets
import { Mosaic } from '~/widgets'

// locals
// hooks
import { usePanViewport } from './usePanViewport'
import { useGetViewportPostion } from './useGetViewportPosition'
// styles
import styles from './styles'


// display the datasets associated with this reader
const Panel = React.forwardRef(({ view, uri }, ref) => {
    // get my camera position
    const { z } = useGetViewportPostion()
    // and the scroll handler
    const pan = usePanViewport(ref)

    // get my view info
    const { dataset } = view
    // and unpack what i need
    const { shape, tile } = dataset

    // compute the dimensions of the mosaic
    const width = Math.trunc(shape[1] / z)
    const height = Math.trunc(shape[0] / z)
    // and fold my zoom level into the data request uri
    const withZoom = [uri, z].join("/")

    // mix my paint
    // for the viewport
    const viewportStyle = styles.viewport
    // and the mosaic
    const mosaicStyle = {
        // for the data viewport
        mosaic: {
            // base
            ...styles.viewport.mosaic,
            // resize to the dataset shape, taking the zoom factor into account
            width: `${width}px`,
            height: `${height}px`,
        },
    }

    // render; don't forget to use the zoomed raster shape
    return (
        <div ref={ref} style={viewportStyle.box} onScroll={pan}>
            <Mosaic uri={withZoom} raster={[height, width]} tile={tile} style={mosaicStyle} />
        </div>
    )
})


// context
import { ViewportProvider } from './viewportContext'
// turn the panel into a context provider and publish
export const Viewport = React.forwardRef((props, ref) => {
    // set up the context provider
    return (
        <ViewportProvider>
            <Panel ref={ref} {...props} />
        </ViewportProvider>
    )
})


// end of file