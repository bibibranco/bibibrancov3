// Geral do Grêmio songs, shown base64-encoded as the decorative "random characters" in the
// interface (PORT-205, after typesafe.ai's base64 strings). Titles only, one per line; edit freely.

export const geralNotes = ['Geral do Grêmio', 'Até a pé nós iremos'] as const

/** UTF-8 safe base64, the same on the server (prerender) and in the browser. */
export function toBase64(text: string): string {
  let binary = ''
  for (const byte of new TextEncoder().encode(text)) binary += String.fromCharCode(byte)
  return btoa(binary)
}
