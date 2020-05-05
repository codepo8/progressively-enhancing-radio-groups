# Progressively Enhancing Radio Groups

Sometimes it is fun to re-visit very basic HTML things and look what we can do with them nowadays. This is what I will do now with a radio button group. I will progressively enhance it to look great and still work with keyboard and screen readers.

As part of my [Logo-O-Matic](https://codepo8.github.io/logo-o-matic/) upgrade, I added text alignment to the generator. At first I used a select element to have a dropdown asking you to select `left`, `centre` or `right`. After using it for a while I was annoyed with it and wanted a simpler way. That's when I looked at radio groups again.

The final product is three graphical buttons depicting the alignment. You [can try the example out here](https://codepo8.github.io/progressively-enhancing-radio-groups/final-accessible-svg.html). 

<img src="https://christianheilmann.com/wp-content/uploads/2020/05/final.gif" alt="Animation showing the final effect" width="145" height="61" class="alignnone size-full wp-image-6296" />

In the [following video you can see and hear how Voiceover for Mac deals](https://youtu.be/CZr8uNbajrc) with this construct. 

## Taking a step back: Radio what?

Radio buttons are a form element group that go back to the old days of radios where you had a preset amount of buttons to choose from. You could only select one of them at a time and when you selected a new one, the formerly chosen one popped out. In most cases this was to select the wave band to choose, others also had preset stations to pick from.

<img src="https://christianheilmann.com/wp-content/uploads/2020/05/autoradio-retro-generations-past-nostalgia-vintage-antique-old.jpg" alt="Old car stereo with radio buttons" width="100%">

In any case, radio buttons mean that you have a preset amount of options to choose from and you can only have one selected at a time. This is different to checkbox groups where you can select several. Even select menus allow more than one choice when you press shift whilst selecting them and the multiple attribute is present. 

When there are not many choices to choose from, a radio group can be a very simple and obvious way to make the user choose one and only one option from them.

## Radio group basics

In HTML, `radio` is a type of `input` element. You define a group of them by using the same `name` attribute amongst them. In the case of my alignment example, all I needed to do [was to define three input element with a type of radio and a shared name](https://codepo8.github.io/progressively-enhancing-radio-groups/bare-bones.html):

```xml
<input type="radio" name="aligned" value="left" checked>
Aligned Left
<input type="radio" name="aligned" value="center">
Aligned Center
<input type="radio" name="aligned" value="right">
Aligned Right
```

<img src="https://christianheilmann.com/wp-content/uploads/2020/05/unstyled.png" alt="Unstyled Radio Group" width="100%" >

The `checked` attribute defines the preset. Every time another radio button is activated it moves to that one and its value is what the form will submit as the value of the `aligned` parameter. This is pretty useful and means we don't have to program that functionality.

## Radio group problems

There are of course a few issues with radio groups. One issue is that they are not the prettiest things to look at and they are tough to style. A bigger issue is that they are tiny and hard to access with a mouse. Scaling them makes them even uglier. And, like any form field, screenreaders wouldn't know what an element is unless you also provide a label. 

I've set up my [Visual Studio Code](https://code.visualstudio.com) with the [Webhint extension](https://aka.ms/webhint4code). This is great as it uses [Axe-Core](https://github.com/dequelabs/axe-core) to tell you about accessibility issues while you code. So in the [case of the earlier example](https://codepo8.github.io/progressively-enhancing-radio-groups/bare-bones.html), it rightfully complains about a lack of labels (click to see full screen picture):

<a href="https://christianheilmann.com/wp-content/uploads/2020/05/webhint-errors.png"><img src="https://christianheilmann.com/wp-content/uploads/2020/05/webhint-errors-1024x579.png" alt="Webhint extension for Visual Studio Code showing in-line accessibility errors." width="100%" class="alignnone size-large wp-image-6298" /></a>

You can add labels in two ways. You can either wrap the element itself in a label: 

```xml
<label>
  <input type="radio" name="aligned" value="left" checked>
  Aligned Left
</label>
```

Or you can have the label as a sibling in the DOM tree and use the `for` attribute and an `id` on the element to connect them:

```xml
<input type="radio" id="r1" name="aligned" value="left" checked> 
<label for="r1">Aligned Left</label>
```

The latter way is more complex, but also more flexible, as you can put the label anywhere in the document. In case you need to put something else there that shouldn't be in the label. 

Once you added the label [you can select the radio button by clicking or tabbing to the text label](https://codepo8.github.io/progressively-enhancing-radio-groups/with-label.html). That way you made it much easier to access as the hit area is much bigger.

<figure><figcaption>Selecting a radio button without labels is hard</figcaption>
<img src="https://christianheilmann.com/wp-content/uploads/2020/05/without-labels.gif" alt="Selecting radio buttons without labels is frustrating" width="389" height="119" class="alignnone size-full wp-image-6300" />
</figure>

<figure><figcaption>By adding labels you make it easier</figcaption><img src="https://christianheilmann.com/wp-content/uploads/2020/05/with-labels.gif" alt="By adding labels you make it much easier to interact with radio buttons" width="389" height="119" /></figure>

## Radio group benefits

Despite all its drawbacks, I like radio groups as they give you all the functionality you want out of the box. You don't need to set focus to a new element by hand and you don't need to remove the selected state from the former one. Radio buttons are keyboard and mouse accessible. If you use a keyboard to tab into a radio group you can navigate it using arrow left and right. By using labels you don't only help improving the accessibility and usability. You also get an easier style-able element that changes the state of the input for you. 

## Getting the value of a radio button group

On the backend, this is a non-issue. The form only sends the value of the selected element in the group. In JavaScript on the front-end, it was somehow tougher, but much better these days. 

Back in the days when I started with web development, this was a horrible task. You had to traverse the [elements collection of the form](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements) and compare the `type`, `name` and check if the element is `checked`. When you did the right thing and added labels and `id`s, you could loop through the `id`s you chose. That was a maintenance nightmare.

Nowadays, we have three ways: 

If you want to [check the value on form submission](https://codepo8.github.io/progressively-enhancing-radio-groups/bare-bones-formdata.html), you can use [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData). 

```Javascript
const form = document.querySelector('form');
const log = document.querySelector('output');

form.addEventListener('submit',(event) => {
  var data = new FormData(form);
  var output = '';
  for (const entry of data) {
    output = output + `${entry[0]} = ${entry[1]}`;
  };
  log.innerText = output;
  event.preventDefault();
});
```

If you want to get the value when you clicked on the element , you can use [event delegation and a complex selector](https://codepo8.github.io/progressively-enhancing-radio-groups/bare-bones-selector.html). This is also good if you plan on using more click reactions in your form.

```Javascript
form.addEventListener('click', (event) => {
  let t = event.target;
  if (t.nodeName.toLowerCase()=== 'input') {
  // if the user clicked on an input element
  // (labels forward that click)
    let state = document.querySelector(
      'input[type=radio][name=aligned]:checked'
      // Find the input element with a type of radio
      // the name aligned and that is currently 
      // checked
    ).value;
    // and get its value.
    log.innerText = state;
  }
});
```

Or you can [listen to the change event](https://codepo8.github.io/progressively-enhancing-radio-groups/bare-bones-change.html), which gives you the element interacted with as the event target. 

```Javascript
const form = document.querySelector('form');
const log = document.querySelector('output')

form.addEventListener('change', (event) => {
  let t = event.target;
  log.innerText = t.value;
});
```

## Replacing the radio buttons

OK, now let's take a stab at making radio buttons nicer to look at. For this, we could use CSS to change the look of the buttons itself, but there is a lot of cross-browser pain in that one. So the best plan is to replace them with something else. Replacing also means though that we need to replicate the different states of a radio button.

## Hiding the radio buttons and styling the label

Hiding things on the web isn't easy. You want to make them not show up but you also don't want to make them inaccessible. Non-sighted users and search engines should find content we want to replace with prettier alternatives. Scott O'Hara collected [a lot of excellent information on the subject](https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html). Applying this knowledge, we can use the following CSS to hide the radio buttons themselves across all kind of browsers and devices. The label will still change the state of the radio button when we click it, so that's good. 

```CSS
input[type=radio] {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  white-space: nowrap;
  width: 1px;
}
```

## Defining the different states

Having hidden the radio buttons, we now need to simulate the different states of the radio button. We can do that in CSS, no JavaScript needed. You can see the [result here](https://codepo8.github.io/progressively-enhancing-radio-groups/with-styled-label.html).

<img src="https://christianheilmann.com/wp-content/uploads/2020/05/styled-labels.gif" alt="labels styled to show different states" width="100%">

```CSS
/* 
Style each label that is following a input
of the type radio as light grey on mid grey
*/
input[type=radio] + label {
  background: #444444;
  color: #ccc;
}
```

```CSS
/* Radio buttons that are currently checked should be green... */        
input[type=radio]:checked + label {
  background: #9AD284;
  color: #000;
}
```

## Reacting to interaction

Having the two states isn't enough, we also need to react to user actions like hovering with a mouse or focusing the element with the keyboard. This invites interaction and is an important usability feature. Luckily, CSS has both :hover and :focus pseudo selectors to create those.

```CSS
/* When the user hovers over the label... */
input[type=radio]:hover + label {
  background: #666;
  color: #000;
}
/* When the user focuses the label via keyboard... */
input[type=radio]:focus + label {
  background: #666;
  color: #000;
}

/* Radio buttons that are checked hovered over */
input[type=radio]:checked:hover + label {
  background: #fff;
  color: #000;
}
/* Radio buttons that are checked and have focus */
input[type=radio]:checked:focus + label {
  background: #fff;
  color: #000;
}
```

## Adding the SVG buttons 

Traditionally we replaced things that aren't pretty with images. However, this is annoying both in terms of performance and zoom quality. Instead of using bitmap images to replace the button which get blurry when zoomed, let's use SVG, which scales better. We also can inline SVG which means we can edit it in the document if needed. The last excellent part of SVG is that you can change the colours of SVG paths in CSS instead of creating a new image.

You can see what [this looks like in this SVG example](https://codepo8.github.io/progressively-enhancing-radio-groups/with-svg.html).

The code might look daunting at first, but there are lots of excellent SVG resources available these days to get started. 

```xml
<input type="radio" id="r1" name="aligned" value="left" checked> 
<label for="r1">
  <svg xmls="http://www.w3.org/2000/svg" 
       fill="#ffffff" height="3em" width="3em" 
       viewBox="0 0 100 100" x="0px" y="0px">
    <rect x="17.04" y="25.36" width="65.91" height="6"></rect>
    <rect x="17.04" y="39.79" width="43.87" height="6"></rect>
    <rect x="17.04" y="54.21" width="65.91" height="6"></rect>
    <rect x="17.04" y="68.64" width="43.87" height="6"></rect>
  </svg>
</label>
```

This looks great, and if you click the different icons you can see that it also works. But you have no idea which one is currently active. To fix this, we need to add the changes to the fill state of the SVG to our CSS.

## Making the SVG icons accessible

The first thing to do is to style the SVG to allow for colour to be changed.

```CSS
svg {
  fill: inherit;
  height: 2em;
  width: 2em;
} 
```

Then we can change the `fill` colour to match the styles we defined earlier. 

```CSS
input[type=radio] + label {
  background: #444444;
  color: #ccc;
  fill: #ddd;
}        
input[type=radio]:checked + label {
  background: #9AD284;
  fill: #000;
  color: #000;
}
```

This fixes the "I have no clue where I am" issue. However, there is also another problem. We replaced the text inside the label, and thus the radio button is hidden and has no description. Something once again flagged up by [Webhint](https://webhint.io) in my editor:

<img src="https://christianheilmann.com/wp-content/uploads/2020/05/oops-svg-no-title-1024x554.png" alt="SVG icons with no title are like images without alternative text." width="100%" >

To remedy that we need to add a `title` element to each of the SVG elements. This should act like an alternative text to the image when it can't be seen and you can actually see it when you hover over the element:

<img src="https://christianheilmann.com/wp-content/uploads/2020/05/title-showing.png" alt="SVG title on hover" width="100%">

However, for screenreaders this isn't enough. We also need to give the SVG element a `role` of `img` and announce the title of the SVG using `aria-labelledby` pointing to an `ID` on the title element:

```xml
<input type="radio" id="r1" name="aligned" value="left" checked> 
<label for="r1">
  <svg xmls="http://www.w3.org/2000/svg" 
       fill="#ffffff" height="3em" width="3em" 
       viewBox="0 0 100 100" x="0px" y="0px" 
       aria-labelledby="title-r1" role="img">
    <title id="title-r1">Aligned Left</title>
    <rect x="17.04" y="25.36" width="65.91" height="6"></rect>
    <rect x="17.04" y="39.79" width="43.87" height="6"></rect>
    <rect x="17.04" y="54.21" width="65.91" height="6"></rect>
    <rect x="17.04" y="68.64" width="43.87" height="6"></rect>
  </svg>
</label>
```

This announces our images correctly as label text to assistive technology like screenreaders and also gets rid of the errors in Webhint. 

## Adding some fanciness

And that's it, using these steps we were able to create pretty, styled and accessible radio buttons that have all the benefits of radio groups and are screenreader and keyboard accessible. Without any fancy JavaScript or frameworks. 

A small extra I added to the [final example](https://codepo8.github.io/progressively-enhancing-radio-groups/final-accessible-svg.html) is a transition between the states and an inner shadow to make it really obvious which state is currently chosen.

```CSS
label {
  text-align: center;
  height: 2em;
  width: 2em;
  color: #fff;
  float: left;
  transition: 200ms;
}
input[type=radio]:checked + label {
  background: #9AD284;
  fill: #000;
  color: #000;
  box-shadow: 2px 2px 3px inset #333;
}
```

## Annoyances

This was fun and it is amazing how far you can come without having to write any logic in your code. Instead you let HTML do what it does best and CSS to react to user input and show different visual outcome. However, I think there would be a lot to gain by cleaning up the mess that is form element styling and I wished it would be easier and more predictable cross-browser to style these elements.

Another thing I am not too happy about is the need to define relationships with `ID`s and `for` and `aria-labelledby` attributes respectively. IDs have to be unique and generating them is annoying. Sure, you can re-use them in CSS and it makes for easier query selectors, but I never feel good adding one to a document that should be easily extensible. 

There is a proposal to [get a has: selector into CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/:has), which would allow at least to get rid of the for-ID relationship and nest the SVG inside the label using a `label:has(>input[type=radio])` selector instead, but the browser support so far is non-existent.

You can [see all the examples here on GitHub](https://codepo8.github.io/progressively-enhancing-radio-groups/bare-bones.html) and you can [fork and play with them](https://github.com/codepo8/progressively-enhancing-radio-groups/).

