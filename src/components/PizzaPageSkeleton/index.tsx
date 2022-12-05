import React from "react"
import ContentLoader from "react-content-loader"

export const SkeletonText: React.FC = ({props}: any) => (
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

type SkeletonCircleProps = {
  cx: number,
  cy: number,
  r: number
}

export const SkeletonCircle: React.FC<SkeletonCircleProps> = ({cx, cy, r}) => {
  return (
      <ContentLoader
          speed={2}
          width={360}
          height={360}
          viewBox="0 0 360 360"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
      >
        <circle cx={cx} cy={cy} r={r} />
      </ContentLoader>
  )
}