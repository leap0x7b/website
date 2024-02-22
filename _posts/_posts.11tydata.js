export default {
  layout: "post",
  permalink: "/blog/{{ page.date | permalinkDate }}/{{ page.filePathStem.replace('_posts/', '') }}.html"
};