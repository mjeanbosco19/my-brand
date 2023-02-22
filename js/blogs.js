preload.style.display = 'flex';

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
console.log(nextIndex);

// Blogs In the Dashboards

axios
  .get('https://brand-q646.onrender.com/api/v1/blogs/')
  .then((response) => {
    let blogs = response.data.data.blogs;
    if (blogs.length) {
      let blogContainer = document.getElementById('blogs');
      blogs.forEach(function (blog, index) {
        let blogCard = document.createElement('div');
        blogCard.innerHTML = `
      <div class = "blog-item">
      <img src="${blog.imageCover}" class="blog-image" alt="Blog cover">
        <h2>Blog #${index + 1}</h2>
        <h3 class="blog-title">${blog.title}</h3>
        <p>Category: ${blog.category}</p>
              <span class="blog-icons">                     
        <p>Comments: <span id="comments-${index}">0</span></p>
        <p>Likes: <span id="likes-${index}">0</span></p>
        </span>
        
  <span class="blog-icons">
                                        <button type="submit" id="publish"class="blog-icon" onclick="viewBlog(${index})">
                                        <img class="blog-icon" src="/icons/view.svg" alt=""></button>
                                        <button type="submit" id="publish"class="blog-icon" onclick="editBlog(${index})">
                                        <img class="blog-icon" src="/icons/edit.png" alt=""></button>
                                    <button type="button" class="blog-icon" onclick="removeBlog(${index})"><img class="blog-icon" src="/icons/delete.svg" alt="">
                                        </button>
                                    </span>
         
</div>
      `;
        blogContainer.appendChild(blogCard);
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

// BLOG FILTER
// Blog Filter Js
filterSelection('all');
function filterSelection(c) {
  let x, i;
  x = document.getElementsByClassName('filterDiv');
  if (c == 'all') c = '';
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], 'show');
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], 'show');
  }
}

function w3AddClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(' ');
  arr2 = name.split(' ');
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += ' ' + arr2[i];
    }
  }
}

function w3RemoveClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(' ');
  arr2 = name.split(' ');
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(' ');
}
