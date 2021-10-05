import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Container, Row, Col, Breadcrumb} from 'react-bootstrap'
import "@fontsource/ibm-plex-sans"
import "@fontsource/ibm-plex-sans/600.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import '../styles.scss'
import Footer from './footer'
//import Header from './header'
import Seo from './seo'
import Menu from './menu'
import Helmet from 'react-helmet'
//const shortcodes = { Link } // Provide common components here


export default function PostTemplate({ data: { mdx } }) {
  const image = getImage(mdx.frontmatter.newsImage)
  return (

    <div>
    <Helmet>
      <body className={mdx.frontmatter.class} />
    </Helmet>
    <Seo
      title={mdx.frontmatter.title}
      description={mdx.frontmatter.description}
      imageTwitter={mdx.frontmatter.imageTwitter}
      imageOg={mdx.frontmatter.imageOg}
      imageAlt={mdx.frontmatter.imageAlt}
    />
    <Container>
      <Row>
       <Col>
        <Menu />
       </Col>
      </Row>
    </Container>
    <Container fluid>
      <Row>
        <Col>
        <div class="visually-hidden-focusable"><a href="#content">Skip to main content</a></div>
        <main>
          <article id="content">
            <div class="w-60">
            <Breadcrumb>
              <Breadcrumb.Item href="/news-events">News & events</Breadcrumb.Item>
            </Breadcrumb>
            <h1 class="fs-1 mb-3 pb-0">{mdx.frontmatter.title}</h1>
            <p>{mdx.frontmatter.date}</p>
            <GatsbyImage image={image} alt={mdx.frontmatter.imageAlt} />
            </div>
            <div class="w-60 mt-5">
            <MDXProvider>
              <MDXRenderer frontmatter={mdx.frontmatter}>{mdx.body}</MDXRenderer>
            </MDXProvider>
            <p class="text-end mt-5"><a href="/news-events">News & events</a></p>
            </div>
          </article>
        </main>
        </Col>
      </Row>
    </Container>
    <Footer />
    </div>
  )
}
export const pageQuery = graphql`
  query PostQuery($id: String) {
    mdx(id: { eq: $id }, frontmatter: {class: {eq: "post"}}) {
      id
    body
    frontmatter {
      title
      description
      class
      imageTwitter
      imageOg
      imageAlt
      newsImage {
        childImageSharp {
          gatsbyImageData(width: 800, height: 375)
        }
      }
      date
      }
    }
  }
  `
