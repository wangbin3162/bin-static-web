/**
 * vue 实例mixin ，抽象公共属性、方法 法人名称原url searching/company_search_page.html
 */
var mixin = {
  el: '#app',
  data: function () {
    return {
      navList: [
        { id: '0', menuName: '首页', target: '/' },
        {
          id: '1', menuName: '项目服务', target: null,
          subMenu: [
            { id: '1-1', menuName: '系统方案', target: '/views/solution.html' },
            { id: '1-2', menuName: '综合服务', target: '#' },
            { id: '1-3', menuName: '项目案例', target: '/views/case_center.html' }
          ]
        },
        { id: '2', menuName: '新闻中心', target: '/views/news_center.html' },
        {
          id: '3', menuName: '城市信用', target: null,
          subMenu: [
            { id: '3-2', menuName: '城市排名', target: '/views/city_data.html' },
            { id: '3-3', menuName: '信用应用', target: '#' },
          ]
        },
        {
          id: '4', menuName: '联合奖惩', target: null,
          subMenu: [
            { id: '4-2', menuName: '备忘录', target: '/views/lhjc.html' },
            { id: '4-3', menuName: '应用案例', target: '#' },
          ]
        },
        { id: '5', menuName: '政策法规', target: '/views/zcfg.html' },
        { id: '6', menuName: '关于我们', target: '/views/about_us.html' }
      ]
    }
  },
  created: function () {
    this._init()
  },
  methods: {
    /**
     * 初始化方法获取token，初始化axios实例
     * @private 默认初始化，外部不用调用
     */
    _init: function () {
      this.axios_instance = axios.create({
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      this.axios_instance.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        // 对响应错误做点什么
        if (error.response) {
          // 响应时触发错误
          if (error.response.status >= 500) { // 如果是服务器端错误则跳转至服务错误页面
            // location.href = CTX_ROOT + '500.jspx'
          }
          if (error.response.status === 403) {
            // location.href = CTX_ROOT + '403.jspx'
          }
          if (error.response.status === 401) {
            // location.href = CTX_ROOT + '401.jspx'
          }
        } else {
          console.log('Error', error.message)
        }
        return Promise.reject(error)
      })
    },
    /**
     * 获取meta标签值的content
     * @param str 标签名称
     * @returns meta的值
     * @private
     */
    _getMeta: function (str) {
      var meta = document.getElementsByName(str)
      if (meta.length > 0) {
        return meta[0].content
      }
      return null
    },
    /**
     * 封装请求头部
     * @param isNormal 普通post请求
     * @returns {{'Content-Type': string}|{'Content-Type': string}}
     * @private
     */
    _requestHeaderByType: function (isNormal) {
      var headers
      if (isNormal) {
        headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
      } else {
        headers = { 'Content-Type': 'multipart/form-data' }
      }
      var csrfHeader = this._getMeta('_csrf_header')
      var csrfToken = this._getMeta('_csrf')
      if (csrfHeader && csrfToken) {
        headers[csrfHeader] = csrfToken
      }
      return headers
    },
    /**
     * 根据key获取url的参数值
     * @param name 参数名称
     */
    getQueryString: function (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) {
        return decodeURIComponent(r[2])
      }
      return null
    },
    /**
     * 跳转url
     * @param url
     */
    goTo: function (url) {
      location.href = url
    },
    /**
     * 封装get请求
     */
    getRequest: function (url, data) {
      return this.axios_instance.get(url, data)
    },
    /**
     * 封装post请求，携带token验证
     * @param url   请求地址
     * @param data  参数对象
     * @returns {promise}
     */
    postRequest: function (url, data) {
      var headers = this._requestHeaderByType(true)
      return this.axios_instance.post(url, data, {
        transformRequest: [function (data) {
          var ret = ''
          for (var it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          ret = ret.substring(0, ret.length - 1)
          return ret
        }],
        headers: headers
      })
    },
    /**
     * formData格式post请求
     * @param url 请求路径
     * @param formData formData格式类型的参数
     * let formData = new FormData()
     * formData.append('tempName', temp.tempName)
     * formData.append('tempFile', temp.fileList[0].raw)
     * @returns {promise}
     */
    postRequestFormData: function (url, formData) {
      var headers = this._requestHeaderByType(false)
      return this.axios_instance.post(url, formData, { headers: headers })
    },
    // 顶部搜索新闻
    searchText: function (value) {
      console.log(value)
    }
  }
}