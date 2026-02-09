const FolderIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg
      viewBox="0 0 100% 100%"
      // fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        <path
          d="M8 19C8 14.5817 11.5817 11 16 11H217.129C219.847 11 222.38 12.3809 223.853 14.6663L233.658 29.881C235.131 32.1664 237.664 33.5474 240.383 33.5474H424C428.418 33.5474 432 37.1291 432 41.5474V275C432 279.418 428.418 283 424 283H16C11.5817 283 8 279.418 8 275V19Z"
          fill="#FFE89F"
        />
      </g>
    </svg>
  );
};

// const SmallFolderIcon = (props: React.ComponentProps<"svg">) => {
//   return (
//     <svg
//       width="326"
//       height="198"
//       viewBox="0 0 326 198"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       {...props}
//     >
//       <g filter="url(#filter0_d_838_4082)">
//         <path
//           d="M8 19C8 14.5817 11.5817 11 16 11H159.939C162.541 11 164.981 12.266 166.48 14.394L172.324 22.693C173.822 24.8209 176.262 26.0869 178.865 26.0869H310C314.418 26.0869 318 29.6687 318 34.0869V185.001C318 189.419 314.418 193.001 310 193.001H16C11.5817 193.001 8 189.419 8 185.001V19Z"
//           fill="#FFE89F"
//         />
//       </g>
//       <defs>
//         <filter
//           id="filter0_d_838_4082"
//           x="0.495606"
//           y="0.493849"
//           width="325.009"
//           height="197.01"
//           filterUnits="userSpaceOnUse"
//           color-interpolation-filters="sRGB"
//         >
//           <feFlood floodOpacity="0" result="BackgroundImageFix" />
//           <feColorMatrix
//             in="SourceAlpha"
//             type="matrix"
//             values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
//             result="hardAlpha"
//           />
//           <feOffset dy="-3.00176" />
//           <feGaussianBlur stdDeviation="3.7522" />
//           <feComposite in2="hardAlpha" operator="out" />
//           <feColorMatrix
//             type="matrix"
//             values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
//           />
//           <feBlend
//             mode="normal"
//             in2="BackgroundImageFix"
//             result="effect1_dropShadow_838_4082"
//           />
//           <feBlend
//             mode="normal"
//             in="SourceGraphic"
//             in2="effect1_dropShadow_838_4082"
//             result="shape"
//           />
//         </filter>
//       </defs>
//     </svg>
//   );
// };
export { FolderIcon };
