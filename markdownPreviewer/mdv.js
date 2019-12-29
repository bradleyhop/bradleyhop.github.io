var vm = new Vue({
  el: '#md-container',
  data: {
    // default markdown on pageload
    usermd: `
# Heading 1
## Heading 2
-------------

[Bradley's portfolio](https://bradleyhop.github.io)

This sentence has \`\<inline-code\>\` in it.
\`\`\`
var let a = 52;
a += 5;
console.log(a);
\`\`\`

1. List item
2. Second list item

> This is a blockquote. It is really, really long.
> It makes these words look important!

Here's an image:
![alt text](https://secure.meetupstatic.com/photos/event/4/c/b/b/600_468259643.jpeg 'free code camp logo')

This is made **bold** with asterisk, this __one__ with double underscore.
This word is _emphasized_!`,
  },
  computed: {
    preview() {
      return marked(this.usermd,
        { pendantic: false, gfm: true, breaks: true, smartLists: true,
          xhtml: false, sanitize: true });
      // this.preview = this.preview.replace(/(\n)/g, "<br>");
    }
  },
});
