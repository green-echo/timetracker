window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

deferredInstallPrompt = evt;
installButton.removeAttribute('hidden');

deferredInstallPrompt.prompt();
evt.srcElement.setAttribute('hidden', true);


deferredInstallPrompt.userChoice
    .then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted', choice);
      } else {
        console.log('User dismissed', choice);
      }
      deferredInstallPrompt = null;
    });

    window.addEventListener('appinstalled', logAppInstalled);

    console.log('Weather App was installed.', evt);