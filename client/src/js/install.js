const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  let deferredPrompt = event;
  butInstall.style.display = 'block';

  butInstall.addEventListener('click', async () => {
    butInstall.style.display = 'none';
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    deferredPrompt = null;
  });
});

window.addEventListener('appinstalled', (event) => {
  butInstall.style.display = 'none';
  deferredPrompt = null;
  console.log('PWA was installed');
});
