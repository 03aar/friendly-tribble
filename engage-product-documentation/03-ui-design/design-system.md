# Design System

## Overview

The Engage design system is built on principles of **calm**, **clarity**, and **care**. Every visual element serves the goal of making work feel more human.

---

## Color Palette

### Primary Colors

#### Engage Blue (Trust, Focus)
```css
Primary: #4A90E2
Light: #7FB3E8
Dark: #2E5A8E
Usage: Headers, primary buttons, links, active states
```

#### Engage Green (Growth, Success)
```css
Primary: #7ED321
Light: #A8E063
Dark: #5FA315
Usage: Completed states, positive feedback, progress indicators
```

#### Engage Amber (Attention, Energy)
```css
Primary: #F5A623
Light: #FFD460
Dark: #D68910
Usage: Notifications, coaching prompts, important actions
```

### Neutral Colors

#### Grayscale
```css
Background: #F8F9FA (Off-white, warm)
Surface: #FFFFFF (Pure white for cards)
Border: #E1E4E8 (Subtle lines)
Text Primary: #24292E (Near black)
Text Secondary: #586069 (Gray)
Text Tertiary: #959DA5 (Light gray)
```

### Emotional Colors (PulseCheck)

#### Mood Colors
```css
Energized/Ready: #FF6B6B (Bright coral)
Content/Good: #4ECDC4 (Calm teal)
Neutral/Okay: #95A99C (Balanced gray-green)
Tired: #FFD93D (Soft yellow)
Stressed: #A8DADC (Cool blue-gray)
```

**Design Note:** These are NOT red/yellow/green traffic lights. They're warm, empathetic, human colors that avoid judgment.

### Background Gradients

#### Default Gradient (App Background)
```css
background: linear-gradient(135deg,
  #D8F1E9 0%,   /* soft mint */
  #EFF6EE 48%,  /* pale ivory */
  #FFFFFF 100%  /* white */
);
```

#### Wake-Up Screen
```css
background: linear-gradient(180deg,
  #FFE5D9 0%,   /* pale peach */
  #D8F1E9 50%,  /* soft mint */
  #FFFFFF 100%  /* white */
);
```

#### Evening/Closure Screen
```css
background: linear-gradient(180deg,
  #D8F1E9 0%,   /* soft mint */
  #B8C5D6 50%,  /* soft blue-gray */
  #A8B5C7 100%  /* deeper blue-gray */
);
```

---

## Typography

### Font Family

**iOS:** SF Pro Display / SF Pro Text
**Android:** Roboto / Roboto Condensed
**Web:** Inter (fallback: System UI fonts)

### Font Scale

```css
H1 (Page Titles)
Size: 28pt / 1.75rem
Weight: 700 (Bold)
Line Height: 32pt / 2rem
Usage: Screen titles, major sections

H2 (Section Headers)
Size: 22pt / 1.375rem
Weight: 600 (Semibold)
Line Height: 28pt / 1.75rem
Usage: Card titles, section dividers

H3 (Card Titles)
Size: 18pt / 1.125rem
Weight: 600 (Semibold)
Line Height: 24pt / 1.5rem
Usage: Individual items, task titles

Body (Regular Text)
Size: 16pt / 1rem
Weight: 400 (Regular)
Line Height: 24pt / 1.5rem
Usage: All body text, descriptions

Caption (Helper Text)
Size: 14pt / 0.875rem
Weight: 400 (Regular)
Line Height: 20pt / 1.25rem
Usage: Labels, metadata, timestamps

Small (Timestamps, Footnotes)
Size: 12pt / 0.75rem
Weight: 400 (Regular)
Line Height: 16pt / 1rem
Usage: Timestamps, fine print
```

### Typography Rules

1. **Use sentence case everywhere** (not Title Case)
   - ✅ "Complete your profile"
   - ❌ "Complete Your Profile"

2. **No all-caps** (harder to read, feels aggressive)
   - ✅ "Priority #1"
   - ❌ "PRIORITY #1"

3. **Weight for hierarchy** (not just size)
   - Use 700 for titles
   - Use 600 for emphasis
   - Use 400 for body

4. **Line height 1.5x** for readability
   - 16pt text = 24pt line height
   - Creates breathing room

5. **Max line length: 65 characters**
   - Optimal reading comfort
   - Wrap long text

---

## Spacing System

### Based on 8pt Grid

