# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2024 all rights reserved

# the view layout
from .View import View as view

# the mutations
from .MeasureAnchorAdd import MeasureAnchorAdd as measureAnchorAdd
from .Collapse import Collapse as collapse
from .Persist import Persist as persist
from .SelectReader import SelectReader as selectReader
from .Split import Split as split
from .ToggleChannel import ToggleChannel as toggleChannel
from .ToggleCoordinate import ToggleCoordinate as toggleCoordinate
from .SyncToggleScroll import SyncToggleScroll as syncToggleScroll
from .ToggleAllSync import ToggleAllSync as toggleAllSync

from .MeasureAnchorPlace import MeasureAnchorPlace as measureAnchorPlace
from .MeasureAnchorMove import MeasureAnchorMove as measureAnchorMove
from .MeasureAnchorRemove import MeasureAnchorRemove as measureAnchorRemove
from .MeasureAnchorSplit import MeasureAnchorSplit as measureAnchorSplit
from .MeasureAnchorExtendSelection import (
    MeasureAnchorExtendSelection as measureAnchorExtendSelection,
)
from .MeasureToggleLayer import MeasureToggleLayer as measureToggleLayer
from .MeasureAnchorToggleSelection import (
    MeasureAnchorToggleSelection as measureAnchorToggleSelection,
)
from .MeasureAnchorToggleSelectionMulti import (
    MeasureAnchorToggleSelectionMulti as measureAnchorToggleSelectionMulti,
)
from .MeasureToggleClosedPath import MeasureToggleClosedPath as measureToggleClosedPath

from .ZoomSetLevel import ZoomSetLevel as zoomSetLevel
from .ZoomToggleCoupled import ZoomToggleCoupled as zoomToggleCoupled

# end of file
