interface Window {
  __REACT_DEVTOOLS_GLOBAL_HOOK__: any
  __REACT_MOBX_STORE__: any
}
declare module '*.jpg' {
  const resource: string
  export = resource
}
declare module '*.png' {
  const resource: string
  export = resource
}
declare module '*.svg' {
  const resource: string
  export = resource
}
declare module '*.css' {
  const resource: any
  export = resource
}
declare module '*.pcss' {
  const resource: string
  export = resource
}
declare module '*.json' {
  const resource: any
  export = resource
}

declare module '*.scss' {
  const content: { [className: string]: string }
  export = content
}

declare type Nullable<T> = T | null

declare module 'handy-scroll'