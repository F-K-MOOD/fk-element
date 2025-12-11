import type { FontAwesomeIconProps } from "@fortawesome/vue-fontawesome";

export interface IconProps extends FontAwesomeIconProps {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  color?: string
}

export type FilterIconProps = Omit<IconProps, 'type'|'color'> 

