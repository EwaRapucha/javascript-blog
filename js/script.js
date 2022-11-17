"use strict";
{
  const titleClickHandler = function (event) {
    console.log(event);
    event.preventDefault();
    const clickedElement = this;
    console.log("Link was clicked!");

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll(".titles a.active");

    for (let activeLink of activeLinks) {
      activeLink.classList.remove("active");
    }

    /* [IN PROGRESS] add class 'active' to the clicked link */

    console.log("clickedElement:", clickedElement);
    clickedElement.classList.add("active");

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll(".posts article.active");

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove("active");
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute("href");
    console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* add class 'active' to the correct article */

    console.log("clickedElement:", clickedElement);
    targetArticle.classList.add("active");
  };

  const optArticleSelector = ".post",
    optTitleSelector = ".post-title",
    optTitleListSelector = ".titles";

  function generateTitleLinks() {
    /* remove contents of titleList */
    const titleList = (document.querySelector(optTitleListSelector).innerHTML = "");

    /* for each article */
    const articles = document.querySelectorAll(".posts");

    for (let article of articles) {
      /* get the article id */
      const articleId = document.getElementById(".article");

      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTML =
        '<li><a href="#' + document.getElementById(".article") + '"><span>' + article.querySelector(optTitleSelector).innerHTML + "</span></a></li>";
      console.log(linkHtml);
      /* insert link into titleList */
      titleList.innerHTML = titleList.innerHTML + linkHTML;
    }
  }

  generateTitleLinks();
}

const links = document.querySelectorAll(".titles a");

for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}
