<template>
  <div class="about-container">
    <p>
      大家好，我是一名工作了3年的小菜鸟，2016年在平安夜和几个小伙伴历经半个多月的等待来到北京，在HPE开始了社会，感谢HPE经历，以及一年多的工作经历，自己不是一个喜欢闲的人，有人曾经在面试的时候问我，为什么在公司拿不到新项目，每天可以在办公室能学习还拿着工资的时候离开了HPE， 其实我一直没有考虑过这个问题，只是在当时想了想，回答他“我觉得而我还年轻，不想在20岁过成40岁的模样”。
    </p>
    <ul>
      <li>Angular：入职HPE做了一个华为的纯js构建的建模项目，之后一直做Angular前后端分离的开发</li>
      <li>Vue：和另外的前端同事一起尝试将Vue技术栈应用于新的项目中，基本到现在web端主做Vue</li>
      <li>小程序：一个人接手公司小程序项目，一个人看着官方文档入手，到现在撸了6个小程序项目了</li>
      <li>Node：自己开始尝试使用Node，这个博客就是第一次使用Egg.js加Vue做的，更希望以后进入有这种前端与Node都可以上手的团队</li>
    </ul>
    <div>如果有一天，你不再快乐，不如去看看世界。</div>
  </div>
</template>

<script>
export default {
  name: 'AboutMe',
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">
  .about-container {
    height: 252px !important;
    width: 900px;
    padding: 150px 50px;
    margin-top: 20px !important;
    text-align: left;
    letter-spacing: 0.5px;
    border-radius: 4px;
    font-size: 14px;
    color: #585858;
    background: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    p {
      text-indent: 32px;
    }

    ul {
      padding: 10px 0;
      list-style-type: none;

      li {
        padding: 3px 0;
      }
    }
  }
</style>
