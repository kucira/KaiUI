self.addEventListener('push', function(event) {
	console.log(event, 'berhasil');
    event.waitUntil(
        registration.showNotification(event.data.json().title, {
            body: event.data ? event.data.text() : 'no payload',
            icon: 'icon.png'
        })
    );
});