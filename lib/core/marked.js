/**
 * This is an override of marked to be compatible with Blessed tags.
 *
 * It will override all the Renderer methods.
 */

var marked = require('marked');

var Renderer = Object.create(marked.Renderer);

// Const declaration.
var ITALIC_COLOR = '#989898';


Renderer.prototype.code =
Renderer.prototype.codespan =
Renderer.prototype.paragraph = function (text) {
  return text;
};

// Renderer.prototype.blockquote = function(quote) {
//   return '<blockquote>\n' + quote + '</blockquote>\n';
// };
//
// Renderer.prototype.html = function(html) {
//   return html;
// };
//
// Renderer.prototype.heading = function(text, level, raw) {
//   return '<h'
//     + level
//     + ' id="'
//     + this.options.headerPrefix
//     + raw.toLowerCase().replace(/[^\w]+/g, '-')
//     + '">'
//     + text
//     + '</h'
//     + level
//     + '>\n';
// };
//
// Renderer.prototype.hr = function() {
//   return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
// };
//
// Renderer.prototype.list = function(body, ordered) {
//   var type = ordered ? 'ol' : 'ul';
//   return '<' + type + '>\n' + body + '</' + type + '>\n';
// };
//
// Renderer.prototype.listitem = function(text) {
//   return '<li>' + text + '</li>\n';
// };
//
// Renderer.prototype.paragraph = function(text) {
//   return '<p>' + text + '</p>\n';
// };
//
// Renderer.prototype.table = function(header, body) {
//   return '<table>\n'
//     + '<thead>\n'
//     + header
//     + '</thead>\n'
//     + '<tbody>\n'
//     + body
//     + '</tbody>\n'
//     + '</table>\n';
// };
//
// Renderer.prototype.tablerow = function(content) {
//   return '<tr>\n' + content + '</tr>\n';
// };
//
// Renderer.prototype.tablecell = function(content, flags) {
//   var type = flags.header ? 'th' : 'td';
//   var tag = flags.align
//     ? '<' + type + ' style="text-align:' + flags.align + '">'
//     : '<' + type + '>';
//   return tag + content + '</' + type + '>\n';
// };

// span level renderer
Renderer.prototype.strong = function(text) {
  return '{bold}' + text + '{/bold}';
};

Renderer.prototype.em = function(text) {
  return '{' + ITALIC_COLOR + '-fg}*' + text + '*{/' + ITALIC_COLOR + '-fg}';
};

Renderer.prototype.br = function() {
  return '\n';
};

Renderer.prototype.del = function(text) {
  return '~~' + text + '~~';
};

Renderer.prototype.link = function(href, title, text) {
  return '{underline}' + href + '{/underline}';
};

// Renderer.prototype.image = function(href, title, text) {
//   var out = '<img src="' + href + '" alt="' + text + '"';
//   if (title) {
//     out += ' title="' + title + '"';
//   }
//   out += this.options.xhtml ? '/>' : '>';
//   return out;
// };


marked.Renderer = Renderer;

exports = module.exports = marked;
