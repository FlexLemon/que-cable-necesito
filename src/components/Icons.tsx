type IconProps = { className?: string }

export function CableMark({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 88 88" fill="none" aria-hidden>
      <rect x="8" y="8" width="72" height="72" rx="20" fill="var(--primary-soft)" />
      <path
        d="M28 36h10l4 16h4l4-16h10"
        stroke="var(--primary)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="28" cy="36" r="5" stroke="var(--primary)" strokeWidth="3.2" />
      <circle cx="60" cy="36" r="5" stroke="var(--primary)" strokeWidth="3.2" />
      <path d="M34 52h20" stroke="var(--primary)" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  )
}

export function IconHome({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
    </svg>
  )
}

export function IconClock({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5L15 15" strokeLinecap="round" />
    </svg>
  )
}

export function IconGear({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4.5v1.8M12 17.7V19.5M4.5 12h1.8M17.7 12H19.5M6.4 6.4l1.3 1.3M16.3 16.3l1.3 1.3M17.6 6.4l-1.3 1.3M7.7 16.3 6.4 17.6" strokeLinecap="round" />
    </svg>
  )
}

export function IconCamera({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M4 8.5h3l1.4-2h7.2l1.4 2H20v11H4z" />
      <circle cx="12" cy="13.2" r="3.2" />
    </svg>
  )
}

export function IconSearch({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" strokeLinecap="round" />
    </svg>
  )
}

export function IconBack({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 5 8 12l7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconLaptop({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="4" y="5" width="16" height="11" rx="1.5" />
      <path d="M3 18.5h18" strokeLinecap="round" />
    </svg>
  )
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="8" y="3" width="8" height="18" rx="2" />
      <path d="M11 18.5h2" strokeLinecap="round" />
    </svg>
  )
}

export function IconTablet({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M11 17.5h2" strokeLinecap="round" />
    </svg>
  )
}

export function IconMonitor({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3.5" y="4" width="17" height="12" rx="1.5" />
      <path d="M9 20h6M12 16v4" strokeLinecap="round" />
    </svg>
  )
}

export function IconConsole({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="8" width="18" height="10" rx="4" />
      <path d="M8 13h3M9.5 11.5v3M15.2 12.2h.1M17.2 14h.1" strokeLinecap="round" />
    </svg>
  )
}

export function IconCameraDevice({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <circle cx="12" cy="13" r="3.2" />
      <path d="M8 7 9.2 5h5.6L16 7" />
    </svg>
  )
}

export function IconTv({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M8 20h8" strokeLinecap="round" />
    </svg>
  )
}

export function IconDesktop({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="6" y="3.5" width="12" height="14" rx="1.5" />
      <path d="M9 20h6" strokeLinecap="round" />
    </svg>
  )
}

export function IconHeadphones({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M5 13v-1a7 7 0 0 1 14 0v1" />
      <rect x="3.5" y="12.5" width="4" height="7" rx="1.5" />
      <rect x="16.5" y="12.5" width="4" height="7" rx="1.5" />
    </svg>
  )
}

export function IconDock({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="9" width="18" height="7" rx="1.5" />
      <path d="M7 16v3M17 16v3M8 12h2M12 12h2M16 12h2" strokeLinecap="round" />
    </svg>
  )
}

export function IconBolt({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m13 3-8 11h7l-1 7 8-11h-7z" strokeLinejoin="round" />
    </svg>
  )
}

export function IconData({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 7H5v10h3M16 7h3v10h-3M9 12h6" strokeLinecap="round" />
    </svg>
  )
}

export function IconDisplay({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M8 21h8" strokeLinecap="round" />
    </svg>
  )
}

export function IconAudio({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 10v4h4l5 4V6l-5 4z" />
      <path d="M16 9.5a3.5 3.5 0 0 1 0 5" />
    </svg>
  )
}

export function IconNet({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="8" width="16" height="9" rx="2" />
      <path d="M8 8V6h8v2M9 12h.1M12 12h.1M15 12h.1" strokeLinecap="round" />
    </svg>
  )
}

export function IconAdapt({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 8h4v8H7M13 10h4v4h-4" strokeLinejoin="round" />
      <path d="M11 12h2" strokeLinecap="round" />
    </svg>
  )
}

export function IconChevron({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 5 7 7-7 7" strokeLinecap="round" />
    </svg>
  )
}

export function IconWarn({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 4 3.8 19h16.4z" />
      <path d="M12 10v5M12 17.5v.5" strokeLinecap="round" />
    </svg>
  )
}

export function PortGlyph({ port, className }: { port: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 40" fill="none" aria-hidden>
      {port === 'usb-c' && (
        <rect x="10" y="14" width="44" height="12" rx="6" stroke="currentColor" strokeWidth="2.4" />
      )}
      {port === 'usb-a' && (
        <rect x="12" y="10" width="40" height="20" rx="2" stroke="currentColor" strokeWidth="2.4" />
      )}
      {port === 'hdmi' && (
        <path d="M8 12h40l8 8v8H8z" stroke="currentColor" strokeWidth="2.4" />
      )}
      {port === 'displayport' && (
        <path d="M8 10h36l12 10-12 10H8z" stroke="currentColor" strokeWidth="2.4" />
      )}
      {port === 'jack-35' && (
        <>
          <rect x="18" y="6" width="10" height="28" rx="2" stroke="currentColor" strokeWidth="2.2" />
          <path d="M28 20h18" stroke="currentColor" strokeWidth="2.2" />
        </>
      )}
      {port === 'ethernet' && (
        <rect x="14" y="8" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="2.4" />
      )}
      {!['usb-c', 'usb-a', 'hdmi', 'displayport', 'jack-35', 'ethernet'].includes(port) && (
        <rect x="16" y="12" width="32" height="16" rx="4" stroke="currentColor" strokeWidth="2.4" />
      )}
    </svg>
  )
}
