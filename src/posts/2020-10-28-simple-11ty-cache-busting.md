---
title: Simple 11ty cache busting
date: 2020-10-28
---


``` js
eleventyConfig.addFilter("bust", (url) => {
  const [urlPart, paramPart] = url.split("?");
  const params = new URLSearchParams(paramPart || "");
  params.set("v", DateTime.local().toFormat("X"));
  return `${urlPart}?${params}`;
});
```

``` html
  <link rel="stylesheet" href="{{ '/css/index.css' | url | bust }}">
```
