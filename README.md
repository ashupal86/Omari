# Omari — One-click post-install app installer (MVP)

> **Omari** is an open-source, modular platform that helps users install and configure the apps they need after installing a fresh OS. It offers a web frontend (landing + selection UI), a scripts repository organized per distro and app, and a lightweight TUI client that downloads and runs installer scripts for the user's selected apps.

---

## Table of contents

1. Project overview
2. Goals & non-goals (MVP)
3. High-level architecture
4. Supported platforms & package managers
5. UX flows (web + TUI)
6. Repository layout
7. Example install script: `scripts/common/ide/vscode.sh`
8. How installers must be written (style guide)
9. CLI/TUI client spec
10. Web frontend & landing page (open-source design notes)
11. CI, testing, and verification
12. Security & sandboxing
13. Contribution guide
14. Roadmap
15. License
16. AI agent prompt (for automated development)

---

## 1 — Project overview

Omari makes fresh OS setups painless by letting users pick their OS/distro (including Windows) and selecting app categories (Browser, IDE, Dev Tools, TUI utilities, Games, Media, Fonts, Drivers, System Utilities, etc.). The web frontend is a friendly landing page that helps users create a curated selection manifest. The TUI client downloads the manifest and runs distro-compatible installation scripts located in the `scripts/` repo.

This repo contains the MVP: website (landing + selection UI), script organization layout, sample installer scripts, and a TUI client that performs installations using the host's package manager or the best available package manager (if configured).

## 2 — Goals & non-goals (MVP)

**Goals (MVP)**

* Provide a web landing page and selection UI where users can pick OS & packages.
* Maintain a curated `scripts/` directory with distro-specific compatible install scripts.
* Provide a small TUI client that fetches the manifest and runs installers in sequence.
* Ensure each installer uses official upstream installation instructions where possible.
* Keep everything open-source, modular, and auditable.

**Non-goals (for MVP)**

* Full GUI installer that runs privileged operations automatically without user's explicit consent.
* Building or packaging proprietary apps.
* Supporting every distro at launch—focus on major distros first.

## 3 — High-level architecture

* `website/` — React/Vite landing + selection frontend. Public, open-source, includes a deployable static site and a serverless endpoint for manifest creation.
* `scripts/` — Collection of install scripts. Organized by category -> distro -> app.
* `tui/` — Lightweight TUI client written in Python or Go that fetches a manifest and runs scripts in order.
* `ci/` — CI workflows for linting, script static checks, smoke tests in containers.
* `docs/` — Documentation and contribution guides.

Flow:

1. User opens the website and selects their OS/distro and desired apps.
2. Site generates a signed manifest (JSON) and allows download or QR code.
3. User runs TUI client (`omari-cli`) and points it to the manifest (or drags manifest into the app). The client validates manifest, resolves distro-specific scripts, shows a preview, then runs installers in a sandbox or with `sudo` (user chooses).

## 4 — Supported platforms & package managers (MVP)

Start with these platforms and managers; expand later.

**Linux**

* Debian/Ubuntu: `apt` / optional `apt-fast` or `nala` as alternative manager
* Fedora / RHEL / CentOS Stream: `dnf` (and `dnf-plugins-core` for copr repos)
* Arch Linux / Manjaro: `pacman` + `yay` or `paru` for AUR
* openSUSE: `zypper`
* Alpine: `apk`

**Windows**

* `winget` (preferred), fallback `choco` or `scoop` if configured.

**macOS** (optional later)

* `brew` (Homebrew)

**Principle:** Use official package managers where possible. When an app is only available via a 3rd-party manager (AUR, snap, flatpak), make that explicit in the script metadata.

## 5 — UX flows

### Web frontend (landing + selection)

* Landing page: short explanation, "Start" button.
* Step 1: Select OS/distro (list + autodetect option).
* Step 2: Choose categories (checkboxes): Browsers, IDEs, Dev Tools, Runtimes, Terminals, Fonts, Games, Multimedia, Productivity, Drivers, CLI Tools, Dotfiles etc.
* Step 3: Select individual apps (filtered by chosen distro). Each app card shows: name, short desc, install method (package manager, official repo, snap, flatpak, vendor script), and a trust score.
* Step 4: Preview manifest, choose options (run in dry-run mode, enable flatpak/snap, run with sudo, etc.), then download manifest or copy QR for mobile.

### TUI client

