import { createCn } from 'cn/engine'

import tables from './cn-tables'

// `cn` on tables compiled for this project by the cn Vite plugin (vite.config.ts). They read the
// @theme scales in src/styles.css, so cn('text-small', 'text-muted-foreground') keeps both: a
// custom size isn't mistaken for a colour.
export const cn = createCn(tables)
