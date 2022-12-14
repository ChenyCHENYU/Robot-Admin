// * Menu
declare namespace Menu {
  interface MenuOptions {
    path: string
    name: string
    component?: string | (() => Promise<any>)
    redirect?: string
    meta: MetaProps
    children?: MenuOptions[]
  }
  interface MetaProps {
    icon: string
    title: string
    link: string
    hidden: boolean
    full: boolean
    isAffix: boolean
    keepAlive: boolean
  }
}
