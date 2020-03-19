// default markdown on pageload
const usrMD =`# Heading 1
## Heading 2
-------------

Here is a link to [Bradley's portfolio](https://bradleyhop.github.io)

This sentence has \`\<inline-code\>\` in it.

\`\`\`javascript
const message = "This is javascript code";
let a = 52;
fucntion addFive(val) {
  return val + 5;
  }
console.log(addFive(a));
// 57
\`\`\`

\`\`\`html
<p>This is html code.</p>
<div class="test"></div>
\`\`\`

Here is a list:
1. List item
2. Second list item
  * unordered nested item

Here's an image:
![alt text](https://secure.meetupstatic.com/photos/event/4/c/b/b/600_468259643.jpeg 'free code camp logo')

This is made **bold** with asterisk, this __one__ with double underscore. This word is _emphasized_! ~Struck from the record.~

> This is a blockquote.
> It is really, really long.
> It makes these words look important!

This nastiness below will be removed through DOMPurify!
<script>onload=alert(3);</script>
(Here is no malicious code.)`;

var vm = new Vue({
  el: "#md-container",
  data: {
    textmarkMD: usrMD
  },
  computed: {
    preview: function() {
      return DOMPurify.sanitize(
        marked(this.textmarkMD, {
          pendantic: false,
          gfm: true,
          breaks: true,
          smartLists: true,
          xhtml: false,
          highlight: function(code) {
            return hljs.highlightAuto(code).value;
          }
        })
      );
    }
  }
});
