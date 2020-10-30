---
title: Simple 11ty cache busting
date: 2020-10-28
tags:
  - 11ty
  - caching
---

This post details my quick hack to override the caching of Github Pages
static assets after a deploy.

## Static asset caching

When a browser requests a resource (e.g. `style.css`), the server can tell
the browser how long to cache that resource so that subsequent requests for
that same resource can load from a local copy rather than fetch it from the
server again.

For Github Pages, this time is 10 minutes.

## The problem

When I deploy this website a new `css/index.css` file is created with any of
my CSS changes that I have made. If I, or any other visitor, request the
website within that 10 minute window, they will get the old CSS rather than
the new one, possibly breaking my intended layout or design.

## The solution

There are many ways to solve this problem. I went for the most minimal
solution that I could think of to work with Github Pages.

One way to force the browser to fetch a fresh copy is to add a query
parameter to the URL that it hsan't seen before. For cache busting a common
approach is to include a timestamp or epoch time to the URL when the resource
is updated. This is exactly what I have done here for my CSS.

Editing my `.eleventy.js` configuration I added a `bust` filter that will
computer the current time, via Luxon, and format it as a unix timestamp.

```js
eleventyConfig.addFilter("bust", (url) => {
  const [urlPart, paramPart] = url.split("?");
  const params = new URLSearchParams(paramPart || "");
  params.set("v", DateTime.local().toFormat("X"));
  return `${urlPart}?${params}`;
});
```

I can then add this filter to my CSS in my base template.

```html
<link
  rel="stylesheet"
  href="{% raw %}{{ '/css/index.css' | url | bust }}{% endraw %}"
/>
```

Which, at site build time, will append a query parameter with name `v` and
value of the current unix time in seconds. Which looks like this:

```html
<link rel="stylesheet" href="/css/index.css?v=1604094309" />
```

Each time I deploy this site, the value is updated, forcing the browser to
fetch the CSS anew so I, and other visitors, always get the style that was
intended.
