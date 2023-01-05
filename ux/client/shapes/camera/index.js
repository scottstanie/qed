// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2023 all rights reserved


// externals
import React from 'react'
// locals
import styles from './styles'


// the camera
const camera = `
M 127.43223 837.6387
L 872.5755 837.6387
C 898.9777 837.6387 919.1428 817.4732 919.1428 791.0714
L 919.1428 325.35685
C 919.1428 298.95457 898.9773 278.78955 872.5755 278.78955
L 709.57955 278.78955
C 702.6194 278.78955 695.8218 276.71047 690.0557 272.8203
C 684.2815 268.93013 679.80646 263.40767 677.1995 256.95918
L 639.3623 162.36092
L 360.66124 162.36092
L 322.824 256.95918
L 322.8159 256.95918
C 320.20893 263.40767 315.7341 268.93013 309.95967 272.8203
C 304.19355 276.71047 297.39578 278.78955 290.43584 278.78955
L 127.43991 278.78955
C 101.03764 278.78955 80.87262 298.955 80.87262 325.35685
L 80.87262 791.0714
C 80.87262 817.4736 101.03806 837.6387 127.43991 837.6387
Z
M 500.00385 709.563
C 584.0113 709.563 651.36315 642.2111 651.36315 558.2037
C 651.36315 474.1963 584.0113 406.8444 500.00385 406.8444
C 416.00475 406.8444 348.64455 474.1963 348.64455 558.2037
C 348.64455 642.2111 415.99644 709.563 500.00385 709.563
Z
`


// render the shape
export const Camera = ({ style }) => {
    // mix my paint
    const ico = { ...styles.icon, ...style?.icon }

    // paint me
    return (
        <path d={camera} style={ico} />
    )
}


// end of file
