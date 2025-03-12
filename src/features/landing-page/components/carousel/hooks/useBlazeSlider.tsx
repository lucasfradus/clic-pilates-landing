import React from 'react'
import BlazeSlider from 'blaze-slider'

interface BlazeSliderConfig {
  // Add specific config properties if known
  [key: string]: any
}

export function useBlazeSlider (config: BlazeSliderConfig): React.RefObject<HTMLElement | null> {
  const sliderRef = React.useRef<BlazeSlider | null>(null)
  const elRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    // if not already initialized
    if (sliderRef.current === null && elRef.current !== null) {
      sliderRef.current = new BlazeSlider(elRef.current, config)
    }
  }, [config])

  return elRef
}
