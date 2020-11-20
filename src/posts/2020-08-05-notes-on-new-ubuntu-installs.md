---
title: Notes on New Ubuntu Installs
date: 2020-08-05
tags:
  - linux
  - ubuntu
---

These are some notes that help me set up a fresh development environment on Ubuntu, which includes setting up Docker, multiple Python environments, Firefox binary installs, etc.

## Updates

* May 2020: Initial docs for Ubuntu 20.04, Focal Fossa 

## Install misc apt packages

* `sudo apt install curl git vim`

## Install Docker

1. We install docker from package here, and later install `docker-compose` via `pipx` below.
    * `sudo apt update && sudo apt install docker.io`

## Install zsh

1. Install `zsh` from package
    * `sudo apt install zsh`
1. Install ohmyzsh
    * `sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`
1. Install powerline fonts for zsh theme "agnoster"
    * `sudo apt install fonts-powerline`
1. Copy over `.zshrc` and `.aliasrc` from my dotfiles
1. Log out and log in again to pick up shell changes

## Install Python via pyenv

1. Install pyenv dependencies as referenced in the [wiki](https://github.com/pyenv/pyenv/wiki/Common-build-problems).
1. Install pyenv via [pyenv-installer](https://github.com/pyenv/pyenv-installer#installation--update--uninstallation).
1. Follow the steps from the output to set up pyenv in the PATH.
1. Install preferred Python(s). Use `pyenv install --list` to view all available versions.
1. Set the global Python version with `pyenv global $VERSION`

## Set up pip and pipx

1. Make sure the `pip` we have is the latest
    * `pip install -U pip`
1. Install `pipx`
    * `pip install --user pipx`
    * `pipx ensurepath`
1. Install various `pipx` applications I use
    * `pipx install docker-compose`
    * `pipx install isort`
    * `pipx install black`
    * `pipx install flake8`
    * `pipx install pip-tools`
    * `pipx install docutils`
    * `pipx install sphinx`

## Set up nvm

1. Follow the install process at https://github.com/nvm-sh/nvm
1. Ensure these are in the `~/.zshrc`:
   * `export NVM_DIR="$HOME/.nvm"`
   * `[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"` 
1. Install the Node LTS version
   * `nvm install --lts`
1. Make sure latest `npm` is installed
   * `nvm install-latest-npm`

## Set up Firefox

I prefer to set up Firefox from the binaries instead of via Ubuntu packages. For one, I can install multiple (Release vs Nightly), for another, the packaged Firefox makes minor changes to the actual released Firefox and I prefer the actual releases.

1. Download the latest release of Firefox from https://www.mozilla.org/en-US/firefox/new/
1. Make a local directory to extract to and install there
    * `mkdir ~/.firefox-release`
1. Create an app launcher for by copying the following file into `~/.local/share/applications/firefox-release.desktop`

    ```
    [Desktop Entry]
    Version=1.0
    Name=Firefox Release
    Comment=Custom install of Firefox Release
    GenericName=Web Browser
    Exec=/home/rob/.firefox-release/firefox/firefox %u
    Icon=/home/rob/.firefox-release/firefox/browser/chrome/icons/default/default128.png
    Terminal=false
    Type=Application
    Categories=GNOME;GTK;Network;WebBrowser;
    Keywords=Internet;WWW;Browser;Web;Explorer
    X-Desktop-File-Install-Version=0.24
    ```

1. Do the same for nightly changing the above as needed.
1. On launch set up profiles for each.

## Install various apps via Ubuntu Software

* Telegram Desktop
* Visual Studio Code
* Slack
* Spotify
