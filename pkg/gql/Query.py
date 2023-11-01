# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2023 all rights reserved


# externals
import graphene

# support
import qed
import journal

# server version tag
from .Version import Version

# the session manager
from .QED import QED

# archive contents
from .Item import Item

# dataset samples
from .Sample import Sample

# visualization pipeline controls
from .VizPipeline import VizPipeline


# the query
class Query(graphene.ObjectType):
    """
    The top level query
    """

    # the known queries
    # the session manager
    qed = graphene.Field(QED)

    # directory contents
    contents = graphene.List(
        Item, required=True, archive=graphene.String(), path=graphene.String()
    )
    # samples
    sample = graphene.Field(
        Sample, dataset=graphene.ID(), sample=graphene.Int(), line=graphene.Int()
    )
    # visualization pipeline
    viz = graphene.Field(VizPipeline, dataset=graphene.ID(), channel=graphene.String())
    # server version info
    version = graphene.Field(Version, required=True)

    # the resolvers
    # the session manager
    @staticmethod
    def resolve_qed(root, info, **kwds):
        """
        Get the session layout
        """
        # grab the panel
        panel = info.context["panel"]
        # and pass it on
        return panel

    # directory contents
    @staticmethod
    def resolve_contents(root, info, archive, path, **kwds):
        """
        Generate a list with the contents of a directory
        """
        # this resolver must exist; its job is to build an object that gets handed to the
        # {Item} resolvers; here we prep such an object using the query execution
        # context in {info.context} and the variable bindings in {kwds}
        #
        #     root: should be {None}; this is the root
        #     info: has {.context} with whatever was built by the executioner
        #     kwds: contains the variable bindings for this query resolution
        #

        # grab the panel
        panel = info.context["panel"]
        # identify the archive
        manager = panel.archives[archive]
        # ask it for its contents
        return manager.getContents(uri=qed.primitives.uri.parse(path))

    # samples
    def resolve_sample(root, info, dataset, line, sample, **kwds):
        """
        Sample a dataset at a specified pixel
        """
        # grab the panel
        panel = info.context["panel"]
        # resolve the dataset
        dataset = panel.dataset(name=dataset)
        # assemble the sample resolution context
        context = {
            "dataset": dataset,
            "line": line,
            "sample": sample,
        }
        # and hand it to the sample resolver
        return context

    # the viz controls
    def resolve_viz(root, info, dataset, channel, **kwds):
        """
        Build a representation of the visualization controls
        """
        # get the panel
        panel = info.context["panel"]
        # resolve the dataset
        dataset = panel.dataset(name=dataset)
        # and the channel
        channel = dataset.channel(name=channel)
        # assemble the resolution context
        context = {
            "dataset": dataset,
            "channel": channel,
        }
        # and hand it to the resolver
        return context

    # version
    def resolve_version(root, info):
        """
        Build and return the server version
        """
        # supply the context for the {version} resolution
        return qed.meta


# end of file
