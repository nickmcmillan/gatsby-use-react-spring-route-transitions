
const transitionDelay = 500

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  if (location.action === 'PUSH') {
    window.setTimeout(() => {
      // console.log('scroll to top')
      
      window.scrollTo(0, 0)
    }, transitionDelay)
  } else {
    const savedPosition = getSavedScrollPosition(location)
    window.setTimeout(() => {
      // console.log('scroll to saved position')
      
      window.scrollTo(...(savedPosition || [0, 0]))
    }, transitionDelay)
  }
  return false
}

