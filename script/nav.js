const pages = {
  "Bare Bones Example":"bare-bones.html",
  "Adding label":"with-label.html",
  "Reading FormData":"bare-bones-formdata.html",
  "Reading by Selector":"bare-bones-selector.html",
  "Reading with change handler":"bare-bones-change.html",
  "Styled Label":"with-styled-label.html",
  "SVG instead of radio button":"with-svg.html",
  "Accessible SVG":"accessible-svg.html",
  "Final version":"final-accessible-svg.html",
  "Alternative Approach":"alternative-approach.html",
}
let nav = document.createElement('ul');
let out = '';
let current = document.location.href.replace(/.*\//,'');
for (p of Object.keys(pages)) {
  if(pages[p] !== current){
    out += `<li><a href="${pages[p]}">${p}</a></li>`
  } else {
    out += `<li>${p}</li>`
  }
}
nav.innerHTML = out;
document.body.appendChild(nav);

const footer = document.querySelector('footer') || document.createElement('footer');
footer.innerHTML += `
<p>Written by Chris Heilmann, read the blog post and <a href="https://github.com/codepo8/progressively-enhancing-radio-groups
">contribute on GitHub</a></p>
`
document.body.appendChild(footer);

