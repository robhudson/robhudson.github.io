---
title:  "Using Celery's Canvas to Reduce Elasticsearch Index Time"
date:   2014-11-27
layout: layouts/post.njk
---

We use [Elasticsearch](http://www.elasticsearch.org/) for our backend search on the [Firefox Marketplace](https://marketplace.firefox.com/). Most of the Marketplace APIs that drive the front-end only query Elasticsearch and never hit the database. Because of this we have a few ways that we keep our Elasticsearch index in sync with our database as changes happen. One of those ways is a complete reindex of all database records into Elasticsearch. 

We don’t do a full reindex often but when we do we have a few ways to minimize the impact on the Marketplace. The main way is to use index aliases which allows us to create a brand new search index, push all of our data into it, and when it is finished we point the alias to this new index.

When the Marketplace was first starting a full reindex would take minutes. As time progressed and more fields were added to our documents and more apps were added a full reindex was starting to take up to 40 minutes. So we started investigating ways to speed this up again.

Our original implementation would do something like the following:
1. Set up the new index
2. Query all apps we want to index retrieving the id only
3. Chunk the list of ids into sets
4. Send those sets of ids to celery to execute an indexing task on that set of ids
5. After the last task is complete, do some final optimizations on the index and swap aliases


When the celery tasks were first written the Celery [canvas primitives](http://celery.readthedocs.org/en/latest/userguide/canvas.html#the-primitives) that arrived with Celery v3.0 didn’t exist so the indexing tasks (step 4 above) were being done serially.

After a bit of refactoring I updated the task chain to be simpler and also take advantage of Celery’s primitives. The steps are the same but the indexing tasks are now done in parallel.

One of the challenges was how to execute the follow-up task but only after all the indexing tasks were completed. That’s where the new primitive <code>chord</code> comes into play. A <code>chord</code> is a <code>group</code> with a callback, and a <code>group</code> takes a list of tasks and applies them in parallel. We also need <code>chain</code> for the set up. Our celery tasks are now broken down like this:

* Pre-index: Create new index
* Indexing: Index all the sets of apps
* Post-index: Optimize the index and swap aliases

With the celery primitives it looks something like:

    chain(pre_index, chord(indexing, post_index))

When this finally landed on our production machines our full reindex time went from 40 minutes or more down to just under 3 minutes. This was a bigger improvement than I was expecting. Elasticsearch handles the flood of incoming data like a champ too.

Another challenge was that Celery chords and running with <code>CELERY_ALWAYS_EAGER=True</code> don’t get along, so if this setting is set we still serialize the indexing tasks. Many of the Marketplace developers use this setting to avoid having to run RabbitMQ and Celery locally.

This is the primary [changeset](https://github.com/mozilla/zamboni/commit/721a8cf409be5c1e4abd1ded44d5cfaff8c27e53), or view the Django management command [reindex](https://github.com/mozilla/zamboni/blob/master/lib/es/management/commands/reindex.py) in its entirety.
