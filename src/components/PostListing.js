import React, { Component } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import moment from 'moment'

import { formatDate } from '../utils/global'

export default class PostListing extends Component {
  getPostList() {
    const { postEdges } = this.props
    const postList = postEdges.map(postEdge => {
      return {
        path: postEdge.node.fields.slug,
        thumbnail: postEdge.node.frontmatter.thumbnail,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.fields.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead,
      }
    })
    return postList
  }

  render() {
    const postList = this.getPostList()

    return (
      <section className="posts">
        {postList.map(post => {
          let thumbnail
          if (post.thumbnail) {
            thumbnail = post.thumbnail.childImageSharp.fixed
          }

          const date = formatDate(post.date)

          return (
            <Link to={post.path} key={post.title}>
              <div className="each">
                {thumbnail ? <Img fixed={thumbnail} /> : <div />}
                <div className="each-list-item">
                  <h2>{post.title}</h2>
                  <div className="datetime">{date}</div>
                </div>
              </div>
            </Link>
          )
        })}
      </section>
    )
  }
}
