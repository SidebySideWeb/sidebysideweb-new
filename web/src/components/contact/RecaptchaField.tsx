import {useEffect, useRef} from 'react'
import {initRecaptchaWidget} from '../../lib/recaptcha-client'

interface Props {
  siteKey: string
  widgetKey?: string
  hl?: string
}

export default function RecaptchaField({siteKey, widgetKey = 'contact', hl = 'el'}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!siteKey || !containerRef.current) return

    const container = containerRef.current
    void initRecaptchaWidget(container, siteKey, widgetKey, hl)

    return () => {
      container.innerHTML = ''
    }
  }, [siteKey, widgetKey, hl])

  if (!siteKey) return null

  return <div ref={containerRef} className="min-h-[78px]" />
}
