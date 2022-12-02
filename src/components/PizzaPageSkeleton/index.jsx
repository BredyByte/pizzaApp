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
    <rect x="10" y="7" rx="10" ry="10" width="340" height="28" />
    <rect x="105" y="50" rx="10" ry="10" width="150" height="22" />
    <rect x="20" y="88" rx="10" ry="10" width="320" height="140" />
    <rect x="35" y="244" rx="10" ry="10" width="290" height="22" />
    <rect x="20" y="278" rx="10" ry="10" width="320" height="44" />
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
    <circle cx="160" cy="160" r="160" />
  </ContentLoader>
)