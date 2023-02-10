import React, { Component } from 'react'
import PubSub from 'pubsub-js'
// import axios from 'axios'

export default class Search extends Component {

  search = async () => {
    const { keyWordElement: { value: keyWord } } = this
    PubSub.publish('atguigu', { isFirst: false, isLoading: true })
    /* axios.get(`/api1/search/users?q=${keyWord}`).then(
      response => {
        PubSub.publish('atguigu', { isLoading: false, users: response.data.items })
      },
      error => {
        PubSub.publish('atguigu', { isLoading: false, err: error.message })
      }
    ) */
    //使用fetch发送网络请求（为优化）
    /* fetch(`/api1/search/users?q=${keyWord}`).then(
      response => {
        console.log('联系服务器成功');
        return response.json()
      },
    ).then(
      response => { console.log('获取数据成功', response); }
    ).catch(
      (error) => { console.log(error); }
    ) */

    try {
      const response = await fetch(`/api1/search/users?q=${keyWord}`)
      const data = await response.json()
      PubSub.publish('atguigu', { isLoading: false, users: data.items })

    } catch (error) {
      PubSub.publish('atguigu', { isLoading: false, err: error.message })
    }
  }

  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">搜索GitHub用户</h3>
        <div>
          <input ref={c => this.keyWordElement = c} type="text" placeholder="输入关键词点击搜索" />&nbsp;
          <button onClick={this.search}>搜索</button>
        </div>
      </section>
    )
  }
}
