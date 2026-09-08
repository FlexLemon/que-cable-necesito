export type DeviceId =
  | 'laptop'
  | 'phone'
  | 'tablet'
  | 'monitor'
  | 'console'
  | 'camera'
  | 'tv'
  | 'desktop'
  | 'headphones'
  | 'dock'
  | 'generic-a'
  | 'generic-b'

export type PortId =
  | 'usb-c'
  | 'usb-a'
  | 'micro-usb'
  | 'mini-usb'
  | 'lightning'
  | 'hdmi'
  | 'displayport'
  | 'jack-35'
  | 'ethernet'
  | 'other'

export type UsageId =
  | 'charge'
  | 'data'
  | 'display'
  | 'audio'
  | 'network'
  | 'adapt'

export type StoreId = 'amazon' | 'pccomponentes'

export type Device = {
  id: DeviceId
  name: string
  popular: boolean
}

export type Port = {
  id: PortId
  name: string
  subtitle: string
}

export type Usage = {
  id: UsageId
  name: string
  hint: string
}

export type Product = {
  id: string
  brand: string
  name: string
  specs: string
  price: number
  store: StoreId
  url: string
  kinds: string[]
}

export type Requirement = {
  title: string
  detail: string
}

export type Recommendation = {
  cableLabel: string
  kind: string
  requirements: Requirement[]
  warning?: string
  incompatible?: boolean
  note?: string
}

export type HistoryItem = {
  id: string
  createdAt: string
  deviceA: DeviceId
  deviceB: DeviceId
  portA: PortId
  portB: PortId
  usage: UsageId
  cableLabel: string
}

export type WizardState = {
  deviceA?: DeviceId
  portA?: PortId
  deviceB?: DeviceId
  portB?: PortId
  usage?: UsageId
}

export type Theme = 'light' | 'dark'
export type Lang = 'es' | 'en'
