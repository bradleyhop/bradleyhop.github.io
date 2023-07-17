<script>
export default {
  name: 'Footer',

  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<template>
  <div class="footer-content">
    <div class="footer-copy">
      <a
        href="https://github.com/bradleyhop/"
        rel="noopener noreferrer"
        target="_blank"
        class="footer-link"
      >
        Bradley Smith
      </a>
      &#169;{{ currentYear }}
      <a
        href="https://github.com/bradleyhop/bradleyhop.github.io/tree/master/pomodoro-timer"
        rel="noopener noreferrer"
        target="_blank"
        class="footer-link"
      >
        [ Project GitHub ]
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer-content {
  color: #fff;
  text-align: left;
  margin-top: 1rem;
}

.footer-copy {
  float: right;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
}

.footer-link {
  color: #fff;
  text-decoration: none;
}

.footer-link:hover {
  text-decoration: underline;
}

.footer-link:active {
  color: #fff;
}
</style>
