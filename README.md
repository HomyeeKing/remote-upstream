# remote-upstream

have you fed up with add upstream remote by hand? that's what this package do.

after you fork one repo, you don't have to go back to copy the upstream ssh_url and do

```bash
git remote add upstream <upstream_ssh_url>
```

**JUST NEED** to install this package, we will do that for you.

# usage

before usage, you need to install zx globally
`npm i zx -g`
then run

```bash
 zx https://raw.githubusercontent.com/HomyeeKing/remote-upstream/main/get-upstream.mjs
```

**OR** you want to make it permanantly, you need to inject to in global git hooks

so run

```bash
 zx https://raw.githubusercontent.com/HomyeeKing/remote-upstream/main/install.mjs
```

it will inject for you.

# tools

this package is powered by [zx](https://github.com/google/zx), a very powerful, shell-like, human-use command tool, very nice to javascript developer and has a perfect performance, have a good try if you haven't used it before!
