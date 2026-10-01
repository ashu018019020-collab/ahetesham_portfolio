'use client'

import dynamic from 'next/dynamic'

/**
 * Below-fold sections split into their own JS chunks so the initial bundle
 * only carries the code needed for the first paint. Sections stay
 * server-rendered (no `ssr: false`) — the exported HTML and SEO are
 * unchanged; only chunk loading is deferred.
 */
const Lazy = {
  SoftSkills: dynamic(() => import('./SoftSkills'), { loading: () => null }),
  CareerFocus: dynamic(() => import('./CareerFocus'), { loading: () => null }),
  Experience: dynamic(() => import('./Experience'), { loading: () => null }),
  Education: dynamic(() => import('./Education'), { loading: () => null }),
  Certifications: dynamic(() => import('./Certifications'), { loading: () => null }),
  Contact: dynamic(() => import('./Contact'), { loading: () => null }),
}

export default function LazySections() {
  return (
    <>
      <Lazy.SoftSkills />
      <Lazy.CareerFocus />
      <Lazy.Experience />
      <Lazy.Education />
      <Lazy.Certifications />
      <Lazy.Contact />
    </>
  )
}
