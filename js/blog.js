function storeBlog() {
  // input blog
  const title = document.getElementById('blogTitle');
  const imageCover = document.getElementById('blogCover');
  const category = document.getElementById('blogCategory');
  const description = document.getElementById('froala');

  let form_data = new FormData();
  form_data.append('title', title.value);
  form_data.append('imageCover', imageCover.files[0]);
  form_data.append('summary', 'Blog summary');
  form_data.append('category', category.value);
  form_data.append('description', description.value);
  preload.style.display = 'flex';
  axios
    .post('https://brand-q646.onrender.com/api/v1/blogs/', form_data, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    .then((response) => {
      preload.style.display = 'none';
    })
    .catch();
}

// Validate create blog form

function validateBlogForm() {
  let title = document.getElementById('blogTitle').value;
  let cover = document.getElementById('blogCover').value;
  let category = document.getElementById('blogCategory').value;
  let description = document.getElementById('froala').value;
  let valid = true;

  if (title.length < 4 || title.length > 125) {
    document.getElementById('titleError').innerHTML =
      'Blog title must be between 4 and 125 characters';
    valid = false;
  } else {
    document.getElementById('titleError').innerHTML = '';
  }

  if (!cover) {
    document.getElementById('coverError').innerHTML = 'Blog cover is required';
    valid = false;
  } else {
    document.getElementById('coverError').innerHTML = '';
  }

  if (!category) {
    document.getElementById('categoryError').innerHTML =
      'Blog category is required';
    valid = false;
  } else {
    document.getElementById('categoryError').innerHTML = '';
  }

  if (description.length < 4 || description.length > 5000) {
    document.getElementById('descriptionError').innerHTML =
      'Blog description must be between 4 and 5000 characters';
    valid = false;
  } else {
    document.getElementById('descriptionError').innerHTML = '';
  }

  if (valid) {
    storeBlog();
  }
  return false;
}
