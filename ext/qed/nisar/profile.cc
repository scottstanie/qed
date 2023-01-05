// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2023 all rights reserved


// external
#include "external.h"
// namespace setup
#include "forward.h"


// profile
void
qed::py::nisar::profile(py::module & m)
{
    // bindings for HDF5 sources
    m.def(
        // the name of the function
        "profile",
        // the handler
        &qed::nisar::profile<heapgrid_t<std::complex<float>>>,
        // the signature
        "source"_a, "datatype"_a, "points"_a,
        // the docstring
        "collect values from a dataset along a path");

    // all done
    return;
}


// end of file
