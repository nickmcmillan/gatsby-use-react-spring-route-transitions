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
        maxWidth: 960,
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

// Check if an object already exists in an array
// https://stackoverflow.com/a/22844694/2255980
function keyExistsInArray(key, arr) {
  return arr.some(function (el) {
    return el.key === key
  })
}

const TemplateWrapper = ({ location, children }) => {

  // gatsby-plugin-layout does not give us any information about the previous route
  // so we need to store visited routes in a ref so it persists
  const visitedRoutes = useRef([])

  const transitions = useTransition(location, location.pathname, {
    from: { position: 'absolute', opacity: 0.01, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-100%,0,0)' },
    unique: true,
    reset: true,
  })

  // don't push into the visitedRoutes array if its already been pushed,
  // else the array would grow on every single route change
  const exists = keyExistsInArray(children.key, visitedRoutes.current)
  if (!exists) {
    visitedRoutes.current.push(children)
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
          maxWidth: 960,
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
              {item.pathname === children.key ? (
                // entering view
                children
              ) : (
                // again, not sure if this is the best approach
                // exiting view. or just render children if its the initial render
                visitedRoutes.current.find(x => x.key === key) || children
              )}
            </animated.div>
          )
        })}

      </div>
    </div>
  )
}

export default TemplateWrapper
