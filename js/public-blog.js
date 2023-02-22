// Convert cover photo input element
const blogForm = document.getElementById('blogForm');
const blogCover = document.getElementById('blogCover');
const saveButton = document.getElementById('saveButton');
const blogTitle = document.getElementById('blogTitle');
const blogCategory = document.getElementById('blogCategory');
const blogDescription = document.getElementById('froala');
const date = new Date().toLocaleString();
const blogsIndex = JSON.parse(localStorage.getItem('blogs'));
const nextIndex = blogsIndex?.length;
preload.style.display = 'flex';
axios
  .get('https://brand-q646.onrender.com/api/v1/blogs/')
  .then((response) => {
    let blogs = response.data.data.blogs;
    if (blogs.length) {
      let blogContainer = document.getElementById('blogs');
      blogs.forEach(function (blog, index) {
        blogContainer.innerHTML += `<li class="relative">
                        <div class="blog-item">
                            <a href="/article.html#${blog._id}">
                                <img src="${blog.imageCover}" alt="" class="blog-image">
                                <p class="blog-title">${blog.title}</p>
                            </a>
                            <span class="blog-icons">
                                <img class="blog-icon" src="/icons/like.svg" alt="">
                                <img class="blog-icon" src="/icons/comment.svg" alt="">
                                <img class="blog-icon" src="/icons/share.svg" alt="">
                            </span>

                        </div>

                    </li>`;
      });
    } else {
      blogContainer.innerHTML = 'No blogs found.';
    }
    preload.style.display = 'none';
  })
  .catch((error) => {
    preload.style.display = 'none';
  });

function publishBlog(index) {
  // Add code here to publish the blog with the specified index
}
function removeBlog(index) {
  let blogs = JSON.parse(localStorage.getItem('blogs'));
  blogs.splice(index, 1);
  localStorage.setItem('blogs', JSON.stringify(blogs));
  location.reload();
}
