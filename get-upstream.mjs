#!/usr/bin/env zx
/// <reference types="zx/globals" />

const origin = (await $`git remote get-url  origin`).stdout.trim()

if (origin.startsWith("git@")) {
  const reg = /^git@github\.com:(.*)\.git$/
  const userAndRepoMatch = origin.match(reg)
  if (userAndRepoMatch) {
    const userAndRepo = userAndRepoMatch[1].trim()
    const res = await fetch(`https://api.github.com/repos/${userAndRepo}`)
    if (res.ok) {
      const info = await res.json()
      if (info.fork) {
        await $`git remote add upstream ${info.parent.ssh_url}`
        console.log(
          chalk.green(`ADD UPSTREAM SUCCESSFULLY. CHECK THE GIT REMOTE`),
        )
        await $`git remote -v`
      }else{
        console.log(chalk.yellow`${userAndRepo} is not a forked repo`);
      }
    } else {
      console.error(`Failed to get the ${userAndRepo} info,  please file an issue: 
       https://github.com/HomyeeKing/remote-upstream/issues`)
    }
  } else {
    console.error(
      chalk.red(`[ERROR!] Failed to address the repo info, please file an issue to make this fixed. 
    https://github.com/HomyeeKing/remote-upstream/issues`),
    )
  }
} else {
  console.warn(`Can't find origin remote`)
}
