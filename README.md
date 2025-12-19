# 📝 Git Commit Convention

Este proyecto sigue la convención de **Conventional Commits** para mantener un historial de cambios claro y consistente.

## 🎯 Formato
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

## 📌 Tipos de Commit

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `feat` | Nueva funcionalidad | `feat(auth): add Google OAuth login` |
| `fix` | Corrección de bugs | `fix(navbar): prevent mobile menu from staying open` |
| `docs` | Cambios en documentación | `docs(readme): update installation instructions` |
| `style` | Formato, espacios, punto y coma (no afecta lógica) | `style(button): fix indentation` |
| `refactor` | Refactorización de código | `refactor(api): simplify error handling` |
| `perf` | Mejoras de rendimiento | `perf(images): implement lazy loading` |
| `test` | Agregar o corregir tests | `test(auth): add unit tests for login` |
| `chore` | Tareas de mantenimiento, configs | `chore(deps): upgrade react to v18.3` |
| `ci` | Cambios en CI/CD | `ci(github): add deploy workflow` |
| `build` | Cambios en el sistema de build | `build(webpack): optimize bundle size` |

## ✍️ Reglas

1. ✅ **Siempre en inglés**
2. ✅ **Usar imperativo**: "add" no "added" o "adding"
3. ✅ **Primera línea máximo 72 caracteres**
4. ✅ **Minúsculas** en la descripción
5. ✅ **Sin punto final** en la primera línea
6. ✅ **Scope (ámbito)** es opcional pero recomendado

## 📋 Ejemplos

### Commit simple
```bash
git commit -m "feat(auth): add password reset functionality"
```

### Commit con cuerpo explicativo
```bash
git commit -m "feat(auth): add password reset functionality" -m "Users can now request a password reset link via email. The link expires after 1 hour for security reasons."
```

### Fix de bug
```bash
git commit -m "fix(cart): resolve items duplicating on refresh"
```

### Breaking change
```bash
git commit -m "feat(api): change user endpoint response format" -m "BREAKING CHANGE: user endpoint now returns camelCase instead of snake_case"
```

## 🔍 Scopes Comunes

Ajusta según tu proyecto:

- `auth` - Autenticación y autorización
- `api` - Endpoints y servicios API
- `ui` - Componentes de interfaz
- `db` - Base de datos
- `config` - Configuraciones
- `deps` - Dependencias
- `i18n` - Internacionalización

## 🚫 Qué NO hacer

❌ `git commit -m "fixed stuff"`  
❌ `git commit -m "updates"`  
❌ `git commit -m "changes to login"`  
❌ `git commit -m "WIP"`  

## ✅ Buenas prácticas adicionales

- Hacer commits **atómicos** (un cambio lógico por commit)
- Escribir descripciones **claras y específicas**
- Referenciar issues cuando sea relevante: `fix(auth): resolve login timeout (#123)`
- Usar el cuerpo del commit para explicar el "por qué", no el "qué"

## 🔗 Referencias

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

---

**Recuerda**: Un buen historial de commits es documentación viviente del proyecto. ¡Tómate el tiempo de escribirlos bien! 🎯