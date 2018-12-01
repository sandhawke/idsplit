
Split some HTML into a map from ids (when present) to the the HTML
associated with that id.  When nested, replace the element with a
reference, so there's no redundancy in the map.

This makes it fast (linear time) and straightforward to find changes
to an HTML document, as long as:

1. ids are fairly stable, and
2. sections of the document without ids are fairly small.

When those assumptions are violated, this wont be very efficient,
since it will consider very large sections of the document changed.

Specifically:

* for each update to the document
    * run idsplit() on it
    * run idsplit.changes() to compare to previous split output
    * The "update" field of the changes will be a list of the ids of
      the elements to replace

