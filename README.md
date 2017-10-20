# novi-plugin-owl-carousel
Novi Builder Plugin for visual [jQuery lightgallery](http://sachinchoolur.github.io/lightGallery/) customization

## How to Install
You should follow several simple steps to install this plugin:
* Copy the novi-plugin-owl-carousel.js file to your path/to/novibuilder/plugins folder.
* Launch NoviBuilder 

## What you are able to do

#### Customize gallery:
* change various animation types of gallery item transitions
* configure thumbnail hiding and demonstration
* enable/disable gallery looping
* enable/disable gallery autoplay and configure its timeout.
#### Adjust gallery elements:
* change thumbnail and big image or video
* change description
#### Configure dynamic gallery (album):
* delete or add album elements
* change thumbnail and big image or video of an album element
* change the description of an album element

## Developer Settings
* groupQuerySelector — containes a css selector which defines the lightgallery group element.
* albumQuerySelector — containes a css selector which defines the lightgallery album element.
* itemQuerySelector — containes a css selector which defines the lightgallery item element.

## How to add jQuery lightgallery on your page
If your website doesn't contain jQuery lightgallery follow the instructions below to install it.

### Include jQuery lightgallery files to Website
Copy the "assets" folder content to website's folders respectively and include this files to your website.

### Add jQuery lightgallery Layout
Add basic jQuery lightgallery HTML Layout.

##### For group
```html
<div data-lightgallery="group">
    <a href="..." data-lightgallery="item">
      <img src="..." alt="">
    </a>
   ...
    <a href="..." data-lightgallery="item">
      <img src="..." alt="">
    </a>
</div>
```

##### For album
```html
<div data-lightgallery="dynamic"
     data-lg-dynamic-elements="
     [{
         'subHtml':'<p>lorem ipsum</p>',
         'thumb':'path/to/thumb/image',
         'src':'path/to/original/image'
     },
      ...
     {
         'subHtml':'id or class to caption',
         'thumb':'path/to/thumb/image',
         'html':'id or class to video'
     }]">
    Open album
</div>
```


##### For item
```html
<a href="path/to/original" data-lightgallery="item" data-sub-html="Heello">
    <img src="path/to/thumb" alt="">
</a>
```

Markup in given block may be any, including elements of the grid, etc. It is only necessary presence element with the attribute data-lightgallery="group" or data-lightgallery="group" or data-lightgallery="item". 
You can find more detailed information about lightgallery html markup in the [official documentation](http://sachinchoolur.github.io/lightGallery/docs/)

### Initialize jQuery lightgallery
Initialize jQuery lightgallery in JS by adding following block code:

```js

$document.ready(function () {
    var isNoviBuilder = window.xMode;
    var lightGallery = $("[data-lightgallery='group']");
    var lightGalleryItem = $("[data-lightgallery='item']");
    var lightDynamicGalleryItem = $("[data-lightgallery='dynamic']");

     /**
        * lightGallery
        * @description Enables lightGallery plugin
    */
    function initLightGallery(itemsToInit, addClass) {
      if (!isNoviBuilder) {
        $(itemsToInit).lightGallery({
          thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
          selector: "[data-lightgallery='item']",
          autoplay: $(itemsToInit).attr("data-lg-autoplay") === "true",
          pause: parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
          addClass: addClass,
          mode: $(itemsToInit).attr("data-lg-animation") || "lg-slide",
          loop: $(itemsToInit).attr("data-lg-loop") !== "false"
        });
      }
    }
    
     function initDynamicLightGallery(itemsToInit, addClass) {
      if (!isNoviBuilder) {
        $(itemsToInit).on("click", function() {
          $(itemsToInit).lightGallery({
            thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
            selector: "[data-lightgallery='item']",
            autoplay: $(itemsToInit).attr("data-lg-autoplay") === "true",
            pause: parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
            addClass: addClass,
            mode: $(itemsToInit).attr("data-lg-animation") || "lg-slide",
            loop: $(itemsToInit).attr("data-lg-loop") !== "false",
            dynamic: true,
            dynamicEl:
              JSON.parse($(itemsToInit).attr("data-lg-dynamic-elements")) || []
          });
        });
      }
    }
    
    function initLightGalleryItem(itemToInit, addClass) {
      if (!isNoviBuilder) {
        $(itemToInit).lightGallery({
          selector: "this",
          addClass: addClass,
          counter: false,
          youtubePlayerParams: {
            modestbranding: 1,
            showinfo: 0,
            rel: 0,
            controls: 0
          },
          vimeoPlayerParams: {
            byline: 0,
            portrait: 0
          }
        });
      }
    }
    
    if (lightGallery.length) {
      for (var i = 0; i < lightGallery.length; i++) {
        initLightGallery(lightGallery[i]);
      }
    }

    if (lightGalleryItem.length) {
      for (var i = 0; i < lightGalleryItem.length; i++) {
        initLightGalleryItem(lightGalleryItem[i]);
      }
    }

    if (lightDynamicGalleryItem.length) {
      for (var i = 0; i < lightDynamicGalleryItem.length; i++) {
        initDynamicLightGallery(lightDynamicGalleryItem[i]);
      }
    }
});
