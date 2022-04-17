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
import { Slider, SVG } from '~/widgets'

// local
// hooks
import { useSetVizSession } from '../../viz/useSetVizSession'


// amplitude controller
export const ValueController = props => {
    // make a handler that can update the session id of a view
    const setSession = useSetVizSession()
    // build the value mutator
    const [updateValue, isInFlight] = useMutation(updateValueMutation)

    // ask the store for the current configuration
    const configuration = useFragment(graphql`
        fragment value_value on ValueController {
            id
            slot
            min
            max
            value
        }
    `, props.configuration)

    // unpack
    const { slot, min, max, value } = configuration

    // set up the tick marks
    const major = [min, (min + max) / 2, max]

    // build the value updater to hand to the controller
    // this is built in the style of {react} state updates: the controller invokes this
    // and passes it as an argument a function that expects the current value and return
    // the updated value
    const setValue = newValue => {
        // if there is a pending mutation
        if (isInFlight) {
            // skip the update
            return
        }

        // send it to the server
        updateValue({
            // input
            variables: {
                info: {
                    dataset: props.dataset,
                    channel: props.channel,
                    slot,
                    value: newValue,
                }
            },

            // when done
            onCompleted: data => {
                // get the session
                const session = data.updateValueController.controller.session
                // and set it in the active view
                setSession(session)
                // all done
                return
            }
        })

        // all done
        return
    }

    // controller configuration
    const amplitude = {
        value, setValue,
        min, max, major,
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


// the value mutation
const updateValueMutation = graphql`
mutation valueMutation($info: ValueControllerInput!) {
    updateValueController(value: $info) {
        controller {
            id
            # get my new session id
            session
            # refresh my parameters
            min
            max
            value
        }
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
const Controller = styled(Slider)`
`


// end of file