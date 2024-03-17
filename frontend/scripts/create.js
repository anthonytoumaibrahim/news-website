const createForm = $("#create-article-form");
const responseMessage = $("#response-message");

// Fields
const [articleImage, articleTitle, articleContent, articleAuthor] = [
  $("#article_image_url"),
  $("#article_title"),
  $("#article_content"),
  $("#article_author"),
];

createForm.on("submit", (e) => {
  e.preventDefault();
  responseMessage.removeClass("d-none");

  $.ajax({
    url: API_URLS.postArticle,
    method: "POST",
    data: {
      image: articleImage.val(),
      title: articleTitle.val(),
      content: articleContent.val(),
      author: articleAuthor.val(),
    },
    dataType: "json",
    success: (result) => {
      responseMessage.toggleClass("alert-danger", !result.success);
      responseMessage.toggleClass("alert-success", result.success);
      responseMessage.html(result.message);
      if (result.success) {
        articlesContainer.prepend(generateArticleCard(result.article));
      }
    },
    error: (error) => {
      responseMessage.html(
        "Sorry, an error occurred. Please see the console for more information."
      );
      console.log(error.responseText);
    },
  });
});
