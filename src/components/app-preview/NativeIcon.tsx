import type { TaskStatus } from '../../data/product'

// The application's own Resources/Icons.xaml geometries. Tight viewBoxes mirror
// WPF's Stretch="Uniform"; task glyphs below retain their original 24px viewBox.
const filled = {
  settings: ['M18.38 13.27 20.83 13.76 20.83 10.24 18.38 10.73 17.4 8.39 19.48 7 17 4.52 15.61 6.6 13.27 5.62 13.76 3.17 10.24 3.17 10.73 5.62 8.39 6.6 7 4.52 4.52 7 6.6 8.39 5.62 10.73 3.17 10.24 3.17 13.76 5.62 13.27 6.6 15.61 4.52 17 7 19.48 8.39 17.4 10.73 18.38 10.24 20.83 13.76 20.83 13.27 18.38 15.61 17.4 17 19.48 19.48 17 17.4 15.61Z M12 8.8C13.77 8.8 15.2 10.23 15.2 12S13.77 15.2 12 15.2 8.8 13.77 8.8 12 10.23 8.8 12 8.8Z', '3.17 3.17 17.66 17.66'],
  pin: ['M7 8.5A5 4 0 1 1 17 8.5A5 4 0 1 1 7 8.5Z M11.25 12.25H12.75V21.5L12 22.5 11.25 21.5Z', '7 4.5 10 18'],
  minimize: ['M5.5 11.2H18.5C18.9 11.2 19.2 11.5 19.2 11.9V12.1C19.2 12.5 18.9 12.8 18.5 12.8H5.5C5.1 12.8 4.8 12.5 4.8 12.1V11.9C4.8 11.5 5.1 11.2 5.5 11.2Z', '4.8 4.8 14.4 14.4'],
  close: ['M5.93 7.07 7.07 5.93 18.07 16.93 16.93 18.07Z M16.93 5.93 18.07 7.07 7.07 18.07 5.93 16.93Z', '5.93 5.93 12.14 12.14'],
  reminder: ['M12 2A10 10 0 1 0 22 12A10 10 0 1 0 12 2M13 6.5V11.59L16.4 14.99 14.99 16.4 11 12.41V6.5Z', '2 -8 30 30'],
  toolbar: ['M4 5H20V7H4Z M4 11H20V13H4Z M4 17H20V19H4Z', '4 4 16 16'],
  chevron: ['M7.41 8.58 12 13.17 16.59 8.58 18 10 12 16 6 10Z', '6 6 12 12'],
  delete: ['M12 2C6.47 2 2 6.47 2 12S6.47 22 12 22 22 17.53 22 12 17.53 2 12 2M17 15.59 15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12Z', '2 2 20 20'],
  more: ['M6 10A2 2 0 1 0 6 14A2 2 0 1 0 6 10M18 10A2 2 0 1 0 18 14A2 2 0 1 0 18 10M12 10A2 2 0 1 0 12 14A2 2 0 1 0 12 10', '4 4 16 16'],
  table: ['M2 0H14A2 2 0 0 1 16 2V14A2 2 0 0 1 14 16H2A2 2 0 0 1 0 14V2A2 2 0 0 1 2 0Z M2 1.5H5V5H1.5V2A.5 .5 0 0 1 2 1.5Z M6 1.5H10V5H6Z M11 1.5H14A.5 .5 0 0 1 14.5 2V5H11Z M1.5 6H5V10H1.5Z M6 6H10V10H6Z M11 6H14.5V10H11Z M1.5 11H5V14.5H2A.5 .5 0 0 1 1.5 14Z M6 11H10V14.5H6Z M11 11H14.5V14A.5 .5 0 0 1 14 14.5H11Z', '0 0 16 16'],
  list: ['M4 4.5A1.5 1.5 0 1 0 4 7.5A1.5 1.5 0 1 0 4 4.5M4 10.5A1.5 1.5 0 1 0 4 13.5A1.5 1.5 0 1 0 4 10.5M4 16.5A1.5 1.5 0 1 0 4 19.5A1.5 1.5 0 1 0 4 16.5M8 19H22V17H8Z M8 13H22V11H8Z M8 5V7H22V5Z', '2.5 2.5 19.5 19.5'],
  image: ['M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19M8.5 13.5 11 16.51 14.5 12 19 18H5Z', '3 3 18 18'],
  remoteImage: ['M3 5A2 2 0 0 1 5 3H15A2 2 0 0 1 17 5V9.1C15.8 9.5 14.8 10.1 14 11L12.5 9 9 13.5 7 11 3 16V5M15.5 10A5.5 5.5 0 1 1 15.5 21A5.5 5.5 0 0 1 15.5 10M12 15H14C14.1 13.9 14.4 13 15 12.4C13.5 12.6 12.3 13.6 12 15M16 12.4C16.6 13 16.9 13.9 17 15H19C18.7 13.6 17.5 12.6 16 12.4M12 16.5C12.3 17.9 13.5 18.9 15 19.1C14.4 18.5 14.1 17.6 14 16.5H12M15.5 12.5C15 13.1 14.7 13.9 14.6 15H16.4C16.3 13.9 16 13.1 15.5 12.5M14.6 16.5C14.7 17.6 15 18.4 15.5 19C16 18.4 16.3 17.6 16.4 16.5H14.6M17 16.5C16.9 17.6 16.6 18.5 16 19.1C17.5 18.9 18.7 17.9 19 16.5H17Z', '3 3 18 18'],
  save: ['M5.25 3.5H16.7L20.5 7.3V18.75C20.5 19.72 19.72 20.5 18.75 20.5H5.25C4.28 20.5 3.5 19.72 3.5 18.75V5.25C3.5 4.28 4.28 3.5 5.25 3.5Z M5.25 5.25V18.75H7.25V13.25C7.25 12.56 7.81 12 8.5 12H15.5C16.19 12 16.75 12.56 16.75 13.25V18.75H18.75V8.03L15.97 5.25H15.75V8.75C15.75 9.44 15.19 10 14.5 10H7.5C6.81 10 6.25 9.44 6.25 8.75V5.25Z M8 5.25V8.25H14V5.25Z M9 13.75V18.75H15V13.75Z', '3.5 3.5 17 17'],
  restore: ['M3 7V2L0 5 3 8V5C9 1 15 5 13 11 12 14 8 16 4 13L3 15C9 19 16 15 16 9 16 2 8-1 3 3Z', '0 0 16 17'],
} as const

