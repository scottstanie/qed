# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2024 all rights reserved


# support
import qed
import journal
import uuid


# the record of user choices that lead to a channel selection for a viewport
class View(qed.component, family="qed.ux.views.view", implements=qed.protocols.ux.view):
    """
    The collection of view settings
    """

    # configurable state
    measure = qed.protocols.ux.measure()
    sync = qed.protocols.ux.sync()
    zoom = qed.protocols.ux.zoom()

    # interface
    def toggleSelection(self, key, value):
        """
        Toggle the {value} of {key} in my {selections}
        """
        # get my selections
        selections = self.selections
        # get the current value key
        current = selections.get(key)
        # if there is one and it's {value}
        if current and current == value:
            # clear it
            del selections[key]
        # otherwise
        else:
            # set it
            selections[key] = value
        # solve the selection
        self.resolve()
        # all done
        return self

    def toggleChannel(self, tag):
        """
        Toggle the value of my {channel}
        """
        # get my dataset
        dataset = self.dataset
        # if i don't have one
        if not dataset:
            # it's a bug
            firewall = journal.firewall("qed.ux.store")
            # complain
            firewall.line(f"cannot toggle the channel using the tag '{tag}'")
            firewall.line(f"no dataset selection for {self.reader}")
            # flush
            firewall.log()
            # and bail, just in case firewalls aren't fatal
            return self
        # get the channel
        current = self.channel
        # if there is one and its tag matches {tag}
        if current and current.tag == tag:
            # clear it
            self.channel = None
        # otherwise
        else:
            # set it
            self.channel = dataset.channel(tag)
        # solve the selection
        self.resolve()
        # all done
        return

    # state resolution
    def resolve(self):
        """
        Attempt to identify the {dataset} and {channel} that correspond to my {selections}
        """
        # get my reader
        reader = self.reader
        # if i don't have one
        if not reader:
            # there is no solution
            return self
        # get the reader selectors
        selectors = reader.selectors
        # get my selections
        selections = self.selections
        # if we don't have have enough selections
        if len(selections) != len(selectors):
            # clear the dataset
            self.dataset = None
            # nothing else to do
            return self
        # if we do have enough selections, there must be a dataset that matches;
        # go through them
        for dataset in reader.datasets:
            # if its selectors match my selections
            if dataset.selector == selections:
                # it's the one
                self.dataset = dataset
                # go no further
                break
        # if we didn't find a match
        else:
            # there is no solution
            self.dataset = None
            # it could be a bug, but it's also possible that the reader has no datasets
            # so, if the reader has datasets
            if reader.datasets:
                # it's a bug
                firewall = journal.firewall("qed.ux.store")
                # complain
                firewall.line(f"could not solve for the dataset")
                firewall.line(f"in {self}")
                firewall.line(f"with {reader}")
                firewall.line(f"given the following selections:")
                firewall.indent()
                firewall.report(
                    report=(f"{key}: {value}" for key, value in selections.items())
                )
                firewall.outdent()
                # flush
                firewall.log()
                # and bail, just in case firewalls aren't fatal
                return self
        # if we were not able to identify the dataset
        if not dataset:
            # all done
            return
        # get the channel
        channel = self.channel
        # if we were able to find a dataset and we have a channel selection
        if channel:
            # it may be left over from a previous interaction; gingerly
            try:
                # look up the channel of the solution that has the same tag
                candidate = dataset.channel(channel.tag)
            # if the solution doesn't have a channel by this tag
            except KeyError:
                # reset the channel
                self.channel = None
            # if all went well
            else:
                # attach the candidate
                self.channel = candidate
        # if we have a dataset but no channel
        else:
            # get the dataset channels
            channels = dataset.channels
            # if there is only one channel
            if len(channels) == 1:
                # grab it and select it
                self.channel, *_ = channel.values()
        # all done
        return self

    def clone(self):
        """
        Make a copy of me
        """
        # build a new name
        name = str(uuid.uuid1())
        # easy enough
        return type(self)(
            name=name,
            reader=self.reader,
            dataset=self.dataset,
            channel=self.channel,
            measure=self.measure,
            sync=self.sync,
            zoom=self.zoom,
        )

    # metamethods
    def __init__(self, reader=None, dataset=None, channel=None, **kwds):
        # chain up
        super().__init__(**kwds)
        # prime my selections
        self.selections = reader.selections if reader is not None else {}
        # build my state
        self.reader = reader
        self.dataset = dataset
        self.channel = channel

        # resolve my state
        self.resolve()
        # all done
        return

    # debugging support
    def pyre_dump(self, channel=None):
        """
        Report my state
        """
        # make a channel
        channel = channel or journal.info("qed.ux.store")
        # sign in
        channel.line(f"{self}")
        # report
        channel.indent()
        channel.line(f"reader: {self.reader}")
        channel.line(f"dataset: {self.dataset}")
        channel.line(f"channel: {self.channel}")
        channel.line(f"dataset selections:")
        channel.indent()
        for key, value in self.selections.items():
            channel.line(f"{key}: {value}")
        channel.outdent()
        channel.outdent()
        # flush
        channel.log()
        # all done
        return


# end of file
