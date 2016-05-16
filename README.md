[![Build Status](https://travis-ci.org/nnattawat/slideReveal.svg?branch=master)](https://travis-ci.org/nnattawat/slideReveal)
# Slide Reveal

Show side panel by sliding from the left or right of the page.

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.githubusercontent.com/nnattawat/slidereveal/master/dist/jquery.slidereveal.min.js
[max]: https://raw.githubusercontent.com/nnattawat/slidereveal/master/dist/jquery.slidereveal.js

Or install using bower.
<pre>bower install slidereveal</pre>
In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery.slidereveal.min.js"></script>

<div id="slider">Hello World!!</div>
<button id="trigger">Hello World!!</button>

<script>
$(function($) {
  var slider = $("#slider").slideReveal({
  	trigger: $("#trigger")
  });
});
</script>
```

The plugin does not add any CSS to your side panel. So, you need to style it yourself for a nice panel or a beautiful navigation.

## Documentation and Examples
Please refer to its [github.io](http://nnattawat.github.io/slideReveal)

## Release History
See the [release page](https://github.com/nnattawat/slideReveal/releases)

## How to Contribute
See the [contributing page](https://github.com/nnattawat/slideReveal/blob/master/CONTRIBUTING.md)
