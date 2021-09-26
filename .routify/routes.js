
/**
 * @roxi/routify 2.18.3
 * File generated Sat Sep 25 2021 20:56:07 GMT-0400 (Eastern Daylight Time)
 */

export const __version = "2.18.3"
export const __timestamp = "2021-09-26T00:56:07.152Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports
import _about from '../src/pages/about.svelte'
import _courses from '../src/pages/courses.svelte'
import _index from '../src/pages/index.svelte'
import _projects from '../src/pages/projects.svelte'

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
      "absolutePath": "/Users/benlubas/Documents/GitHub/who/src/pages/about.svelte",
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
      "file": "courses.svelte",
      "filepath": "/courses.svelte",
      "name": "courses",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/Users/benlubas/Documents/GitHub/who/src/pages/courses.svelte",
      "importPath": "../src/pages/courses.svelte",
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
      "path": "/courses",
      "id": "_courses",
      "component": () => _courses
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "index.svelte",
      "filepath": "/index.svelte",
      "name": "index",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/Users/benlubas/Documents/GitHub/who/src/pages/index.svelte",
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
      "absolutePath": "/Users/benlubas/Documents/GitHub/who/src/pages/projects.svelte",
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

