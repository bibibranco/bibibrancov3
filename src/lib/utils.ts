import { createCn } from 'cn/config'

// `cn` that knows the PORT-006 theme. Without this, tailwind-merge reads custom sizes like
// `text-small` as colours, so cn('text-small', 'text-muted-foreground') dropped the font size.
// Keep these lists in step with the @theme tokens in src/styles.css.
export const cn = createCn({
  extend: {
    theme: {
      text: [
        'display',
        'h1',
        'h2',
        'h3',
        'lead',
        'body',
        'small',
        'caption',
        'meta',
        'label',
        'code',
        'note',
      ],
      spacing: ['gutter', 'section', 'tap', 'margin'],
      radius: ['pill', 'none'],
      container: ['content', 'measure'],
    },
  },
})
