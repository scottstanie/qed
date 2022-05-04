// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2022 all rights reserved

// code guard
#if !defined(qed_nisar_channels_complex_h)
#define qed_nisar_channels_complex_h


// the complex tile generator
namespace qed::nisar::channels {
    // the tile generator for the pixels of a complex HDF5 source
    template <typename sourceT>
    inline auto complex(
        // the source
        const dataset_t & dataset,
        // the data layout
        const datatype_t & datatype,
        // the zoom level
        int zoom,
        // the origin of the tile
        typename sourceT::index_type origin,
        // the tile shape
        typename sourceT::shape_type tile,
        // the range of values to render
        double min, double max, double phaseMin, double phaseMax, double saturation) -> bmp_t;
}


// pull in the implementations
#define qed_nisar_channels_complex_icc
#include "complex.icc"
#undef qed_nisar_channels_complex_icc

#endif

// end of file
