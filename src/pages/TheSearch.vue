<template>
  <div>

    <TypeNav/>

    <div class="main">
      <div class="py-container">

        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li><a href="#">全部结果</a></li>
          </ul>
          <ul class="fl sui-tag">
            <li v-if="searchParams.categoryName" class="with-x">{{ searchParams.categoryName }}<i
                @click="removeCategoryName">×</i></li>
            <li v-if="searchParams.keyword" class="with-x">{{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <li v-if="searchParams.trademark" class="with-x">{{ searchParams.trademark.split(':')[1] }}<i
                @click="removeTrademark">×</i></li>
            <li v-for="(props, index) in searchParams.props" :key="props" class="with-x">{{ props.split(':')[1] }}<i
                @click="removeProps(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li @click="sortType(1)" :class="{active: orderType === '1'}">
                  <a href="javascript:">
                    综合<i v-show="orderType === '1'"
                         :class="['iconfont', {'icon-arrow-up': orderSort === 'asc'}, {'icon-arrow-down': orderSort === 'desc'}]"></i>
                  </a>
                </li>
                <li @click="sortType(2)" :class="{active: orderType === '2'}">
                  <a href="javascript:">
                    价格<i v-show="orderType === '2'"
                         :class="['iconfont', {'icon-arrow-up': orderSort === 'asc'}, {'icon-arrow-down': orderSort === 'desc'}]"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li v-for="goods in goodsList" :key="goods.id" class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="#" target="_blank"><img :src="goods.defaultImg" alt="产品图"/></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a v-html="goods.title" target="_blank" href="#" :title="goods.title"></a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="#" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <BasePagination @getPageNo="getPageNo" :page-no="searchParams.pageNo" :page-size="searchParams.pageSize"
                          :total="total" :continues="5"/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from '@/components/Search/SearchSelector'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TheSearch',
  components: { SearchSelector },
  data() {
    return {
      searchParams: {
        'category1Id': '',
        'category2Id': '',
        'category3Id': '',
        'categoryName': '',
        'keyword': '',
        'order': '1:desc',
        'pageNo': 1,
        'pageSize': 10,
        'props': [],
        'trademark': ''
      }
    }
  },
  computed: {
    ...mapGetters('search', ['total', 'attrsList', 'goodsList', 'trademarkList']),

    orderType() {
      return this.searchParams.order.split(':')[0]
    },
    orderSort() {
      return this.searchParams.order.split(':')[1]
    }
  },
  mounted() {
    const { query, params } = this.$route
    Object.assign(this.searchParams, query, params)
    console.log('this.searchParams:', this.searchParams)
    this.getSearchInfo(this.searchParams)
    Object.assign(this.searchParams, { category1Id: '', category2Id: '', category3Id: '' })
  },
  watch: {
    $route(newValue) {
      const { query, params } = newValue
      Object.assign(this.searchParams, query, params)
      this.getSearchInfo(this.searchParams)
      Object.assign(this.searchParams, { category1Id: '', category2Id: '', category3Id: '' })
    }
  },
  methods: {
    ...mapActions('search', ['getSearchInfo']),

    removeCategoryName() {
      Object.assign(this.searchParams, {
        categoryName: undefined,
        category1Id: undefined,
        category2Id: undefined,
        category3Id: undefined
      })
      this.getSearchInfo(this.searchParams)
      const { params } = this.$route
      if (params) this.$router.push({ name: 'search', params })
    },

    removeKeyword() {
      Object.assign(this.searchParams, { keyword: undefined })
      this.$bus.$emit('updateKeyword', '')
      this.getSearchInfo(this.searchParams)
      const { query } = this.$route
      if (query) this.$router.push({ name: 'search', query })
    },

    removeTrademark() {
      Object.assign(this.searchParams, { trademark: undefined })
      this.getSearchInfo(this.searchParams)
    },

    removeProps(index) {
      this.searchParams.props.splice(index, 1)
      this.getSearchInfo(this.searchParams)
    },

    tradeMarkInfo(value) {
      this.searchParams.trademark = `${value.tmId}:${value.tmName}`
      this.getSearchInfo(this.searchParams)
    },

    attrInfo(attrs, attrValue) {
      const { attrId, attrName } = attrs
      const props = `${attrId}:${attrValue}:${attrName}`
      if (this.searchParams.props.includes(props)) return
      this.searchParams.props.push(props)
      this.getSearchInfo(this.searchParams)
    },

    sortType(value) {
      const type = value === 1 ? 1 : 2
      const sort = this.searchParams.order.split(':')[1] === 'desc' ? 'asc' : 'desc'
      this.searchParams.order = `${type}:${sort}`
      this.getSearchInfo(this.searchParams)
    },

    getPageNo(value) {
      this.searchParams.pageNo = value
      this.getSearchInfo(this.searchParams)
    }
  }
}
</script>

<style scoped lang="less">
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;

                  &:hover {
                    color: #fff !important;
                  }
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>