---
name: pre-commit
description: Pre-commit validation that updates docs (README, CONTRIBUTING, docs/, tasks/) to reflect working tree changes and runs repo checks before committing. Use when user says "ready to commit", "let's commit", asks Claude to commit, or wants to finalize changes.
---

# Pre-Commit

Ensure documentation stays in sync with code and all repo checks pass before committing.

## Two Modes

1. **"Ready to commit"** — user will commit themselves. Update docs only.
2. **"Commit this"** — Claude commits. Update docs, then run all checks, then commit.

## Workflow

### 1. Assess the working tree

```bash
git status
git diff --stat
git diff          # staged + unstaged
```

Identify what changed: new files, renamed files, deleted files, modified modules, changed APIs, new dependencies, config changes.

### 2. Update documentation

For each doc target, compare the current doc content against the working tree changes. Only touch sections that are actually stale or missing — do not rewrite docs that are already accurate.

#### README.md
- [ ] Project description still accurate?
- [ ] Setup / install instructions match current deps and scripts?
- [ ] Usage examples reflect current API / CLI?
- [ ] Feature list includes new capabilities, removes deleted ones?
- [ ] Any new env vars, config files, or prerequisites to document?

#### CONTRIBUTING.md (if exists)
- [ ] Dev setup steps still work?
- [ ] Testing instructions match current test runner / commands?
- [ ] Any new conventions introduced by these changes?

#### docs/ directory (if exists)
- [ ] Architecture docs reflect structural changes?
- [ ] API docs match changed interfaces?
- [ ] Any new docs needed for new modules or features?
- [ ] Remove docs for deleted features?

#### tasks/ directory (if exists)
- [ ] Mark completed tasks as done
- [ ] Update in-progress tasks with current state
- [ ] Note any new tasks discovered during this work

### 3. Run repo checks (commit mode only)

Detect and run the repo's pre-commit checks. See [REFERENCE.md](REFERENCE.md) for detection logic and execution details.

Sequence:
1. **Format** — auto-fix formatting (Prettier, Black, etc.)
2. **Lint** — run linters, fix auto-fixable issues
3. **Type check** — run type checker if configured
4. **Test** — run test suite
5. **Build** — verify build succeeds (if applicable)

If any check fails:
- Fix the issue
- Re-run the failing check
- Continue to the next check
- If a fix is non-trivial, stop and ask the user

### 4. Commit (commit mode only)

- Stage all relevant changes (including doc updates)
- Write a commit message that covers both code and doc changes
- Let the commit run through the repo's git hooks naturally

## Key Principles

- **Don't invent documentation** — only document what exists in the code
- **Don't rewrite clean docs** — if a section is already accurate, leave it alone
- **Fix, don't skip** — if a check fails, fix it before moving on
- **Ask when stuck** — if a check failure isn't straightforward, ask the user
