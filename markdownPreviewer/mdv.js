var vm = new Vue({
  el: '.flex-container',
  data: {
    // default markdown on pageload
    usermd: `
# Heading1
## Heading2

[Bradley's portfolio](https://bradleyhop.github.io)

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

This is made **bold** with asterisk, this __one__ with double underscore.`,
    preview: ''
  },
  methods: {
    translate() {
      this.preview = marked(this.usermd,
        { pedantic: false, gfm: true, breaks: true, smartLists: true,
          xhtml: false });
    }
  },
  mounted () {
    this.translate();
  },
  watch: {
    usermd: function () {
      this.translate();
    }
  },
});
