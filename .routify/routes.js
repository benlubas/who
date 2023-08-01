
/**
 * @roxi/routify 2.18.3
 * File generated Tue Aug 01 2023 10:10:39 GMT-0400 (Eastern Daylight Time)
 */

export const __version = "2.18.3"
export const __timestamp = "2023-08-01T14:10:39.080Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports
import _about from '../src/pages/about.svelte'
import _index from '../src/pages/index.svelte'
import _projects from '../src/pages/projects.svelte'
import _resume from '../src/pages/resume.svelte'
import _work from '../src/pages/work.svelte'

//options
export const options = {}

//tree
export const _tree = {
  "name": "root",
  "filepath": "/",
  "root": true,
  "ownMeta": {},
  "absolutePath": "src/pages",
  "children": [
    {
      "isFile": true,
      "isDir": false,
      "file": "about.svelte",
      "filepath": "/about.svelte",
      "name": "about",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/Users/benlubas/github/who/src/pages/about.svelte",
      "importPath": "../src/pages/about.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/about",
      "id": "_about",
      "component": () => _about
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "index.svelte",
      "filepath": "/index.svelte",
      "name": "index",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/Users/benlubas/github/who/src/pages/index.svelte",
      "importPath": "../src/pages/index.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": true,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/index",
      "id": "_index",
      "component": () => _index
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "projects.svelte",
      "filepath": "/projects.svelte",
      "name": "projects",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/Users/benlubas/github/who/src/pages/projects.svelte",
      "importPath": "../src/pages/projects.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/projects",
      "id": "_projects",
      "component": () => _projects
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "resume.svelte",
      "filepath": "/resume.svelte",
      "name": "resume",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/Users/benlubas/github/who/src/pages/resume.svelte",
      "importPath": "../src/pages/resume.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/resume",
      "id": "_resume",
      "component": () => _resume
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "work.svelte",
      "filepath": "/work.svelte",
      "name": "work",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/Users/benlubas/github/who/src/pages/work.svelte",
      "importPath": "../src/pages/work.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/work",
      "id": "_work",
      "component": () => _work
    }
  ],
  "isLayout": false,
  "isReset": false,
  "isIndex": false,
  "isFallback": false,
  "meta": {
    "recursive": true,
    "preload": false,
    "prerender": true
  },
  "path": "/"
}


export const {tree, routes} = buildClientTree(_tree)