* Accepts a manifest path or URL.
* Validates manifest compatibility with current distro.
* Shows list of apps to install, grouped by install method.
* Provides options: `Install`, `Dry-run`, `Skip`, `Toggle sudo per app`.
* Logs progress and writes a post-install report with exit codes and URLs for manual follow-up.

## 6 — Repository layout (suggested)

```
omari/
├── website/                # React/Vite frontend (static site)
├── scripts/
│   ├── README.md
│   ├── common/             # scripts usable across distros
│   │   └── ide/
│   │       └── vscode.sh
│   ├── debian/             # distro-specific installers
│   │   ├── browser/
│   │   └── ide/
│   ├── fedora/
│   ├── arch/
│   ├── opensuse/
│   └── windows/            # powershell or .ps1 scripts for winget/choco
├── tui/                    # omari-cli (python or go)
├── ci/                     # github actions / gitlab pipelines
├── docs/
└── LICENSE
```

## 7 — Example install script: `scripts/common/ide/vscode.sh`

```bash
#!/usr/bin/env bash
# vscode.sh - cross-distro helper for installing Visual Studio Code
# This script tries to use the native package manager where possible.
# It follows official Microsoft instructions where applicable.

set -euo pipefail

function install_debian() {
  # Official Microsoft repo (Debian/Ubuntu)
  wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > /usr/share/keyrings/packages.microsoft.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" \
    | tee /etc/apt/sources.list.d/vscode.list > /dev/null
  apt-get update
  apt-get install -y code
}

function install_fedora() {
  rpm --import https://packages.microsoft.com/keys/microsoft.asc
  sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
  dnf check-update
  dnf install -y code
}

function install_arch() {
  # Use pacman/arch repo or AUR helper (if available)
  if command -v pacman >/dev/null 2>&1; then
    pacman -Sy --noconfirm code
  else
    echo "pacman not found; try installing via AUR helper (yay/paru)"
  fi
}

function install_windows() {
  # This function is for powershell scripts; here it's just a placeholder.
  echo "On Windows, use the powershell script: scripts/windows/ide/vscode.ps1"
}

# Detect distro
if [[ "$OSTYPE" == "linux-gnu" ]]; then
  if command -v apt-get >/dev/null 2>&1; then
    install_debian
  elif command -v dnf >/dev/null 2>&1; then
    install_fedora
  elif command -v pacman >/dev/null 2>&1; then
    install_arch
  else
    echo "Unsupported package manager. Please open an issue with your distro info."
    exit 2
  fi
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
  install_windows
else
  echo "Unsupported OS: $OSTYPE"
  exit 1
fi

```

> Note: For production scripts, avoid downloading and running binaries without fingerprint verification. Provide a `--dry-run` and `--assume-yes` flag style in script wrappers.

## 8 — How installers must be written (style guide)

* Each script must include metadata as a comment header (name, categories, compatible distros, install\_method).
* Prefer package manager installs over vendor scripts.
* If using third-party packaging (AUR, snap, flatpak), add explicit `requires_user_confirmation: true` in metadata.
* Scripts must be idempotent; repeated runs should not break the system.
* Scripts should support `--dry-run`, `--yes` / `--assume-yes` and `--no-sudo` flags where applicable.
* Return meaningful exit codes and print concise logs.

Sample metadata header:

```bash
# Name: Visual Studio Code
# Category: ide
# Distros: debian,fedora,arch
# Install-Method: official-repo
# Trust: high
```

## 9 — CLI / TUI client spec

