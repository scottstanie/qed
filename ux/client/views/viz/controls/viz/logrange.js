// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2022 all rights reserved


// externals
import React from 'react'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import styled from 'styled-components'

// project
// widgets
import { Range, SVG } from '~/widgets'


// amplitude controller
export const LogRangeController = props => {
    // build the range mutator
    const [updateRange, isInFlight] = useMutation(updateRangeMutation)

    // ask the store for the current configuration
    const configuration = useFragment(graphql`
        fragment logrange_logrange on LogRangeController {
            id
            slot
            min
            max
            low
            high
        }
    `, props.configuration)

    // unpack
    const { slot, min, max, low, high } = configuration

    // switch to log scale
    const logMin = Math.round(Math.log10(min))
    const logMax = Math.round(Math.log10(max))
    const logLow = Math.log10(Math.max(min, low))
    const logHigh = Math.log10(Math.min(max, high))
    // set up the tick marks
    // const major = [...Array(logMax - logMin + 1).keys()].map((_, idx) => logMin + idx)
    const major = [logMin, 0, logMax]

    // build the value updater to hand to the controller
    // this is built in the style of {react} state updates: the controller invokes this
    // and passes it as an argument a function that expects the current range and return
    // the updated value
    const setValue = f => {
        // if there is a pending mutation
        if (isInFlight) {
            // skip the update
            return
        }

        // invoke the controller's updater to get the new range
        const [newLow, newHigh] = f([logLow, logHigh])

        // send it to the server
        updateRange({
            variables: {
                info: {
                    dataset: props.dataset,
                    channel: props.channel,
                    slot,
                    low: newLow,
                    high: newHigh,
                }
            }
        })

        // all done
        return
    }

    // controller configuration
    const amplitude = {
        value: [logLow, logHigh], setValue,
        min: logMin, max: logMax, major,
        direction: "row", labels: "bottom", arrows: "top",
        height: 100, width: 250,
    }

    // render
    return (
        <>
            <Header>
                <Title>{slot}</Title>
            </Header>
            <Housing height={amplitude.height} width={amplitude.width}>
                <Controller enabled={true} {...amplitude} />
            </Housing>
        </>
    )
}


// the range mutation
const updateRangeMutation = graphql`
mutation lograngeMutation($info: RangeControllerInput!) {
    updateRangeController(range: $info) {
        # refresh my parameters
        min
        max
        low
        high
    }
}`


// styling
// the section header
const Header = styled.div`
    font-size: 65%;
    margin: 0.5rem 1.0rem 0.25rem 1.0rem;
`

// the title
const Title = styled.span`
    display: inline-block;
    font-family: rubik-light;
    width: 2.5rem;
    padding: 0.0rem 0.0rem 0.25rem 0.0rem;
    cursor: default;
    color: hsl(0deg, 0%, 75%);
`

// the controller housing
const Housing = styled(SVG)`
    margin: 0.25rem auto;
    /* border: 1px solid hsl(0deg, 0%, 10%); */
`

// the controller
const Controller = styled(Range)`
`


// end of file
