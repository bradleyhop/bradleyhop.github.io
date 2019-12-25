var vm = new Vue({
  el: '.flex-container',
  data: {
    editor: '# Heading1',
    usermd: '',
    preview: ''
  },
  methods: {
    translate() {
      if (this.usermd !== '') {
        this.preview = marked(this.usermd);
      } else {
        this.preview = marked(this.editor);
      }
    }
  },
  mounted () {
    this.translate();
  }
});