* Language: Python (rich + click) or Go (cobra + tview). Python recommended for faster prototyping.
* Responsibilities:

  * Download and validate manifest (signature optional for MVP).
  * Map app entries to scripts under `scripts/<distro>/...` or `scripts/common/...`.
  * Show an interactive selection/confirm screen (rich's `Prompt` / `tui` blocks).
  * Execute scripts in a safe order (system packages first, then user apps).
  * Capture stdout/stderr per-app and produce a report JSON in `~/.omari/reports/`.
* Security: Ask for confirmation before running any script needing `sudo`. Offer a dry-run.

## 10 — Web frontend & landing page (open-source design notes)

* Keep the design friendly and accessible: responsive, large buttons, simple language.
* Display supported distros prominently.
* Show a "trust" indicator for each app and link to the script source.
* Make it easy to copy a manifest or generate a QR code.
* Feature a "Community scripts" area for community maintainers to propose installers (PR flow).

Landing page core sections:

* Hero: "Fresh OS? Get your essential apps in one click — curated and open-source."
* How it works: 3-step visual (select -> download manifest -> run TUI)
* Supported distros
* Categories + popular apps
* Contribute / Get involved
* Sponsors / Backers (optional)

## 11 — CI, testing, and verification

* Use GitHub Actions to run static checks on scripts (shellcheck, shfmt for shell scripts).
* Use minimal container-based smoke tests: run scripts in a clean container for each supported distro to ensure they succeed (or at least don't exit non-zero without clear reason).
* For Windows, use GitHub Actions runners or maintain a set of test VMs.
* PR checklist should require a tested manifest and script header metadata.

## 12 — Security & sandboxing

* By default, TUI runs installers with user confirmation and shows exact commands to be executed.
* Encourage the use of containers or VMs for experimental installs.
* Add GPG signatures for official manifests and scripts over time.
* Scripts must avoid piping remote scripts directly to `sh` without verification.

## 13 — Contribution guide

* Fork the repo, add scripts under `scripts/<distro>/<category>/appname.sh`.
* Add metadata header and tests (shellcheck, lint). Include a small README describing where you tested it.
* Open a PR with manifest examples and links to upstream documentation.
* Maintainers will review for compatibility, idempotency, and safety.

## 14 — Roadmap (short)

* Phase 1 (MVP): website, scripts for Debian/Ubuntu, Fedora, Arch, Windows (winget), basic TUI.
* Phase 2: add flatpak/snap integration, more distros, testing infra, manifest signing.
* Phase 3: packaged desktop GUI app, analytics for most-used manifests (opt-in), curated profiles (dev, gaming, data science).

## 15 — License

* Recommend **MIT** or **Apache-2.0**. For contribution friendliness and permissive reuse, start with MIT, consider Apache-2.0 if patent concerns.

## 16 — AI agent prompt (for automated dev / bootstrapping)

> Use this prompt to instruct an AI agent (open-source assistant or an LLM) to build Omari end-to-end. The agent should create code, tests, and deployable artifacts. Be explicit about repository structure, coding standards, and safety.

```
You are an expert full-stack open-source developer and devops engineer. Build a repository named `omari` that provides an MVP for a post-install app installer. The repository must include:
1. A static landing page (React + Vite) at `website/` with a 4-step selection UI that outputs a JSON manifest.
2. A `scripts/` directory with clear structure and at least the following example script: `scripts/common/ide/vscode.sh` (use official Microsoft installation method). The script must include a metadata header.
3. A TUI client `tui/` implemented in Python using `rich` and `click` that can download a manifest (local file path or URL), validate the contents, show an interactive preview, and execute matched scripts.
4. CI workflows under `.github/workflows/` that run linting on shell scripts (shellcheck), Python unit tests, and smoke-tests inside Linux containers for Debian and Fedora.
5. Documentation under `docs/` and a comprehensive `README.md` with run instructions and contribution guide.

Constraints and requirements:
- All shell scripts must be idempotent, have `--dry-run` and `--assume-yes` flags, and include metadata headers.
- The TUI must *never* execute scripts without explicit user confirmation. It must optionally run in `--dry-run` to show commands.
- The agent must write tests (unit tests for manifest parsing and integration smoke tests that execute scripts inside containers in GitHub Actions).
- Avoid running or embedding unverified remote code; instead download release assets and verify (e.g., checksum) where possible.
- Make the web UI responsive and accessible. Add a simple deploy action to publish the website to GitHub Pages.
- Use permissive license MIT and add a contributor code of conduct (short).

Deliverables:
- A completed GitHub-style repo structure with all files committed.
- A `start` script or `make` targets for local development: `make web-dev`, `make tui-dev`, `make lint`.
- A README with examples of generating and running a manifest: `omari-cli install my-manifest.json`.

When done, provide a short checklist of what was created, tests run, and any manual steps required to finish.
```

---

## Final notes

I created this README as an MVP blueprint. Once you confirm, we can:

* Generate the initial repo skeleton (file-by-file) and example scripts.
* Prototype the TUI in Python (rich + click) with manifest parsing.
* Build the website skeleton (React + Vite) and a static manifest generator.

If you want, I can now scaffold the repo files here and provide the `omari-cli` starter code.

---

*End of README*
