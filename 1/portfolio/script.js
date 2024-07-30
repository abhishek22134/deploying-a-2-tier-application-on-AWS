document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/projects')
    .then(response => response.json())
    .then(projects => {
      const projectsList = document.getElementById('projects-list');
      projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        projectDiv.innerHTML = `
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <a href="${project.link}" target="_blank">View Project</a>
        `;
        projectsList.appendChild(projectDiv);
      });
    })
    .catch(error => console.error('Error fetching projects:', error));
});

function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');
}
async function submitForm(event) {
  event.preventDefault();

  const form = document.getElementById('contact-form');
  const formData = new FormData(form);

  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  try {
    const response = await fetch('http://localhost:3000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('Message sent successfully!');
      form.reset();
    } else {
      alert('Failed to send message.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to send message.');
  }
}

