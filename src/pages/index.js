/* eslint-disable react/prop-types */
import React from "react"
import { Link } from "gatsby"

const Index = () => (
  <>
    <h1>animals</h1>
    <div>
      <Link to="/cat/">Go to cat</Link>
    </div>
    <div>
      <Link to="/dog/">Go to dog</Link>
    </div>
    <div>
      <Link to="/long-page/">Go to long page</Link>
    </div>
  </>
)

export default Index