const stroked = {
  back: 'M10 5.5 3.5 12 10 18.5M4 12H20.5',
  down: 'M6.5 9.25 12 14.75 17.5 9.25',
  selection: 'M5.5 12.5 10 17 18.5 7.5',
  plus: 'M12 3V21M3 12H21',
  trash: 'M4.5 6.5H19.5M9 6.5V4.5A1 1 0 0 1 10 3.5H14A1 1 0 0 1 15 4.5V6.5M6.5 6.5 7.25 19A1.5 1.5 0 0 0 8.75 20.5H15.25A1.5 1.5 0 0 0 16.75 19L17.5 6.5M12 10V14M12 17h.01',
  link: 'M10 13A5 5 0 0 0 17 13.1L20 10A5 5 0 0 0 13 3L11 5M14 11A5 5 0 0 0 7 10.9L4 14A5 5 0 0 0 11 21L13 19',
} as const

export type NativeIconName = keyof typeof filled | keyof typeof stroked

export function NativeIcon({ name, size = 16 }: { name: NativeIconName; size?: number }) {
  if (name in filled) {
    const [path, viewBox] = filled[name as keyof typeof filled]
    return <svg width={size} height={size} viewBox={viewBox} fill="currentColor" aria-hidden="true"><path d={path} fillRule={name === 'table' ? 'evenodd' : 'nonzero'} /></svg>
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={stroked[name as keyof typeof stroked]} /></svg>
}

const circle = 'M20.25 12A8.25 8.25 0 1 1 3.75 12A8.25 8.25 0 1 1 20.25 12Z'
const taskMarks: Record<TaskStatus, string> = {
  todo: '',
  doing: 'M10 8.5 15.25 12 10 15.5Z',
  paused: 'M9.5 8.75V15.25M14.5 8.75V15.25',
  done: 'M8 12 10.75 14.75 16 9.5',
  cancelled: 'M9.25 9.25 14.75 14.75M14.75 9.25 9.25 14.75',
}

export function TaskIcon({ status, size = 17 }: { status: TaskStatus; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={circle + taskMarks[status]} /></svg>
}
