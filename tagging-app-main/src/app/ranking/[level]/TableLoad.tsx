import React from 'react'
import ContentLoader from 'react-content-loader'

const TableLoad = () => (
  <ContentLoader
    speed={2}
    width={600}
    height={124}
    viewBox="0 0 600 124"
    backgroundColor="#0a344d55"
    foregroundColor="#0a2729"
  >
    <rect x="82" y="3" rx="9" ry="5" width="147" height="32" />
    <rect x="254" y="3" rx="5" ry="5" width="147" height="32" />
    <rect x="4" y="3" rx="5" ry="5" width="60" height="32" />
    <rect x="419" y="3" rx="5" ry="5" width="147" height="32" />
  </ContentLoader>
)

export default TableLoad
