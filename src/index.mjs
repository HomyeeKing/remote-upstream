#!/usr/bin/env zx

const remote = await $`git remote get-url --push origin`
if()
console.log('remote :>> ', remote.stdout);
