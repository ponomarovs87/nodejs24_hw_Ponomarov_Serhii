function renderAbstractionPage(
  _req,
  res,
  pageName,
  data = {}
) {
  if (pageName === "404") {
    return res.status(404).render("404");
  }
  res.render(pageName, data, (err, html) => {
    if (err) {
      return res.redirect("/404");
    }
    return res.send(html);
  });
}

module.exports = { renderAbstractionPage };
