<template>
  <div class="footer-content">
    <div class="footer-copy">
      &#169; 2020
      <br>
      <a
        href="https://github.com/bradleyhop/"
        noopener
        noreferrer
        target="_blank"
      >
        Bradley Smith
      </a>
      <br>
      <a
        href="https://github.com/bradleyhop/bradleyhop.github.io/tree/master/new-weather-app"
        noopener
        noreferrer
        target="_blank"
      >
        Project GitHub
      </a>
      <br>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer-content {
  color: #fff;
  font-size: 0.9rem;
  height: 4.25rem;
  margin: 0;
  padding: 0.5rem;
  text-align: left;
}

.footer-copy {
  float: right;
  line-height: 1.2rem;
  margin-right: 1rem;

  & a {
    color: #fff;
    text-decoration: none;
  }

  & a:hover {
    text-decoration: underline;
  }

  & a:active {
    color: #fff;
  }
}
</style>
