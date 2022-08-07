
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function get_store_value(store) {
        let value;
        subscribe(store, _ => value = _)();
        return value;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { stylesheet } = info;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                info.rules = {};
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
        return context;
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_out_transition(node, fn, params) {
        let config = fn(node, params);
        let running = true;
        let animation_name;
        const group = outros;
        group.r += 1;
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            add_render_callback(() => dispatch(node, false, 'start'));
            loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(0, 1);
                        dispatch(node, false, 'end');
                        if (!--group.r) {
                            // this will result in `end()` being called,
                            // so we don't need to clean up here
                            run_all(group.c);
                        }
                        return false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(1 - t, t);
                    }
                }
                return running;
            });
        }
        if (is_function(config)) {
            wait().then(() => {
                // @ts-ignore
                config = config();
                go();
            });
        }
        else {
            go();
        }
        return {
            end(reset) {
                if (reset && config.tick) {
                    config.tick(1, 0);
                }
                if (running) {
                    if (animation_name)
                        delete_rule(node, animation_name);
                    running = false;
                }
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init$1(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.49.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    var defaultConfig = {
        queryHandler: {
            parse: search => fromEntries(new URLSearchParams(search)),
            stringify: params => '?' + (new URLSearchParams(params)).toString()
        },
        urlTransform: {
            apply: x => x,
            remove: x => x
        },
        useHash: false
    };


    function fromEntries(iterable) {
        return [...iterable].reduce((obj, [key, val]) => {
            obj[key] = val;
            return obj
        }, {})
    }

    const MATCH_PARAM = RegExp(/\:([^/()]+)/g);

    function handleScroll(element, scrollToTop) {
      if (navigator.userAgent.includes('jsdom')) return false
      if (scrollToTop) scrollAncestorsToTop(element);
      handleHash();
    }

    function handleHash() {
      if (navigator.userAgent.includes('jsdom')) return false
      const { hash } = window.location;
      if (hash) {
        const validElementIdRegex = /^[A-Za-z]+[\w\-\:\.]*$/;
        if (validElementIdRegex.test(hash.substring(1))) {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView();
        }
      }
    }

    function scrollAncestorsToTop(element) {
      if (
        element &&
        element.scrollTo &&
        element.dataset.routify !== 'scroll-lock' &&
        element.dataset['routify-scroll'] !== 'lock'
      ) {
        element.style['scroll-behavior'] = 'auto';
        element.scrollTo({ top: 0, behavior: 'auto' });
        element.style['scroll-behavior'] = '';
        scrollAncestorsToTop(element.parentElement);
      }
    }

    const pathToRegex = (str, recursive) => {
      const suffix = recursive ? '' : '/?$'; //fallbacks should match recursively
      str = str.replace(/\/_fallback?$/, '(/|$)');
      str = str.replace(/\/index$/, '(/index)?'); //index files should be matched even if not present in url
      str = str.replace(MATCH_PARAM, '([^/]+)') + suffix;
      str = `^${str}`;
      return str
    };

    const pathToParamKeys = string => {
      const paramsKeys = [];
      let matches;
      while ((matches = MATCH_PARAM.exec(string))) paramsKeys.push(matches[1]);
      return paramsKeys
    };

    const pathToRank = ({ path }) => {
      return path
        .split('/')
        .filter(Boolean)
        .map(str => (str === '_fallback' ? 'A' : str.startsWith(':') ? 'B' : 'C'))
        .join('')
    };

    /** Supresses Routify caused logs and warnings for one tick */
    function suppressComponentWarnings(ctx, tick) {
      suppressComponentWarnings._console = suppressComponentWarnings._console || { log: console.log, warn: console.warn };
      const { _console } = suppressComponentWarnings;

      const name = ctx.componentFile.name
        .replace(/Proxy<_?(.+)>/, '$1') //nollup wraps names in Proxy<...>
        .replace(/^Index$/, ctx.component.shortPath.split('/').pop()) //nollup names Index.svelte index. We want a real name
        .replace(/^./, s => s.toUpperCase()) //capitalize first letter
        .replace(/\:(.+)/, 'U5B$1u5D'); // :id => U5Bidu5D

      const ignores = [
        `<${name}> received an unexpected slot "default".`,
        `<${name}> was created with unknown prop 'scoped'`,
        `<${name}> was created with unknown prop 'scopedSync'`,
      ];
      for (const log of ['log', 'warn']) {
        console[log] = (...args) => {
          if (!ignores.includes(args[0]))
            _console[log](...args);
        };
        tick().then(() => {
          //after component has been created, we want to restore the console method (log or warn)
          console[log] = _console[log];
        });
      }
    }

    function currentLocation() {
      let dirtyFullpath = window.location.pathname + window.location.search + window.location.hash;
      const { url, options } = resolvePrefetch(dirtyFullpath);
      const parsedUrl = parseUrl(url);

      return { ...parsedUrl, options }
    }

    /**
     * converts /path/to__routify_url_options__1234abcde to
     * {options, url: '/path/to'}
     * @param {string} dirtyFullpath 
     */
    function resolvePrefetch(dirtyFullpath) {
      const [url, _options] = dirtyFullpath.split('__[[routify_url_options]]__');

      const options = JSON.parse(decodeURIComponent(_options || '') || '{}');

      window.routify = window.routify || {};
      window.routify.prefetched = options.prefetch;

      return { url, options }
    }

    /**
     * 
     * @param {string} url 
     */
    function parseUrl(url) {
      if (defaultConfig.useHash)
        url = url.replace(/.*#(.+)/, '$1');
      const origin = url.startsWith('/') ? window.location.origin : undefined;
      const _url = new URL(url, origin);
      const fullpath = _url.pathname + _url.search + _url.hash;
      return { url: _url, fullpath }
    }


    /**
     * populates parameters, applies urlTransform, prefixes hash
     * eg. /foo/:bar to /foo/something or #/foo/something
     * and applies config.urlTransform
     * @param {*} path 
     * @param {*} params 
     */
    function resolveUrl(path, params, inheritedParams) {
      const hash = defaultConfig.useHash ? '#' : '';
      let url;
      url = populateUrl(path, params, inheritedParams);
      url = defaultConfig.urlTransform.apply(url);
      url = hash + url;
      return url
    }


    /**
     * populates an url path with parameters
     * populateUrl('/home/:foo', {foo: 'something', bar:'baz'})  to /foo/something?bar=baz
     * @param {*} path 
     * @param {*} params 
     */
    function populateUrl(path, params, inheritedParams) {
      const allParams = Object.assign({}, inheritedParams, params);
      const queryString = getQueryString(path, params);

      for (const [key, value] of Object.entries(allParams))
        path = path.replace(`:${key}`, value);

      return `${path}${queryString}`
    }


    /**
     * 
     * @param {string} path 
     * @param {object} params 
     */
    function getQueryString(path, params) {
      if (!defaultConfig.queryHandler) return ""
      const ignoredKeys = pathToParamKeys(path);
      const queryParams = {};
      if (params) Object.entries(params).forEach(([key, value]) => {
        if (!ignoredKeys.includes(key))
          queryParams[key] = value;
      });
      return defaultConfig.queryHandler.stringify(queryParams).replace(/\?$/, '')
    }

    /* node_modules/@roxi/routify/runtime/decorators/Noop.svelte generated by Svelte v3.49.0 */

    function create_fragment$i(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Noop', slots, ['default']);
    	let { scoped = {} } = $$props;
    	const writable_props = ['scoped'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Noop> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('scoped' in $$props) $$invalidate(0, scoped = $$props.scoped);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ scoped });

    	$$self.$inject_state = $$props => {
    		if ('scoped' in $$props) $$invalidate(0, scoped = $$props.scoped);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [scoped, $$scope, slots];
    }

    class Noop extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$i, create_fragment$i, safe_not_equal, { scoped: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Noop",
    			options,
    			id: create_fragment$i.name
    		});
    	}

    	get scoped() {
    		throw new Error("<Noop>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set scoped(value) {
    		throw new Error("<Noop>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    window.routify = window.routify || {};

    /** @type {import('svelte/store').Writable<RouteNode>} */
    const route = writable(null); // the actual route being rendered

    /** @type {import('svelte/store').Writable<RouteNode[]>} */
    const routes$1 = writable([]); // all routes
    routes$1.subscribe(routes => (window.routify.routes = routes));

    let rootContext = writable({ component: { params: {} } });

    /** @type {import('svelte/store').Writable<RouteNode>} */
    const urlRoute = writable(null);  // the route matching the url

    const isChangingPage = writable(true);

    async function onPageLoaded({ page, metatags, afterPageLoad, parentNode }) {
        //scroll needs to run after page load
        const scrollToTop = page.last !== page;
        setTimeout(() => handleScroll(parentNode, scrollToTop));

        const { path } = page;
        const { options } = currentLocation();
        const prefetchId = options.prefetch;

        for (const hook of afterPageLoad._hooks) {
            // deleted/invalidated hooks are left as undefined
            if (hook) await hook(page.api);
        }

        metatags.update();

        dispatchEvent(new CustomEvent('app-loaded'));
        parent.postMessage({
            msg: 'app-loaded',
            prefetched: window.routify.prefetched,
            path,
            prefetchId
        }, "*");
        window['routify'].appLoaded = true;
        window['routify'].stopAutoReady = false;
    }

    /**
     * @param {string} url 
     * @return {ClientNode}
     */
    function urlToRoute(url, clone = false) {
        url = defaultConfig.urlTransform.remove(url);
        let { pathname, search } = parseUrl(url).url;

        /** @type {RouteNode[]} */
        const routes = get_store_value(routes$1);
        const matchingRoute =
            // find a route with a matching name
            routes.find(route => pathname === route.meta.name) ||
            // or a matching path
            routes.find(route => pathname.match(route.regex));

        if (!matchingRoute)
            throw new Error(`Route could not be found for "${pathname}".`)

        // we want to clone if we're only previewing an URL
        const _matchingRoute = clone ? Object.create(matchingRoute) : matchingRoute;

        const { route, redirectPath, rewritePath } = resolveRedirects(_matchingRoute, routes);

        if (rewritePath) {
            ({ pathname, search } = parseUrl(resolveUrl(rewritePath, route.params)).url);
            if (redirectPath)
                route.redirectTo = resolveUrl(redirectPath, route.params || {});
        }

        if (defaultConfig.queryHandler)
            route.params = Object.assign({}, defaultConfig.queryHandler.parse(search));

        assignParamsToRouteAndLayouts(route, pathname);

        route.leftover = url.replace(new RegExp(route.regex), '');
        return route
    }

    function assignParamsToRouteAndLayouts(route, pathname) {
        if (route.paramKeys) {
            const layouts = layoutByPos(route.layouts);
            const fragments = pathname.split('/').filter(Boolean);
            const routeProps = getRouteProps(route.path);

            routeProps.forEach((prop, i) => {
                if (prop) {
                    route.params[prop] = fragments[i];
                    if (layouts[i]) layouts[i].param = { [prop]: fragments[i] };
                    else route.param = { [prop]: fragments[i] };
                }
            });
        }
    }

    /**
     * 
     * @param {RouteNode} route 
     * @param {RouteNode[]} routes 
     * @param {*} params 
     */
    function resolveRedirects(route, routes, redirectPath, rewritePath) {
        const { redirect, rewrite } = route.meta;

        if (redirect || rewrite) {
            redirectPath = redirect ? redirect.path || redirect : redirectPath;
            rewritePath = rewrite ? rewrite.path || rewrite : redirectPath;
            const redirectParams = redirect && redirect.params;
            const rewriteParams = rewrite && rewrite.params;

            const newRoute = routes.find(r => r.path.replace(/\/index$/,'') === rewritePath);

            if (newRoute === route) console.error(`${rewritePath} is redirecting to itself`);
            if (!newRoute) console.error(`${route.path} is redirecting to non-existent path: ${rewritePath}`);
            if (redirectParams || rewriteParams)
                newRoute.params = Object.assign({}, newRoute.params, redirectParams, rewriteParams);

            return resolveRedirects(newRoute, routes, redirectPath, rewritePath)
        }
        return { route, redirectPath, rewritePath }
    }


    /**
     * @param {array} layouts
     */
    function layoutByPos(layouts) {
        const arr = [];
        layouts.forEach(layout => {
            arr[layout.path.split('/').filter(Boolean).length - 1] = layout;
        });
        return arr
    }


    /**
     * @param {string} url
     */
    function getRouteProps(url) {
        return url
            .split('/')
            .filter(Boolean)
            .map(f => f.match(/\:(.+)/))
            .map(f => f && f[1])
    }

    /* node_modules/@roxi/routify/runtime/Prefetcher.svelte generated by Svelte v3.49.0 */
    const file$f = "node_modules/@roxi/routify/runtime/Prefetcher.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (80:2) {#each $actives as prefetch (prefetch.options.prefetch)}
    function create_each_block$2(key_1, ctx) {
    	let iframe;
    	let iframe_src_value;

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			iframe = element("iframe");
    			if (!src_url_equal(iframe.src, iframe_src_value = /*prefetch*/ ctx[1].url)) attr_dev(iframe, "src", iframe_src_value);
    			attr_dev(iframe, "frameborder", "0");
    			attr_dev(iframe, "title", "routify prefetcher");
    			add_location(iframe, file$f, 80, 4, 2274);
    			this.first = iframe;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, iframe, anchor);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*$actives*/ 1 && !src_url_equal(iframe.src, iframe_src_value = /*prefetch*/ ctx[1].url)) {
    				attr_dev(iframe, "src", iframe_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(iframe);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(80:2) {#each $actives as prefetch (prefetch.options.prefetch)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let div;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_value = /*$actives*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*prefetch*/ ctx[1].options.prefetch;
    	validate_each_keys(ctx, each_value, get_each_context$2, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$2(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "id", "__routify_iframes");
    			set_style(div, "display", "none");
    			add_location(div, file$f, 78, 0, 2160);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$actives*/ 1) {
    				each_value = /*$actives*/ ctx[0];
    				validate_each_argument(each_value);
    				validate_each_keys(ctx, each_value, get_each_context$2, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, destroy_block, create_each_block$2, null, get_each_context$2);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const iframeNum = 2;

    const defaults = {
    	validFor: 60,
    	timeout: 5000,
    	gracePeriod: 1000
    };

    /** stores and subscriptions */
    const queue = writable([]);

    const actives = derived(queue, q => q.slice(0, iframeNum));

    actives.subscribe(actives => actives.forEach(({ options }) => {
    	setTimeout(() => removeFromQueue(options.prefetch), options.timeout);
    }));

    function prefetch$1(path, options = {}) {
    	prefetch$1.id = prefetch$1.id || 1;
    	path = path.href || path;
    	options = { ...defaults, ...options };
    	options.prefetch = prefetch$1.id++;

    	//don't prefetch within prefetch or SSR
    	if (window.routify.prefetched || navigator.userAgent.match('jsdom')) return false;

    	// add to queue
    	queue.update(q => {
    		if (!q.some(e => e.options.path === path)) q.push({
    			url: `${path}__[[routify_url_options]]__${encodeURIComponent(JSON.stringify(options))}`,
    			options
    		});

    		return q;
    	});
    }

    /**
     * @param {number|MessageEvent} idOrEvent
     */
    function removeFromQueue(idOrEvent) {
    	const id = idOrEvent.data ? idOrEvent.data.prefetchId : idOrEvent;
    	if (!id) return null;
    	const entry = get_store_value(queue).find(entry => entry && entry.options.prefetch == id);

    	// removeFromQueue is called by both eventListener and timeout,
    	// but we can only remove the item once
    	if (entry) {
    		const { gracePeriod } = entry.options;
    		const gracePromise = new Promise(resolve => setTimeout(resolve, gracePeriod));

    		const idlePromise = new Promise(resolve => {
    				window.requestIdleCallback
    				? window.requestIdleCallback(resolve)
    				: setTimeout(resolve, gracePeriod + 1000);
    			});

    		Promise.all([gracePromise, idlePromise]).then(() => {
    			queue.update(q => q.filter(q => q.options.prefetch != id));
    		});
    	}
    }

    // Listen to message from child window
    addEventListener('message', removeFromQueue, false);

    function instance$h($$self, $$props, $$invalidate) {
    	let $actives;
    	validate_store(actives, 'actives');
    	component_subscribe($$self, actives, $$value => $$invalidate(0, $actives = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Prefetcher', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Prefetcher> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		writable,
    		derived,
    		get: get_store_value,
    		iframeNum,
    		defaults,
    		queue,
    		actives,
    		prefetch: prefetch$1,
    		removeFromQueue,
    		$actives
    	});

    	return [$actives];
    }

    class Prefetcher extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$h, create_fragment$h, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Prefetcher",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    /// <reference path="../typedef.js" />

    /** @ts-check */
    /**
     * @typedef {Object} RoutifyContext
     * @prop {ClientNode} component
     * @prop {ClientNode} layout
     * @prop {any} componentFile 
     * 
     *  @returns {import('svelte/store').Readable<RoutifyContext>} */
    function getRoutifyContext() {
      return getContext('routify') || rootContext
    }

    /**
     * @callback AfterPageLoadHelper
     * @param {function} callback
     * 
     * @typedef {import('svelte/store').Readable<AfterPageLoadHelper> & {_hooks:Array<function>}} AfterPageLoadHelperStore
     * @type {AfterPageLoadHelperStore}
     */
    const afterPageLoad = {
      _hooks: [
        event => isChangingPage.set(false)
      ],
      subscribe: hookHandler
    };

    /** 
     * @callback BeforeUrlChangeHelper
     * @param {function} callback
     *
     * @typedef {import('svelte/store').Readable<BeforeUrlChangeHelper> & {_hooks:Array<function>}} BeforeUrlChangeHelperStore
     * @type {BeforeUrlChangeHelperStore}
     **/
    const beforeUrlChange = {
      _hooks: [],
      subscribe: hookHandler
    };

    function hookHandler(listener) {
      const hooks = this._hooks;
      const index = hooks.length;
      listener(callback => {hooks[index] = callback;});
      return (...params) => {
        delete hooks[index];
        listener(...params);
      }
    }

    /**
     * @typedef {{
     *   (el: Node): {update: (args: any) => void;}
     *   (path?: string | undefined, params?: UrlParams | undefined, options?: UrlOptions | undefined): string;
     * }} UrlHelper
     * @typedef {import('svelte/store').Readable<UrlHelper>} UrlHelperStore
     * @type {UrlHelperStore} 
     * */
    const url = {
      subscribe(listener) {
        const ctx = getRoutifyContext();
        return derived(
          ctx,
          ctx => makeUrlHelper(ctx, ctx.route, ctx.routes)
        ).subscribe(
          listener
        )
      }
    };

    /** 
     * @param {{component: ClientNode}} $ctx 
     * @param {RouteNode} $currentRoute 
     * @param {RouteNode[]} $routes 
     * @returns {UrlHelper}
     */
    function makeUrlHelper($ctx, $currentRoute, $routes) {
      return function url(path, params = {}, options) {
        const {component} = $ctx;
        const inheritedParams = Object.assign({}, $currentRoute.params, component.params);
        let el = path && path.nodeType && path;

        if (el)
          path = path.getAttribute('href');

        path = path ? resolvePath(path) : component.shortPath;

        // preload the route  
        const route = $routes.find(route => [route.shortPath || '/', route.path].includes(path));
        if (route && route.meta.preload === 'proximity' && window.requestIdleCallback) {
          const delay = routify.appLoaded ? 0 : 1500;
          setTimeout(() => {
            window.requestIdleCallback(() => route.api.preload());
          }, delay);
        }

        const strict = options && options.strict !== false;
        if (!strict) path = path.replace(/index$/, '');

        let url = resolveUrl(path, params, inheritedParams);

        if (el) {
          el.href = url;
          return {
            update(changedParams) {el.href = resolveUrl(path, changedParams, inheritedParams);}
          }
        }

        return url

        /**
         * converts relative, named and absolute paths to absolute paths
         * example: at `/foo/bar/baz`  the path  `../bar2/:something`  converts to   `/foo/bar2/:something`
         * @param {*} path 
         */
        function resolvePath(path) {
          if (path.match(/^\.\.?\//)) {
            //RELATIVE PATH
            let [, breadcrumbs, relativePath] = path.match(/^([\.\/]+)(.*)/);
            let dir = component.path.replace(/\/$/, '');
            const traverse = breadcrumbs.match(/\.\.\//g) || [];
            // if this is a page, we want to traverse one step back to its folder
            if (component.isPage) traverse.push(null);
            traverse.forEach(() => dir = dir.replace(/\/[^\/]+\/?$/, ''));
            path = `${dir}/${relativePath}`.replace(/\/$/, '');
            path = path || '/'; // empty means root
          } else if (path.match(/^\//)) ; else {
            // NAMED PATH
            const matchingRoute = $routes.find(route => route.meta.name === path);
            if (matchingRoute) path = matchingRoute.shortPath;
          }
          return path
        }



      }
    }

    /**
     * @param {string|ClientNodeApi} path 
     * @param {*} options 
     */
    function prefetch(path, options) {
      prefetch$1(path, options);
    }



    const _metatags = {
      subscribe(listener) {
        this._origin = this.getOrigin();
        return listener(metatags)
      },
      props: {},
      templates: {},
      services: {
        plain: {propField: 'name', valueField: 'content'},
        twitter: {propField: 'name', valueField: 'content'},
        og: {propField: 'property', valueField: 'content'},
      },
      plugins: [
        {
          name: 'applyTemplate',
          condition: () => true,
          action: (prop, value) => {
            const template = _metatags.getLongest(_metatags.templates, prop) || (x => x);
            return [prop, template(value)]
          }
        },
        {
          name: 'createMeta',
          condition: () => true,
          action(prop, value) {
            _metatags.writeMeta(prop, value);
          }
        },
        {
          name: 'createOG',
          condition: prop => !prop.match(':'),
          action(prop, value) {
            _metatags.writeMeta(`og:${prop}`, value);
          }
        },
        {
          name: 'createTitle',
          condition: prop => prop === 'title',
          action(prop, value) {
            document.title = value;
          }
        }
      ],
      getLongest(repo, name) {
        const providers = repo[name];
        if (providers) {
          const currentPath = get_store_value(route).path;
          const allPaths = Object.keys(repo[name]);
          const matchingPaths = allPaths.filter(path => currentPath.includes(path));

          const longestKey = matchingPaths.sort((a, b) => b.length - a.length)[0];

          return providers[longestKey]
        }
      },
      writeMeta(prop, value) {
        const head = document.getElementsByTagName('head')[0];
        const match = prop.match(/(.+)\:/);
        const serviceName = match && match[1] || 'plain';
        const {propField, valueField} = metatags.services[serviceName] || metatags.services.plain;
        const oldElement = document.querySelector(`meta[${propField}='${prop}']`);
        if (oldElement) oldElement.remove();

        const newElement = document.createElement('meta');
        newElement.setAttribute(propField, prop);
        newElement.setAttribute(valueField, value);
        newElement.setAttribute('data-origin', 'routify');
        head.appendChild(newElement);
      },
      set(prop, value) {
        // we only want strings. If metatags is used as a store, svelte will try to assign an object to prop
        if (typeof prop === 'string') {
          _metatags.plugins.forEach(plugin => {
            if (plugin.condition(prop, value))
              [prop, value] = plugin.action(prop, value) || [prop, value];
          });
        }
      },
      clear() {
        const oldElement = document.querySelector(`meta`);
        if (oldElement) oldElement.remove();
      },
      template(name, fn) {
        const origin = _metatags.getOrigin;
        _metatags.templates[name] = _metatags.templates[name] || {};
        _metatags.templates[name][origin] = fn;
      },
      update() {
        Object.keys(_metatags.props).forEach((prop) => {
          let value = (_metatags.getLongest(_metatags.props, prop));
          _metatags.plugins.forEach(plugin => {
            if (plugin.condition(prop, value)) {
              [prop, value] = plugin.action(prop, value) || [prop, value];

            }
          });
        });
      },
      batchedUpdate() {
        if (!_metatags._pendingUpdate) {
          _metatags._pendingUpdate = true;
          setTimeout(() => {
            _metatags._pendingUpdate = false;
            this.update();
          });
        }
      },
      _updateQueued: false,
      _origin: false,
      getOrigin() {
        if (this._origin) return this._origin
        const routifyCtx = getRoutifyContext();
        return routifyCtx && get_store_value(routifyCtx).path || '/'
      },
      _pendingUpdate: false
    };


    /**
     * metatags
     * @prop {Object.<string, string>}
     */
    const metatags = new Proxy(_metatags, {
      set(target, name, value, receiver) {
        const {props} = target;

        if (Reflect.has(target, name))
          Reflect.set(target, name, value, receiver);
        else {
          props[name] = props[name] || {};
          props[name][target.getOrigin()] = value;
        }

        if (window['routify'].appLoaded)
          target.batchedUpdate();
        return true
      }
    });

    /* node_modules/@roxi/routify/runtime/Route.svelte generated by Svelte v3.49.0 */
    const file$e = "node_modules/@roxi/routify/runtime/Route.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[21] = list[i].component;
    	child_ctx[22] = list[i].componentFile;
    	child_ctx[2] = list[i].decorator;
    	child_ctx[1] = list[i].nodes;
    	return child_ctx;
    }

    // (109:0) {#if $context}
    function create_if_block_1(ctx) {
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_1_anchor;
    	let current;
    	let each_value = [/*$context*/ ctx[4]];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*id*/ ctx[7];
    	validate_each_keys(ctx, each_value, get_each_context$1, get_key);

    	for (let i = 0; i < 1; i += 1) {
    		let child_ctx = get_each_context$1(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < 1; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < 1; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$context, scoped, scopedSync, node, decorator, scopeToChild, id*/ 33554621) {
    				each_value = [/*$context*/ ctx[4]];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$1, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block$1, each_1_anchor, get_each_context$1);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < 1; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < 1; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			for (let i = 0; i < 1; i += 1) {
    				each_blocks[i].d(detaching);
    			}

    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(109:0) {#if $context}",
    		ctx
    	});

    	return block;
    }

    // (120:8) {#if component && nodes.length}
    function create_if_block_2(ctx) {
    	let route_1;
    	let current;

    	route_1 = new Route({
    			props: {
    				decorator: /*decorator*/ ctx[2],
    				nodes: /*nodes*/ ctx[1],
    				scoped: {
    					.../*scoped*/ ctx[0],
    					.../*scopeToChild*/ ctx[25]
    				}
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(route_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(route_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const route_1_changes = {};
    			if (dirty & /*decorator*/ 4) route_1_changes.decorator = /*decorator*/ ctx[2];
    			if (dirty & /*$context*/ 16) route_1_changes.nodes = /*nodes*/ ctx[1];

    			if (dirty & /*scoped, scopeToChild*/ 33554433) route_1_changes.scoped = {
    				.../*scoped*/ ctx[0],
    				.../*scopeToChild*/ ctx[25]
    			};

    			route_1.$set(route_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(route_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(120:8) {#if component && nodes.length}",
    		ctx
    	});

    	return block;
    }

    // (112:6) <svelte:component         this={componentFile}         let:scoped={scopeToChild}         let:decorator         {scoped}         {scopedSync}         {...node.param || {}}       >
    function create_default_slot_1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*component*/ ctx[21] && /*nodes*/ ctx[1].length && create_if_block_2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*component*/ ctx[21] && /*nodes*/ ctx[1].length) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$context*/ 16) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(112:6) <svelte:component         this={componentFile}         let:scoped={scopeToChild}         let:decorator         {scoped}         {scopedSync}         {...node.param || {}}       >",
    		ctx
    	});

    	return block;
    }

    // (111:4) <svelte:component this={decorator} {scoped}>
    function create_default_slot$1(ctx) {
    	let switch_instance;
    	let t;
    	let current;

    	const switch_instance_spread_levels = [
    		{ scoped: /*scoped*/ ctx[0] },
    		{ scopedSync: /*scopedSync*/ ctx[5] },
    		/*node*/ ctx[3].param || {}
    	];

    	var switch_value = /*componentFile*/ ctx[22];

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: {
    				default: [
    					create_default_slot_1,
    					({ scoped: scopeToChild, decorator }) => ({ 25: scopeToChild, 2: decorator }),
    					({ scoped: scopeToChild, decorator }) => (scopeToChild ? 33554432 : 0) | (decorator ? 4 : 0)
    				]
    			},
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*scoped, scopedSync, node*/ 41)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*scoped*/ 1 && { scoped: /*scoped*/ ctx[0] },
    					dirty & /*scopedSync*/ 32 && { scopedSync: /*scopedSync*/ ctx[5] },
    					dirty & /*node*/ 8 && get_spread_object(/*node*/ ctx[3].param || {})
    				])
    			: {};

    			if (dirty & /*$$scope, decorator, $context, scoped, scopeToChild*/ 100663317) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*componentFile*/ ctx[22])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, t.parentNode, t);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (switch_instance) destroy_component(switch_instance, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(111:4) <svelte:component this={decorator} {scoped}>",
    		ctx
    	});

    	return block;
    }

    // (110:2) {#each [$context] as { component, componentFile, decorator, nodes }
    function create_each_block$1(key_1, ctx) {
    	let first;
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*decorator*/ ctx[2];

    	function switch_props(ctx) {
    		return {
    			props: {
    				scoped: /*scoped*/ ctx[0],
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);

    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const switch_instance_changes = {};
    			if (dirty & /*scoped*/ 1) switch_instance_changes.scoped = /*scoped*/ ctx[0];

    			if (dirty & /*$$scope, $context, scoped, scopedSync, node, decorator*/ 67108925) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*decorator*/ ctx[2])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(110:2) {#each [$context] as { component, componentFile, decorator, nodes }",
    		ctx
    	});

    	return block;
    }

    // (133:0) {#if !parentNode}
    function create_if_block$1(ctx) {
    	let div;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			set_style(div, "display", "contents");
    			add_location(div, file$e, 133, 2, 4153);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (!mounted) {
    				dispose = action_destroyer(/*setParentNode*/ ctx[10].call(null, div));
    				mounted = true;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(133:0) {#if !parentNode}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let t;
    	let if_block1_anchor;
    	let current;
    	let if_block0 = /*$context*/ ctx[4] && create_if_block_1(ctx);
    	let if_block1 = !/*parentNode*/ ctx[6] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$context*/ ctx[4]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*$context*/ 16) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t.parentNode, t);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (!/*parentNode*/ ctx[6]) {
    				if (if_block1) ; else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let id;
    	let $context;
    	let $route;
    	let $parentContext;
    	let $routes;
    	validate_store(route, 'route');
    	component_subscribe($$self, route, $$value => $$invalidate(14, $route = $$value));
    	validate_store(routes$1, 'routes');
    	component_subscribe($$self, routes$1, $$value => $$invalidate(16, $routes = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Route', slots, []);
    	let { nodes = [] } = $$props;
    	let { scoped = {} } = $$props;
    	let { decorator = undefined } = $$props;

    	/** @type {LayoutOrDecorator} */
    	let node = null;

    	let remainingNodes = null;
    	let scopedSync = {};
    	let parentNode;
    	let invalidate = 1;
    	const context = writable(null);
    	validate_store(context, 'context');
    	component_subscribe($$self, context, value => $$invalidate(4, $context = value));

    	/** @type {import("svelte/store").Writable<Context>} */
    	const parentContext = getContext('routify') || rootContext;

    	validate_store(parentContext, 'parentContext');
    	component_subscribe($$self, parentContext, value => $$invalidate(15, $parentContext = value));
    	const setParentNode = el => $$invalidate(6, parentNode = el.parentNode);
    	setContext('routify', context);
    	let lastNodes = [];

    	/**  @param {LayoutOrDecorator} node */
    	function setComponent(node) {
    		let PendingComponent = node.component();
    		if (PendingComponent instanceof Promise) PendingComponent.then(onComponentLoaded); else onComponentLoaded(PendingComponent);
    	}

    	/** @param {SvelteComponent} componentFile */
    	function onComponentLoaded(componentFile) {
    		$$invalidate(5, scopedSync = { ...scoped });

    		// we have to proxy remaining nodes through ctx (instead of props) or route changes get propagated
    		// to leaf layouts of to-be-destroyed-layouts
    		const ctx = {
    			//we need to keep any possible context.child or the layout will be childless until the new child has been rendered
    			...$context,
    			nodes: remainingNodes,
    			decorator: decorator || Noop,
    			layout: node.isLayout ? node : $parentContext.layout,
    			component: node,
    			route: $route,
    			routes: $routes,
    			componentFile,
    			parentNode: parentNode || $parentContext.parentNode
    		};

    		context.set(ctx);
    		set_store_value(parentContext, $parentContext.child = node, $parentContext);
    		if (remainingNodes.length === 0) onLastComponentLoaded();
    	}

    	async function onLastComponentLoaded() {
    		await new Promise(resolve => setTimeout(resolve));
    		const isOnCurrentRoute = $context.component.path === $route.path; //maybe we're getting redirected

    		// Let everyone know the last child has rendered
    		if (!window['routify'].stopAutoReady && isOnCurrentRoute) onPageLoaded({
    			page: $context.component,
    			metatags,
    			afterPageLoad,
    			parentNode
    		});
    	}

    	/**  @param {ClientNode} layout */
    	function getID({ meta, path, param, params }) {
    		return JSON.stringify({
    			path,
    			invalidate,
    			param: (meta['param-is-page'] || meta['slug-is-page']) && param,
    			queryParams: meta['query-params-is-page'] && params
    		});
    	}

    	const writable_props = ['nodes', 'scoped', 'decorator'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Route> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('nodes' in $$props) $$invalidate(1, nodes = $$props.nodes);
    		if ('scoped' in $$props) $$invalidate(0, scoped = $$props.scoped);
    		if ('decorator' in $$props) $$invalidate(2, decorator = $$props.decorator);
    	};

    	$$self.$capture_state = () => ({
    		suppressComponentWarnings,
    		Noop,
    		getContext,
    		setContext,
    		tick,
    		writable,
    		metatags,
    		afterPageLoad,
    		route,
    		routes: routes$1,
    		rootContext,
    		handleScroll,
    		onPageLoaded,
    		nodes,
    		scoped,
    		decorator,
    		node,
    		remainingNodes,
    		scopedSync,
    		parentNode,
    		invalidate,
    		context,
    		parentContext,
    		setParentNode,
    		lastNodes,
    		setComponent,
    		onComponentLoaded,
    		onLastComponentLoaded,
    		getID,
    		id,
    		$context,
    		$route,
    		$parentContext,
    		$routes
    	});

    	$$self.$inject_state = $$props => {
    		if ('nodes' in $$props) $$invalidate(1, nodes = $$props.nodes);
    		if ('scoped' in $$props) $$invalidate(0, scoped = $$props.scoped);
    		if ('decorator' in $$props) $$invalidate(2, decorator = $$props.decorator);
    		if ('node' in $$props) $$invalidate(3, node = $$props.node);
    		if ('remainingNodes' in $$props) remainingNodes = $$props.remainingNodes;
    		if ('scopedSync' in $$props) $$invalidate(5, scopedSync = $$props.scopedSync);
    		if ('parentNode' in $$props) $$invalidate(6, parentNode = $$props.parentNode);
    		if ('invalidate' in $$props) $$invalidate(11, invalidate = $$props.invalidate);
    		if ('lastNodes' in $$props) $$invalidate(12, lastNodes = $$props.lastNodes);
    		if ('id' in $$props) $$invalidate(7, id = $$props.id);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*lastNodes, nodes, invalidate*/ 6146) {
    			if (lastNodes !== nodes) {
    				$$invalidate(12, lastNodes = nodes);
    				$$invalidate(3, [node, ...remainingNodes] = [...nodes], node);
    				$$invalidate(3, node.api.reset = () => $$invalidate(11, invalidate++, invalidate), node);
    			}
    		}

    		if ($$self.$$.dirty & /*node*/ 8) {
    			setComponent(node);
    		}

    		if ($$self.$$.dirty & /*$context, invalidate*/ 2064) {
    			$$invalidate(7, id = $context && invalidate && getID($context.component));
    		}

    		if ($$self.$$.dirty & /*$context*/ 16) {
    			$context && suppressComponentWarnings($context, tick);
    		}
    	};

    	return [
    		scoped,
    		nodes,
    		decorator,
    		node,
    		$context,
    		scopedSync,
    		parentNode,
    		id,
    		context,
    		parentContext,
    		setParentNode,
    		invalidate,
    		lastNodes
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$g, create_fragment$g, safe_not_equal, { nodes: 1, scoped: 0, decorator: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$g.name
    		});
    	}

    	get nodes() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nodes(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get scoped() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set scoped(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get decorator() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set decorator(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function init(routes, callback) {
      /** @type { ClientNode | false } */
      let lastRoute = false;

      function updatePage(proxyToUrl, shallow) {
        const url = proxyToUrl || currentLocation().fullpath;
        const route$1 = urlToRoute(url);
        if (route$1.redirectTo) {
          history.replaceStateNative({}, null, route$1.redirectTo);
          delete route$1.redirectTo;
        }

        const currentRoute = shallow && urlToRoute(currentLocation().fullpath, routes);
        const contextRoute = currentRoute || route$1;
        const nodes = [...contextRoute.layouts, route$1];
        if (lastRoute) delete lastRoute.last; //todo is a page component the right place for the previous route?
        route$1.last = lastRoute;
        lastRoute = route$1;

        //set the route in the store
        if (!proxyToUrl)
          urlRoute.set(route$1);
        route.set(route$1);

        //preload components in parallel
        route$1.api.preload().then(() => {
          //run callback in Router.svelte    
          isChangingPage.set(true);
          callback(nodes);
        });
      }

      const destroy = createEventListeners(updatePage);

      return { updatePage, destroy }
    }

    /**
     * svelte:window events doesn't work on refresh
     * @param {Function} updatePage
     */
    function createEventListeners(updatePage) {
    ['pushState', 'replaceState'].forEach(eventName => {
        if (!history[eventName + 'Native'])
          history[eventName + 'Native'] = history[eventName];
        history[eventName] = async function (state = {}, title, url) {
          // do nothing if we're navigating to the current page
          const currentUrl = location.pathname + location.search + location.hash;
          if (url === currentUrl) return false

          const { id, path, params } = get_store_value(route);
          state = { id, path, params, ...state };
          const event = new Event(eventName.toLowerCase());
          Object.assign(event, { state, title, url });

          const route$1 = await runHooksBeforeUrlChange(event, url);
          if (route$1) {
            history[eventName + 'Native'].apply(this, [state, title, url]);
            return dispatchEvent(event)
          }
        };
      });

      let _ignoreNextPop = false;

      const listeners = {
        click: handleClick,
        pushstate: () => updatePage(),
        replacestate: () => updatePage(),
        popstate: async event => {
          if (_ignoreNextPop)
            _ignoreNextPop = false;
          else {
            if (await runHooksBeforeUrlChange(event, currentLocation().fullpath)) {
              updatePage();
            } else {
              _ignoreNextPop = true;
              event.preventDefault();
              history.go(1);
            }
          }
        },
      };

      Object.entries(listeners).forEach(args => addEventListener(...args));

      const unregister = () => {
        Object.entries(listeners).forEach(args => removeEventListener(...args));
      };

      return unregister
    }

    function handleClick(event) {
      const el = event.target.closest('a');
      const href = el && el.href;

      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey ||
        event.button ||
        event.defaultPrevented
      )
        return
      if (!href || el.target || el.host !== location.host) return

      const url = new URL(href);
      const relativeUrl = url.pathname + url.search + url.hash;

      event.preventDefault();
      history.pushState({}, '', relativeUrl);
    }

    async function runHooksBeforeUrlChange(event, url) {
      const route = urlToRoute(url).api;
      for (const hook of beforeUrlChange._hooks.filter(Boolean)) {
        // return false if the hook returns false
        const result = await hook(event, route, { url });
        if (!result) return false
      }
      return true
    }

    /* node_modules/@roxi/routify/runtime/Router.svelte generated by Svelte v3.49.0 */

    const { Object: Object_1 } = globals;

    // (58:0) {#if nodes && $route !== null}
    function create_if_block(ctx) {
    	let route_1;
    	let current;

    	route_1 = new Route({
    			props: { nodes: /*nodes*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(route_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(route_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const route_1_changes = {};
    			if (dirty & /*nodes*/ 1) route_1_changes.nodes = /*nodes*/ ctx[0];
    			route_1.$set(route_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(route_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(58:0) {#if nodes && $route !== null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let t;
    	let prefetcher;
    	let current;
    	let if_block = /*nodes*/ ctx[0] && /*$route*/ ctx[1] !== null && create_if_block(ctx);
    	prefetcher = new Prefetcher({ $$inline: true });

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			t = space();
    			create_component(prefetcher.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(prefetcher, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*nodes*/ ctx[0] && /*$route*/ ctx[1] !== null) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*nodes, $route*/ 3) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(t.parentNode, t);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(prefetcher.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(prefetcher.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(prefetcher, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let $route;
    	validate_store(route, 'route');
    	component_subscribe($$self, route, $$value => $$invalidate(1, $route = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, []);
    	let { routes } = $$props;
    	let { config = {} } = $$props;
    	let nodes;
    	let navigator;
    	window.routify = window.routify || {};
    	window.routify.inBrowser = !window.navigator.userAgent.match('jsdom');
    	Object.assign(defaultConfig, config);
    	const updatePage = (...args) => navigator && navigator.updatePage(...args);
    	setContext('routifyupdatepage', updatePage);
    	const callback = res => $$invalidate(0, nodes = res);

    	const cleanup = () => {
    		if (!navigator) return;
    		navigator.destroy();
    		navigator = null;
    	};

    	let initTimeout = null;

    	// init is async to prevent a horrible bug that completely disable reactivity
    	// in the host component -- something like the component's update function is
    	// called before its fragment is created, and since the component is then seen
    	// as already dirty, it is never scheduled for update again, and remains dirty
    	// forever... I failed to isolate the precise conditions for the bug, but the
    	// faulty update is triggered by a change in the route store, and so offseting
    	// store initialization by one tick gives the host component some time to
    	// create its fragment. The root cause it probably a bug in Svelte with deeply
    	// intertwinned store and reactivity.
    	const doInit = () => {
    		clearTimeout(initTimeout);

    		initTimeout = setTimeout(() => {
    			cleanup();
    			navigator = init(routes, callback);
    			routes$1.set(routes);
    			navigator.updatePage();
    		});
    	};

    	onDestroy(cleanup);
    	const writable_props = ['routes', 'config'];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('routes' in $$props) $$invalidate(2, routes = $$props.routes);
    		if ('config' in $$props) $$invalidate(3, config = $$props.config);
    	};

    	$$self.$capture_state = () => ({
    		setContext,
    		onDestroy,
    		Route,
    		Prefetcher,
    		init,
    		route,
    		routesStore: routes$1,
    		defaultConfig,
    		routes,
    		config,
    		nodes,
    		navigator,
    		updatePage,
    		callback,
    		cleanup,
    		initTimeout,
    		doInit,
    		$route
    	});

    	$$self.$inject_state = $$props => {
    		if ('routes' in $$props) $$invalidate(2, routes = $$props.routes);
    		if ('config' in $$props) $$invalidate(3, config = $$props.config);
    		if ('nodes' in $$props) $$invalidate(0, nodes = $$props.nodes);
    		if ('navigator' in $$props) navigator = $$props.navigator;
    		if ('initTimeout' in $$props) initTimeout = $$props.initTimeout;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*routes*/ 4) {
    			if (routes) doInit();
    		}
    	};

    	return [nodes, $route, routes, config];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$f, create_fragment$f, safe_not_equal, { routes: 2, config: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$f.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*routes*/ ctx[2] === undefined && !('routes' in props)) {
    			console.warn("<Router> was created without expected prop 'routes'");
    		}
    	}

    	get routes() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routes(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get config() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set config(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /** 
     * Node payload
     * @typedef {Object} NodePayload
     * @property {RouteNode=} file current node
     * @property {RouteNode=} parent parent of the current node
     * @property {StateObject=} state state shared by every node in the walker
     * @property {Object=} scope scope inherited by descendants in the scope
     *
     * State Object
     * @typedef {Object} StateObject
     * @prop {TreePayload=} treePayload payload from the tree
     * 
     * Node walker proxy
     * @callback NodeWalkerProxy
     * @param {NodePayload} NodePayload
     */


    /**
     * Node middleware
     * @description Walks through the nodes of a tree
     * @example middleware = createNodeMiddleware(payload => {payload.file.name = 'hello'})(treePayload))
     * @param {NodeWalkerProxy} fn 
     */
    function createNodeMiddleware(fn) {

        /**    
         * NodeMiddleware payload receiver
         * @param {TreePayload} payload
         */
        const inner = async function execute(payload) {
            return await nodeMiddleware(fn, {
                file: payload.tree,
                state: { treePayload: payload },
                scope: {}
            })
        };

        /**    
         * NodeMiddleware sync payload receiver
         * @param {TreePayload} payload
         */
        inner.sync = function executeSync(payload) {
            return nodeMiddlewareSync(fn, {
                file: payload.tree,
                state: { treePayload: payload },
                scope: {}
            })
        };

        return inner
    }

    /**
     * Node walker
     * @param {NodeWalkerProxy} fn function to be called for each file
     * @param {NodePayload=} payload 
     */
    async function nodeMiddleware(fn, payload) {
        const _file = await fn(payload);
        if (_file === false) return false
        const file = _file || payload.file;

        if (file.children) {
            const children = await Promise.all(file.children.map(async _file => nodeMiddleware(fn, {
                state: payload.state,
                scope: clone(payload.scope || {}),
                parent: payload.file,
                file: await _file
            })));
            file.children = children.filter(Boolean);
        }

        return file
    }

    /**
     * Node walker (sync version)
     * @param {NodeWalkerProxy} fn function to be called for each file
     * @param {NodePayload=} payload 
     */
    function nodeMiddlewareSync(fn, payload) {
        const _file = fn(payload);
        if (_file === false) return false

        const file = _file || payload.file;

        if (file.children) {
            const children = file.children.map(_file => nodeMiddlewareSync(fn, {
                state: payload.state,
                scope: clone(payload.scope || {}),
                parent: payload.file,
                file: _file
            }));
            file.children = children.filter(Boolean);
        }

        return file
    }


    /**
     * Clone with JSON
     * @param {T} obj 
     * @returns {T} JSON cloned object
     * @template T
     */
    function clone(obj) { return JSON.parse(JSON.stringify(obj)) }

    const setRegex = createNodeMiddleware(({ file }) => {
        if (file.isPage || file.isFallback)
            file.regex = pathToRegex(file.path, file.isFallback);
    });
    const setParamKeys = createNodeMiddleware(({ file }) => {
        file.paramKeys = pathToParamKeys(file.path);
    });

    const setShortPath = createNodeMiddleware(({ file }) => {
        if (file.isFallback || file.isIndex)
            file.shortPath = file.path.replace(/\/[^/]+$/, '');
        else file.shortPath = file.path;
    });
    const setRank = createNodeMiddleware(({ file }) => {
        file.ranking = pathToRank(file);
    });


    // todo delete?
    const addMetaChildren = createNodeMiddleware(({ file }) => {
        const node = file;
        const metaChildren = file.meta && file.meta.children || [];
        if (metaChildren.length) {
            node.children = node.children || [];
            node.children.push(...metaChildren.map(meta => ({ isMeta: true, ...meta, meta })));
        }
    });

    const setIsIndexable = createNodeMiddleware(payload => {
        const { file } = payload;
        const { isFallback, meta } = file;
        const isDynamic = file.path.split('/').pop().startsWith(':');
        const isIndex = file.path.endsWith('/index');
        const isIndexed = meta.index || meta.index === 0;
        const isHidden = meta.index === false;

        file.isIndexable = isIndexed || (!isFallback && !isDynamic && !isIndex && !isHidden);
        file.isNonIndexable = !file.isIndexable;
    });

    const assignRelations = createNodeMiddleware(({ file, parent }) => {
        Object.defineProperty(file, 'parent', { get: () => parent });
        Object.defineProperty(file, 'nextSibling', { get: () => _getSibling(file, 1) });
        Object.defineProperty(file, 'prevSibling', { get: () => _getSibling(file, -1) });
        Object.defineProperty(file, 'lineage', { get: () => _getLineage(parent) });
    });

    function _getLineage(node, lineage = []) {
        if (node) {
            lineage.unshift(node);
            _getLineage(node.parent, lineage);
        }
        return lineage
    }

    /**
     * 
     * @param {RouteNode} file 
     * @param {Number} direction 
     */
    function _getSibling(file, direction) {
        if (!file.root) {
            const siblings = file.parent.children.filter(c => c.isIndexable);
            const index = siblings.indexOf(file);
            return siblings[index + direction]
        }
    }

    const assignIndex = createNodeMiddleware(({ file, parent }) => {
        if (file.isIndex) Object.defineProperty(parent, 'index', { get: () => file });
    });

    const assignLayout = createNodeMiddleware(({ file, scope }) => {
        // create a layouts getter
        Object.defineProperty(file, 'layouts', { get: () => getLayouts(file) });

        /**
         * returns a list of layouts by recursively traversing the AST ancestry
         * @param {RouteNode} file 
         * @returns {RouteNode[]}
         */
        function getLayouts(file) {
            // if this isn't a layout and it's reset, return an empty array
            if (!file.isLayout && file.meta.reset) return []

            const { parent } = file;
            const layout = parent && parent.component && parent;
            const isReset = layout && (layout.isReset || layout.meta.reset);
            const layouts = (parent && !isReset && getLayouts(parent)) || [];
            if (layout) layouts.push(layout);
            return layouts
        }
    });


    const createFlatList = treePayload => {
        createNodeMiddleware(payload => {
            if (payload.file.isPage || payload.file.isFallback)
                payload.state.treePayload.routes.push(payload.file);
        }).sync(treePayload);
        treePayload.routes.sort((c, p) => (c.ranking >= p.ranking ? -1 : 1));
    };

    const setPrototype = createNodeMiddleware(({ file }) => {
        const Prototype = file.root
            ? Root
            : file.children
                ? file.isPage ? PageDir : Dir
                : file.isReset
                    ? Reset
                    : file.isLayout
                        ? Layout
                        : file.isFallback
                            ? Fallback
                            : Page;
        Object.setPrototypeOf(file, Prototype.prototype);

        function Layout() { }
        function Dir() { }
        function Fallback() { }
        function Page() { }
        function PageDir() { }
        function Reset() { }
        function Root() { }
    });

    var miscPlugins = /*#__PURE__*/Object.freeze({
        __proto__: null,
        setRegex: setRegex,
        setParamKeys: setParamKeys,
        setShortPath: setShortPath,
        setRank: setRank,
        addMetaChildren: addMetaChildren,
        setIsIndexable: setIsIndexable,
        assignRelations: assignRelations,
        assignIndex: assignIndex,
        assignLayout: assignLayout,
        createFlatList: createFlatList,
        setPrototype: setPrototype
    });

    const defaultNode = {
        "isDir": false,
        "ext": "svelte",
        "isLayout": false,
        "isReset": false,
        "isIndex": false,
        "isFallback": false,
        "isPage": false,
        "ownMeta": {},
        "meta": {
            "recursive": true,
            "preload": false,
            "prerender": true
        },
        "id": "__fallback",
    };

    function restoreDefaults(node) {
        Object.entries(defaultNode).forEach(([key, value]) => {
            if (typeof node[key] === 'undefined')
                node[key] = value;
        });
        
        if(node.children)
            node.children = node.children.map(restoreDefaults);

        return node
    }

    const assignAPI = createNodeMiddleware(({ file }) => {
        file.api = new ClientApi(file);
    });

    class ClientApi {
        constructor(file) {
            this.__file = file;
            Object.defineProperty(this, '__file', { enumerable: false });
            this.isMeta = !!file.isMeta;
            this.path = file.path;
            this.title = _prettyName(file);
            this.meta = file.meta;
        }

        get parent() { return !this.__file.root && this.__file.parent.api }
        get children() {
            return (this.__file.children || this.__file.isLayout && this.__file.parent.children || [])
                .filter(c => !c.isNonIndexable)
                .sort((a, b) => {
                    if (a.isMeta && b.isMeta) return 0
                    a = (a.meta.index || a.meta.title || a.path).toString();
                    b = (b.meta.index || b.meta.title || b.path).toString();
                    return a.localeCompare((b), undefined, { numeric: true, sensitivity: 'base' })
                })
                .map(({ api }) => api)
        }
        get next() { return _navigate(this, +1) }
        get prev() { return _navigate(this, -1) }
        async preload() {
            const filePromises = [
                ...this.__file.layouts,
                this.__file,
                this.index && this.index.__file //if this is a layout, we want to include its index
            ]
                .filter(Boolean)
                .map(file => file.component());
            await Promise.all(filePromises);
        }
        get component() {
            return this.__file.component ? //is file?
                this.__file.component()
                : this.__file.index ? //is dir with index?
                    this.__file.index.component()
                    : false
        }
        get componentWithIndex() {
            return new Promise(resolve =>
                Promise.all([
                    this.component,
                    this.index && this.index.component
                ])
                    .then(res => resolve(res))
            )
        }
        get index() {
            const child = this.__file.children &&
                this.__file.children.find(child => child.isIndex);
            return child && child.api
        }
    }

    function _navigate(node, direction) {
        if (!node.__file.root) {
            const siblings = node.parent.children;
            const index = siblings.indexOf(node);
            return node.parent.children[index + direction]
        }
    }


    function _prettyName(file) {
        if (typeof file.meta.title !== 'undefined') return file.meta.title
        else return (file.shortPath || file.path)
            .split('/')
            .pop()
            .replace(/-/g, ' ')
    }

    const plugins = {
      ...miscPlugins,
      restoreDefaults: ({ tree }) => restoreDefaults(tree),
      assignAPI
    };

    function buildClientTree(tree) {
      const order = [
        // all
        "restoreDefaults",
        // pages
        "setParamKeys", //pages only
        "setRegex", //pages only
        "setShortPath", //pages only
        "setRank", //pages only
        "assignLayout", //pages only,
        // all
        "setPrototype",
        "addMetaChildren",
        "assignRelations", //all (except meta components?)
        "setIsIndexable", //all
        "assignIndex", //all
        "assignAPI", //all
        // routes
        "createFlatList"
      ];

      const payload = { tree, routes: [] };
      for (let name of order) {
        // if plugin is a createNodeMiddleware, use the sync function
        const fn = plugins[name].sync || plugins[name];
        fn(payload);
      }
      return payload
    }

    /* src/components/shape.svelte generated by Svelte v3.49.0 */
    const file$d = "src/components/shape.svelte";

    function create_fragment$e(ctx) {
    	let t;
    	let div;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			t = space();
    			div = element("div");
    			attr_dev(div, "class", "shape svelte-1se6t4g");
    			toggle_class(div, "shapeColor", /*shapeColor*/ ctx[0]);
    			toggle_class(div, "shapeInvert", /*shapeInvert*/ ctx[1]);
    			toggle_class(div, "circle", /*circle*/ ctx[2]);
    			add_location(div, file$d, 117, 0, 3466);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			insert_dev(target, div, anchor);
    			/*div_binding*/ ctx[10](div);

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "resize", /*handleResize*/ ctx[5], false, false, false),
    					listen_dev(document.body, "mousemove", /*handleMouseMove*/ ctx[4], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*shapeColor*/ 1) {
    				toggle_class(div, "shapeColor", /*shapeColor*/ ctx[0]);
    			}

    			if (dirty & /*shapeInvert*/ 2) {
    				toggle_class(div, "shapeInvert", /*shapeInvert*/ ctx[1]);
    			}

    			if (dirty & /*circle*/ 4) {
    				toggle_class(div, "circle", /*circle*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(div);
    			/*div_binding*/ ctx[10](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const INTERACTION_DISTANCE = 5;
    const DAMPENING_CONST = 0.025;

    // the factor that speed decays (higher = faster decay = shapes slow down faster)
    const DECAY = 0.07;

    function instance$e($$self, $$props, $$invalidate) {
    	let centerX;
    	let centerY;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Shape', slots, []);
    	let { shapeColor = false } = $$props;
    	let { shapeInvert = true } = $$props;
    	let { circle = false } = $$props;
    	let { fullScreen = false } = $$props;
    	let ref;
    	let boundingBox;
    	let bodyRef;
    	let x;
    	let y;
    	let size;
    	let interval;

    	onMount(() => {
    		// So the shapes don't flash at (0,0) before JS sets their position
    		setTimeout(() => $$invalidate(3, ref.style.visibility = "visible", ref), 150);

    		$$invalidate(3, ref.parentElement.style.position = "relative", ref);

    		if (fullScreen) {
    			boundingBox = bodyRef.getBoundingClientRect();
    		} else {
    			boundingBox = ref.parentElement.getBoundingClientRect();
    		}

    		let lim = Math.min(boundingBox.width, boundingBox.height, 500);

    		$$invalidate(9, size = circle
    		? rand(0.25 * lim, 0.03 * lim)
    		: rand(0.25 * lim, 0.55 * lim));

    		$$invalidate(3, ref.style.width = size + "px", ref);
    		$$invalidate(3, ref.style.height = size + "px", ref);
    		$$invalidate(7, x = rand(boundingBox.left, boundingBox.width - size));
    		$$invalidate(8, y = rand(boundingBox.top, boundingBox.height - size));

    		// for shape movement
    		interval = setInterval(
    			() => {
    				$$invalidate(3, ref.style.left = `${x - boundingBox.left}px`, ref);
    				$$invalidate(3, ref.style.top = `${y - boundingBox.top}px`, ref);
    				$$invalidate(7, x += dx);
    				$$invalidate(8, y += dy);

    				//COLLISION LOGIC
    				if (x >= boundingBox.right - size) {
    					dx *= -1;
    					$$invalidate(7, x = boundingBox.right - size);
    				}

    				if (x <= boundingBox.left) {
    					dx *= -1;
    					$$invalidate(7, x = boundingBox.left);
    				}

    				if (y >= boundingBox.bottom - size) {
    					dy *= -1;
    					$$invalidate(8, y = boundingBox.bottom - size);
    				}

    				if (y <= boundingBox.top) {
    					dy *= -1;
    					$$invalidate(8, y = boundingBox.top);
    				}

    				//decay to slower speed
    				if (dx > 2) {
    					dx -= DECAY;
    				}

    				if (dx < -2) {
    					dx += DECAY;
    				}

    				if (dy > 2) {
    					dy -= DECAY;
    				}

    				if (dy < -2) {
    					dx += DECAY;
    				}
    			},
    			1000 / 30
    		);
    	});

    	const rand = (min, max) => {
    		return Math.random() * (max - min) + min | 0;
    	};

    	const dist = (x1, y1, x2, y2) => {
    		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    	};

    	let dx = rand(-10, 10) / 5;
    	let dy = rand(-10, 10) / 5;

    	// the absolute position of the mouse
    	let m = { x: 0, y: 0 };

    	// the absolute vector direction that the mouse is traveling in.
    	let v = { x: 0, y: 0 };

    	// Dampens the mouse vector moving shapes (smaller = mouse has less effect on shapes)
    	const handleMouseMove = e => {
    		let relMX = e.clientX;
    		let relMY = e.clientY;
    		v.x = relMX - m.x;
    		v.y = relMY - m.y;
    		m.x = relMX;
    		m.y = relMY;
    		let d = dist(centerX, centerY, m.x, m.y);

    		if (d < size / 2 + INTERACTION_DISTANCE) {
    			let dFact = Math.pow(20, -(d / 400));
    			dx += v.x * DAMPENING_CONST * dFact;
    			dy += v.y * DAMPENING_CONST * dFact;
    		}
    	};

    	const handleResize = () => {
    		if (fullScreen) {
    			boundingBox = bodyRef.getBoundingClientRect();
    		} else {
    			boundingBox = ref.parentElement.getBoundingClientRect();
    		}
    	};

    	onDestroy(() => {
    		clearInterval(interval);
    	});

    	const writable_props = ['shapeColor', 'shapeInvert', 'circle', 'fullScreen'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Shape> was created with unknown prop '${key}'`);
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			ref = $$value;
    			$$invalidate(3, ref);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('shapeColor' in $$props) $$invalidate(0, shapeColor = $$props.shapeColor);
    		if ('shapeInvert' in $$props) $$invalidate(1, shapeInvert = $$props.shapeInvert);
    		if ('circle' in $$props) $$invalidate(2, circle = $$props.circle);
    		if ('fullScreen' in $$props) $$invalidate(6, fullScreen = $$props.fullScreen);
    	};

    	$$self.$capture_state = () => ({
    		onDestroy,
    		onMount,
    		shapeColor,
    		shapeInvert,
    		circle,
    		fullScreen,
    		INTERACTION_DISTANCE,
    		DAMPENING_CONST,
    		DECAY,
    		ref,
    		boundingBox,
    		bodyRef,
    		x,
    		y,
    		size,
    		interval,
    		rand,
    		dist,
    		dx,
    		dy,
    		m,
    		v,
    		handleMouseMove,
    		handleResize,
    		centerY,
    		centerX
    	});

    	$$self.$inject_state = $$props => {
    		if ('shapeColor' in $$props) $$invalidate(0, shapeColor = $$props.shapeColor);
    		if ('shapeInvert' in $$props) $$invalidate(1, shapeInvert = $$props.shapeInvert);
    		if ('circle' in $$props) $$invalidate(2, circle = $$props.circle);
    		if ('fullScreen' in $$props) $$invalidate(6, fullScreen = $$props.fullScreen);
    		if ('ref' in $$props) $$invalidate(3, ref = $$props.ref);
    		if ('boundingBox' in $$props) boundingBox = $$props.boundingBox;
    		if ('bodyRef' in $$props) bodyRef = $$props.bodyRef;
    		if ('x' in $$props) $$invalidate(7, x = $$props.x);
    		if ('y' in $$props) $$invalidate(8, y = $$props.y);
    		if ('size' in $$props) $$invalidate(9, size = $$props.size);
    		if ('interval' in $$props) interval = $$props.interval;
    		if ('dx' in $$props) dx = $$props.dx;
    		if ('dy' in $$props) dy = $$props.dy;
    		if ('m' in $$props) m = $$props.m;
    		if ('v' in $$props) v = $$props.v;
    		if ('centerY' in $$props) centerY = $$props.centerY;
    		if ('centerX' in $$props) centerX = $$props.centerX;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*x, size*/ 640) {
    			centerX = x + size / 2;
    		}

    		if ($$self.$$.dirty & /*y, size*/ 768) {
    			centerY = y + size / 2;
    		}
    	};

    	return [
    		shapeColor,
    		shapeInvert,
    		circle,
    		ref,
    		handleMouseMove,
    		handleResize,
    		fullScreen,
    		x,
    		y,
    		size,
    		div_binding
    	];
    }

    class Shape extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$e, create_fragment$e, safe_not_equal, {
    			shapeColor: 0,
    			shapeInvert: 1,
    			circle: 2,
    			fullScreen: 6
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Shape",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get shapeColor() {
    		throw new Error("<Shape>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set shapeColor(value) {
    		throw new Error("<Shape>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get shapeInvert() {
    		throw new Error("<Shape>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set shapeInvert(value) {
    		throw new Error("<Shape>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get circle() {
    		throw new Error("<Shape>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set circle(value) {
    		throw new Error("<Shape>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fullScreen() {
    		throw new Error("<Shape>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fullScreen(value) {
    		throw new Error("<Shape>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/PageTitle.svelte generated by Svelte v3.49.0 */
    const file$c = "src/components/PageTitle.svelte";

    function create_fragment$d(ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let t1;
    	let shape0;
    	let t2;
    	let shape1;
    	let t3;
    	let shape2;
    	let t4;
    	let shape3;
    	let t5;
    	let a;
    	let t6;
    	let a_href_value;
    	let t7;
    	let br0;
    	let br1;
    	let current;

    	shape0 = new Shape({
    			props: { shapeInvert: true },
    			$$inline: true
    		});

    	shape1 = new Shape({
    			props: { shapeInvert: true },
    			$$inline: true
    		});

    	shape2 = new Shape({
    			props: { shapeInvert: true },
    			$$inline: true
    		});

    	shape3 = new Shape({
    			props: { shapeColor: true, circle: true },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			create_component(shape0.$$.fragment);
    			t2 = space();
    			create_component(shape1.$$.fragment);
    			t3 = space();
    			create_component(shape2.$$.fragment);
    			t4 = space();
    			create_component(shape3.$$.fragment);
    			t5 = space();
    			a = element("a");
    			t6 = text("← Back");
    			t7 = space();
    			br0 = element("br");
    			br1 = element("br");
    			attr_dev(div0, "class", "page-title");
    			add_location(div0, file$c, 6, 2, 177);
    			attr_dev(a, "href", a_href_value = /*$url*/ ctx[1]("/"));
    			add_location(a, file$c, 14, 2, 336);
    			add_location(br0, file$c, 15, 2, 379);
    			add_location(br1, file$c, 15, 8, 385);
    			attr_dev(div1, "class", "title-container");
    			add_location(div1, file$c, 5, 0, 145);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div0, t1);
    			mount_component(shape0, div0, null);
    			append_dev(div0, t2);
    			mount_component(shape1, div0, null);
    			append_dev(div0, t3);
    			mount_component(shape2, div0, null);
    			append_dev(div0, t4);
    			mount_component(shape3, div0, null);
    			append_dev(div1, t5);
    			append_dev(div1, a);
    			append_dev(a, t6);
    			append_dev(div1, t7);
    			append_dev(div1, br0);
    			append_dev(div1, br1);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);

    			if (!current || dirty & /*$url*/ 2 && a_href_value !== (a_href_value = /*$url*/ ctx[1]("/"))) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(shape0.$$.fragment, local);
    			transition_in(shape1.$$.fragment, local);
    			transition_in(shape2.$$.fragment, local);
    			transition_in(shape3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(shape0.$$.fragment, local);
    			transition_out(shape1.$$.fragment, local);
    			transition_out(shape2.$$.fragment, local);
    			transition_out(shape3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(shape0);
    			destroy_component(shape1);
    			destroy_component(shape2);
    			destroy_component(shape3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let $url;
    	validate_store(url, 'url');
    	component_subscribe($$self, url, $$value => $$invalidate(1, $url = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PageTitle', slots, []);
    	let { title = "New Page" } = $$props;
    	const writable_props = ['title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PageTitle> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ url, Shape, title, $url });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, $url];
    }

    class PageTitle extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$d, create_fragment$d, safe_not_equal, { title: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PageTitle",
    			options,
    			id: create_fragment$d.name
    		});
    	}

    	get title() {
    		throw new Error("<PageTitle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<PageTitle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/pages/about.svelte generated by Svelte v3.49.0 */
    const file$b = "src/pages/about.svelte";

    function create_fragment$c(ctx) {
    	let div5;
    	let div4;
    	let pagetitle;
    	let t0;
    	let div0;
    	let t2;
    	let br0;
    	let t3;
    	let br1;
    	let t4;
    	let br2;
    	let t5;
    	let br3;
    	let t6;
    	let br4;
    	let t7;
    	let br5;
    	let t8;
    	let br6;
    	let t9;
    	let br7;
    	let t10;
    	let div1;
    	let t12;
    	let a0;
    	let t14;
    	let br8;
    	let t15;
    	let br9;
    	let t16;
    	let br10;
    	let t17;
    	let br11;
    	let t18;
    	let a1;
    	let t20;
    	let br12;
    	let br13;
    	let t21;
    	let a2;
    	let t23;
    	let div2;
    	let t25;
    	let br14;
    	let t26;
    	let br15;
    	let t27;
    	let a3;
    	let t28;
    	let a3_href_value;
    	let t29;
    	let div3;
    	let t31;
    	let br16;
    	let t32;
    	let br17;
    	let t33;
    	let current;

    	pagetitle = new PageTitle({
    			props: { title: "About" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div4 = element("div");
    			create_component(pagetitle.$$.fragment);
    			t0 = text("\n    Hi, I'm Ben Lubas! I'm currently a student at Northeastern University studying\n    computer science. Firstly, welcome to my website! I hope you enjoyed the homepage,\n    I had a ton of fun making it. I'm going to split this about page into catagories,\n    so feel free to skip over the boring parts. First up...\n    ");
    			div0 = element("div");
    			div0.textContent = "Programming Experience";
    			t2 = text("\n    I got my start in computer science in high school, where I took two intro to\n    web dev courses, APCS A, and APCS Principles (which was a capstone course at\n    my school). In them, I learned HTML, CSS, JavaScript, PHP, and SQL. I went on\n    to take an independent study in computer science titled Advanced Web Dev. During\n    that class time I taught myself React, Node/Express, and MongoDB and created\n    another website for the school.\n\n    ");
    			br0 = element("br");
    			t3 = space();
    			br1 = element("br");
    			t4 = text("\n\n    As a side note, my senior year I also took a Math Python course that explored\n    basic mathematical modeling in Python. So I learned Python.\n\n    ");
    			br2 = element("br");
    			t5 = space();
    			br3 = element("br");
    			t6 = text("\n\n    The next summer I learned about Svelte, and decided that I'd like to know how\n    that works. I made a small practice site and followed the tutorial, and I remade\n    parts of an older React project.\n\n    ");
    			br4 = element("br");
    			t7 = space();
    			br5 = element("br");
    			t8 = text("\n\n    Then I went off to college, learned a functional language called Racket that's\n    only used to teaching. After that most of the course work has been in Java. In\n    the Fall 2021 semester, I'm taking courses that start to use C, and a few courses\n    have used a little bit of Python.\n\n    ");
    			br6 = element("br");
    			t9 = space();
    			br7 = element("br");
    			t10 = text("\n\n    Of note, throughout highschool I was learning some Git, and I stored my entire\n    senior year project on GitHub (in a private repo). This helped me learn terminal\n    commands, and I'm learning even more of those this semester. I'm also a Vim user,\n    I have the Vim extension configured on every editor that allows it.\n\n    ");
    			div1 = element("div");
    			div1.textContent = "This Website and Svelte";
    			t12 = text("\n    This site is built with Svelte, Svelte is basically a web framework like React\n    as far as writing components goes. The difference is in what happens next. Basically,\n    Svelte just compiles what you write to optimized HTML, CSS, and JS. If you'd\n    like to learn more, I'll link their\n    ");
    			a0 = element("a");
    			a0.textContent = "site";
    			t14 = text("\n    and you can look around. Using svelte for a website like this is perhaps slight\n    overkill, but it's fun. \n\n    ");
    			br8 = element("br");
    			t15 = space();
    			br9 = element("br");
    			t16 = text("\n\n    I ran into Svelte when v3.0 was launched, and started to learn it. I had already\n    used React, but I liked this much better. Svelte components are cleaner and make \n    more sense than React components.\n\n    ");
    			br10 = element("br");
    			t17 = space();
    			br11 = element("br");
    			t18 = text("\n\n    More technical stuff about the site, it's just a front end, I wanted to be able\n    to host it for free. I'm only using the Svelte framework with\n    ");
    			a1 = element("a");
    			a1.textContent = "Routify";
    			t20 = text("\n    for page routing. No additional external JS, no external CSS. I should note,\n    that I am making use of some of Svelte's built in animation functionality for\n    the text carousel. But everything else has been written by me.\n\n    ");
    			br12 = element("br");
    			br13 = element("br");
    			t21 = text("\n\n    This entire website is hosted on GitHub and the source code is visible there\n    as well.\n    ");
    			a2 = element("a");
    			a2.textContent = "Link.";
    			t23 = space();
    			div2 = element("div");
    			div2.textContent = "Education—High School";
    			t25 = text("\n    I graduated from high school in 2020; I was around the top of my class. I had\n    a 4.958 weighted GPA, took a bunch of AP classes, and was the assistant captain\n    of the Varsity Ice Hockey team. As a freshman I took two introductory CS courses,\n    CS1 & CS2. These introduced HTML, CSS, and JavaScript. Next year I took APCS\n    A (a course in Java). The year after I took APCS Principles (our capstone course), \n    along side AP Chem. Senior year I did an independent study in web development, AP \n    Calc BC, AP Stat (it was statistics was 'stat' at my highschool the same way \n    mathematics was 'math'), and AP Physics C.\n\n    ");
    			br14 = element("br");
    			t26 = space();
    			br15 = element("br");
    			t27 = text("\n\n    You can read more about the projects that I did in my time in high school on\n    the ");
    			a3 = element("a");
    			t28 = text("projects page.");
    			t29 = space();
    			div3 = element("div");
    			div3.textContent = "Education—College";
    			t31 = text("\n    I'm currently attending Northeastern University in Boston. I'm a CS major, graduating\n    in 2024 (assuming that nothing crazy happens). Northeastern has a very 'focused'\n    curriculum. That is to say, I take a lot of CS and CS adjacent courses, and not\n    very many extra courses. Don't get me wrong, I have my share of history and writing,\n    but the majority of my coursework is in the CS field. That's one of the reasons\n    that I really like this school.\n\n    ");
    			br16 = element("br");
    			t32 = space();
    			br17 = element("br");
    			t33 = text("\n\n    In addition to that, I have the co-op experience coming up (this is the reason\n    that I'm making this website in the first place!). I'm really excited to go on\n    co-op, I'm also a little nervous for interviews, but I'll get through it. I'm\n    extremely grateful that Northeastern has the co-op program.");
    			attr_dev(div0, "class", "subtitle");
    			add_location(div0, file$b, 11, 4, 519);
    			add_location(br0, file$b, 19, 4, 1021);
    			add_location(br1, file$b, 19, 11, 1028);
    			add_location(br2, file$b, 24, 4, 1187);
    			add_location(br3, file$b, 24, 11, 1194);
    			add_location(br4, file$b, 30, 4, 1411);
    			add_location(br5, file$b, 30, 11, 1418);
    			add_location(br6, file$b, 37, 4, 1721);
    			add_location(br7, file$b, 37, 11, 1728);
    			attr_dev(div1, "class", "subtitle");
    			add_location(div1, file$b, 44, 4, 2067);
    			attr_dev(a0, "href", "https://www.svelte.dev");
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "rel", "noopener noreferrer");
    			add_location(a0, file$b, 49, 4, 2417);
    			add_location(br8, file$b, 55, 4, 2631);
    			add_location(br9, file$b, 55, 11, 2638);
    			add_location(br10, file$b, 61, 4, 2860);
    			add_location(br11, file$b, 61, 11, 2867);
    			attr_dev(a1, "href", "https://routify.dev");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "rel", "noopener noreferrer");
    			add_location(a1, file$b, 65, 4, 3029);
    			add_location(br12, file$b, 72, 4, 3360);
    			add_location(br13, file$b, 72, 10, 3366);
    			attr_dev(a2, "href", "https://www.github.com/benlubas/who");
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "rel", "noopener noreferrer");
    			add_location(a2, file$b, 76, 4, 3472);
    			attr_dev(div2, "class", "subtitle");
    			add_location(div2, file$b, 82, 4, 3598);
    			add_location(br14, file$b, 92, 4, 4296);
    			add_location(br15, file$b, 92, 11, 4303);
    			attr_dev(a3, "href", a3_href_value = /*$url*/ ctx[0]("/projects"));
    			add_location(a3, file$b, 95, 8, 4400);
    			attr_dev(div3, "class", "subtitle");
    			add_location(div3, file$b, 97, 4, 4453);
    			add_location(br16, file$b, 105, 4, 4978);
    			add_location(br17, file$b, 105, 11, 4985);
    			attr_dev(div4, "class", "text");
    			add_location(div4, file$b, 5, 2, 148);
    			attr_dev(div5, "class", "page-cont");
    			add_location(div5, file$b, 4, 0, 122);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div4);
    			mount_component(pagetitle, div4, null);
    			append_dev(div4, t0);
    			append_dev(div4, div0);
    			append_dev(div4, t2);
    			append_dev(div4, br0);
    			append_dev(div4, t3);
    			append_dev(div4, br1);
    			append_dev(div4, t4);
    			append_dev(div4, br2);
    			append_dev(div4, t5);
    			append_dev(div4, br3);
    			append_dev(div4, t6);
    			append_dev(div4, br4);
    			append_dev(div4, t7);
    			append_dev(div4, br5);
    			append_dev(div4, t8);
    			append_dev(div4, br6);
    			append_dev(div4, t9);
    			append_dev(div4, br7);
    			append_dev(div4, t10);
    			append_dev(div4, div1);
    			append_dev(div4, t12);
    			append_dev(div4, a0);
    			append_dev(div4, t14);
    			append_dev(div4, br8);
    			append_dev(div4, t15);
    			append_dev(div4, br9);
    			append_dev(div4, t16);
    			append_dev(div4, br10);
    			append_dev(div4, t17);
    			append_dev(div4, br11);
    			append_dev(div4, t18);
    			append_dev(div4, a1);
    			append_dev(div4, t20);
    			append_dev(div4, br12);
    			append_dev(div4, br13);
    			append_dev(div4, t21);
    			append_dev(div4, a2);
    			append_dev(div4, t23);
    			append_dev(div4, div2);
    			append_dev(div4, t25);
    			append_dev(div4, br14);
    			append_dev(div4, t26);
    			append_dev(div4, br15);
    			append_dev(div4, t27);
    			append_dev(div4, a3);
    			append_dev(a3, t28);
    			append_dev(div4, t29);
    			append_dev(div4, div3);
    			append_dev(div4, t31);
    			append_dev(div4, br16);
    			append_dev(div4, t32);
    			append_dev(div4, br17);
    			append_dev(div4, t33);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*$url*/ 1 && a3_href_value !== (a3_href_value = /*$url*/ ctx[0]("/projects"))) {
    				attr_dev(a3, "href", a3_href_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pagetitle.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pagetitle.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			destroy_component(pagetitle);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let $url;
    	validate_store(url, 'url');
    	component_subscribe($$self, url, $$value => $$invalidate(0, $url = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('About', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<About> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ PageTitle, url, $url });
    	return [$url];
    }

    class About extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "About",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src/pages/courses.svelte generated by Svelte v3.49.0 */
    const file$a = "src/pages/courses.svelte";

    function create_fragment$b(ctx) {
    	let t0;
    	let div11;
    	let div10;
    	let pagetitle;
    	let t1;
    	let div0;
    	let t3;
    	let div1;
    	let t5;
    	let br0;
    	let t6;
    	let div2;
    	let t8;
    	let br1;
    	let t9;
    	let div3;
    	let t11;
    	let br2;
    	let t12;
    	let div4;
    	let t14;
    	let div5;
    	let t16;
    	let br3;
    	let t17;
    	let div6;
    	let t19;
    	let br4;
    	let t20;
    	let br5;
    	let t21;
    	let div7;
    	let t23;
    	let br6;
    	let t24;
    	let br7;
    	let t25;
    	let br8;
    	let t26;
    	let div8;
    	let t28;
    	let br9;
    	let t29;
    	let div9;
    	let t31;
    	let br10;
    	let t32;
    	let current;

    	pagetitle = new PageTitle({
    			props: { title: "Course Work" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t0 = text("I'm just going to scrap this page as a whole I think. Replace it with work. This is \nboth boring to read and write. On top of that, I remember very little from all of \nthese classes. \n");
    			div11 = element("div");
    			div10 = element("div");
    			create_component(pagetitle.$$.fragment);
    			t1 = text("\n    On this page I'll briefly discuss the CS courses that I've taken at Northeastern. \n    Note that apparent semester gaps are when I'm on co-op. \n\n    ");
    			div0 = element("div");
    			div0.textContent = "Fall 2021";
    			t3 = space();
    			div1 = element("div");
    			div1.textContent = "Systems -";
    			t5 = space();
    			br0 = element("br");
    			t6 = space();
    			div2 = element("div");
    			div2.textContent = "Foundations of AI -";
    			t8 = text("\n    This class starts with search and graph basics, and continues into A*, reinforcement\n    learning, and Bayesian Networks, among others.");
    			br1 = element("br");
    			t9 = space();
    			div3 = element("div");
    			div3.textContent = "Fundamentals of Cyber Security -";
    			t11 = text("\n    How to not leave horribly obvious back doors in systems.");
    			br2 = element("br");
    			t12 = space();
    			div4 = element("div");
    			div4.textContent = "Freshmen Year (2020-21)";
    			t14 = space();
    			div5 = element("div");
    			div5.textContent = "Fundies 1 & 2";
    			t16 = text("\n    Fundamentals of Computer Science 1 & 2 are the two entry level courses at Northeastern,\n    the first is taught in Racket (I had never heard of it either), the second was\n    in Java. I learned about Functional and OO Programming, the differences, advantages,\n    and disadvantages of each. I'll briefly mention a few of the more interesting\n    projects from Fundies 2.\n\n    ");
    			br3 = element("br");
    			t17 = space();
    			div6 = element("div");
    			div6.textContent = "Maze Solver";
    			t19 = space();
    			br4 = element("br");
    			t20 = text("\n\n    The more interesting projects came towards the end of the second course. We\n    made a maze generator and solver making use of Kruskal's algorithm to\n    generate a minimum spanning tree of grid cells that were connected with\n    random weights. The tree that was generated became the path for the maze,\n    start and end cells were chosen in opposite corners. We built two solvers,\n    one that used BFS, and another that used DFS. The thing was animated and it\n    was just so satisfying to watch it run. Especially after hitting our heads\n    against a few bugs.\n\n    ");
    			br5 = element("br");
    			t21 = space();
    			div7 = element("div");
    			div7.textContent = "Seam Carving";
    			t23 = space();
    			br6 = element("br");
    			t24 = text("\n\n    Seam carving is a process of finding the least \"important\" line of pixels in\n    an image so that you can remove it to compress the image (horizontally or\n    vertically) without warping the image (to some extent). The concept of\n    \"important\" was defined by pixel color values in relation to surrounding\n    pixels. We then used a dynamic programming approach to find the seam with\n    minimum value and removed it from the image.\n    ");
    			br7 = element("br");
    			t25 = space();
    			br8 = element("br");
    			t26 = text("\n    This process was also animated and incredibly satisfying to watch. The images\n    got really distorted at the end, but I was surprised with how well the algorithm\n    worked to keep the most interesting pixels in the image.\n\n    ");
    			div8 = element("div");
    			div8.textContent = "Object Oriented Design";
    			t28 = text("\n    Fun course, lots of work, took it over the summer. Fun projects illustrated below:\n\n    ");
    			br9 = element("br");
    			t29 = space();
    			div9 = element("div");
    			div9.textContent = "Image Editing GUI";
    			t31 = space();
    			br10 = element("br");
    			t32 = text("\n    This was the last project that we did, it was the culmination of the year of\n    work. We basically created a very primitive image editor that was capable of\n    scaling images down, applying basic filters and effects, and then exporting those\n    images. We used Java Spring to build the UI. This, unlike the other two projects,\n    was not very satisfying, it was slow and clunky, and it looked really bad.");
    			attr_dev(div0, "class", "subtitle");
    			add_location(div0, file$a, 12, 4, 505);
    			attr_dev(div1, "class", "projectTitle svelte-r9uva9");
    			add_location(div1, file$a, 13, 4, 547);
    			add_location(br0, file$a, 14, 4, 593);
    			attr_dev(div2, "class", "projectTitle svelte-r9uva9");
    			add_location(div2, file$a, 16, 4, 605);
    			add_location(br1, file$a, 18, 50, 796);
    			attr_dev(div3, "class", "projectTitle svelte-r9uva9");
    			add_location(div3, file$a, 20, 4, 808);
    			add_location(br2, file$a, 21, 60, 933);
    			attr_dev(div4, "class", "subtitle");
    			add_location(div4, file$a, 23, 4, 945);
    			attr_dev(div5, "class", "projectTitle svelte-r9uva9");
    			add_location(div5, file$a, 24, 4, 1001);
    			add_location(br3, file$a, 31, 4, 1427);
    			attr_dev(div6, "class", "projectTitle svelte-r9uva9");
    			add_location(div6, file$a, 32, 4, 1438);
    			add_location(br4, file$a, 33, 4, 1486);
    			add_location(br5, file$a, 44, 4, 2069);
    			attr_dev(div7, "class", "projectTitle svelte-r9uva9");
    			add_location(div7, file$a, 45, 4, 2080);
    			add_location(br6, file$a, 46, 4, 2129);
    			add_location(br7, file$a, 54, 4, 2579);
    			add_location(br8, file$a, 55, 4, 2590);
    			attr_dev(div8, "class", "subtitle");
    			add_location(div8, file$a, 60, 4, 2830);
    			add_location(br9, file$a, 63, 4, 2973);
    			attr_dev(div9, "class", "projectTitle svelte-r9uva9");
    			add_location(div9, file$a, 64, 4, 2984);
    			add_location(br10, file$a, 65, 4, 3038);
    			attr_dev(div10, "class", "text");
    			add_location(div10, file$a, 7, 2, 295);
    			attr_dev(div11, "class", "page-cont");
    			add_location(div11, file$a, 6, 0, 269);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div11, anchor);
    			append_dev(div11, div10);
    			mount_component(pagetitle, div10, null);
    			append_dev(div10, t1);
    			append_dev(div10, div0);
    			append_dev(div10, t3);
    			append_dev(div10, div1);
    			append_dev(div10, t5);
    			append_dev(div10, br0);
    			append_dev(div10, t6);
    			append_dev(div10, div2);
    			append_dev(div10, t8);
    			append_dev(div10, br1);
    			append_dev(div10, t9);
    			append_dev(div10, div3);
    			append_dev(div10, t11);
    			append_dev(div10, br2);
    			append_dev(div10, t12);
    			append_dev(div10, div4);
    			append_dev(div10, t14);
    			append_dev(div10, div5);
    			append_dev(div10, t16);
    			append_dev(div10, br3);
    			append_dev(div10, t17);
    			append_dev(div10, div6);
    			append_dev(div10, t19);
    			append_dev(div10, br4);
    			append_dev(div10, t20);
    			append_dev(div10, br5);
    			append_dev(div10, t21);
    			append_dev(div10, div7);
    			append_dev(div10, t23);
    			append_dev(div10, br6);
    			append_dev(div10, t24);
    			append_dev(div10, br7);
    			append_dev(div10, t25);
    			append_dev(div10, br8);
    			append_dev(div10, t26);
    			append_dev(div10, div8);
    			append_dev(div10, t28);
    			append_dev(div10, br9);
    			append_dev(div10, t29);
    			append_dev(div10, div9);
    			append_dev(div10, t31);
    			append_dev(div10, br10);
    			append_dev(div10, t32);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pagetitle.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pagetitle.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div11);
    			destroy_component(pagetitle);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Courses', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Courses> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ PageTitle });
    	return [];
    }

    class Courses extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Courses",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }

    /* src/components/textCarousel.svelte generated by Svelte v3.49.0 */
    const file$9 = "src/components/textCarousel.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	child_ctx[4] = i;
    	return child_ctx;
    }

    // (7:0) {#each list as val, i ({}
    function create_each_block(key_1, ctx) {
    	let div;
    	let t0_value = /*val*/ ctx[2] + "";
    	let t0;
    	let t1;
    	let div_intro;
    	let div_outro;
    	let current;

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			attr_dev(div, "class", "carousel-text svelte-1ezfmek");
    			toggle_class(div, "hide", /*shown*/ ctx[1] !== /*i*/ ctx[4]);
    			add_location(div, file$9, 7, 2, 195);
    			this.first = div;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty & /*list*/ 1) && t0_value !== (t0_value = /*val*/ ctx[2] + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*shown, list*/ 3) {
    				toggle_class(div, "hide", /*shown*/ ctx[1] !== /*i*/ ctx[4]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);
    				div_intro = create_in_transition(div, fly, { x: 200, duration: 1000 });
    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fly, { x: -200, duration: 1000 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(7:0) {#each list as val, i ({}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_1_anchor;
    	let current;
    	let each_value = /*list*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key = ctx => ({});
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key();
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*shown, list*/ 3) {
    				each_value = /*list*/ ctx[0];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block, each_1_anchor, get_each_context);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d(detaching);
    			}

    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TextCarousel', slots, []);
    	let { list } = $$props;
    	let shown = -1;
    	setInterval(() => $$invalidate(1, shown = (shown + 1) % list.length), 2500);
    	const writable_props = ['list'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TextCarousel> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('list' in $$props) $$invalidate(0, list = $$props.list);
    	};

    	$$self.$capture_state = () => ({ fly, list, shown });

    	$$self.$inject_state = $$props => {
    		if ('list' in $$props) $$invalidate(0, list = $$props.list);
    		if ('shown' in $$props) $$invalidate(1, shown = $$props.shown);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [list, shown];
    }

    class TextCarousel extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$a, create_fragment$a, safe_not_equal, { list: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TextCarousel",
    			options,
    			id: create_fragment$a.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*list*/ ctx[0] === undefined && !('list' in props)) {
    			console.warn("<TextCarousel> was created without expected prop 'list'");
    		}
    	}

    	get list() {
    		throw new Error("<TextCarousel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set list(value) {
    		throw new Error("<TextCarousel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/gridBoxes/name.svelte generated by Svelte v3.49.0 */
    const file$8 = "src/components/gridBoxes/name.svelte";

    function create_fragment$9(ctx) {
    	let div;
    	let t1;
    	let textcarousel;
    	let current;

    	textcarousel = new TextCarousel({
    			props: {
    				list: ["Student", "Software Dev", "Google Poweruser"]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "Ben Lubas";
    			t1 = space();
    			create_component(textcarousel.$$.fragment);
    			attr_dev(div, "class", "title svelte-1j2ydsw");
    			add_location(div, file$8, 3, 0, 80);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(textcarousel, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textcarousel.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textcarousel.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t1);
    			destroy_component(textcarousel, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Name', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Name> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ TextCarousel });
    	return [];
    }

    class Name extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Name",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/components/gridBoxes/projectsBtn.svelte generated by Svelte v3.49.0 */

    const file$7 = "src/components/gridBoxes/projectsBtn.svelte";

    function create_fragment$8(ctx) {
    	let div4;
    	let div3;
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div2;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			t1 = space();
    			div2 = element("div");
    			div2.textContent = "Projects";
    			attr_dev(div0, "class", "line svelte-zh1uoj");
    			add_location(div0, file$7, 4, 4, 77);
    			attr_dev(div1, "class", "bg svelte-zh1uoj");
    			add_location(div1, file$7, 5, 4, 102);
    			attr_dev(div2, "class", "btn-title");
    			add_location(div2, file$7, 6, 4, 125);
    			attr_dev(div3, "class", "box svelte-zh1uoj");
    			add_location(div3, file$7, 3, 2, 55);
    			attr_dev(div4, "class", "container svelte-zh1uoj");
    			add_location(div4, file$7, 2, 0, 29);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, div0);
    			append_dev(div3, t0);
    			append_dev(div3, div1);
    			append_dev(div3, t1);
    			append_dev(div3, div2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ProjectsBtn', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ProjectsBtn> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class ProjectsBtn extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProjectsBtn",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/components/gridBoxes/aboutBtn.svelte generated by Svelte v3.49.0 */

    const file$6 = "src/components/gridBoxes/aboutBtn.svelte";

    function create_fragment$7(ctx) {
    	let div2;
    	let div1;
    	let div0;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "About";
    			attr_dev(div0, "class", "btn-title");
    			add_location(div0, file$6, 4, 4, 77);
    			attr_dev(div1, "class", "box svelte-jqhk2x");
    			add_location(div1, file$6, 3, 2, 55);
    			attr_dev(div2, "class", "container svelte-jqhk2x");
    			add_location(div2, file$6, 2, 0, 29);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AboutBtn', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AboutBtn> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class AboutBtn extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AboutBtn",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/components/gridBoxes/workBtn.svelte generated by Svelte v3.49.0 */

    const file$5 = "src/components/gridBoxes/workBtn.svelte";

    function create_fragment$6(ctx) {
    	let div2;
    	let div1;
    	let div0;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "Work";
    			attr_dev(div0, "class", "btn-title");
    			add_location(div0, file$5, 4, 4, 89);
    			attr_dev(div1, "class", "clip-border box svelte-1nnhe61");
    			add_location(div1, file$5, 3, 2, 55);
    			attr_dev(div2, "class", "container svelte-1nnhe61");
    			add_location(div2, file$5, 2, 0, 29);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('WorkBtn', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<WorkBtn> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class WorkBtn extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "WorkBtn",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/components/gridBoxes/githubBtn.svelte generated by Svelte v3.49.0 */

    const file$4 = "src/components/gridBoxes/githubBtn.svelte";

    function create_fragment$5(ctx) {
    	let div2;
    	let div1;
    	let div0;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "Github";
    			attr_dev(div0, "class", "btn-title");
    			add_location(div0, file$4, 4, 4, 89);
    			attr_dev(div1, "class", "clip-border box svelte-1m73yow");
    			add_location(div1, file$4, 3, 2, 55);
    			attr_dev(div2, "class", "container svelte-1m73yow");
    			add_location(div2, file$4, 2, 0, 29);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GithubBtn', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GithubBtn> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class GithubBtn extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GithubBtn",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/pages/index.svelte generated by Svelte v3.49.0 */
    const file$3 = "src/pages/index.svelte";

    function create_fragment$4(ctx) {
    	let div6;
    	let div0;
    	let t0;
    	let div1;
    	let name;
    	let t1;
    	let div2;
    	let a0;
    	let projectsbtn;
    	let a0_href_value;
    	let t2;
    	let div3;
    	let a1;
    	let aboutbtn;
    	let a1_href_value;
    	let t3;
    	let div4;
    	let a2;
    	let workbtn;
    	let a2_href_value;
    	let t4;
    	let div5;
    	let a3;
    	let githubbtn;
    	let t5;
    	let shape0;
    	let t6;
    	let shape1;
    	let t7;
    	let shape2;
    	let t8;
    	let shape3;
    	let t9;
    	let shape4;
    	let current;
    	name = new Name({ $$inline: true });
    	projectsbtn = new ProjectsBtn({ $$inline: true });
    	aboutbtn = new AboutBtn({ $$inline: true });
    	workbtn = new WorkBtn({ $$inline: true });
    	githubbtn = new GithubBtn({ $$inline: true });

    	shape0 = new Shape({
    			props: { shapeInvert: true },
    			$$inline: true
    		});

    	shape1 = new Shape({
    			props: { shapeInvert: true },
    			$$inline: true
    		});

    	shape2 = new Shape({
    			props: { shapeInvert: true },
    			$$inline: true
    		});

    	shape3 = new Shape({
    			props: { shapeInvert: true },
    			$$inline: true
    		});

    	shape4 = new Shape({
    			props: { shapeColor: true, circle: true },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			create_component(name.$$.fragment);
    			t1 = space();
    			div2 = element("div");
    			a0 = element("a");
    			create_component(projectsbtn.$$.fragment);
    			t2 = space();
    			div3 = element("div");
    			a1 = element("a");
    			create_component(aboutbtn.$$.fragment);
    			t3 = space();
    			div4 = element("div");
    			a2 = element("a");
    			create_component(workbtn.$$.fragment);
    			t4 = space();
    			div5 = element("div");
    			a3 = element("a");
    			create_component(githubbtn.$$.fragment);
    			t5 = space();
    			create_component(shape0.$$.fragment);
    			t6 = space();
    			create_component(shape1.$$.fragment);
    			t7 = space();
    			create_component(shape2.$$.fragment);
    			t8 = space();
    			create_component(shape3.$$.fragment);
    			t9 = space();
    			create_component(shape4.$$.fragment);
    			attr_dev(div0, "class", "shapes");
    			add_location(div0, file$3, 13, 2, 602);
    			attr_dev(div1, "class", "grid-item svelte-1gbi7zt");
    			attr_dev(div1, "id", "center");
    			add_location(div1, file$3, 14, 2, 627);
    			attr_dev(a0, "href", a0_href_value = /*$url*/ ctx[0]("/projects"));
    			attr_dev(a0, "class", "svelte-1gbi7zt");
    			add_location(a0, file$3, 18, 4, 705);
    			attr_dev(div2, "id", "tl");
    			attr_dev(div2, "class", "svelte-1gbi7zt");
    			add_location(div2, file$3, 17, 2, 687);
    			attr_dev(a1, "href", a1_href_value = /*$url*/ ctx[0]("/about"));
    			attr_dev(a1, "class", "svelte-1gbi7zt");
    			add_location(a1, file$3, 21, 4, 783);
    			attr_dev(div3, "id", "br");
    			attr_dev(div3, "class", "svelte-1gbi7zt");
    			add_location(div3, file$3, 20, 2, 765);
    			attr_dev(a2, "href", a2_href_value = /*$url*/ ctx[0]("/work"));
    			attr_dev(a2, "class", "svelte-1gbi7zt");
    			add_location(a2, file$3, 24, 4, 858);
    			attr_dev(div4, "id", "right");
    			attr_dev(div4, "class", "svelte-1gbi7zt");
    			add_location(div4, file$3, 23, 2, 837);
    			attr_dev(a3, "href", "https://github.com/benlubas");
    			attr_dev(a3, "target", "_blank");
    			attr_dev(a3, "rel", "noopener noreferrer");
    			attr_dev(a3, "class", "svelte-1gbi7zt");
    			add_location(a3, file$3, 27, 4, 927);
    			attr_dev(div5, "id", "bl");
    			attr_dev(div5, "class", "svelte-1gbi7zt");
    			add_location(div5, file$3, 26, 2, 909);
    			attr_dev(div6, "class", "container svelte-1gbi7zt");
    			add_location(div6, file$3, 12, 0, 576);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div0);
    			append_dev(div6, t0);
    			append_dev(div6, div1);
    			mount_component(name, div1, null);
    			append_dev(div6, t1);
    			append_dev(div6, div2);
    			append_dev(div2, a0);
    			mount_component(projectsbtn, a0, null);
    			append_dev(div6, t2);
    			append_dev(div6, div3);
    			append_dev(div3, a1);
    			mount_component(aboutbtn, a1, null);
    			append_dev(div6, t3);
    			append_dev(div6, div4);
    			append_dev(div4, a2);
    			mount_component(workbtn, a2, null);
    			append_dev(div6, t4);
    			append_dev(div6, div5);
    			append_dev(div5, a3);
    			mount_component(githubbtn, a3, null);
    			append_dev(div6, t5);
    			mount_component(shape0, div6, null);
    			append_dev(div6, t6);
    			mount_component(shape1, div6, null);
    			append_dev(div6, t7);
    			mount_component(shape2, div6, null);
    			append_dev(div6, t8);
    			mount_component(shape3, div6, null);
    			append_dev(div6, t9);
    			mount_component(shape4, div6, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*$url*/ 1 && a0_href_value !== (a0_href_value = /*$url*/ ctx[0]("/projects"))) {
    				attr_dev(a0, "href", a0_href_value);
    			}

    			if (!current || dirty & /*$url*/ 1 && a1_href_value !== (a1_href_value = /*$url*/ ctx[0]("/about"))) {
    				attr_dev(a1, "href", a1_href_value);
    			}

    			if (!current || dirty & /*$url*/ 1 && a2_href_value !== (a2_href_value = /*$url*/ ctx[0]("/work"))) {
    				attr_dev(a2, "href", a2_href_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(name.$$.fragment, local);
    			transition_in(projectsbtn.$$.fragment, local);
    			transition_in(aboutbtn.$$.fragment, local);
    			transition_in(workbtn.$$.fragment, local);
    			transition_in(githubbtn.$$.fragment, local);
    			transition_in(shape0.$$.fragment, local);
    			transition_in(shape1.$$.fragment, local);
    			transition_in(shape2.$$.fragment, local);
    			transition_in(shape3.$$.fragment, local);
    			transition_in(shape4.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(name.$$.fragment, local);
    			transition_out(projectsbtn.$$.fragment, local);
    			transition_out(aboutbtn.$$.fragment, local);
    			transition_out(workbtn.$$.fragment, local);
    			transition_out(githubbtn.$$.fragment, local);
    			transition_out(shape0.$$.fragment, local);
    			transition_out(shape1.$$.fragment, local);
    			transition_out(shape2.$$.fragment, local);
    			transition_out(shape3.$$.fragment, local);
    			transition_out(shape4.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			destroy_component(name);
    			destroy_component(projectsbtn);
    			destroy_component(aboutbtn);
    			destroy_component(workbtn);
    			destroy_component(githubbtn);
    			destroy_component(shape0);
    			destroy_component(shape1);
    			destroy_component(shape2);
    			destroy_component(shape3);
    			destroy_component(shape4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $url;
    	validate_store(url, 'url');
    	component_subscribe($$self, url, $$value => $$invalidate(0, $url = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Pages', slots, []);
    	prefetch("/projects", { validFor: 24 * 60 });
    	prefetch("/about", { validFor: 24 * 60 });
    	prefetch("/courses", { validFor: 24 * 60 });
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Pages> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Name,
    		ProjectsBtn,
    		AboutBtn,
    		url,
    		prefetch,
    		Shape,
    		WorkBtn,
    		GithubBtn,
    		$url
    	});

    	return [$url];
    }

    class Pages extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Pages",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/pages/projects.svelte generated by Svelte v3.49.0 */
    const file$2 = "src/pages/projects.svelte";

    function create_fragment$3(ctx) {
    	let div4;
    	let div3;
    	let pagetitle;
    	let t0;
    	let div0;
    	let t2;
    	let br0;
    	let br1;
    	let t3;
    	let br2;
    	let br3;
    	let t4;
    	let br4;
    	let br5;
    	let t5;
    	let br6;
    	let br7;
    	let t6;
    	let br8;
    	let br9;
    	let t7;
    	let br10;
    	let br11;
    	let t8;
    	let br12;
    	let br13;
    	let t9;
    	let div1;
    	let t11;
    	let br14;
    	let br15;
    	let t12;
    	let br16;
    	let br17;
    	let t13;
    	let br18;
    	let br19;
    	let t14;
    	let br20;
    	let br21;
    	let t15;
    	let br22;
    	let br23;
    	let t16;
    	let div2;
    	let t18;
    	let br24;
    	let br25;
    	let t19;
    	let br26;
    	let br27;
    	let t20;
    	let br28;
    	let t21;
    	let br29;
    	let t22;
    	let br30;
    	let t23;
    	let br31;
    	let t24;
    	let br32;
    	let br33;
    	let t25;
    	let br34;
    	let br35;
    	let t26;
    	let current;

    	pagetitle = new PageTitle({
    			props: { title: "Projects" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			create_component(pagetitle.$$.fragment);
    			t0 = text("\n    I plan to go into more depth on this page about each of my projects. They're\n    listed in reverse chronological order. In the future this page might become many,\n    but for now it will just be a scrolling archive of projects I've worked on.\n    ");
    			div0 = element("div");
    			div0.textContent = "Diving Sheets (Svelte)";
    			t2 = text("\n    This one is my most recent project, and it's much smaller than the other projects\n    on this page. I decided to make this thing one weekend and had a working prototype\n    in like three days. Fixed some bugs and it was 'done' in a week or two. That\n    being said, out of all the things I've made, this is probably the thing that\n    has gotten the most use, and has certainly saved the most time.\n\n    ");
    			br0 = element("br");
    			br1 = element("br");
    			t3 = text("\n\n    To understand the project, I need to explain a little bit about diving. Not\n    scuba diving, but diving board diving (like at the Olympics). I coached\n    diving at my local pool over the summer (2021). For each dive meet, teams\n    must submit a dive sheet for each diver that lists their dives, along with\n    some other information. Most teams will just fill these out by hand, as it's\n    not that much work for ten divers. But when you have upwards of 40 divers\n    competing in one meet, you can see how even two minutes per sheet can\n    quickly add up.\n\n    ");
    			br2 = element("br");
    			br3 = element("br");
    			t4 = text("\n\n    I didn't have any interest in writing these out by hand, and neither did any\n    of the other coaches. We already maintained a spreadsheet of our divers and\n    the dives they competed, so I figured that I could use that to generate the\n    sheets automatically.\n\n    ");
    			br4 = element("br");
    			br5 = element("br");
    			t5 = text("\n\n    I knew of a few different ways to generate PDFs files, but because of my\n    background in web development, I was most comfortable with the Chrome\n    browser's ctrl + p -> 'save as PDF'. So I went about writing the HTML/CSS\n    required to generate a dive sheet. I chose to use Svelte for the easy code\n    reuse, and because I knew this would be a small project. Something like\n    React would have added an unnecessary amount of overhead.\n\n    ");
    			br6 = element("br");
    			br7 = element("br");
    			t6 = text("\n\n    The technical challenge of this project was almost entirely getting HTML and\n    CSS to generate something identical to something you would create in MS\n    Word. It certainly developed my CSS skills further.\n\n    ");
    			br8 = element("br");
    			br9 = element("br");
    			t7 = text("\n\n    This project also gave me a little more familiarity with CSS media rules and\n    the differences between browsers. Some of the things that I took for granted\n    would work in Chrome, just do not work or display in the same way on\n    Firefox. Luckily, I didn't have to deal with this for such a small project,\n    I knew that the end users (myself and the other coaches) all used Chromium\n    based browsers.\n\n    ");
    			br10 = element("br");
    			br11 = element("br");
    			t8 = text("\n\n    I'm now more aware that modern browsers are not equal. The project is also\n    the reason that the floating shape effect still 'works' on Firefox (I had to\n    go out of my way to make the squares show up).\n\n    ");
    			br12 = element("br");
    			br13 = element("br");
    			t9 = text("\n\n    This project also gave me great satisfaction; I was able to use it myself,\n    and I was able to watch others I was close to use it to save inordinate\n    amounts of time. And it only took me a week to make the thing!\n\n    \n    ");
    			div1 = element("div");
    			div1.textContent = "PW Poll (MERN stack)";
    			t11 = text("\n    My senior year, I took an independent study called Advanced Web Dev. The curriculum\n    required that I build a website that filled a need in the school. I chose to\n    build the site with React, Node and MongoDB—three technologies that I had\n    never used before.\n\n    ");
    			br14 = element("br");
    			br15 = element("br");
    			t12 = text("\n\n    I wanted to use this class as a learning opportunity. I taught myself how\n    the MERN stack worked over the summer and put that knowledge to use in the\n    class. I also chose to write all of the CSS for this site from scratch. This\n    is something that I'm really glad I did. It forced me to really learn CSS.\n    Previously, we had used Bootstrap for almost everything, so I didn't truly\n    understand how CSS positions or z-index or box-sizing worked.\n\n    ");
    			br16 = element("br");
    			br17 = element("br");
    			t13 = text("\n\n    My CSS experience with the Polling Project has been instrumental in every\n    website that I've worked on since.\n    ");
    			br18 = element("br");
    			br19 = element("br");
    			t14 = text("\n    In addition to that, I got to learn about document databases through my use of\n    MongoDB. Previously, I had only ever used SQL, so this was a breath of fresh\n    air. I found Mongo really intuitive and easy to pick up. That being said, I don't\n    have a strong preference for one over the other.\n\n    ");
    			br20 = element("br");
    			br21 = element("br");
    			t15 = text("\n\n    Then there is NodeJS. Node is really cool in that it lets you write a\n    backend in the same language you write your front end in. But I really see\n    no real need for this, and I kind of wish I had written a Java or C++\n    backend instead. I did enjoy the conveniences of working with a full JS\n    project, but at the same time, I was working with a full JS project.\n    Debugging was a nightmare sometimes.\n\n    ");
    			br22 = element("br");
    			br23 = element("br");
    			t16 = text("\n\n    Looking back on this project, it definitely had the largest impact on the\n    way that I work on web based projects. I now almost exclusively use front\n    end frameworks instead of vanilla JS, and my interest in frameworks lead me\n    to start using TypeScript. I still like to write my own styles for websites\n    that I work on, and I actually enjoy writing CSS now (for the most part).\n\n    \n    ");
    			div2 = element("div");
    			div2.textContent = "Disney Trip Website (PHP)";
    			t18 = text("\n    I worked on this project in my junior year of high school. My school's capstone\n    course curriculum consisted mostly of creating a website for the school. First,\n    we had to find someone in the school that needed a website for \"school\" purposes.\n    We had a few options: a guidance appointment scheduling system; a polling site\n    for senior superlatives (most likely to xyz); or a site to help organize and\n    deliver information about the senior trip to Disney World.\n    ");
    			br24 = element("br");
    			br25 = element("br");
    			t19 = text("\n    I hope it is obvious why we chose the last one.\n    ");
    			br26 = element("br");
    			br27 = element("br");
    			t20 = text("\n    After deciding on our project, we interviewed people who were involved in the\n    Disney trip to understand the scope of the task we were taking on. This interview\n    process allowed us to understand more about our end users, so that we could make\n    a site that was more suited to them.\n    ");
    			br28 = element("br");
    			t21 = space();
    			br29 = element("br");
    			t22 = text("\n    The next part of our task was design, for this, the class split into two groups,\n    and offered two competing designs. The better of the two was chosen and we moved\n    on to fleshing out the site's functionality which involved student permission\n    and medical information forms, student balance tracking, and a payment system\n    via PayPal, and a roommate system. In addition to this, we built an analytics\n    page, and a system for allowing the trip coordinators to update and view all\n    of the information. All of this was kept behind a sign in screen with Google's\n    oAuth API. While this list isn't exhaustive, I think it accurately covers the\n    bulk of the work that we did.\n    ");
    			br30 = element("br");
    			t23 = space();
    			br31 = element("br");
    			t24 = text("\n    Once the site functionality was built out, we spent a few weeks testing and tweaking\n    before delivering our final presentation to the trip coordinators, and school\n    administrative staff.\n    ");
    			br32 = element("br");
    			br33 = element("br");
    			t25 = text("\n    The next year, my class got to make use of the site. It seemed to be going great,\n    until COVID hit, and our trip got canceled...\n    ");
    			br34 = element("br");
    			br35 = element("br");
    			t26 = text("\n    Trip or not, I walked away with a ton of close to \"real world\" experience. Working\n    in a large group environment and managing work between multiple people is something\n    that you just need to learn by doing, and this project allowed me to do that\n    and more.");
    			attr_dev(div0, "class", "subtitle");
    			add_location(div0, file$2, 9, 4, 416);
    			add_location(br0, file$2, 16, 4, 875);
    			add_location(br1, file$2, 16, 10, 881);
    			add_location(br2, file$2, 27, 4, 1460);
    			add_location(br3, file$2, 27, 10, 1466);
    			add_location(br4, file$2, 34, 4, 1746);
    			add_location(br5, file$2, 34, 10, 1752);
    			add_location(br6, file$2, 43, 4, 2211);
    			add_location(br7, file$2, 43, 10, 2217);
    			add_location(br8, file$2, 49, 4, 2443);
    			add_location(br9, file$2, 49, 10, 2449);
    			add_location(br10, file$2, 58, 4, 2876);
    			add_location(br11, file$2, 58, 10, 2882);
    			add_location(br12, file$2, 64, 4, 3106);
    			add_location(br13, file$2, 64, 10, 3112);
    			attr_dev(div1, "class", "subtitle");
    			add_location(div1, file$2, 71, 4, 3373);
    			add_location(br14, file$2, 77, 4, 3703);
    			add_location(br15, file$2, 77, 10, 3709);
    			add_location(br16, file$2, 86, 4, 4184);
    			add_location(br17, file$2, 86, 10, 4190);
    			add_location(br18, file$2, 90, 4, 4319);
    			add_location(br19, file$2, 90, 10, 4325);
    			add_location(br20, file$2, 96, 4, 4640);
    			add_location(br21, file$2, 96, 10, 4646);
    			add_location(br22, file$2, 105, 4, 5076);
    			add_location(br23, file$2, 105, 10, 5082);
    			attr_dev(div2, "class", "subtitle");
    			add_location(div2, file$2, 114, 4, 5520);
    			add_location(br24, file$2, 121, 4, 6059);
    			add_location(br25, file$2, 121, 10, 6065);
    			add_location(br26, file$2, 123, 4, 6128);
    			add_location(br27, file$2, 123, 10, 6134);
    			add_location(br28, file$2, 128, 4, 6439);
    			add_location(br29, file$2, 129, 4, 6450);
    			add_location(br30, file$2, 139, 4, 7157);
    			add_location(br31, file$2, 140, 4, 7168);
    			add_location(br32, file$2, 144, 4, 7376);
    			add_location(br33, file$2, 144, 10, 7382);
    			add_location(br34, file$2, 147, 4, 7529);
    			add_location(br35, file$2, 147, 10, 7535);
    			attr_dev(div3, "class", "text");
    			add_location(div3, file$2, 4, 2, 111);
    			attr_dev(div4, "class", "page-cont");
    			add_location(div4, file$2, 3, 0, 85);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			mount_component(pagetitle, div3, null);
    			append_dev(div3, t0);
    			append_dev(div3, div0);
    			append_dev(div3, t2);
    			append_dev(div3, br0);
    			append_dev(div3, br1);
    			append_dev(div3, t3);
    			append_dev(div3, br2);
    			append_dev(div3, br3);
    			append_dev(div3, t4);
    			append_dev(div3, br4);
    			append_dev(div3, br5);
    			append_dev(div3, t5);
    			append_dev(div3, br6);
    			append_dev(div3, br7);
    			append_dev(div3, t6);
    			append_dev(div3, br8);
    			append_dev(div3, br9);
    			append_dev(div3, t7);
    			append_dev(div3, br10);
    			append_dev(div3, br11);
    			append_dev(div3, t8);
    			append_dev(div3, br12);
    			append_dev(div3, br13);
    			append_dev(div3, t9);
    			append_dev(div3, div1);
    			append_dev(div3, t11);
    			append_dev(div3, br14);
    			append_dev(div3, br15);
    			append_dev(div3, t12);
    			append_dev(div3, br16);
    			append_dev(div3, br17);
    			append_dev(div3, t13);
    			append_dev(div3, br18);
    			append_dev(div3, br19);
    			append_dev(div3, t14);
    			append_dev(div3, br20);
    			append_dev(div3, br21);
    			append_dev(div3, t15);
    			append_dev(div3, br22);
    			append_dev(div3, br23);
    			append_dev(div3, t16);
    			append_dev(div3, div2);
    			append_dev(div3, t18);
    			append_dev(div3, br24);
    			append_dev(div3, br25);
    			append_dev(div3, t19);
    			append_dev(div3, br26);
    			append_dev(div3, br27);
    			append_dev(div3, t20);
    			append_dev(div3, br28);
    			append_dev(div3, t21);
    			append_dev(div3, br29);
    			append_dev(div3, t22);
    			append_dev(div3, br30);
    			append_dev(div3, t23);
    			append_dev(div3, br31);
    			append_dev(div3, t24);
    			append_dev(div3, br32);
    			append_dev(div3, br33);
    			append_dev(div3, t25);
    			append_dev(div3, br34);
    			append_dev(div3, br35);
    			append_dev(div3, t26);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pagetitle.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pagetitle.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			destroy_component(pagetitle);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Projects', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Projects> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ PageTitle });
    	return [];
    }

    class Projects extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/components/quote.svelte generated by Svelte v3.49.0 */

    const file$1 = "src/components/quote.svelte";

    function create_fragment$2(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "quote svelte-po7vtr");
    			add_location(div, file$1, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Quote', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Quote> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Quote extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Quote",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/pages/work.svelte generated by Svelte v3.49.0 */
    const file = "src/pages/work.svelte";

    // (56:4) <Quote>
    function create_default_slot(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Ben is a full contributor to the SEO Impressions engineering team. He\n      quickly onboarded and fully contributed as a member of the squad for the\n      majority of his coop. Ben stretched himself beyond just executing on\n      tickets to fully leading epics for the team. He is consistently strong in\n      his data driven communication and works well cross functionally. At this\n      point he is performing way above the expectations of a coop and is\n      operating at the level of an L2 engineer on the team. As such I'd strongly\n      recommend a return coop offer and would push recruiting to stay in close\n      contact with Ben and expedite a full time return process after his\n      graduation in 2024.");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(56:4) <Quote>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div2;
    	let div1;
    	let pagetitle;
    	let t0;
    	let div0;
    	let t2;
    	let br0;
    	let t3;
    	let ul;
    	let li0;
    	let t5;
    	let li1;
    	let t7;
    	let li2;
    	let t9;
    	let li3;
    	let t11;
    	let li4;
    	let t13;
    	let li5;
    	let t15;
    	let li6;
    	let t17;
    	let li7;
    	let t19;
    	let br1;
    	let t20;
    	let br2;
    	let t21;
    	let br3;
    	let br4;
    	let t22;
    	let br5;
    	let br6;
    	let t23;
    	let br7;
    	let br8;
    	let t24;
    	let quote;
    	let current;

    	pagetitle = new PageTitle({
    			props: { title: "Work Experience" },
    			$$inline: true
    		});

    	quote = new Quote({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			create_component(pagetitle.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			div0.textContent = "Wayfair (2022/01/10 - 2022/06/24)";
    			t2 = text("\n    I worked at Wayfair as a software engineer. This job was a co-op that ran from\n    December 10th to June 24th. I was a part of SEO Pod on the Impression team. The\n    Impressions team at Wayfair solves a lot of different and interesting problems,\n    and they do so using a lot of different technologies. This is perfect for me\n    — a student that's trying to learn as much as possible. During the 6 \n    months that I worked at Wayfair, there was always something new for me to \n    learn.\n\n    ");
    			br0 = element("br");
    			t3 = text("\n\n    Here is a list of technologies that I gained experience with at Wayfair:\n\n    ");
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "Docker & K8s";
    			t5 = space();
    			li1 = element("li");
    			li1.textContent = "Spring Boot";
    			t7 = space();
    			li2 = element("li");
    			li2.textContent = "Kafka with Avro Schemas";
    			t9 = space();
    			li3 = element("li");
    			li3.textContent = "DataDog";
    			t11 = space();
    			li4 = element("li");
    			li4.textContent = "Kibana";
    			t13 = space();
    			li5 = element("li");
    			li5.textContent = "Jira";
    			t15 = space();
    			li6 = element("li");
    			li6.textContent = "Buildkite and Sonarcube";
    			t17 = space();
    			li7 = element("li");
    			li7.textContent = "Little bit of Cypress";
    			t19 = space();
    			br1 = element("br");
    			t20 = space();
    			br2 = element("br");
    			t21 = text("\n\n    I also got aquainted with the agile sprint process. \n\n    ");
    			br3 = element("br");
    			br4 = element("br");
    			t22 = text("\n\n    During my time at Wayfair I got to meet and work with a ton of awesome\n    people, some of whom I'm sure I'll keep in touch with. I'm looking forward \n    to my next co-op, as this experience was really great.\n\n    ");
    			br5 = element("br");
    			br6 = element("br");
    			t23 = text("\n\n    This part is for recruiters—I'm going to talk about my performance at\n    the company. While working for Wayfair I got a mid co-op review around the\n    90 day mark, and a final review right before I left. Both reviews were\n    written by my direct manager who I interacted with daily. The first\n    review was fairly positive, however, I had only been there for 90 days, so I\n    had only just started to get up to speed, and there were still a ton of\n    things to learn.\n\n    ");
    			br7 = element("br");
    			br8 = element("br");
    			t24 = text("\n    \n    I'll let the final review speak for itself. This is the opening paragraph\n    from my manager: \n    ");
    			create_component(quote.$$.fragment);
    			attr_dev(div0, "class", "subtitle");
    			add_location(div0, file, 7, 4, 224);
    			add_location(br0, file, 16, 4, 793);
    			add_location(li0, file, 21, 6, 919);
    			add_location(li1, file, 22, 6, 947);
    			add_location(li2, file, 23, 6, 974);
    			add_location(li3, file, 24, 6, 1013);
    			add_location(li4, file, 25, 6, 1036);
    			add_location(li5, file, 26, 6, 1058);
    			add_location(li6, file, 27, 6, 1078);
    			add_location(li7, file, 28, 6, 1117);
    			set_style(ul, "margin-left", "2rem");
    			add_location(ul, file, 20, 4, 883);
    			add_location(br1, file, 31, 4, 1163);
    			add_location(br2, file, 31, 11, 1170);
    			add_location(br3, file, 35, 4, 1240);
    			add_location(br4, file, 35, 10, 1246);
    			add_location(br5, file, 41, 4, 1473);
    			add_location(br6, file, 41, 10, 1479);
    			add_location(br7, file, 51, 4, 1976);
    			add_location(br8, file, 51, 10, 1982);
    			attr_dev(div1, "class", "text");
    			add_location(div1, file, 5, 2, 159);
    			attr_dev(div2, "class", "page-cont");
    			add_location(div2, file, 4, 0, 133);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			mount_component(pagetitle, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div1, t2);
    			append_dev(div1, br0);
    			append_dev(div1, t3);
    			append_dev(div1, ul);
    			append_dev(ul, li0);
    			append_dev(ul, t5);
    			append_dev(ul, li1);
    			append_dev(ul, t7);
    			append_dev(ul, li2);
    			append_dev(ul, t9);
    			append_dev(ul, li3);
    			append_dev(ul, t11);
    			append_dev(ul, li4);
    			append_dev(ul, t13);
    			append_dev(ul, li5);
    			append_dev(ul, t15);
    			append_dev(ul, li6);
    			append_dev(ul, t17);
    			append_dev(ul, li7);
    			append_dev(div1, t19);
    			append_dev(div1, br1);
    			append_dev(div1, t20);
    			append_dev(div1, br2);
    			append_dev(div1, t21);
    			append_dev(div1, br3);
    			append_dev(div1, br4);
    			append_dev(div1, t22);
    			append_dev(div1, br5);
    			append_dev(div1, br6);
    			append_dev(div1, t23);
    			append_dev(div1, br7);
    			append_dev(div1, br8);
    			append_dev(div1, t24);
    			mount_component(quote, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const quote_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				quote_changes.$$scope = { dirty, ctx };
    			}

    			quote.$set(quote_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(pagetitle.$$.fragment, local);
    			transition_in(quote.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(pagetitle.$$.fragment, local);
    			transition_out(quote.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(pagetitle);
    			destroy_component(quote);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Work', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Work> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ PageTitle, Quote });
    	return [];
    }

    class Work extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Work",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    //tree
    const _tree = {
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
          "absolutePath": "/home/benlubas/github/who/src/pages/about.svelte",
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
          "component": () => About
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "courses.svelte",
          "filepath": "/courses.svelte",
          "name": "courses",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "/home/benlubas/github/who/src/pages/courses.svelte",
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
          "component": () => Courses
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "index.svelte",
          "filepath": "/index.svelte",
          "name": "index",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "/home/benlubas/github/who/src/pages/index.svelte",
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
          "component": () => Pages
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "projects.svelte",
          "filepath": "/projects.svelte",
          "name": "projects",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "/home/benlubas/github/who/src/pages/projects.svelte",
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
          "component": () => Projects
        },
        {
          "isFile": true,
          "isDir": false,
          "file": "work.svelte",
          "filepath": "/work.svelte",
          "name": "work",
          "ext": "svelte",
          "badExt": false,
          "absolutePath": "/home/benlubas/github/who/src/pages/work.svelte",
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
          "component": () => Work
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
    };


    const {tree, routes} = buildClientTree(_tree);

    /* src/App.svelte generated by Svelte v3.49.0 */

    function create_fragment(ctx) {
    	let router;
    	let current;

    	router = new Router({
    			props: { routes, config: /*config*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);

    	const config = {
    		urlTransform: {
    			apply: url => url, // external URL
    			remove: url => {
    				return url.replace("/who/", "/");
    			}, //internal URL
    			
    		},
    		useHash: true
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Router, routes, config });
    	return [config];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    var app = new App({
        target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