```css
4pt (0.25rem): Tiny gaps (icon to text)
8pt (0.5rem): Small spacing (elements in a group)
16pt (1rem): Default spacing (between cards)
24pt (1.5rem): Section spacing (between major groups)
32pt (2rem): Large spacing (top margin)
48pt (3rem): Extra large (between major sections)
64pt (4rem): Screen padding (top/bottom of screens)
```

### Spacing Rules

1. **Use consistent multiples** of 8pt
2. **More space between groups** than within
3. **Vertical rhythm** maintained throughout
4. **Screen padding**: 16pt left/right on mobile

---

## Layout Grid

### Mobile (320px - 767px)
- **Columns:** Single column
- **Padding:** 16pt left/right
- **Gutters:** 16pt between cards
- **Max width:** 100% of screen

### Tablet (768px - 1023px)
- **Columns:** 2 columns (optional)
- **Padding:** 24pt left/right
- **Gutters:** 24pt between cards
- **Max width:** 100% of screen

### Desktop (1024px+)
- **Columns:** Single centered column
- **Padding:** Auto (centered)
- **Max width:** 680pt
- **Reason:** Optimized for reading and focus

**Design Philosophy:** Engage is optimized for mobile-first, single-column focus. Desktop mirrors mobile experience in a centered column. No complex multi-column layouts.

---

## Components

### Buttons

#### Primary Button
```css
Width: Auto (min 120pt)
Height: 52pt
Padding: 12pt vertical, 24pt horizontal
Border Radius: 12pt
Background: linear-gradient(135deg, #4A90E2, #5BA3F5)
Text: 16pt, 600 weight, White
Shadow: 0 4px 12px rgba(74, 144, 226, 0.2)
Hover: Scale 0.98, Shadow increase
Active: Scale 0.96
```

Example: `[Start This]`, `[Continue]`, `[Send Recognition]`

#### Secondary Button
```css
Width: Auto (min 120pt)
Height: 52pt
Padding: 12pt vertical, 24pt horizontal
Border Radius: 12pt
Background: White
Border: 1pt solid #4A90E2
Text: 16pt, 600 weight, #4A90E2
Shadow: 0 2px 8px rgba(0, 0, 0, 0.08)
Hover: Background #F8FBFF, Scale 0.98
```

Example: `[View Goal]`, `[Edit]`, `[Cancel]`

#### Text Button
```css
Width: Auto
Height: Auto
Padding: 8pt vertical, 12pt horizontal
Background: Transparent
Text: 16pt, 500 weight, #4A90E2
Underline: None (underline on hover)
Hover: Opacity 0.8
```

Example: `[Skip]`, `[Learn more]`, `[Dismiss]`

### Cards

#### Standard Card
```css
Width: 100% (minus padding)
Padding: 16pt all sides
Background: White
Border Radius: 12pt
Shadow: 0 2px 8px rgba(0, 0, 0, 0.06)
Border: None
```

#### Elevated Card (Priority)
```css
Width: 100%
Padding: 20pt all sides
Background: White
Border Radius: 16pt
Border Left: 4pt solid #4A90E2
Shadow: 0 4px 16px rgba(0, 0, 0, 0.1)
```

#### Empty State Card
```css
Width: 100%
Padding: 48pt vertical, 24pt horizontal
Background: #F8F9FA
Border Radius: 12pt
Border: 2pt dashed #E1E4E8
Text Align: Center
```

### Form Inputs

#### Text Field
```css
Width: 100%
Height: 52pt
Padding: 16pt horizontal
Border Radius: 12pt
Border: 1pt solid #E1E4E8
Background: White
Font: 16pt, 400 weight
Placeholder: #959DA5

Focus State:
Border: 2pt solid #4A90E2
Shadow: 0 0 0 4pt rgba(74, 144, 226, 0.1)
```

#### Text Area (Multi-line)
```css
Width: 100%
Min Height: 120pt
Padding: 16pt
Border Radius: 12pt
Border: 1pt solid #E1E4E8
Background: White
Font: 16pt, 400 weight
Line Height: 24pt
Resize: Vertical

Focus State:
Border: 2pt solid #4A90E2
Shadow: 0 0 0 4pt rgba(74, 144, 226, 0.1)
```

#### Dropdown/Select
```css
Width: 100%
Height: 52pt
Padding: 16pt horizontal
Border Radius: 12pt
Border: 1pt solid #E1E4E8
Background: White
Font: 16pt, 400 weight
Icon: Chevron down, 20pt, right-aligned

Focus State:
Border: 2pt solid #4A90E2
```

### Progress Indicators

