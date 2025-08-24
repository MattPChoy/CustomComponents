# Matt Components

A set of common components for stuff I'm building.

## Usage
- To make use of this package, you should configure theming for your application.
  - The simplest way to make this work is to add the `light` (or dark) class onto to the `html` element of your application.
  - I would recommend using `@vueuse/core`'s `useDark` to get this to work. A minimal example is below:

```ts
import { useDark, useToggle } from '@vueuse/core'
export const isDark = useDark({
    attribute: 'class',
    valueDark: 'dark',
    valueLight: 'light',
})
// You can use toggleTheme() in your user interface to allow users to switch the theme of the UI.
export const toggleTheme = useToggle(isDark)
```