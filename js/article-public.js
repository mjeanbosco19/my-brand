const id = window.location.href.split('#')[1];
preload.style.display = 'flex';
axios
  .get(`https://brand-q646.onrender.com/api/v1/blogs/${id}`)
  .then((response) => {
    preload.style.display = 'none';
    const article = response.data.data.blog;
    const myarticle = document.getElementById('article');
    myarticle.innerHTML = `
    <img class="article-image" src="${article.imageCover}" alt="">
                    <h2 class="article-title">${article.title}</h2>
                    <p class="article-content">
                        ${article.description}
                    </p>
    `;
  });
