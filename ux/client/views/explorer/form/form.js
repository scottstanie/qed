// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2023 all rights reserved


// externals
import React from 'react'
import styled from 'styled-components'

// project
// theme
import { theme } from '~/palette'


// styled elements
export const Form = styled.table`
    table-layout: fixed;
`

export const Header = styled.thead``
export const Body = styled.tbody``
export const Footer = styled.tfoot``

export const Row = styled.tr``

// the editor panel
export const Panel = styled.div`
    padding: 1.0rem 0.0 0.5rem 0.0em;
    // border-top: 1px solid hsl(0, 0%, 15%);
    // border-bottom: 1px solid hsl(0, 0%, 15%);
    // background-color: hsl(0deg, 0%, 7%);
`

export const Title = styled.div`
    font-size: 110%;
    padding: 0.0rem 0.0 1.0rem 1.0rem;
    color: ${theme.page.name};
`

export const Prompt = styled.td`
    font-family: "rubik-light";
    text-align: right;
    text-transform: uppercase;
    width: 18.0em;
    min-width: 18.0em;
    max-width: 18.0em;
`

export const Separator = styled.td`
    width: 1.0em;
    padding: 0.0em 0.25em 0.0em 0.25em;
    text-align: center;
`

export const Required = styled.span`
    font-family: "inconsolata";
    color: hsl(0deg, 100%, 50%);
    padding: 0.0em 0.5em 0.0em 0.0em;
`

export const EnumValue = styled.div`
    & {
        display: inline-block;
        cursor: pointer;
        padding: 0.0em 1.0em 0.0em 0.0em;
    }

    &:hover {
        color: hsl(28deg, 90%, 55%);
    }
`

export const SelectedEnumValue = styled(EnumValue)`
    color: hsl(0deg, 0%, 60%);
`

export const Button = styled.div`
    display: inline-block;
    font-family: inconsolata;
    text-align: left;
    margin-left: 0.5rem;
    padding: 1.0rem 0.5em 0.25em 0.5em;
    color: hsl(0deg, 0%, 30%);
`

export const EnabledButton = styled(Button)`
    & {
        cursor: pointer;
        color: hsl(0deg, 0%, 60%);
        // border-bottom: 1px solid hsl(0deg, 0%, 60%);
    }

    &:hover {
        color: hsl(28deg, 90%, 55%);
        // border-bottom: 1px solid hsl(28deg, 90%, 55%);
    }
`

// the cancel button
export const Cancel = styled(EnabledButton)`
    color: hsl(0deg, 100%, 50%);
`

// state dependent selection
export const enumValue = state => (
    // pick one
    state === "selected" ? SelectedEnumValue : EnumValue
)

// end of file