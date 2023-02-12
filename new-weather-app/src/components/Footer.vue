<template>
  <div class="footer-content">
    <div class="footer-copy">
      <a
        href="https://github.com/bradleyhop/"
        rel="noopener noreferrer"
        target="_blank"
      >
        Bradley Smith
      </a>
        &#169; 2020
        <br />
      <a
        href="https://github.com/bradleyhop/bradleyhop.github.io/tree/master/new-weather-app"
        rel="noopener noreferrer"
        target="_blank"
      >
        Project Repo at Github
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer-content {
  color: #fff;
  height: 2.6rem;
  margin: 0;
  padding: 0.5rem;
  text-align: left;
}

.footer-copy {
  float: right;
  line-height: 1.35rem;
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
