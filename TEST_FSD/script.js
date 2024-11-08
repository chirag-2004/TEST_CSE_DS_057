async function fetchGitHubUsers() {
    try {
      const response = await fetch('https://api.github.com/users');
      const users = await response.json();
      const top10Users = users.slice(0, 10);
      return top10Users;
    } catch (error) {
      console.error('Error fetching GitHub users:', error);
      return [];
    }
  }
  
  function displayUsers(users) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
  
    users.forEach(user => {
      const listItem = document.createElement('li');
      const anchor = document.createElement('a');
      anchor.href = `https://github.com/${user.login}`;
      anchor.textContent = user.login;
      listItem.appendChild(anchor);
      userList.appendChild(listItem);
    });
  }
  
  function sortUsers(users, sortBy) {
    if (sortBy === 'Alphabetical') {
      users.sort((a, b) => a.login.localeCompare(b.login));
    } else if (sortBy === 'Followers') {
      users.sort((a, b) => b.followers - a.followers);
    } else if (sortBy === 'Public Repos') {
      users.sort((a, b) => b.public_repos - a.public_repos);
    }
  
    return users;
  }
  
  const sortByDropdown = document.getElementById('sortByDropdown');
  sortByDropdown.addEventListener('change', () => {
    const sortBy = sortByDropdown.value;
    const sortedUsers = sortUsers(users, sortBy);
    displayUsers(sortedUsers);
  });
  
  fetchGitHubUsers().then(users => {
    displayUsers(users);
  });