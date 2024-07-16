import { Carta } from 'carta-md';
import { emoji } from '@cartamd/plugin-emoji';
import { slash } from '@cartamd/plugin-slash';
import { code } from '@cartamd/plugin-code';

export const carta = new Carta({
  theme: 'catppuccin-mocha',
  sanitizer: false,
  extensions: [emoji(), slash(), code({ theme: 'catppuccin-mocha' })]
});
