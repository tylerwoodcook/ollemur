var e = {};
(function (e) {
    function t() {
        return {
            async: !1,
            breaks: !1,
            extensions: null,
            gfm: !0,
            hooks: null,
            pedantic: !1,
            renderer: null,
            silent: !1,
            tokenizer: null,
            walkTokens: null,
        };
    }
    function n(t) {
        e.defaults = t;
    }
    e.defaults = t();
    let r = { exec: () => null };
    function s(e, t = "") {
        let n = "string" == typeof e ? e : e.source,
            r = {
                replace: (e, t) => {
                    let s = "string" == typeof t ? t : t.source;
                    return (
                        (s = s.replace(l.caret, "$1")), (n = n.replace(e, s)), r
                    );
                },
                getRegex: () => new RegExp(n, t),
            };
        return r;
    }
    let l = {
            codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
            outputLinkReplace: /\\([\[\]])/g,
            indentCodeCompensation: /^(\s+)(?:```)/,
            beginningSpace: /^\s+/,
            endingHash: /#$/,
            startingSpaceChar: /^ /,
            endingSpaceChar: / $/,
            nonSpaceChar: /[^ ]/,
            newLineCharGlobal: /\n/g,
            tabCharGlobal: /\t/g,
            multipleSpaceGlobal: /\s+/g,
            blankLine: /^[ \t]*$/,
            doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
            blockquoteStart: /^ {0,3}>/,
            blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
            blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
            listReplaceTabs: /^\t+/,
            listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
            listIsTask: /^\[[ xX]\] /,
            listReplaceTask: /^\[[ xX]\] +/,
            anyLine: /\n.*\n/,
            hrefBrackets: /^<(.*)>$/,
            tableDelimiter: /[:|]/,
            tableAlignChars: /^\||\| *$/g,
            tableRowBlankLine: /\n[ \t]*$/,
            tableAlignRight: /^ *-+: *$/,
            tableAlignCenter: /^ *:-+: *$/,
            tableAlignLeft: /^ *:-+ *$/,
            startATag: /^<a /i,
            endATag: /^<\/a>/i,
            startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
            endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
            startAngleBracket: /^</,
            endAngleBracket: />$/,
            pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
            unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
            escapeTest: /[&<>"']/,
            escapeReplace: /[&<>"']/g,
            escapeTestNoEncode:
                /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
            escapeReplaceNoEncode:
                /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
            unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,
            caret: /(^|[^\[])\^/g,
            percentDecode: /%25/g,
            findPipe: /\|/g,
            splitPipe: / \|/,
            slashPipe: /\\\|/g,
            carriageReturn: /\r\n|\r/g,
            spaceLine: /^ +$/gm,
            notSpaceStart: /^\S*/,
            endingNewline: /\n$/,
            listItemRegex: (e) =>
                RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),
            nextBulletRegex: (e) =>
                RegExp(
                    `^ {0,${Math.min(3, e - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`,
                ),
            hrRegex: (e) =>
                RegExp(
                    `^ {0,${Math.min(3, e - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`,
                ),
            fencesBeginRegex: (e) =>
                RegExp(`^ {0,${Math.min(3, e - 1)}}(?:\`\`\`|~~~)`),
            headingBeginRegex: (e) => RegExp(`^ {0,${Math.min(3, e - 1)}}#`),
            htmlBeginRegex: (e) =>
                RegExp(`^ {0,${Math.min(3, e - 1)}}<(?:[a-z].*>|!--)`, "i"),
        },
        i =
            /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
        a = /(?:[*+-]|\d{1,9}[.)])/,
        o =
            /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
        c = s(o)
            .replace(/bull/g, a)
            .replace(/blockCode/g, /(?: {4}| {0,3}\t)/)
            .replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/)
            .replace(/blockquote/g, / {0,3}>/)
            .replace(/heading/g, / {0,3}#{1,6}/)
            .replace(/html/g, / {0,3}<[^\n>]+>\n/)
            .replace(/\|table/g, "")
            .getRegex(),
        h = s(o)
            .replace(/bull/g, a)
            .replace(/blockCode/g, /(?: {4}| {0,3}\t)/)
            .replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/)
            .replace(/blockquote/g, / {0,3}>/)
            .replace(/heading/g, / {0,3}#{1,6}/)
            .replace(/html/g, / {0,3}<[^\n>]+>\n/)
            .replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/)
            .getRegex(),
        p =
            /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
        u = /(?!\s*\])(?:\\.|[^\[\]\\])+/,
        g = s(
            /^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/,
        )
            .replace("label", u)
            .replace(
                "title",
                /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
            )
            .getRegex(),
        k = s(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/)
            .replace(/bull/g, a)
            .getRegex(),
        d =
            "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
        f = /<!--(?:-?>|[\s\S]*?(?:-->|$))/,
        x = s(
            "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
            "i",
        )
            .replace("comment", f)
            .replace("tag", d)
            .replace(
                "attribute",
                / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/,
            )
            .getRegex(),
        b = s(p)
            .replace("hr", i)
            .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
            .replace("|lheading", "")
            .replace("|table", "")
            .replace("blockquote", " {0,3}>")
            .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
            .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
            .replace(
                "html",
                "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)",
            )
            .replace("tag", d)
            .getRegex(),
        m = {
            blockquote: s(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/)
                .replace("paragraph", b)
                .getRegex(),
            code: /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,
            def: g,
            fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
            heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
            hr: i,
            html: x,
            lheading: c,
            list: k,
            newline: /^(?:[ \t]*(?:\n|$))+/,
            paragraph: b,
            table: r,
            text: /^[^\n]+/,
        },
        w = s(
            "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
        )
            .replace("hr", i)
            .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
            .replace("blockquote", " {0,3}>")
            .replace("code", "(?: {4}| {0,3}	)[^\\n]")
            .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
            .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
            .replace(
                "html",
                "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)",
            )
            .replace("tag", d)
            .getRegex(),
        y = {
            ...m,
            lheading: h,
            table: w,
            paragraph: s(p)
                .replace("hr", i)
                .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
                .replace("|lheading", "")
                .replace("table", w)
                .replace("blockquote", " {0,3}>")
                .replace(
                    "fences",
                    " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n",
                )
                .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
                .replace(
                    "html",
                    "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)",
                )
                .replace("tag", d)
                .getRegex(),
        },
        $ = {
            ...m,
            html: s(
                "^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))",
            )
                .replace("comment", f)
                .replace(
                    /tag/g,
                    "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b",
                )
                .getRegex(),
            def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
            heading: /^(#{1,6})(.*)(?:\n+|$)/,
            fences: r,
            lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
            paragraph: s(p)
                .replace("hr", i)
                .replace("heading", " *#{1,6} *[^\n]")
                .replace("lheading", c)
                .replace("|table", "")
                .replace("blockquote", " {0,3}>")
                .replace("|fences", "")
                .replace("|list", "")
                .replace("|html", "")
                .replace("|tag", "")
                .getRegex(),
        },
        R = /^( {2,}|\\)\n(?!\s*$)/,
        S = /[\p{P}\p{S}]/u,
        T = /[\s\p{P}\p{S}]/u,
        z = /[^\s\p{P}\p{S}]/u,
        A = s(/^((?![*_])punctSpace)/, "u")
            .replace(/punctSpace/g, T)
            .getRegex(),
        _ = /(?!~)[\p{P}\p{S}]/u,
        E = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,
        I = s(E, "u").replace(/punct/g, S).getRegex(),
        P = s(E, "u").replace(/punct/g, _).getRegex(),
        v =
            "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",
        L = s(v, "gu")
            .replace(/notPunctSpace/g, z)
            .replace(/punctSpace/g, T)
            .replace(/punct/g, S)
            .getRegex(),
        B = s(v, "gu")
            .replace(/notPunctSpace/g, /(?:[^\s\p{P}\p{S}]|~)/u)
            .replace(/punctSpace/g, /(?!~)[\s\p{P}\p{S}]/u)
            .replace(/punct/g, _)
            .getRegex(),
        C = s(
            "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
            "gu",
        )
            .replace(/notPunctSpace/g, z)
            .replace(/punctSpace/g, T)
            .replace(/punct/g, S)
            .getRegex(),
        q = s(/\\(punct)/, "gu")
            .replace(/punct/g, S)
            .getRegex(),
        Z = s(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/)
            .replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/)
            .replace(
                "email",
                /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,
            )
            .getRegex(),
        D = s(f).replace("(?:--\x3e|$)", "--\x3e").getRegex(),
        M = s(
            "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
        )
            .replace("comment", D)
            .replace(
                "attribute",
                /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,
            )
            .getRegex(),
        O = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
        H = s(
            /^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/,
        )
            .replace("label", O)
            .replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/)
            .replace(
                "title",
                /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,
            )
            .getRegex(),
        N = s(/^!?\[(label)\]\[(ref)\]/)
            .replace("label", O)
            .replace("ref", u)
            .getRegex(),
        Q = s(/^!?\[(ref)\](?:\[\])?/)
            .replace("ref", u)
            .getRegex(),
        j = s("reflink|nolink(?!\\()", "g")
            .replace("reflink", N)
            .replace("nolink", Q)
            .getRegex(),
        G = {
            _backpedal: r,
            anyPunctuation: q,
            autolink: Z,
            blockSkip:
                /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,
            br: R,
            code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
            del: r,
            emStrongLDelim: I,
            emStrongRDelimAst: L,
            emStrongRDelimUnd: C,
            escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
            link: H,
            nolink: Q,
            punctuation: A,
            reflink: N,
            reflinkSearch: j,
            tag: M,
            text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
            url: r,
        },
        F = {
            ...G,
            link: s(/^!?\[(label)\]\((.*?)\)/)
                .replace("label", O)
                .getRegex(),
            reflink: s(/^!?\[(label)\]\s*\[([^\]]*)\]/)
                .replace("label", O)
                .getRegex(),
        },
        X = {
            ...G,
            emStrongRDelimAst: B,
            emStrongLDelim: P,
            url: s(
                /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
                "i",
            )
                .replace(
                    "email",
                    /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
                )
                .getRegex(),
            _backpedal:
                /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
            del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
            text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
        },
        J = {
            ...X,
            br: s(R).replace("{2,}", "*").getRegex(),
            text: s(X.text)
                .replace("\\b_", "\\b_| {2,}\\n")
                .replace(/\{2,\}/g, "*")
                .getRegex(),
        },
        U = { normal: m, gfm: y, pedantic: $ },
        K = { normal: G, gfm: X, breaks: J, pedantic: F },
        V = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        },
        W = (e) => V[e];
    function Y(e, t) {
        if (t) {
            if (l.escapeTest.test(e)) return e.replace(l.escapeReplace, W);
        } else if (l.escapeTestNoEncode.test(e))
            return e.replace(l.escapeReplaceNoEncode, W);
        return e;
    }
    function ee(e) {
        try {
            e = encodeURI(e).replace(l.percentDecode, "%");
        } catch {
            return null;
        }
        return e;
    }
    function et(e, t) {
        let n = e
                .replace(l.findPipe, (e, t, n) => {
                    let r = !1,
                        s = t;
                    for (; --s >= 0 && "\\" === n[s]; ) r = !r;
                    return r ? "|" : " |";
                })
                .split(l.splitPipe),
            r = 0;
        if (
            (n[0].trim() || n.shift(),
            n.length > 0 && !n.at(-1)?.trim() && n.pop(),
            t)
        )
            if (n.length > t) n.splice(t);
            else for (; n.length < t; ) n.push("");
        for (; r < n.length; r++) n[r] = n[r].trim().replace(l.slashPipe, "|");
        return n;
    }
    function en(e, t, n) {
        let r = e.length;
        if (0 === r) return "";
        let s = 0;
        for (; s < r; )
            if (e.charAt(r - s - 1) === t) s++;
            else break;
        return e.slice(0, r - s);
    }
    function er(e, t, n, r, s) {
        let l = t.href,
            i = t.title || null,
            a = e[1].replace(s.other.outputLinkReplace, "$1");
        r.state.inLink = !0;
        let o = {
            type: "!" === e[0].charAt(0) ? "image" : "link",
            raw: n,
            href: l,
            title: i,
            text: a,
            tokens: r.inlineTokens(a),
        };
        return (r.state.inLink = !1), o;
    }
    class es {
        options;
        rules;
        lexer;
        constructor(t) {
            this.options = t || e.defaults;
        }
        space(e) {
            let t = this.rules.block.newline.exec(e);
            if (t && t[0].length > 0) return { type: "space", raw: t[0] };
        }
        code(e) {
            let t = this.rules.block.code.exec(e);
            if (t) {
                let e = t[0].replace(this.rules.other.codeRemoveIndent, "");
                return {
                    type: "code",
                    raw: t[0],
                    codeBlockStyle: "indented",
                    text: this.options.pedantic ? e : en(e, "\n"),
                };
            }
        }
        fences(e) {
            let t = this.rules.block.fences.exec(e);
            if (t) {
                let e = t[0],
                    n = (function (e, t, n) {
                        let r = e.match(n.other.indentCodeCompensation);
                        if (null === r) return t;
                        let s = r[1];
                        return t
                            .split("\n")
                            .map((e) => {
                                let t = e.match(n.other.beginningSpace);
                                if (null === t) return e;
                                let [r] = t;
                                return r.length >= s.length
                                    ? e.slice(s.length)
                                    : e;
                            })
                            .join("\n");
                    })(e, t[3] || "", this.rules);
                return {
                    type: "code",
                    raw: e,
                    lang: t[2]
                        ? t[2]
                              .trim()
                              .replace(this.rules.inline.anyPunctuation, "$1")
                        : t[2],
                    text: n,
                };
            }
        }
        heading(e) {
            let t = this.rules.block.heading.exec(e);
            if (t) {
                let e = t[2].trim();
                if (this.rules.other.endingHash.test(e)) {
                    let t = en(e, "#");
                    this.options.pedantic
                        ? (e = t.trim())
                        : (!t || this.rules.other.endingSpaceChar.test(t)) &&
                          (e = t.trim());
                }
                return {
                    type: "heading",
                    raw: t[0],
                    depth: t[1].length,
                    text: e,
                    tokens: this.lexer.inline(e),
                };
            }
        }
        hr(e) {
            let t = this.rules.block.hr.exec(e);
            if (t) return { type: "hr", raw: en(t[0], "\n") };
        }
        blockquote(e) {
            let t = this.rules.block.blockquote.exec(e);
            if (t) {
                let e = en(t[0], "\n").split("\n"),
                    n = "",
                    r = "",
                    s = [];
                for (; e.length > 0; ) {
                    let t,
                        l = !1,
                        i = [];
                    for (t = 0; t < e.length; t++)
                        if (this.rules.other.blockquoteStart.test(e[t]))
                            i.push(e[t]), (l = !0);
                        else if (l) break;
                        else i.push(e[t]);
                    e = e.slice(t);
                    let a = i.join("\n"),
                        o = a
                            .replace(
                                this.rules.other.blockquoteSetextReplace,
                                "\n    $1",
                            )
                            .replace(
                                this.rules.other.blockquoteSetextReplace2,
                                "",
                            );
                    (n = n
                        ? `${n}
${a}`
                        : a),
                        (r = r
                            ? `${r}
${o}`
                            : o);
                    let c = this.lexer.state.top;
                    if (
                        ((this.lexer.state.top = !0),
                        this.lexer.blockTokens(o, s, !0),
                        (this.lexer.state.top = c),
                        0 === e.length)
                    )
                        break;
                    let h = s.at(-1);
                    if (h?.type === "code") break;
                    if (h?.type === "blockquote") {
                        let t = h.raw + "\n" + e.join("\n"),
                            l = this.blockquote(t);
                        (s[s.length - 1] = l),
                            (n =
                                n.substring(0, n.length - h.raw.length) +
                                l.raw),
                            (r =
                                r.substring(0, r.length - h.text.length) +
                                l.text);
                        break;
                    }
                    if (h?.type === "list") {
                        let t = h.raw + "\n" + e.join("\n"),
                            l = this.list(t);
                        (s[s.length - 1] = l),
                            (n =
                                n.substring(0, n.length - h.raw.length) +
                                l.raw),
                            (r =
                                r.substring(0, r.length - h.raw.length) +
                                l.raw),
                            (e = t.substring(s.at(-1).raw.length).split("\n"));
                        continue;
                    }
                }
                return { type: "blockquote", raw: n, tokens: s, text: r };
            }
        }
        list(e) {
            let t = this.rules.block.list.exec(e);
            if (t) {
                let n = t[1].trim(),
                    r = n.length > 1,
                    s = {
                        type: "list",
                        raw: "",
                        ordered: r,
                        start: r ? +n.slice(0, -1) : "",
                        loose: !1,
                        items: [],
                    };
                (n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`),
                    this.options.pedantic && (n = r ? n : "[*+-]");
                let l = this.rules.other.listItemRegex(n),
                    i = !1;
                for (; e; ) {
                    let n,
                        r = !1,
                        a = "",
                        o = "";
                    if (!(t = l.exec(e)) || this.rules.block.hr.test(e)) break;
                    (a = t[0]), (e = e.substring(a.length));
                    let c = t[2]
                            .split("\n", 1)[0]
                            .replace(this.rules.other.listReplaceTabs, (e) =>
                                " ".repeat(3 * e.length),
                            ),
                        h = e.split("\n", 1)[0],
                        p = !c.trim(),
                        u = 0;
                    if (
                        (this.options.pedantic
                            ? ((u = 2), (o = c.trimStart()))
                            : p
                              ? (u = t[1].length + 1)
                              : ((u =
                                    (u = t[2].search(
                                        this.rules.other.nonSpaceChar,
                                    )) > 4
                                        ? 1
                                        : u),
                                (o = c.slice(u)),
                                (u += t[1].length)),
                        p &&
                            this.rules.other.blankLine.test(h) &&
                            ((a += h + "\n"),
                            (e = e.substring(h.length + 1)),
                            (r = !0)),
                        !r)
                    ) {
                        let t = this.rules.other.nextBulletRegex(u),
                            n = this.rules.other.hrRegex(u),
                            r = this.rules.other.fencesBeginRegex(u),
                            s = this.rules.other.headingBeginRegex(u),
                            l = this.rules.other.htmlBeginRegex(u);
                        for (; e; ) {
                            let i,
                                g = e.split("\n", 1)[0];
                            if (
                                ((h = g),
                                (i = this.options.pedantic
                                    ? (h = h.replace(
                                          this.rules.other.listReplaceNesting,
                                          "  ",
                                      ))
                                    : h.replace(
                                          this.rules.other.tabCharGlobal,
                                          "    ",
                                      )),
                                r.test(h) ||
                                    s.test(h) ||
                                    l.test(h) ||
                                    t.test(h) ||
                                    n.test(h))
                            )
                                break;
                            if (
                                i.search(this.rules.other.nonSpaceChar) >= u ||
                                !h.trim()
                            )
                                o += "\n" + i.slice(u);
                            else {
                                if (
                                    p ||
                                    c
                                        .replace(
                                            this.rules.other.tabCharGlobal,
                                            "    ",
                                        )
                                        .search(
                                            this.rules.other.nonSpaceChar,
                                        ) >= 4 ||
                                    r.test(c) ||
                                    s.test(c) ||
                                    n.test(c)
                                )
                                    break;
                                o += "\n" + h;
                            }
                            p || h.trim() || (p = !0),
                                (a += g + "\n"),
                                (e = e.substring(g.length + 1)),
                                (c = i.slice(u));
                        }
                    }
                    !s.loose &&
                        (i
                            ? (s.loose = !0)
                            : this.rules.other.doubleBlankLine.test(a) &&
                              (i = !0));
                    let g = null;
                    this.options.gfm &&
                        (g = this.rules.other.listIsTask.exec(o)) &&
                        ((n = "[ ] " !== g[0]),
                        (o = o.replace(this.rules.other.listReplaceTask, ""))),
                        s.items.push({
                            type: "list_item",
                            raw: a,
                            task: !!g,
                            checked: n,
                            loose: !1,
                            text: o,
                            tokens: [],
                        }),
                        (s.raw += a);
                }
                let a = s.items.at(-1);
                if (!a) return;
                (a.raw = a.raw.trimEnd()),
                    (a.text = a.text.trimEnd()),
                    (s.raw = s.raw.trimEnd());
                for (let e = 0; e < s.items.length; e++)
                    if (
                        ((this.lexer.state.top = !1),
                        (s.items[e].tokens = this.lexer.blockTokens(
                            s.items[e].text,
                            [],
                        )),
                        !s.loose)
                    ) {
                        let t = s.items[e].tokens.filter(
                            (e) => "space" === e.type,
                        );
                        s.loose =
                            t.length > 0 &&
                            t.some((e) => this.rules.other.anyLine.test(e.raw));
                    }
                if (s.loose)
                    for (let e = 0; e < s.items.length; e++)
                        s.items[e].loose = !0;
                return s;
            }
        }
        html(e) {
            let t = this.rules.block.html.exec(e);
            if (t)
                return {
                    type: "html",
                    block: !0,
                    raw: t[0],
                    pre:
                        "pre" === t[1] || "script" === t[1] || "style" === t[1],
                    text: t[0],
                };
        }
        def(e) {
            let t = this.rules.block.def.exec(e);
            if (t) {
                let e = t[1]
                        .toLowerCase()
                        .replace(this.rules.other.multipleSpaceGlobal, " "),
                    n = t[2]
                        ? t[2]
                              .replace(this.rules.other.hrefBrackets, "$1")
                              .replace(this.rules.inline.anyPunctuation, "$1")
                        : "",
                    r = t[3]
                        ? t[3]
                              .substring(1, t[3].length - 1)
                              .replace(this.rules.inline.anyPunctuation, "$1")
                        : t[3];
                return { type: "def", tag: e, raw: t[0], href: n, title: r };
            }
        }
        table(e) {
            let t = this.rules.block.table.exec(e);
            if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
            let n = et(t[1]),
                r = t[2]
                    .replace(this.rules.other.tableAlignChars, "")
                    .split("|"),
                s = t[3]?.trim()
                    ? t[3]
                          .replace(this.rules.other.tableRowBlankLine, "")
                          .split("\n")
                    : [],
                l = {
                    type: "table",
                    raw: t[0],
                    header: [],
                    align: [],
                    rows: [],
                };
            if (n.length === r.length) {
                for (let e of r)
                    this.rules.other.tableAlignRight.test(e)
                        ? l.align.push("right")
                        : this.rules.other.tableAlignCenter.test(e)
                          ? l.align.push("center")
                          : this.rules.other.tableAlignLeft.test(e)
                            ? l.align.push("left")
                            : l.align.push(null);
                for (let e = 0; e < n.length; e++)
                    l.header.push({
                        text: n[e],
                        tokens: this.lexer.inline(n[e]),
                        header: !0,
                        align: l.align[e],
                    });
                for (let e of s)
                    l.rows.push(
                        et(e, l.header.length).map((e, t) => ({
                            text: e,
                            tokens: this.lexer.inline(e),
                            header: !1,
                            align: l.align[t],
                        })),
                    );
                return l;
            }
        }
        lheading(e) {
            let t = this.rules.block.lheading.exec(e);
            if (t)
                return {
                    type: "heading",
                    raw: t[0],
                    depth: "=" === t[2].charAt(0) ? 1 : 2,
                    text: t[1],
                    tokens: this.lexer.inline(t[1]),
                };
        }
        paragraph(e) {
            let t = this.rules.block.paragraph.exec(e);
            if (t) {
                let e =
                    "\n" === t[1].charAt(t[1].length - 1)
                        ? t[1].slice(0, -1)
                        : t[1];
                return {
                    type: "paragraph",
                    raw: t[0],
                    text: e,
                    tokens: this.lexer.inline(e),
                };
            }
        }
        text(e) {
            let t = this.rules.block.text.exec(e);
            if (t)
                return {
                    type: "text",
                    raw: t[0],
                    text: t[0],
                    tokens: this.lexer.inline(t[0]),
                };
        }
        escape(e) {
            let t = this.rules.inline.escape.exec(e);
            if (t) return { type: "escape", raw: t[0], text: t[1] };
        }
        tag(e) {
            let t = this.rules.inline.tag.exec(e);
            if (t)
                return (
                    !this.lexer.state.inLink &&
                    this.rules.other.startATag.test(t[0])
                        ? (this.lexer.state.inLink = !0)
                        : this.lexer.state.inLink &&
                          this.rules.other.endATag.test(t[0]) &&
                          (this.lexer.state.inLink = !1),
                    !this.lexer.state.inRawBlock &&
                    this.rules.other.startPreScriptTag.test(t[0])
                        ? (this.lexer.state.inRawBlock = !0)
                        : this.lexer.state.inRawBlock &&
                          this.rules.other.endPreScriptTag.test(t[0]) &&
                          (this.lexer.state.inRawBlock = !1),
                    {
                        type: "html",
                        raw: t[0],
                        inLink: this.lexer.state.inLink,
                        inRawBlock: this.lexer.state.inRawBlock,
                        block: !1,
                        text: t[0],
                    }
                );
        }
        link(e) {
            let t = this.rules.inline.link.exec(e);
            if (t) {
                let e = t[2].trim();
                if (
                    !this.options.pedantic &&
                    this.rules.other.startAngleBracket.test(e)
                ) {
                    if (!this.rules.other.endAngleBracket.test(e)) return;
                    let t = en(e.slice(0, -1), "\\");
                    if ((e.length - t.length) % 2 == 0) return;
                } else {
                    let e = (function (e, t) {
                        if (-1 === e.indexOf(")")) return -1;
                        let n = 0;
                        for (let r = 0; r < e.length; r++)
                            if ("\\" === e[r]) r++;
                            else if ("(" === e[r]) n++;
                            else if (e[r] === t[1] && --n < 0) return r;
                        return n > 0 ? -2 : -1;
                    })(t[2], "()");
                    if (-2 === e) return;
                    if (e > -1) {
                        let n =
                            (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + e;
                        (t[2] = t[2].substring(0, e)),
                            (t[0] = t[0].substring(0, n).trim()),
                            (t[3] = "");
                    }
                }
                let n = t[2],
                    r = "";
                if (this.options.pedantic) {
                    let e = this.rules.other.pedanticHrefTitle.exec(n);
                    e && ((n = e[1]), (r = e[3]));
                } else r = t[3] ? t[3].slice(1, -1) : "";
                return (
                    (n = n.trim()),
                    this.rules.other.startAngleBracket.test(n) &&
                        (n =
                            this.options.pedantic &&
                            !this.rules.other.endAngleBracket.test(e)
                                ? n.slice(1)
                                : n.slice(1, -1)),
                    er(
                        t,
                        {
                            href: n
                                ? n.replace(
                                      this.rules.inline.anyPunctuation,
                                      "$1",
                                  )
                                : n,
                            title: r
                                ? r.replace(
                                      this.rules.inline.anyPunctuation,
                                      "$1",
                                  )
                                : r,
                        },
                        t[0],
                        this.lexer,
                        this.rules,
                    )
                );
            }
        }
        reflink(e, t) {
            let n;
            if (
                (n = this.rules.inline.reflink.exec(e)) ||
                (n = this.rules.inline.nolink.exec(e))
            ) {
                let e =
                    t[
                        (n[2] || n[1])
                            .replace(this.rules.other.multipleSpaceGlobal, " ")
                            .toLowerCase()
                    ];
                if (!e) {
                    let e = n[0].charAt(0);
                    return { type: "text", raw: e, text: e };
                }
                return er(n, e, n[0], this.lexer, this.rules);
            }
        }
        emStrong(e, t, n = "") {
            let r = this.rules.inline.emStrongLDelim.exec(e);
            if (
                !(
                    !r ||
                    (r[3] && n.match(this.rules.other.unicodeAlphaNumeric))
                ) &&
                (!(r[1] || r[2]) || !n || this.rules.inline.punctuation.exec(n))
            ) {
                let n = [...r[0]].length - 1,
                    s,
                    l,
                    i = n,
                    a = 0,
                    o =
                        "*" === r[0][0]
                            ? this.rules.inline.emStrongRDelimAst
                            : this.rules.inline.emStrongRDelimUnd;
                for (
                    o.lastIndex = 0, t = t.slice(-1 * e.length + n);
                    null != (r = o.exec(t));

                ) {
                    if (!(s = r[1] || r[2] || r[3] || r[4] || r[5] || r[6]))
                        continue;
                    if (((l = [...s].length), r[3] || r[4])) {
                        i += l;
                        continue;
                    }
                    if ((r[5] || r[6]) && n % 3 && !((n + l) % 3)) {
                        a += l;
                        continue;
                    }
                    if ((i -= l) > 0) continue;
                    l = Math.min(l, l + i + a);
                    let t = [...r[0]][0].length,
                        o = e.slice(0, n + r.index + t + l);
                    if (Math.min(n, l) % 2) {
                        let e = o.slice(1, -1);
                        return {
                            type: "em",
                            raw: o,
                            text: e,
                            tokens: this.lexer.inlineTokens(e),
                        };
                    }
                    let c = o.slice(2, -2);
                    return {
                        type: "strong",
                        raw: o,
                        text: c,
                        tokens: this.lexer.inlineTokens(c),
                    };
                }
            }
        }
        codespan(e) {
            let t = this.rules.inline.code.exec(e);
            if (t) {
                let e = t[2].replace(this.rules.other.newLineCharGlobal, " "),
                    n = this.rules.other.nonSpaceChar.test(e),
                    r =
                        this.rules.other.startingSpaceChar.test(e) &&
                        this.rules.other.endingSpaceChar.test(e);
                return (
                    n && r && (e = e.substring(1, e.length - 1)),
                    { type: "codespan", raw: t[0], text: e }
                );
            }
        }
        br(e) {
            let t = this.rules.inline.br.exec(e);
            if (t) return { type: "br", raw: t[0] };
        }
        del(e) {
            let t = this.rules.inline.del.exec(e);
            if (t)
                return {
                    type: "del",
                    raw: t[0],
                    text: t[2],
                    tokens: this.lexer.inlineTokens(t[2]),
                };
        }
        autolink(e) {
            let t = this.rules.inline.autolink.exec(e);
            if (t) {
                let e, n;
                return (
                    (n = "@" === t[2] ? "mailto:" + (e = t[1]) : (e = t[1])),
                    {
                        type: "link",
                        raw: t[0],
                        text: e,
                        href: n,
                        tokens: [{ type: "text", raw: e, text: e }],
                    }
                );
            }
        }
        url(e) {
            let t;
            if ((t = this.rules.inline.url.exec(e))) {
                let e, n;
                if ("@" === t[2]) n = "mailto:" + (e = t[0]);
                else {
                    let r;
                    do
                        (r = t[0]),
                            (t[0] =
                                this.rules.inline._backpedal.exec(t[0])?.[0] ??
                                "");
                    while (r !== t[0]);
                    (e = t[0]), (n = "www." === t[1] ? "http://" + t[0] : t[0]);
                }
                return {
                    type: "link",
                    raw: t[0],
                    text: e,
                    href: n,
                    tokens: [{ type: "text", raw: e, text: e }],
                };
            }
        }
        inlineText(e) {
            let t = this.rules.inline.text.exec(e);
            if (t) {
                let e = this.lexer.state.inRawBlock;
                return { type: "text", raw: t[0], text: t[0], escaped: e };
            }
        }
    }
    class el {
        tokens;
        options;
        state;
        tokenizer;
        inlineQueue;
        constructor(t) {
            (this.tokens = []),
                (this.tokens.links = Object.create(null)),
                (this.options = t || e.defaults),
                (this.options.tokenizer = this.options.tokenizer || new es()),
                (this.tokenizer = this.options.tokenizer),
                (this.tokenizer.options = this.options),
                (this.tokenizer.lexer = this),
                (this.inlineQueue = []),
                (this.state = { inLink: !1, inRawBlock: !1, top: !0 });
            let n = { other: l, block: U.normal, inline: K.normal };
            this.options.pedantic
                ? ((n.block = U.pedantic), (n.inline = K.pedantic))
                : this.options.gfm &&
                  ((n.block = U.gfm),
                  this.options.breaks
                      ? (n.inline = K.breaks)
                      : (n.inline = K.gfm)),
                (this.tokenizer.rules = n);
        }
        static get rules() {
            return { block: U, inline: K };
        }
        static lex(e, t) {
            return new el(t).lex(e);
        }
        static lexInline(e, t) {
            return new el(t).inlineTokens(e);
        }
        lex(e) {
            (e = e.replace(l.carriageReturn, "\n")),
                this.blockTokens(e, this.tokens);
            for (let e = 0; e < this.inlineQueue.length; e++) {
                let t = this.inlineQueue[e];
                this.inlineTokens(t.src, t.tokens);
            }
            return (this.inlineQueue = []), this.tokens;
        }
        blockTokens(e, t = [], n = !1) {
            for (
                this.options.pedantic &&
                (e = e
                    .replace(l.tabCharGlobal, "    ")
                    .replace(l.spaceLine, ""));
                e;

            ) {
                let r;
                if (
                    this.options.extensions?.block?.some(
                        (n) =>
                            !!(r = n.call({ lexer: this }, e, t)) &&
                            ((e = e.substring(r.raw.length)), t.push(r), !0),
                    )
                )
                    continue;
                if ((r = this.tokenizer.space(e))) {
                    e = e.substring(r.raw.length);
                    let n = t.at(-1);
                    1 === r.raw.length && void 0 !== n
                        ? (n.raw += "\n")
                        : t.push(r);
                    continue;
                }
                if ((r = this.tokenizer.code(e))) {
                    e = e.substring(r.raw.length);
                    let n = t.at(-1);
                    n?.type === "paragraph" || n?.type === "text"
                        ? ((n.raw += "\n" + r.raw),
                          (n.text += "\n" + r.text),
                          (this.inlineQueue.at(-1).src = n.text))
                        : t.push(r);
                    continue;
                }
                if (
                    (r = this.tokenizer.fences(e)) ||
                    (r = this.tokenizer.heading(e)) ||
                    (r = this.tokenizer.hr(e)) ||
                    (r = this.tokenizer.blockquote(e)) ||
                    (r = this.tokenizer.list(e)) ||
                    (r = this.tokenizer.html(e))
                ) {
                    (e = e.substring(r.raw.length)), t.push(r);
                    continue;
                }
                if ((r = this.tokenizer.def(e))) {
                    e = e.substring(r.raw.length);
                    let n = t.at(-1);
                    n?.type === "paragraph" || n?.type === "text"
                        ? ((n.raw += "\n" + r.raw),
                          (n.text += "\n" + r.raw),
                          (this.inlineQueue.at(-1).src = n.text))
                        : this.tokens.links[r.tag] ||
                          (this.tokens.links[r.tag] = {
                              href: r.href,
                              title: r.title,
                          });
                    continue;
                }
                if (
                    (r = this.tokenizer.table(e)) ||
                    (r = this.tokenizer.lheading(e))
                ) {
                    (e = e.substring(r.raw.length)), t.push(r);
                    continue;
                }
                let s = e;
                if (this.options.extensions?.startBlock) {
                    let t,
                        n = 1 / 0,
                        r = e.slice(1);
                    this.options.extensions.startBlock.forEach((e) => {
                        "number" == typeof (t = e.call({ lexer: this }, r)) &&
                            t >= 0 &&
                            (n = Math.min(n, t));
                    }),
                        n < 1 / 0 && n >= 0 && (s = e.substring(0, n + 1));
                }
                if (this.state.top && (r = this.tokenizer.paragraph(s))) {
                    let l = t.at(-1);
                    n && l?.type === "paragraph"
                        ? ((l.raw += "\n" + r.raw),
                          (l.text += "\n" + r.text),
                          this.inlineQueue.pop(),
                          (this.inlineQueue.at(-1).src = l.text))
                        : t.push(r),
                        (n = s.length !== e.length),
                        (e = e.substring(r.raw.length));
                    continue;
                }
                if ((r = this.tokenizer.text(e))) {
                    e = e.substring(r.raw.length);
                    let n = t.at(-1);
                    n?.type === "text"
                        ? ((n.raw += "\n" + r.raw),
                          (n.text += "\n" + r.text),
                          this.inlineQueue.pop(),
                          (this.inlineQueue.at(-1).src = n.text))
                        : t.push(r);
                    continue;
                }
                if (e) {
                    let t = "Infinite loop on byte: " + e.charCodeAt(0);
                    if (this.options.silent) {
                        console.error(t);
                        break;
                    }
                    throw Error(t);
                }
            }
            return (this.state.top = !0), t;
        }
        inline(e, t = []) {
            return this.inlineQueue.push({ src: e, tokens: t }), t;
        }
        inlineTokens(e, t = []) {
            let n = e,
                r = null;
            if (this.tokens.links) {
                let e = Object.keys(this.tokens.links);
                if (e.length > 0)
                    for (
                        ;
                        null !=
                        (r = this.tokenizer.rules.inline.reflinkSearch.exec(n));

                    )
                        e.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) &&
                            (n =
                                n.slice(0, r.index) +
                                "[" +
                                "a".repeat(r[0].length - 2) +
                                "]" +
                                n.slice(
                                    this.tokenizer.rules.inline.reflinkSearch
                                        .lastIndex,
                                ));
            }
            for (
                ;
                null !=
                (r = this.tokenizer.rules.inline.anyPunctuation.exec(n));

            )
                n =
                    n.slice(0, r.index) +
                    "++" +
                    n.slice(
                        this.tokenizer.rules.inline.anyPunctuation.lastIndex,
                    );
            for (
                ;
                null != (r = this.tokenizer.rules.inline.blockSkip.exec(n));

            )
                n =
                    n.slice(0, r.index) +
                    "[" +
                    "a".repeat(r[0].length - 2) +
                    "]" +
                    n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
            let s = !1,
                l = "";
            for (; e; ) {
                let r;
                if (
                    (s || (l = ""),
                    (s = !1),
                    this.options.extensions?.inline?.some(
                        (n) =>
                            !!(r = n.call({ lexer: this }, e, t)) &&
                            ((e = e.substring(r.raw.length)), t.push(r), !0),
                    ))
                )
                    continue;
                if (
                    (r = this.tokenizer.escape(e)) ||
                    (r = this.tokenizer.tag(e)) ||
                    (r = this.tokenizer.link(e))
                ) {
                    (e = e.substring(r.raw.length)), t.push(r);
                    continue;
                }
                if ((r = this.tokenizer.reflink(e, this.tokens.links))) {
                    e = e.substring(r.raw.length);
                    let n = t.at(-1);
                    "text" === r.type && n?.type === "text"
                        ? ((n.raw += r.raw), (n.text += r.text))
                        : t.push(r);
                    continue;
                }
                if (
                    (r = this.tokenizer.emStrong(e, n, l)) ||
                    (r = this.tokenizer.codespan(e)) ||
                    (r = this.tokenizer.br(e)) ||
                    (r = this.tokenizer.del(e)) ||
                    (r = this.tokenizer.autolink(e)) ||
                    (!this.state.inLink && (r = this.tokenizer.url(e)))
                ) {
                    (e = e.substring(r.raw.length)), t.push(r);
                    continue;
                }
                let i = e;
                if (this.options.extensions?.startInline) {
                    let t,
                        n = 1 / 0,
                        r = e.slice(1);
                    this.options.extensions.startInline.forEach((e) => {
                        "number" == typeof (t = e.call({ lexer: this }, r)) &&
                            t >= 0 &&
                            (n = Math.min(n, t));
                    }),
                        n < 1 / 0 && n >= 0 && (i = e.substring(0, n + 1));
                }
                if ((r = this.tokenizer.inlineText(i))) {
                    (e = e.substring(r.raw.length)),
                        "_" !== r.raw.slice(-1) && (l = r.raw.slice(-1)),
                        (s = !0);
                    let n = t.at(-1);
                    n?.type === "text"
                        ? ((n.raw += r.raw), (n.text += r.text))
                        : t.push(r);
                    continue;
                }
                if (e) {
                    let t = "Infinite loop on byte: " + e.charCodeAt(0);
                    if (this.options.silent) {
                        console.error(t);
                        break;
                    }
                    throw Error(t);
                }
            }
            return t;
        }
    }
    class ei {
        options;
        parser;
        constructor(t) {
            this.options = t || e.defaults;
        }
        space(e) {
            return "";
        }
        code({ text: e, lang: t, escaped: n }) {
            let r = (t || "").match(l.notSpaceStart)?.[0],
                s = e.replace(l.endingNewline, "") + "\n";
            return r
                ? '<pre><code class="language-' +
                      Y(r) +
                      '">' +
                      (n ? s : Y(s, !0)) +
                      "</code></pre>\n"
                : "<pre><code>" + (n ? s : Y(s, !0)) + "</code></pre>\n";
        }
        blockquote({ tokens: e }) {
            let t = this.parser.parse(e);
            return `<blockquote>
${t}</blockquote>
`;
        }
        html({ text: e }) {
            return e;
        }
        heading({ tokens: e, depth: t }) {
            return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
        }
        hr(e) {
            return "<hr>\n";
        }
        list(e) {
            let t = e.ordered,
                n = e.start,
                r = "";
            for (let t = 0; t < e.items.length; t++) {
                let n = e.items[t];
                r += this.listitem(n);
            }
            let s = t ? "ol" : "ul";
            return (
                "<" +
                s +
                (t && 1 !== n ? ' start="' + n + '"' : "") +
                ">\n" +
                r +
                "</" +
                s +
                ">\n"
            );
        }
        listitem(e) {
            let t = "";
            if (e.task) {
                let n = this.checkbox({ checked: !!e.checked });
                e.loose
                    ? e.tokens[0]?.type === "paragraph"
                        ? ((e.tokens[0].text = n + " " + e.tokens[0].text),
                          e.tokens[0].tokens &&
                              e.tokens[0].tokens.length > 0 &&
                              "text" === e.tokens[0].tokens[0].type &&
                              ((e.tokens[0].tokens[0].text =
                                  n + " " + Y(e.tokens[0].tokens[0].text)),
                              (e.tokens[0].tokens[0].escaped = !0)))
                        : e.tokens.unshift({
                              type: "text",
                              raw: n + " ",
                              text: n + " ",
                              escaped: !0,
                          })
                    : (t += n + " ");
            }
            return (
                (t += this.parser.parse(e.tokens, !!e.loose)),
                `<li>${t}</li>
`
            );
        }
        checkbox({ checked: e }) {
            return (
                "<input " +
                (e ? 'checked="" ' : "") +
                'disabled="" type="checkbox">'
            );
        }
        paragraph({ tokens: e }) {
            return `<p>${this.parser.parseInline(e)}</p>
`;
        }
        table(e) {
            let t = "",
                n = "";
            for (let t = 0; t < e.header.length; t++)
                n += this.tablecell(e.header[t]);
            t += this.tablerow({ text: n });
            let r = "";
            for (let t = 0; t < e.rows.length; t++) {
                let s = e.rows[t];
                n = "";
                for (let e = 0; e < s.length; e++) n += this.tablecell(s[e]);
                r += this.tablerow({ text: n });
            }
            return (
                r && (r = `<tbody>${r}</tbody>`),
                "<table>\n<thead>\n" + t + "</thead>\n" + r + "</table>\n"
            );
        }
        tablerow({ text: e }) {
            return `<tr>
${e}</tr>
`;
        }
        tablecell(e) {
            let t = this.parser.parseInline(e.tokens),
                n = e.header ? "th" : "td";
            return (
                (e.align ? `<${n} align="${e.align}">` : `<${n}>`) +
                t +
                `</${n}>
`
            );
        }
        strong({ tokens: e }) {
            return `<strong>${this.parser.parseInline(e)}</strong>`;
        }
        em({ tokens: e }) {
            return `<em>${this.parser.parseInline(e)}</em>`;
        }
        codespan({ text: e }) {
            return `<code>${Y(e, !0)}</code>`;
        }
        br(e) {
            return "<br>";
        }
        del({ tokens: e }) {
            return `<del>${this.parser.parseInline(e)}</del>`;
        }
        link({ href: e, title: t, tokens: n }) {
            let r = this.parser.parseInline(n),
                s = ee(e);
            if (null === s) return r;
            let l = '<a href="' + (e = s) + '"';
            return t && (l += ' title="' + Y(t) + '"'), (l += ">" + r + "</a>");
        }
        image({ href: e, title: t, text: n, tokens: r }) {
            r && (n = this.parser.parseInline(r, this.parser.textRenderer));
            let s = ee(e);
            if (null === s) return Y(n);
            e = s;
            let l = `<img src="${e}" alt="${n}"`;
            return t && (l += ` title="${Y(t)}"`), (l += ">");
        }
        text(e) {
            return "tokens" in e && e.tokens
                ? this.parser.parseInline(e.tokens)
                : "escaped" in e && e.escaped
                  ? e.text
                  : Y(e.text);
        }
    }
    class ea {
        strong({ text: e }) {
            return e;
        }
        em({ text: e }) {
            return e;
        }
        codespan({ text: e }) {
            return e;
        }
        del({ text: e }) {
            return e;
        }
        html({ text: e }) {
            return e;
        }
        text({ text: e }) {
            return e;
        }
        link({ text: e }) {
            return "" + e;
        }
        image({ text: e }) {
            return "" + e;
        }
        br() {
            return "";
        }
    }
    class eo {
        options;
        renderer;
        textRenderer;
        constructor(t) {
            (this.options = t || e.defaults),
                (this.options.renderer = this.options.renderer || new ei()),
                (this.renderer = this.options.renderer),
                (this.renderer.options = this.options),
                (this.renderer.parser = this),
                (this.textRenderer = new ea());
        }
        static parse(e, t) {
            return new eo(t).parse(e);
        }
        static parseInline(e, t) {
            return new eo(t).parseInline(e);
        }
        parse(e, t = !0) {
            let n = "";
            for (let r = 0; r < e.length; r++) {
                let s = e[r];
                if (this.options.extensions?.renderers?.[s.type]) {
                    let e = this.options.extensions.renderers[s.type].call(
                        { parser: this },
                        s,
                    );
                    if (
                        !1 !== e ||
                        ![
                            "space",
                            "hr",
                            "heading",
                            "code",
                            "table",
                            "blockquote",
                            "list",
                            "html",
                            "paragraph",
                            "text",
                        ].includes(s.type)
                    ) {
                        n += e || "";
                        continue;
                    }
                }
                switch (s.type) {
                    case "space":
                        n += this.renderer.space(s);
                        continue;
                    case "hr":
                        n += this.renderer.hr(s);
                        continue;
                    case "heading":
                        n += this.renderer.heading(s);
                        continue;
                    case "code":
                        n += this.renderer.code(s);
                        continue;
                    case "table":
                        n += this.renderer.table(s);
                        continue;
                    case "blockquote":
                        n += this.renderer.blockquote(s);
                        continue;
                    case "list":
                        n += this.renderer.list(s);
                        continue;
                    case "html":
                        n += this.renderer.html(s);
                        continue;
                    case "paragraph":
                        n += this.renderer.paragraph(s);
                        continue;
                    case "text": {
                        let l = s,
                            i = this.renderer.text(l);
                        for (; r + 1 < e.length && "text" === e[r + 1].type; )
                            (l = e[++r]), (i += "\n" + this.renderer.text(l));
                        t
                            ? (n += this.renderer.paragraph({
                                  type: "paragraph",
                                  raw: i,
                                  text: i,
                                  tokens: [
                                      {
                                          type: "text",
                                          raw: i,
                                          text: i,
                                          escaped: !0,
                                      },
                                  ],
                              }))
                            : (n += i);
                        continue;
                    }
                    default: {
                        let e =
                            'Token with "' + s.type + '" type was not found.';
                        if (this.options.silent) return console.error(e), "";
                        throw Error(e);
                    }
                }
            }
            return n;
        }
        parseInline(e, t = this.renderer) {
            let n = "";
            for (let r = 0; r < e.length; r++) {
                let s = e[r];
                if (this.options.extensions?.renderers?.[s.type]) {
                    let e = this.options.extensions.renderers[s.type].call(
                        { parser: this },
                        s,
                    );
                    if (
                        !1 !== e ||
                        ![
                            "escape",
                            "html",
                            "link",
                            "image",
                            "strong",
                            "em",
                            "codespan",
                            "br",
                            "del",
                            "text",
                        ].includes(s.type)
                    ) {
                        n += e || "";
                        continue;
                    }
                }
                switch (s.type) {
                    case "escape":
                    case "text":
                        n += t.text(s);
                        break;
                    case "html":
                        n += t.html(s);
                        break;
                    case "link":
                        n += t.link(s);
                        break;
                    case "image":
                        n += t.image(s);
                        break;
                    case "strong":
                        n += t.strong(s);
                        break;
                    case "em":
                        n += t.em(s);
                        break;
                    case "codespan":
                        n += t.codespan(s);
                        break;
                    case "br":
                        n += t.br(s);
                        break;
                    case "del":
                        n += t.del(s);
                        break;
                    default: {
                        let e =
                            'Token with "' + s.type + '" type was not found.';
                        if (this.options.silent) return console.error(e), "";
                        throw Error(e);
                    }
                }
            }
            return n;
        }
    }
    class ec {
        options;
        block;
        constructor(t) {
            this.options = t || e.defaults;
        }
        static passThroughHooks = new Set([
            "preprocess",
            "postprocess",
            "processAllTokens",
        ]);
        preprocess(e) {
            return e;
        }
        postprocess(e) {
            return e;
        }
        processAllTokens(e) {
            return e;
        }
        provideLexer() {
            return this.block ? el.lex : el.lexInline;
        }
        provideParser() {
            return this.block ? eo.parse : eo.parseInline;
        }
    }
    class eh {
        defaults = t();
        options = this.setOptions;
        parse = this.parseMarkdown(!0);
        parseInline = this.parseMarkdown(!1);
        Parser = eo;
        Renderer = ei;
        TextRenderer = ea;
        Lexer = el;
        Tokenizer = es;
        Hooks = ec;
        constructor(...e) {
            this.use(...e);
        }
        walkTokens(e, t) {
            let n = [];
            for (let r of e)
                switch (((n = n.concat(t.call(this, r))), r.type)) {
                    case "table":
                        for (let e of r.header)
                            n = n.concat(this.walkTokens(e.tokens, t));
                        for (let e of r.rows)
                            for (let r of e)
                                n = n.concat(this.walkTokens(r.tokens, t));
                        break;
                    case "list":
                        n = n.concat(this.walkTokens(r.items, t));
                        break;
                    default: {
                        let e = r;
                        this.defaults.extensions?.childTokens?.[e.type]
                            ? this.defaults.extensions.childTokens[
                                  e.type
                              ].forEach((r) => {
                                  let s = e[r].flat(1 / 0);
                                  n = n.concat(this.walkTokens(s, t));
                              })
                            : e.tokens &&
                              (n = n.concat(this.walkTokens(e.tokens, t)));
                    }
                }
            return n;
        }
        use(...e) {
            let t = this.defaults.extensions || {
                renderers: {},
                childTokens: {},
            };
            return (
                e.forEach((e) => {
                    let n = { ...e };
                    if (
                        ((n.async = this.defaults.async || n.async || !1),
                        e.extensions &&
                            (e.extensions.forEach((e) => {
                                if (!e.name)
                                    throw Error("extension name required");
                                if ("renderer" in e) {
                                    let n = t.renderers[e.name];
                                    n
                                        ? (t.renderers[e.name] = function (
                                              ...t
                                          ) {
                                              let r = e.renderer.apply(this, t);
                                              return (
                                                  !1 === r &&
                                                      (r = n.apply(this, t)),
                                                  r
                                              );
                                          })
                                        : (t.renderers[e.name] = e.renderer);
                                }
                                if ("tokenizer" in e) {
                                    if (
                                        !e.level ||
                                        ("block" !== e.level &&
                                            "inline" !== e.level)
                                    )
                                        throw Error(
                                            "extension level must be 'block' or 'inline'",
                                        );
                                    let n = t[e.level];
                                    n
                                        ? n.unshift(e.tokenizer)
                                        : (t[e.level] = [e.tokenizer]),
                                        e.start &&
                                            ("block" === e.level
                                                ? t.startBlock
                                                    ? t.startBlock.push(e.start)
                                                    : (t.startBlock = [e.start])
                                                : "inline" === e.level &&
                                                  (t.startInline
                                                      ? t.startInline.push(
                                                            e.start,
                                                        )
                                                      : (t.startInline = [
                                                            e.start,
                                                        ])));
                                }
                                "childTokens" in e &&
                                    e.childTokens &&
                                    (t.childTokens[e.name] = e.childTokens);
                            }),
                            (n.extensions = t)),
                        e.renderer)
                    ) {
                        let t = this.defaults.renderer || new ei(this.defaults);
                        for (let n in e.renderer) {
                            if (!(n in t))
                                throw Error(`renderer '${n}' does not exist`);
                            if (["options", "parser"].includes(n)) continue;
                            let r = e.renderer[n],
                                s = t[n];
                            t[n] = (...e) => {
                                let n = r.apply(t, e);
                                return !1 === n && (n = s.apply(t, e)), n || "";
                            };
                        }
                        n.renderer = t;
                    }
                    if (e.tokenizer) {
                        let t =
                            this.defaults.tokenizer || new es(this.defaults);
                        for (let n in e.tokenizer) {
                            if (!(n in t))
                                throw Error(`tokenizer '${n}' does not exist`);
                            if (["options", "rules", "lexer"].includes(n))
                                continue;
                            let r = e.tokenizer[n],
                                s = t[n];
                            t[n] = (...e) => {
                                let n = r.apply(t, e);
                                return !1 === n && (n = s.apply(t, e)), n;
                            };
                        }
                        n.tokenizer = t;
                    }
                    if (e.hooks) {
                        let t = this.defaults.hooks || new ec();
                        for (let n in e.hooks) {
                            if (!(n in t))
                                throw Error(`hook '${n}' does not exist`);
                            if (["options", "block"].includes(n)) continue;
                            let r = e.hooks[n],
                                s = t[n];
                            ec.passThroughHooks.has(n)
                                ? (t[n] = (e) => {
                                      if (this.defaults.async)
                                          return Promise.resolve(
                                              r.call(t, e),
                                          ).then((e) => s.call(t, e));
                                      let n = r.call(t, e);
                                      return s.call(t, n);
                                  })
                                : (t[n] = (...e) => {
                                      let n = r.apply(t, e);
                                      return !1 === n && (n = s.apply(t, e)), n;
                                  });
                        }
                        n.hooks = t;
                    }
                    if (e.walkTokens) {
                        let t = this.defaults.walkTokens,
                            r = e.walkTokens;
                        n.walkTokens = function (e) {
                            let n = [];
                            return (
                                n.push(r.call(this, e)),
                                t && (n = n.concat(t.call(this, e))),
                                n
                            );
                        };
                    }
                    this.defaults = { ...this.defaults, ...n };
                }),
                this
            );
        }
        setOptions(e) {
            return (this.defaults = { ...this.defaults, ...e }), this;
        }
        lexer(e, t) {
            return el.lex(e, t ?? this.defaults);
        }
        parser(e, t) {
            return eo.parse(e, t ?? this.defaults);
        }
        parseMarkdown(e) {
            return (t, n) => {
                let r = { ...n },
                    s = { ...this.defaults, ...r },
                    l = this.onError(!!s.silent, !!s.async);
                if (!0 === this.defaults.async && !1 === r.async)
                    return l(
                        Error(
                            "marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.",
                        ),
                    );
                if (null == t)
                    return l(
                        Error("marked(): input parameter is undefined or null"),
                    );
                if ("string" != typeof t)
                    return l(
                        Error(
                            "marked(): input parameter is of type " +
                                Object.prototype.toString.call(t) +
                                ", string expected",
                        ),
                    );
                s.hooks && ((s.hooks.options = s), (s.hooks.block = e));
                let i = s.hooks
                        ? s.hooks.provideLexer()
                        : e
                          ? el.lex
                          : el.lexInline,
                    a = s.hooks
                        ? s.hooks.provideParser()
                        : e
                          ? eo.parse
                          : eo.parseInline;
                if (s.async)
                    return Promise.resolve(s.hooks ? s.hooks.preprocess(t) : t)
                        .then((e) => i(e, s))
                        .then((e) =>
                            s.hooks ? s.hooks.processAllTokens(e) : e,
                        )
                        .then((e) =>
                            s.walkTokens
                                ? Promise.all(
                                      this.walkTokens(e, s.walkTokens),
                                  ).then(() => e)
                                : e,
                        )
                        .then((e) => a(e, s))
                        .then((e) => (s.hooks ? s.hooks.postprocess(e) : e))
                        .catch(l);
                try {
                    s.hooks && (t = s.hooks.preprocess(t));
                    let e = i(t, s);
                    s.hooks && (e = s.hooks.processAllTokens(e)),
                        s.walkTokens && this.walkTokens(e, s.walkTokens);
                    let n = a(e, s);
                    return s.hooks && (n = s.hooks.postprocess(n)), n;
                } catch (e) {
                    return l(e);
                }
            };
        }
        onError(e, t) {
            return (n) => {
                if (
                    ((n.message +=
                        "\nPlease report this to https://github.com/markedjs/marked."),
                    e)
                ) {
                    let e =
                        "<p>An error occurred:</p><pre>" +
                        Y(n.message + "", !0) +
                        "</pre>";
                    return t ? Promise.resolve(e) : e;
                }
                if (t) return Promise.reject(n);
                throw n;
            };
        }
    }
    let ep = new eh();
    function eu(e, t) {
        return ep.parse(e, t);
    }
    (eu.options = eu.setOptions =
        function (e) {
            return (
                ep.setOptions(e),
                (eu.defaults = ep.defaults),
                n(eu.defaults),
                eu
            );
        }),
        (eu.getDefaults = t),
        (eu.defaults = e.defaults),
        (eu.use = function (...e) {
            return (
                ep.use(...e), (eu.defaults = ep.defaults), n(eu.defaults), eu
            );
        }),
        (eu.walkTokens = function (e, t) {
            return ep.walkTokens(e, t);
        }),
        (eu.parseInline = ep.parseInline),
        (eu.Parser = eo),
        (eu.parser = eo.parse),
        (eu.Renderer = ei),
        (eu.TextRenderer = ea),
        (eu.Lexer = el),
        (eu.lexer = el.lex),
        (eu.Tokenizer = es),
        (eu.Hooks = ec),
        (eu.parse = eu);
    let eg = eu.options,
        ek = eu.setOptions,
        ed = eu.use,
        ef = eu.walkTokens,
        ex = eu.parseInline,
        eb = eo.parse,
        em = el.lex;
    (e.Hooks = ec),
        (e.Lexer = el),
        (e.Marked = eh),
        (e.Parser = eo),
        (e.Renderer = ei),
        (e.TextRenderer = ea),
        (e.Tokenizer = es),
        (e.getDefaults = t),
        (e.lexer = em),
        (e.marked = eu),
        (e.options = eg),
        (e.parse = eu),
        (e.parseInline = ex),
        (e.parser = eb),
        (e.setOptions = ek),
        (e.use = ed),
        (e.walkTokens = ef);
})(e);
const t = document.getElementById("chat-log"),
    n = document.getElementById("prompt-input"),
    r = document.getElementById("send-button"),
    s = "llama3.2:latest",
    l = document.getElementById("chat-log");
document.querySelector(".user-message") ||
    (l.innerHTML =
        '<div class="no-messages"><span style="display: block; font-size: 32px; margin-bottom: 16px;">\uD83E\uDD16</span>Hello, what\'s on your mind?</div>');
let i = null;
async function a() {
    i = new AbortController();
    let r = n.value.trim();
    if (!r) return;
    n.value = "";
    let l = e.marked.parse(r),
        a = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: s, prompt: l, stream: !0 }),
            signal: i.signal,
        });
    if (!a.ok || !a.body) {
        console.error("Error fetching response:", a.status, a.statusText),
            (t.innerHTML += "<p>Error: Could not get response.</p>");
        return;
    }
    let o = a.body.getReader(),
        c = new TextDecoder(),
        h = "",
        p = document.createElement("div");
    (p.innerHTML = `<div class="user-message"><div class="user-icon">\u{1F642}</div><div class="user-prompt">${l}</div></div>`),
        t.appendChild(p);
    let u = document.createElement("div");
    for (u.innerHTML = `<strong>\u{1F916}</strong> `, t.appendChild(u); ; ) {
        let { value: t, done: n } = await o.read();
        if (n) break;
        for (let n of c
            .decode(t, { stream: !0 })
            .split("\n")
            .filter((e) => "" !== e.trim()))
            try {
                let t = JSON.parse(n);
                t.response &&
                    ((h += t.response),
                    (u.innerHTML = `<div class="bot-message"><div class="bot-icon"><img src="ollemur-icon-16px.png"></div><div class="bot-prompt">${e.marked.parse(h)}</div></div>`));
            } catch (e) {
                console.error("Error parsing JSON chunk:", e, n);
            }
    }
}
document.getElementById("stop-button").addEventListener("click", function () {
    i && (i.abort(), (i = null));
}),
    r.addEventListener("click", a),
    n.addEventListener("keyup", function (e) {
        "Enter" === e.key && a();
    }),
    (document.getElementById("model-name").innerText = s);
//# sourceMappingURL=ollama-frontend.faccc10f.js.map
