'use strict';

function titleClickHandler(event) {
  console.log(event);
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [IN PROGRESS] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */

  console.log('clickedElement:', clickedElement);
  targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post .post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

function generateTitleLinks(customSelector = '') {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into html variable */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagsParams(tags) {
  console.log(tags);

  const params = { max: 0, min: 999999 };
  console.log('params');

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + 'times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  console.log(classNumber);

  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  console.log(allTags);

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const wrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to HTML variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  /* tagList.innerHTML = allTags.join(' '); */

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /*[NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] Start loop: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] Generate code of a link and add it to allTagsHTML */

    const className = calculateTagClass(allTags[tag], tagsParams);

    allTagsHTML += '<li><a class="' + className + '" href="#tag-' + tag + '">' + tag + ' </a></li> ';
  }
  /* [NEW] End loop: for each tag in allTags: */

  /* [NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

  console.log(allTags);
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  /* remove class active */
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const activeHrefs = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  /* add class active */
  for (let activeHref of activeHrefs) {
    activeHref.classList.add('active');
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll('.post-tags .list a');

  /* START LOOP: for each link */
  /* add tagClickHandler as event listener for that link */
  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empy object */
  let allArticleAuthors = {};
  console.log(allArticleAuthors);

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* start loop: for every article */
  for (let article of articles) {
    /*find authors wrapper */
    const wrapper = article.querySelector(optArticleAuthorSelector);

    /*make html variable with empty string */
    let html = '';

    /* get authors from data-authors attribute */
    const articleAuthors = article.getAttribute('data-author');

    /* generate HTML of the link */
    const linkHTML = '<a href="#' + articleAuthors + '"><span>' + articleAuthors + '</span></a>';

    /* add generated code to HTML variable */
    html = html + linkHTML;

    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allArticleAuthors[articleAuthors]) {
      allArticleAuthors[articleAuthors] = 1;
    } else {
      allArticleAuthors[articleAuthors]++;
    }

    /* insert HTML of all the links into the authors wrapper */
    wrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }

  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector(optAuthorsListSelector);
  console.log(authorList);

  /* [NEW] add html from allAuthors to authorList */
  authorList.innerHTML = '';

  /* [NEW] create variable for all links HTML code */
  let allArticleAuthorsHTML = '';

  /* [NEW] start loop for each author in allAuthors: */
  for (let articleAuthors in allArticleAuthors) {
    allArticleAuthorsHTML +=
      '<li><a href="#' + articleAuthors + '"><span>' + articleAuthors + '(' + allArticleAuthors[articleAuthors] + ')</span></a></li>';
  }

  authorList.innerHTML = allArticleAuthorsHTML;
  console.log(allArticleAuthors);
}

generateAuthors();

function authorClickHandler(event) {
  console.log(event);

  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const author = href.replace('#', '');

  const activeLinks = document.querySelectorAll('a.active[href="' + href + '"]');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  const activeHrefs = document.querySelectorAll('articleAuthor');

  for (let activeHref of activeHrefs) {
    activeHref.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const links = document.querySelectorAll('.post .post-author a, .authors.list a');
  console.log('!', links);

  for (let link of links) {
    link.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
