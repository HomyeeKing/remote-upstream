#!/usr/bin/env zx
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// src/index.ts
var import_zx = __toModule(require("zx"));
(async () => {
  const origin = (await import_zx.$`git remote get-url  origin`).stdout.trim();
  if (origin.startsWith("git@")) {
    const reg = /^git@github\.com:(.*)\.git$/;
    const userAndRepoMatch = origin.match(reg);
    if (userAndRepoMatch) {
      const userAndRepo = userAndRepoMatch[1].trim();
      const res = await (0, import_zx.fetch)(`https://api.github.com/repos/${userAndRepo}`);
      if (res.ok) {
        const info = await res.json();
        if (info.fork) {
          await import_zx.$`git remote add upstream ${info.parent.ssh_url}`;
          console.log(`ADD UPSTREAM SUCCESSFULLY. CHECK THE GIT REMOTE`);
          await import_zx.$`git remote -v`;
        }
      } else {
        console.error(`Failed to get the ${userAndRepo} info,  please file an issue: 
         https://github.com/HomyeeKing/remote-upstream/issues`);
      }
    } else {
      console.error(`[ERROR!] Failed to address the repo info, please file an issue to make this fixed. 
      https://github.com/HomyeeKing/remote-upstream/issues`);
    }
  } else {
    console.warn(`Can't find origin remote`);
  }
})();
