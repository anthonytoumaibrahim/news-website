const articlesContainer = $("#articles-container");

const getArticles = async () => {
  $.ajax({
    url: API_URLS.getArticles,
    dataType: "json",
    success: (result) => {
      const articles = result.articles;
      articles.forEach((article) => {
        articlesContainer.append(generateArticleCard(article));
      });
    },
    error: (error) => {
      articlesContainer.html(
        "Sorry, something went wrong! The error was logged to the console."
      );
      console.log(error);
    },
  });
};

const generateArticleCard = (article) => {
  const { id, title, content, created_at, image, author } = article;

  return `<div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${image}" class="img-fluid rounded-start" alt="${title}" />
    </div>
    <div class="col-md-8">
      <div class="card-body d-flex flex-column h-100">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${content}</p>
        <p class="card-text mt-auto">
          <small class="text-body-secondary"
            >By ${author} / Last updated ${created_at}</small
          >
        </p>
      </div>
    </div>
  </div>
</div>`;
};

getArticles();
