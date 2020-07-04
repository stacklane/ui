# Shared UI Components

## Guidelines

- Not intended for complex theming customization.
  Instead, targets small variations nearing "flat" Google/Apple flavored themes.
- Hiding important functionality or information behind ":hover" effects is not mobile friendly.
- Reuse/restyle existing HTML elements where they make semantic sense, e.g. `h1`-`h6`, `section`, forms, etc.
- A component should only be responsible for its own internal spacing -- never its external spacing.
  This way components may be used in a variety of cases without needing to override margins.
- Consider server-side rendering, and use `connectedCallback()` to ensure declarative setup is possible.
- Don't use the hand cursor for general UI actions. Reserve it for actual HTTP links.
  - Apple’s Human Interface Guidelines: the hand cursor should be used when “the content is a URL link”.
  - W3C User Interface guidelines: "The cursor is a pointer that indicates a link”.
  - Microsoft: Displaying the hand pointer on hover is the definitive indication of a link.
    To avoid confusion, it is imperative not to use the hand pointer for other purposes.

## `h1`-`h6`

Defines `font-size` and `line-height` only.

## `ui-appbar`

Fixed height bar. Primarily a case-specific container for one or more `<ui-bar>`'s.

Unlike `<ui-bar>` it is not concerned with the spacing *between* items.

Supports [spacing](#spacing).

Variations:
  - `.is-stretch` (typically any nested `ui-bar` would also use `.is-stretch`)

## `ui-bar`

Horizontal layout for related buttons/controls

Only responsible for spacing between items, and has no spacing for the bar itself.

See `<ui-appbar>` instead for outer spacing / padding / fixed height.

May be nested.

Variations:
  - `.is-path`
  - `.is-even`
  - `.is-end`
  - `.is-grow`
  - `.is-stretch`

## `ui-button` / `ui-icon-button`

- `ui-button`: Textual button, with optional `<ui-icon>`.
- `ui-icon-button`: Button with a single `<ui-icon>`. Recommend using `aria-label`.

### Actions

Implementations should use `#addAction` to define button behavior.
Alternatively actions may be declared as children via subclasses of `UIButtonAction`.

### Appearance

`.is-outlined`, `.is-contained`, `.is-round`

### Color

`.is-primary`, `.is-positive`, `.is-negative`

### Menu

`ui-button-menu` (`UIButtonMenu`) as child.

## `ui-spinner`

`.is-init` / `ui-is-init`

## `ui-tab`

### `ui-tab-closer`

Nested within a `ui-button` to declarative create an action to close the current `ui-tab`.

## `ui-drawer-layout`

An app layout with sidebar `<ui-drawer>` and main content area `<ui-drawer-main>`.

- For mobile friendly UX, drawer/sidebar content should be nice-to-have additive parts of the UI, not essential.
- By default drawers are implicitly opened / closed based on screen width.
- Drawers may be explicitly opened/closed via classes,
  or declarative actions `UIDrawerOpener` / `ui-drawer-opener` / `UIDrawerCloser` / `ui-drawer-closer`.
  When explicitly opened/closed the preferred state is maintained in `localStorage` for consistency,
  and server-side rendering cases.

## Spacing

Case specific spacing, used for e.g.: padding, margin, gap, row-gap, column-gap.

### Variables

- `var(--ui-2xs-spacing)`
- `var(--ui-xs-spacing)`
- `var(--ui-s-spacing)`
- `var(--ui-spacing)`
- `var(--ui-l-spacing)`
- `var(--ui-xl-spacing)`
- `var(--ui-2xl-spacing)`

### Case Specific Modifiers

- `.has-2xs-spacing`
- `.has-xs-spacing`
- `.has-s-spacing`
- `.has-spacing`
- `.has-l-spacing`
- `.has-xl-spacing`
- `.has-2xl-spacing`
