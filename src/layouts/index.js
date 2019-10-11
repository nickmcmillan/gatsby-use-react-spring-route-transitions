import React, { useRef } from "react"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import { useTransition, animated } from 'react-spring'

import "./layout.css"

const Header = () => (
  <div
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 700,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          Gatsby
        </Link>
      </h1>
    </div>
  </div>
)


function keyExists(key, arr) {
  return arr.some(function (el) {
    return el.key === key;
  });
}

// gatsby-plugin-layout does not give us any information about the previous route
// so we need to store visited routes outside of TemplateWrapper (which Gatsby controls the rendering for)
const visitedRoutes = []

const TemplateWrapper = (outerProps) => {

  const transitions = useTransition(outerProps.location, x => x.pathname, {
    from: { position: 'absolute', opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-100%,0,0)' },
    unique: true,
    reset: true,
  })

  // don't push into the visitedRoutes array if its already been pushed,
  // else the array would grow on every single route change
  const hasBeenPushed = keyExists(outerProps.children.key, visitedRoutes)
  if (!hasBeenPushed) {
    visitedRoutes.push(outerProps.children)
  }

  return (
    <div>
      <Helmet
        title="Gatsby Default Starter"
        meta={[
          { name: `description`, content: `Sample` },
          { name: `keywords`, content: `sample, something` },
        ]}
      />
      <Header />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 700,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        {transitions.map(({ item, props, key }) => {

          return (
            <animated.div
              key={key}
              style={props}
            >
              {item.pathname === outerProps.children.key ? (
                // entering view
                outerProps.children
              ) : (
                // exiting view
                visitedRoutes.find(x => x.key === item.pathname)
              )}
            </animated.div>
          )
        })}

        {/* <Transition location={outerProps.location}>{outerProps.children}</Transition> */}
      </div>
    </div>
  )
}

export default TemplateWrapper
