export declare global {
    namespace globalThis.React.JSX {
      interface IntrinsicElements {
        "swiper-container"?: React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        > & {
          "slides-per-view"?: string;
          "loop"?: string;
          "autoplay"?: string;
          "navigation"?: string;
          "space-between"?: string; 
          "breakpoints"? : unknown;
          "center"?:string
        };
        "swiper-slide"?: React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        >;
      }
    }
  }