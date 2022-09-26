<template>
  <div class="wrapper">
    <img src="@/assets/common/j9CSVw.png" alt="" class="image">
    <div class="enjoy"><button class="button" @click="$router.push('/home')">体验项目</button></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .wrapper{
    position: relative;
    padding-bottom: 106px;
    background: #f5f5f5;
  }
  .image {
    display: block;
    width: 1280px;
    margin: 0 auto;
  }
  .enjoy {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 106px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid #f0f0f0;

    .button{
      width: 158px;
    height: 46px;
    background: #0081ff;
    border-radius: 7px;
    border: none;
    box-shadow: 0 2px 12px 0 rgb(82 151 218 / 50%);
    font-size: 16px;
    color: #ffffff;
    cursor: pointer
    }
}
</style>
