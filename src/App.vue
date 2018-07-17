<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  body {
    font-family: 'Roboto';
    background: #4f5b66;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #343d46, #4f5b66);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #343d46, #4f5b66); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .container {
    height: 100vh;
  }
  h1 {
    font-family: 'Passion One', cursive;
    color: #fff;
    font-size: 72px;
    font-weight: normal;
    margin-bottom: 25px;
    letter-spacing: 1px;
    text-align: center;
  }
  .button {
    display: block;
    margin: 15px;
    padding: 15px;
    min-width: 150px;
    font-size: 24px;
    border: none;
    outline: none;
    text-align: center;
    text-decoration: none;
    color: white;
    background-color: #65737e;
    box-shadow: 0 9px #c0c5ce;
  }
  .button:active {
    background-color: #65737e;
    box-shadow: 0 5px #c0c5ce;
    transform: translateY(4px);
  }

  @media(min-width: 768px) {
    h1 {
      font-size: 100px;
    }
  }
</style>
