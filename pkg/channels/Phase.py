# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2022 all rights reserved


# support
import cmath
import qed
# superclass
from .Channel import Channel


# a channel for displaying the phase of complex values
class Phase(Channel, family="qed.channels.phase"):
   """
   Make a visualization pipeline to display the phase of complex values
   """


   # constants
   tag = "phase"


   # user configurable state
   brightness = qed.properties.float(default=1.0)
   brightness.doc = "the brightness"

   saturation = qed.properties.float(default=1.0)
   saturation.doc = "the saturation"


   # interface
   def tile(self, **kwds):
      """
      Generate a tile of the given characteristics
      """
      # add my configuration and chain up
      return super().tile(saturation=self.saturation, brightness=self.brightness, **kwds)


   def project(self, pixel):
      """
      Compute the phase of a {pixel}
      """
      # get the value as angle in radians in [-π, π]
      # the interval above is closed thanks to the peculiarities of {atan2}
      value = cmath.phase(pixel) / cmath.pi

      # project
      # in π radians
      yield  value, "π radians"

      # transform to [0, 2π]
      if value < 0:
         # by adding a cycle to negative value
         value += 2

      # in degrees in [0, 360]
      yield 180*value, "degrees"
      # in cycles
      yield value/2, "cycles"

      # all done
      return


# end of file