#### Linear Progress Bar
```css
Width: 100%
Height: 8pt
Border Radius: 4pt
Background: #E1E4E8

Filled Portion:
Background: linear-gradient(90deg, #7ED321, #A8E063)
Border Radius: 4pt
Transition: Width 0.3s ease-out
```

#### Milestone Dots (Journey Map)
```css
Dot Size: 16pt diameter
Spacing: 40pt between dots

States:
○ Not Started: Border 2pt #E1E4E8, Background White
● Completed: Background #7ED321, No border
◉ Current: Background #4A90E2, Pulsing animation

Connecting Line:
Height: 2pt
Background: #E1E4E8 (default), #7ED321 (completed sections)
```

#### Skill Progress Dots
```css
Dot Size: 12pt diameter
Spacing: 8pt between dots
Total Dots: 10 (representing levels 1-10)

States:
● Filled: Background #4A90E2
○ Empty: Border 2pt #E1E4E8, Background White
```

### Avatars

#### Small (20pt)
Usage: Inline mentions, small lists

#### Medium (40pt)
Usage: Default avatar size in lists, cards

#### Large (80pt)
Usage: Profile screens, onboarding

```css
All Avatars:
Border Radius: 50% (perfect circle)
Border: 2pt solid White (when overlapping)
Shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
```

---

## Iconography

