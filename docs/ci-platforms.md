# CI/CD mapping and how-to

This document explains how the GitHub Actions pipeline in `.github/workflows/action.yaml` was translated to GitLab CI (`.gitlab-ci.yml`) and gives short notes on reproducing the same pipeline on CircleCI, Azure DevOps, and Jenkins.

## What the pipeline does

- Install dependencies (npm ci)
- Run Prettier
- Run ESLint
- Run tests (npm test)
- Build (npm run build) — only on `main`/`master` or Contentful webhook
- Deploy to Netlify (using Netlify CLI) — only on `main`/`master`

## GitLab CI notes

- File: `.gitlab-ci.yml`
- Uses official `node:18` image.
- Caches `node_modules/` between jobs and stores artifacts for the build (`.next/`).
- Secrets: set `CONTENTFUL_*` and `NETLIFY_*` variables in GitLab CI/CD settings (Project > Settings > CI / CD > Variables).
- Contentful webhook: set `CONTENTFUL_EVENT` variable (optional) when triggering pipeline via API/webhook.

### Triggering from Contentful

Create a webhook in Contentful pointing to GitLab pipeline trigger URL (Settings > CI/CD > Pipeline triggers). Add a secret or header to identify the event, then in GitLab create a trigger or set up a custom webhook endpoint that calls the GitLab API to create a pipeline with `CONTENTFUL_EVENT=contentful-update`.

## Quick mapping to other CI platforms

- CircleCI:
  - Use `config.yml` with jobs and workflows. Use `node:18` docker image, cache `~/.npm` or `node_modules` with keys, and use `persist_to_workspace`/`attach_workspace` to share `node_modules` between jobs.
  - Use `filters` in workflows to run build/deploy only on `main`/`master`.
  - For Contentful webhook, create an API endpoint or use CircleCI API to trigger pipeline with an env var.

- Azure DevOps (YAML pipelines):
  - Translate jobs to stages. Use `pool: vmImage: 'ubuntu-latest'` and `task: NodeTool@0` to choose Node.js.
  - Use `cache` task for `npm`/`node_modules` and publish `pipeline.artifacts` for build outputs.
  - Use branch conditions to limit build/deploy stages.

- Jenkins (Declarative Pipeline):
  - Use `agent { docker 'node:18' }` or install Node on agents.
  - Use `stash/unstash` to pass dependencies between stages or use persistent workspace.
  - For Contentful webhook, add a webhook endpoint that triggers a Jenkins job (or use Generic Webhook Trigger plugin) and set a parameter `CONTENTFUL_EVENT`.

## Notes and assumptions

- The GitHub Actions `repository_dispatch` event was mapped to a generic `CONTENTFUL_EVENT` pipeline variable in GitLab. Configure your CMS webhook to call the CI/CD platform's trigger endpoint and pass this variable.
- Replace `https://your-site.netlify.app` in `.gitlab-ci.yml` with your actual Netlify site URL.
- If you rely on `next` build artifacts, ensure the `.next` folder is the correct build output and is preserved between build and deploy jobs.

## Next steps (optional)

- Add a pipeline trigger documentation specific to Contentful UI steps.
- Add CI job for preview deploys on merge requests.
- Harden artifact caching and parallelization for speed.
