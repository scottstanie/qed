// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2021 all rights reserved


// externals
#include "external.h"
// namespace setup
#include "forward.h"


// access to the version tags of the library and the bindings
void
qed::py::version(py::module & m)
{
    // the version of the library
    m.attr("libraryVersion") = qed::version::version();

    // the version of the bindings
    m.attr("extVersion") = qed::version::version_t { qed::version::major, qed::version::minor,
                                                     qed::version::micro, qed::version::revision };

    // all done
    return;
}


// end of file
