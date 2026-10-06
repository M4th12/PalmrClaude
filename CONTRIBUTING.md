# Contributing to Palmr

Issues and pull requests are welcome. Palmr is small and actively maintained, with no formal contribution gauntlet.

## Quick start

1. Fork [M4th12/Palmr](https://github.com/M4th12/PalmrClaude) and clone your fork.
2. Branch off `main`. There's no `next` or other long-running branch.
3. Make your changes. The repo is a multi-app monorepo (`apps/server`, `apps/web`, `apps/docs`); each is independently installed and built. See [`CLAUDE.md`](CLAUDE.md) for the architecture overview.
4. Run `pnpm validate` (lint + type-check) inside whichever app(s) you touched. For server changes, also run `pnpm test` — the suite uses vitest with an isolated SQLite DB and exercises share access control, reverse-share multipart, audio MIME, and bulk-download.
5. Open a pull request against `main`.

## Commit messages

Conventional Commits format. Examples:

- `feat(server): add S3 lifecycle config support`
- `fix(web): correct content-type forwarding in proxy routes`
- `test(server): cover folder hierarchy access control`
- `refactor: centralise download URL generation`
- `docs: explain reverse-share alias resolution`
- `chore: bump prisma to 6.12`

The scope (`server`, `web`, `docs`, etc.) corresponds to the `apps/` directory you're touching, or omit for cross-cutting changes.

## What I look for in PRs

- A focused change. One bug fix or one feature per PR.
- The work should pass `pnpm validate` and any relevant tests.
- A short PR description that explains the *why*, not the what — the diff already shows the what.
- For server changes, prefer extending the test suite over describing manual smoke steps.
- For web changes, the project has no automated UI tests yet ([#20](https://github.com/stlalpha/Palmr/issues/20)). A manual smoke summary in the PR is appreciated.

## What I'd rather you didn't do

- Don't sneak unrelated cleanups into a feature PR. File a separate one.
- Don't reformat large swaths of code unless that's the PR's stated purpose.
- Don't add dependencies without a reason in the PR description. The dependency tree is already large enough.

## License

Apache-2.0. By contributing you agree your changes are licensed under it.
