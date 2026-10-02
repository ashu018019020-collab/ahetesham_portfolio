// Shared contact & social data — update once, reflected everywhere
export const CONTACT = {
  phone: '9021517413',
  /** E.164 (country code + number) for `tel:` links — dialable from any country. */
  phoneE164: '+919021517413',
  phoneDisplay: '+91 9021517413',
  email: 'aheteshamk2003@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ahetesham-khan-b3a35a3b5?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  linkedinShort: 'linkedin.com/in/ahetesham-khan',
  github: 'https://github.com/aheteshamkhan',
  githubShort: 'github.com/aheteshamkhan',
  /** Latest CV. Filename is versioned on purpose — a brand-new URL beats a
   *  cached `/resume.pdf`, so every Download CV click serves the current file. */
  resumePath: '/Ahetesham_Khan_Resume.pdf',
}

/** Readable label for an external URL — drops the protocol and trailing slash. */
export function liveHost(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/+$/, '')
}
