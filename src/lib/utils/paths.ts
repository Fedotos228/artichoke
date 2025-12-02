type pathsType = {
  home: () => string
  projects: () => string
  projectSingle: (slug: string) => string
  contact: () => string
}

const paths: pathsType = {
  home() {
    return '/'
  },
  projects() {
    return '/projects'
  },
  projectSingle(slug: string) {
    return `/projects/${slug}`
  },
  contact() {
    return '/contact'
  },
}

export default paths;