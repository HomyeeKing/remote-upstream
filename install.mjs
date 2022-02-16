#!/usr/bin/env zx

import "zx/globals";

const upstreamCommand =
  "curl -o- https://raw.githubusercontent.com/HomyeeKing/remote-upstream/master/upstream.mjs | zx";

// git init template reference https://git-scm.com/docs/git-init#_template_directory
const git_init_template =
  process.env.GIT_TEMPLATE_DIR ||
  (await $`git config --global --get init.templateDir`).toString().trim() ||
  "/usr/share/git-core/templates";

const hooksPath = path.join(git_init_template, "./hooks");
const postCheckout = path.join(hooksPath, "post-checkout");

if (fs.existsSync(postCheckout)) {
  const content = fs.readFileSync(postCheckout, "utf-8");
  if (content.includes(upstreamCommand)) {
    console.log(chalk.yellow`upstream command has been injected`);
  } else {
    fs.writeFileSync(postCheckout, `${content}\n ${upstreamCommand}`);
    console.log(chalk.green`upstream command has injected`);
  }
} else {
  console.log(chalk.red(`${postCheckout} is not exist`));
}