### Style
- **Line icons** (not filled, except for active states)
- **Stroke weight:** 2pt
- **Corners:** Rounded
- **Size:** 24pt × 24pt (default)
- **Color:** Matches text color (#24292E or #586069)

### Icon Set

**Navigation:**
```
🏠 Home (FlowBoard): House outline
🎯 Goals (GoalHub): Target with arrow
💬 Team (KudosStream): People group
🎓 Grow (GrowthHub): Graduation cap
👤 You (Profile): Person outline
```

**Actions:**
```
➕ Add/Create: Plus sign in circle
✓ Complete: Checkmark
✎ Edit: Pencil
🗑️ Delete: Trash bin
↻ Refresh: Circular arrow
🔍 Search: Magnifying glass
⚙️ Settings: Gear
🔔 Notifications: Bell
```

**Content:**
```
💡 Insight/Tip: Light bulb
📅 Calendar: Calendar page
📊 Analytics: Bar chart
⏱️ Time: Clock
🔥 Priority: Flame
❤️ Resonate: Heart (filled when active)
```

### Icon Usage Rules

1. **Consistent sizing:** 20pt (small), 24pt (default), 32pt (large)
2. **Color meaning:**
   - Gray (#586069): Inactive
   - Blue (#4A90E2): Active/Selected
   - Green (#7ED321): Success
   - Amber (#F5A623): Warning
3. **Spacing:** 8pt between icon and text
4. **Alignment:** Vertically center with text

---

## Animation Principles

### Timing

**Fast (200ms):**
- Tap feedback
- Hover states
- Color changes
- Icon changes

**Medium (300ms):**
- Screen transitions
- Modal appearances
- Card movements
- Dropdown opens

**Slow (500ms):**
- Major state changes
- Onboarding sequences
- Celebration moments

### Easing

**Ease-out (fast start, slow end):**
```css
cubic-bezier(0.2, 0.8, 0.2, 1)
Usage: UI entering screen, appearing elements
```

**Ease-in-out (slow start, slow end):**
```css
cubic-bezier(0.4, 0, 0.2, 1)
Usage: Screen transitions, smooth movements
```

**Spring (bounce effect):**
```css
cubic-bezier(0.68, -0.55, 0.265, 1.55)
Usage: Celebration moments, delightful interactions
Use sparingly!
```

### Animation Patterns

#### Tap Feedback
```css
Scale: 0.96
Duration: 200ms
Easing: ease-out
```

#### Screen Transition
```css
Slide from right: translateX(100%) → translateX(0)
Duration: 300ms
Easing: ease-in-out
```

#### Modal Appearance
```css
Scale: 0.8 → 1.0
Opacity: 0 → 1
Duration: 300ms
Easing: ease-out
```

#### Celebration (Confetti)
```css
Particles: 20-30 small shapes
Duration: 2000ms
Motion: Fall from top, spread outward
Easing: ease-in (gravity simulation)
```

#### Progress Bar Fill
```css
Width: 0% → X%
Duration: 500ms
Easing: ease-out
```

#### Checkbox Complete
```css
Checkmark draws in: SVG stroke animation
Duration: 300ms
Easing: ease-out
Haptic: Light tap at completion
```

### Performance Rules

1. **Use transform** (not left/top) for movement
2. **Use opacity** (not visibility) for fading
3. **Limit to 60fps** (16.67ms per frame)
4. **Reduce motion** respect system preferences
5. **Haptic feedback** for important interactions (iOS/Android)

---

## Haptic Feedback

### Types

**Light Tap:**
- Checkbox completion
- Button press
- Small wins

**Medium Tap:**
- Screen changes
- Modal opens
- Milestone completion

**Heavy Tap:**
- Goal completion
- Major celebration

**Success Notification:**
- Recognition sent
- Feedback submitted

### Usage Rules

1. **Pair with visual feedback** (never alone)
2. **Use sparingly** (only for important moments)
3. **Respect user settings** (can be disabled)
4. **Android & iOS differ** (adjust intensity appropriately)

---

## Accessibility

### Color Contrast

**WCAG AA Compliant (minimum 4.5:1):**
- Text Primary (#24292E) on White: 14.5:1 ✅
- Engage Blue (#4A90E2) on White: 4.6:1 ✅
- Text on Engage Blue: Use White (8.8:1) ✅

**Never use:**
- Light gray text on white background (fails contrast)
- Colored text without sufficient contrast

### Touch Targets

**Minimum size: 44pt × 44pt** (iOS standard, Android 48dp)
- All buttons, links, interactive elements
- Increase padding if visual size is smaller

### Screen Reader Support

**All interactive elements must have:**
- Accessible label
- Role definition
- State information (selected, checked, etc.)

**Example:**
```html
<button aria-label="Give recognition" role="button">
  [+ Give] 🎉
</button>
```

### Keyboard Navigation

**Support for:**
- Tab through interactive elements
- Enter/Space to activate
- Escape to dismiss modals
- Arrow keys for lists

---

## Dark Mode

**Future consideration:** Engage is currently light-mode only. Dark mode would require:
- Inverted color palette
- Reduced contrast (avoid pure black)
- Dimmed colors (less saturation)
- User toggle in settings

*Not included in V1 but planned for future.*

---

## Responsive Behavior

### Breakpoints

```css
Mobile: 320px - 767px (single column)
Tablet: 768px - 1023px (optional 2 columns)
Desktop: 1024px+ (centered single column, max 680pt)
```

### Scaling Rules

1. **Font sizes:** Fixed (don't scale with screen)
2. **Spacing:** Proportional (scales slightly)
3. **Images:** Responsive (scale to container)
4. **Touch targets:** Always 44pt+ regardless of screen

---

## Component States

### Button States

**Default:** As specified above
**Hover:** Scale 0.98, Shadow increase
**Active:** Scale 0.96
**Disabled:** Opacity 0.5, Cursor not-allowed
**Loading:** Show spinner, disable interaction

### Input States

**Default:** Border gray
**Focus:** Border blue, shadow
**Error:** Border red, helper text
**Disabled:** Background light gray, text gray
**Success:** Border green, checkmark icon

### Card States

**Default:** Standard shadow
**Hover:** Increase shadow slightly
**Active/Selected:** Blue left border
**Disabled:** Opacity 0.6

---

## Design Tokens

For implementation, use design tokens (variables) for all values:

```css
/* Colors */
--color-primary: #4A90E2;
--color-success: #7ED321;
--color-warning: #F5A623;
--color-text-primary: #24292E;
--color-background: #F8F9FA;

/* Spacing */
--space-xs: 4pt;
--space-sm: 8pt;
--space-md: 16pt;
--space-lg: 24pt;
--space-xl: 32pt;

/* Typography */
--font-size-body: 16pt;
--font-size-h1: 28pt;
--line-height-body: 1.5;

/* Border Radius */
--radius-sm: 8pt;
--radius-md: 12pt;
--radius-lg: 16pt;

/* Shadows */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);

/* Animation */
--duration-fast: 200ms;
--duration-medium: 300ms;
--duration-slow: 500ms;
--easing-out: cubic-bezier(0.2, 0.8, 0.2, 1);
```

---

## Design System Governance

### Updates
- Design system evolves based on user feedback
- Major changes require team review
- All changes documented here

### Usage
- All screens must use components from this system
- No one-off designs without justification
- Consistency is non-negotiable

### Tools
- Figma: Design files and prototypes
- Storybook: Component library (development)
- This doc: Single source of truth

---

*This design system is the visual language of Engage. Use it consistently, and the product will feel coherent, calm, and human.*
