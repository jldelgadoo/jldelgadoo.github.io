---
inclusion: auto
---

# Web Design Quality — Professional Frontend Standards

> Basado en Emil Kowalski (emilkowalski/skills) e Impeccable (pbakaus/impeccable).
> Aplica cuando se genera o modifica HTML, CSS o JS de interfaces web.

## Filosofía Core

1. **Taste is trained, not innate.** No hagas que "funcione" — haz que se *sienta* bien.
2. **Unseen details compound.** Cada detalle invisible suma. En el agregado, crean interfaces que la gente ama sin saber por qué.
3. **Beauty is leverage.** En un mundo donde todo es "good enough", el diseño es diferenciador real.

---

## Animaciones — Framework de Decisión

### 1. ¿Debería animar esto?

| Frecuencia | Decisión |
|-----------|---------|
| 100+ veces/día (shortcuts, toggles) | **NO animar. Nunca.** |
| Decenas de veces/día (hover, navegación) | Reducir drásticamente |
| Ocasional (modals, drawers, toasts) | Animación estándar |
| Raro/primera vez (onboarding, celebraciones) | Puede tener delight |

### 2. ¿Qué easing usar?

- **Elemento entrando o saliendo** → `ease-out` (respuesta inmediata)
- **Moviéndose en pantalla** → `ease-in-out` (natural)
- **Hover/color change** → `ease`
- **Movimiento constante (marquee, progress)** → `linear`

**SIEMPRE usar curvas custom. Las built-in de CSS son débiles:**
```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
```

**NUNCA usar `ease-in` para UI.** Se siente sluggish.

### 3. ¿Qué duración?

| Elemento | Duración |
|---------|---------|
| Button press feedback | 100-160ms |
| Tooltips, popovers | 125-200ms |
| Dropdowns, selects | 150-250ms |
| Modals, drawers | 200-500ms |

**Regla: UI animations BAJO 300ms.**

### 4. Stagger para grupos

- Delay entre items: 30-80ms (nunca más)
- No bloquear interacción durante el stagger

---

## Tipografía — Reglas

1. **NO usar Inter como default genérico.** Si se usa, que sea decisión consciente con justificación.
2. **NO usar gris puro** — siempre tintear (hacia azul, warm, etc.)
3. **Type scale con ratios propios** — no sizing arbitrario.
4. **Line-height:** headings 1.1-1.3, body 1.5-1.7.
5. **Letter-spacing:** headings negative (-.02em a -.03em), body 0 o .01em.
6. **Max line-length:** 60-75 caracteres para body text.

---

## Layout y Spacing — Reglas

1. **NO nestear cards dentro de cards.** Flat hierarchy.
2. **NO padding cramped** — mínimo 16px en mobile, 24px+ en desktop.
3. **Spacing scale consistente** — usar múltiplos (4, 8, 12, 16, 24, 32, 48, 64).
4. **Touch targets** — mínimo 44x44px.
5. **Visual rhythm** — secciones con espaciado predecible.

---

## Color — Reglas

1. **NO gradientes purple-to-blue genéricos** (grita "AI-generated").
2. **NO usar pure black (#000)** — usar near-blacks tintados (e.g., #0a0a0f, #080a0f).
3. **Contraste WCAG AA mínimo** — 4.5:1 para body text, 3:1 para large text.
4. **Accent color:** uno solo, usado con intención. No rainbow.
5. **Borders:** semi-transparent (rgba) en lugar de solid grays.

---

## Componentes — Principios

### Buttons
```css
.button:active { transform: scale(0.97); }  /* SIEMPRE feedback de press */
```

### Popovers
- `transform-origin` desde el trigger, NO desde center.
- Excepción: modals (sí desde center).

### Animaciones de entrada
- **NUNCA `scale(0)`** — empezar desde `scale(0.95)` + `opacity: 0`.
- Nada en el mundo real aparece de la nada.

### Tooltips
- Delay inicial para evitar activación accidental.
- Una vez uno abierto, los siguientes se abren **instant** (skip delay + skip animation).

---

## Performance — Obligatorio

1. **SOLO animar `transform` y `opacity`** — skip layout y paint.
2. **CSS transitions > keyframes** para UI interruptible.
3. **Especificar propiedades exactas:** `transition: transform 200ms ease-out` (NUNCA `transition: all`).
4. **`prefers-reduced-motion`:** reducir motion, no eliminar todo. Mantener opacity/color.

---

## Anti-Patterns (EVITAR)

- ❌ `transition: all`
- ❌ `scale(0)` como estado inicial
- ❌ `ease-in` en elementos UI
- ❌ `transform-origin: center` en popovers
- ❌ Duración > 300ms en UI
- ❌ Hover sin `@media (hover: hover) and (pointer: fine)`
- ❌ Bounce/elastic easing (feels dated)
- ❌ Inter + purple gradient + nested cards (AI slop signature)
- ❌ Pure black/gray sin tint
- ❌ Side-tab borders (otro tell de AI)

---

## Review Checklist

Antes de entregar cualquier cambio de frontend, verificar:

| Issue | Fix |
|-------|-----|
| `transition: all` | Especificar propiedades exactas |
| `scale(0)` entry | Usar `scale(0.95)` + `opacity: 0` |
| `ease-in` en UI | Cambiar a `ease-out` o curva custom |
| Duration > 300ms | Reducir a 150-250ms |
| Hover sin media query | Agregar `@media (hover: hover)` |
| Items aparecen todos juntos | Agregar stagger (30-80ms) |
| Gray text sin tint | Tintear (azul, warm, etc.) |
| Padding < 16px | Incrementar a mínimo 16px |

---

## Fuentes

- Emil Kowalski: [github.com/emilkowalski/skills](https://github.com/emilkowalski/skills)
- Impeccable by Paul Bakaus: [github.com/pbakaus/impeccable](https://github.com/pbakaus/impeccable)
- LottieFiles Motion Design Skill: [github.com/LottieFiles/motion-design-skill](https://github.com/LottieFiles/motion-design-skill)
