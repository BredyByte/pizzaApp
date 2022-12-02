import React from "react"
import ContentLoader from "react-content-loader"

export const SkeletonText = (props) => (
  <ContentLoader
    speed={2}
    width={360}
    height={360}
    viewBox="0 0 360 360"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="10" y="26" rx="10" ry="10" width="340" height="34" />
    <rect x="105" y="74" rx="10" ry="10" width="150" height="24" />
    <rect x="20" y="116" rx="10" ry="10" width="320" height="100" />
    <rect x="35" y="230" rx="10" ry="10" width="290" height="22" />
    <rect x="20" y="260" rx="10" ry="10" width="320" height="44" />
  </ContentLoader>
)


export const SkeletonCircle  = (props) => (
  <ContentLoader
    speed={2}
    width={360}
    height={360}
    viewBox="0 0 360 360"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="150" cy="170" r="140" />
  </ContentLoader>
)