const createUriComponent = (object: any): string => encodeURIComponent(JSON.stringify(object))

export {
  createUriComponent
}
