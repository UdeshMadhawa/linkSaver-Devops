const db = firebase.firestore();

async function saveLink() {
  const url = document.getElementById('url').value;
  const title = document.getElementById('title').value;
  const tag = document.getElementById('tag').value;

  if (!url || !title) {
    alert('Please enter both URL and title.');
    return;
  }

  await db.collection('links').add({
    url, title, tag,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  // Clear inputs after saving
  document.getElementById('url').value = '';
  document.getElementById('title').value = '';
  document.getElementById('tag').value = '';
}

// Fetch and display links from Firebase
db.collection('links').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
  const linksContainer = document.getElementById('links');
  linksContainer.innerHTML = ''; // Clear container before re-rendering
  snapshot.forEach(doc => {
    const data = doc.data();
    linksContainer.innerHTML += `
      <div class="link-item">
        <strong>${data.title}</strong><br/>
        <a href="${data.url}" target="_blank">${data.url}</a><br/>
        <small>Tag: ${data.tag || 'None'}</small>
      </div>
    `;
  });
});

