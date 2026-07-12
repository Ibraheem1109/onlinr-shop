// Small script: client-side filtering for destination search
document.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.getElementById('searchBox');
  const cards = Array.from(document.querySelectorAll('.card'));
  if (!searchBox) return;

  searchBox.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    cards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const matches = title.includes(q);
      card.style.display = matches || q === '' ? '' : 'none';
    });
  });
});
