
// Global API base for PrestigeSites (connected to Render)
window.API_BASE = 'https://prestigesites-backend1.onrender.com';
async function postJSON(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if(!res.ok) throw new Error('HTTP '+res.status);
  return res.json();
}
// Contact form handler
window.handleContact = async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    await postJSON(`${window.API_BASE}/api/leads`, {
      name: data.name, email: data.email, phone: data.phone,
      businessType: data.businessType, message: data.message, source: 'website'
    });
    document.getElementById('result').innerHTML = '<b class="ok">תודה! פנייתך נקלטה ונחזור אליך.</b>';
    form.reset();
  } catch(err) {
    document.getElementById('result').innerHTML = '<b class="err">שגיאה בשליחה. נסה שוב.</b>';
    console.error(err);
  }
};
