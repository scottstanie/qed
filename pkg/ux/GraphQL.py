# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2021 all rights reserved


# externals
import journal
import json
# support
import qed


# the {graphql} request handler
class GraphQL:


    # interface
    def respond(self, plexus, server, request, **kwds):
        """
        Resolve the {query} and generate a response for the client
        """
        # assemble the raw payload
        raw = b'\n'.join(request.payload)
        # if there's nothing there
        if not raw:
            # respond with an empty document; should never happen
            return server.documents.OK(server=server)

        # parse the {request} payload
        payload = json.loads(raw)
        # get the query
        query = payload.get("query")
        # extract the variables
        variables = payload.get("variables")
        # and the operation
        operation = payload.get("operation")

        # make a fresh copy of my context
        context = dict(self.context)
        # decorate with the info for this request
        context["plexus"] = plexus
        context["server"] = server
        context["request"] = request

        # execute the query
        result = self.schema.execute(query, context=context)

        # assemble the resulting document
        doc = { "data": result.data }
        # in addition, if something went wrong
        if result.errors:
            # inform the client
            doc["errors"] = [ {"message": error.message} for error in result.errors ]

            # make a channel
            channel = journal.error("qed.ux.graphql")
            # go through the errors
            for error in result.errors:
                # report each one
                channel.line(error)
            # flush
            channel.log()

        # encode it using JSON and serve it
        return server.documents.JSON(server=server, value=doc)


    # metamethods
    def __init__(self, panel, **kwds):
        # chain up
        super().__init__(**kwds)

        # load my schema and attach it
        self.schema = qed.gql.schema

        # initialize the execution context
        self.context = {
            "nameserver": panel.pyre_nameserver,
        }

        # make sure my error channel is not fatal
        journal.error("qed.ux.graphql").fatal = False

        # all done
        return


# end of file
