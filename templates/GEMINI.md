# GEMINI.md - Blue Team Configuration

> **Purpose:** This file guides the Gemini CLI (Blue Team) on project-specific context, conventions, and memory.
> **Location:** Place this in your project root or `~/.gemini/GEMINI.md` for global use.

## 🧠 Memory & Context
<!-- Facts Gemini should "always remember" for this project -->
- **Project Type:** (e.g., React Frontend, Python Backend, Data Pipeline)
- **Key Conventions:**
  - Indentation: 4 spaces
  - Testing Framework: Pytest / Jest
  - Style Guide: PEP8 / Airbnb
- **Do Not Touch:** (List files that are fragile or off-limits)

## 🤖 Sub-Agent Instructions

### `codebase_investigator`
- **Focus Areas:**
  - `src/core/` contains the business logic.
  - `tests/` must mirror the structure of `src/`.
- **Ignore:** `legacy/`, `dist/`, `node_modules/`.

### `write_todos`
- **Granularity:** Break tasks down into steps that take < 2 minutes to execute.
- **Format:** Start every task with a verb (Create, Update, Delete, Verify).

## 🛠️ Common Commands (Blue Team Playbook)

### Deep Search
```bash
# Find all usages of the old API
gemini search_file_content pattern="LegacyAPI" --include="src/**/*.py"
```

### Batch Refactor
```bash
# Rename variables across 50 files
gemini replace old_string="userId" new_string="user_id" --include="src/**/*.ts"
```

### Documentation Generation
```bash
# Read all files and generate a README
gemini read_file --include="src/**/*" | gemini "Generate a README.md based on this code"
```
