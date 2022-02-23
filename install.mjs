#!/usr/bin/env zx
/// <reference types="zx/globals" />
// $.verbose = false

const upstream_file_name = 'get-upstream.mjs'

// git init template reference https://git-scm.com/docs/git-init#_template_directory
const git_init_template =
  process.env.GIT_TEMPLATE_DIR ||
  (await $`git config --global --get init.templateDir`).toString().trim() ||
  "/usr/share/git-core/templates";

const hooksPath = path.join(git_init_template, "./hooks");
const postCheckout = path.join(hooksPath, "post-checkout");

if (!fs.existsSync(postCheckout)) {
  console.log(chalk.red(`${postCheckout} is not exist, will create it for you`));
}

cd(hooksPath)
await $`curl -O https://raw.githubusercontent.com/HomyeeKing/remote-upstream/main/${upstream_file_name}`
await $`chmod +x ./${upstream_file_name}`
await $`echo ./${upstream_file_name} >> ${postCheckout}`