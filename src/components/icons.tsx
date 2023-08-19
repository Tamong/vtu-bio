import {
  LucideProps,
  Moon,
  SunMedium,
  Menu,
  Twitter,
  Laptop,
  Twitch,
  Youtube,
  VenetianMask,
  type Icon as LucideIcon,
  Clipboard,
  MoreVertical,
  DotIcon,
  AlignLeft,
  ArrowDownWideNarrow,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
} from "lucide-react";

import { BsGoogle } from "react-icons/bs";
import { RxSlash } from "react-icons/rx";

export type Icon = LucideIcon;

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  twitter: Twitter,
  twitch: Twitch,
  youtube: Youtube,
  google: BsGoogle,
  slash: RxSlash,
  mask: VenetianMask,
  clipboard: Clipboard,
  more: MoreVertical,
  dot: DotIcon,
  alignleft: AlignLeft,
  arrowdown: ArrowDownWideNarrow,
  menu: Menu,
  down: ChevronDown,
  up: ChevronUp,
  search: Search,
  filter: Filter,
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      width="300"
      height="300"
    >
      <defs></defs>
      <g clipPath="url(#a)">
        <path
          d="M318.422 453.543 463.705 49.541c2.463-6.852-1.42-11.848-8.668-11.149L340.786 49.398c-7.247.699-15.076 6.848-17.47 13.723L188.843 449.216c-2.396 6.875 1.571 12.457 8.852 12.457h111.206c3.64 0 7.596-2.78 8.828-6.207l.693-1.923Z"
          fill="#536B8A"
        />
        <defs>
          <filter
            id="b"
            x="-200%"
            y="-200%"
            width="400%"
            height="400%"
            filterUnits="objectBoundingBox"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              xmlns="http://www.w3.org/2000/svg"
              in="SourceGraphic"
              stdDeviation="6.44"
            />
            <feOffset
              xmlns="http://www.w3.org/2000/svg"
              result="pf_100_offsetBlur"
            />
            <feFlood
              xmlns="http://www.w3.org/2000/svg"
              floodColor="#000"
              floodOpacity=".65"
            />
            <feComposite
              xmlns="http://www.w3.org/2000/svg"
              in2="pf_100_offsetBlur"
              operator="in"
              result="pf_100_dropShadow"
            />
            <feBlend
              xmlns="http://www.w3.org/2000/svg"
              in="SourceGraphic"
              in2="pf_100_dropShadow"
            />
          </filter>
        </defs>
        <g filter="url(#b)">
          <path
            d="m301.848 455.466-60.489-174.741 8.641-5.401 61.57 178.219-9.722 1.923Z"
            fill="#EBEBEB"
          />
        </g>
        <path
          d="m44.963 38.392 114.251 11.006c7.247.699 15.084 6.845 17.49 13.717l137.318 392.333c1.202 3.437-.777 6.225-4.418 6.225H197.695c-7.281 0-15.193-5.562-17.657-12.414L36.295 49.541c-2.463-6.852 1.42-11.848 8.668-11.149Z"
          fill="#5D87BF"
        />
      </g>
    </svg>
  ),
};
