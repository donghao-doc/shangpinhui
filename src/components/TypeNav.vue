<template>
  <div class="type-nav">
    <div class="container">

      <div @mouseleave="handleLeave" @mouseenter="enterAll">
        <h2 class="all">全部商品分类</h2>

        <transition name="sort">
          <div v-show="showSort" class="sort">
            <div @click="goSearch" class="all-sort-list2">
              <div @mouseenter="handleEnter(index)" v-for="(category, index) in categoryList" :key="category.categoryId"
                   :class="{active: currentIndex === index}" class="item">
                <h3>
                  <a :data-categoryName="category.categoryName" :data-category1Id="category.categoryId"
                     href="javascript:">{{ category.categoryName }}</a>
                </h3>
                <div :class="{active: currentIndex === index}" class="item-list clearfix">
                  <div v-for="subCategory in category.categoryChild" :key="subCategory.categoryId" class="subitem">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="subCategory.categoryName" :data-category2Id="subCategory.categoryId"
                           href="javascript:">{{ subCategory.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="itemCategory in subCategory.categoryChild" :key="itemCategory.categoryId">
                          <a :data-categoryName="itemCategory.categoryName" :data-category3Id="itemCategory.categoryId"
                             href="javascript:">{{ itemCategory.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="#">服装城</a>
        <a href="#">美妆馆</a>
        <a href="#">尚品汇超市</a>
        <a href="#">全球购</a>
        <a href="#">闪购</a>
        <a href="#">团购</a>
        <a href="#">有趣</a>
        <a href="#">秒杀</a>
      </nav>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { throttle } from 'lodash'

export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1,
      showSort: true
    }
  },
  computed: {
    ...mapGetters('home', ['categoryList']),
  },
  async mounted() {
    if (this.$route.path !== '/') this.showSort = false
  },
  methods: {
    enterAll() {
      this.showSort = true
    },

    handleEnter: throttle(function (index) {
      this.currentIndex = index
    }, 50),

    handleLeave() {
      this.currentIndex = -1
      if (this.$route.path !== '/') this.showSort = false
    },

    goSearch: function (event) {
      const { categoryname, category1id, category2id, category3id } = event.target.dataset
      const location = { name: 'search', query: { categoryname } }
      if (category1id) {
        location.query.category1id = category1id
      }
      if (category2id) {
        location.query.category2id = category2id
      }
      if (category3id) {
        location.query.category3id = category3id
      }
      this.$router.push(location)
    }
  }
}
</script>

<style scoped lang="less">
.sort-enter, .sort-leave-to { opacity: 0; }
.sort-enter-active, .sort-leave-active { transition: all .2s linear; }
.sort-enter-to, .sort-leave { opacity: 1; }

.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          &.active {
            background: skyblue;
          }

          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            &.active {
              display: block;
            }

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          //&:hover {
          //  .item-list {
          //    display: block;
          //  }
          //}
        }
      }
    }
  }
}
</style>