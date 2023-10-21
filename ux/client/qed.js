// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2023 all rights reserved


// the component framework
import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
// relay
import { RelayEnvironmentProvider } from 'react-relay/hooks'
// routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// generator support
import 'regenerator-runtime'

// support for image lazy loading
import 'lazysizes'
// detect attribute changes in transformed elements
import 'lazysizes/plugins/attrchange/ls.attrchange'
// use native lazy loading whenever possible
import 'lazysizes/plugins/native-loading/ls.native-loading'


// locals
// context
import { environment } from '~/context'
// components
import { ErrorBoundary } from './boundary'
// views
import {
    // the data view
    Viz, Controls, Datasets,
    // the main page
    Main,
    // boilerplate
    Loading, NYI, Stop, Dead,
} from '~/views'


// the app layout
const QEDApp = () => {
    // page layout and top-level, disrupting, navigation
    // the app renders a client area over a status bar; most urls render the normal ui, but
    // - /stop: the user clicked on the "kill the server" action; show a "close this window" page
    // - /loading: shown while the app is fetching itself from the server

    // render
    return (
        <Routes >
            {/* the app */}
            <Route path="/" element={<Main />} >
                {/* specific activities */}
                <Route path="about" element={<NYI />} />
                <Route path="explore" element={<NYI />} />
                <Route path="help" element={<NYI />} />

                {/* the default page */}
                <Route element={<Viz />} >
                    <Route path="controls" element={<Controls />} />
                    <Route index element={<Datasets />} />
                </Route>
            </Route>

            {/* meta navigation */}
            {/* the closing page */}
            <Route path="stop" element={<Stop />} />
            {/* the page to render while waiting for data to arrive */}
            <Route path="loading" element={<Loading />} />
        </Routes>
    )
}


// the outer component that sets up access to the {relay}, {suspense},
// and {router} environments
const Root = () => (
    <RelayEnvironmentProvider environment={environment}>
        <ErrorBoundary fallback={<Dead />}>
            <Suspense fallback={< Loading />}>
                <Router basename={location.pathname}>
                    <QEDApp />
                </Router>
            </Suspense>
        </ErrorBoundary>
    </RelayEnvironmentProvider>
)


// instantiate
const root = createRoot(document.getElementById('qed'))
// and render
root.render(<Root />)


// end of file
