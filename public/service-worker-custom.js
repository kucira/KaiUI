importScripts('https://cdn.jsdelivr.net/npm/localforage@1.7.3/dist/localforage.min.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

//if the service worker failed to register in kaiOS, check the function,
// cannot use async await keyword, spread and check every each function

firebase.initializeApp({
    messagingSenderId: "351767822373"
});

const messaging = firebase.messaging();

function transformChatData(dataApp, _payload) {
    const parse = _payload;
    	switch(parse['@type']) {
            case 'updateUser' :
				localforage.setItem('messagram_data_app', {
					updateNewChat: dataApp.updateNewChat,
					updateNewMessage: dataApp.updateNewMessage,
					updateUser: _payload,
				}).then(function (value) {
				    // Do other things once the value has been saved.
				    console.log(value);
				}).catch(function(err) {
				    // This code runs if there were any errors
				    console.log(err);
				});
				return [];              
            break;
            case 'updateNewMessage' :
              // update the chat data with the new payload
              const newChatData = dataApp.updateNewChat.map(c => {
				return {
					id:c.id,
					title: c.title,
					last_message : (c.id === parse.message.chat_id ) ? 
					parse.message : c.last_message,
					unread_count: (c.id === parse.message.chat_id ) ? 
					c.unread_count += 1 : c.unread_count,
				}
              });
              console.log(newChatData, 'transform chat data');
              // save to database for the new chat
              if(dataApp.updateNewMessage)
                dataApp.updateNewMessage.push(parse.message);

              localforage.setItem('messagram_data_app', {
				updateNewMessage: dataApp.updateNewMessage,
				updateUser: _payload,
                updateNewChat: newChatData,
              });
              return newChatData;
            break;
            case 'updateNewChat' :
              return dataApp.updateNewChat;
            break;
          }
          // console.log('Message received. ', JSON.parse(_payload));
  };


// const findData = (dataApp, parsePayload) => {
//   switch(parsePayload['@type']) {
//     case 'updateNewMessage' :
//       const chat = dataApp.updateNewChat.find(c => c.id === parsePayload.message.chat_id);
//       return {
//         id: chat.id,
//         title:chat.title,
//         content:parsePayload.message.content.text.text,
//       };
//     break;
//   }
// }

// function postErrorToClients(err) {
//   clients.matchAll({includeUncontrolled: true})
//   .then(clientList => {
//      clientList.forEach(client => client.postMessage(err.message));
//   });
// }

self.addEventListener('notificationclick', function (e) {
    e.notification.close();

     e.waitUntil(
        clients.openApp(e.notification.data.redirect_url)
      );

});



// self.addEventListener('push', function(event) {
// 	const data = event.data.json();
// 	console.log(event.data.json(), 'berhasil');
// 	let message = '';
// 	switch(data['@type']){
// 		case 'error' :
// 			message = data.message;
// 			postErrorToClients(data);
// 			console.log('error')
// 		break;
// 	}
//     event.waitUntil(
//         registration.showNotification(data['@type'], {
//             body: event.data ? message : 'no payload',
//             icon: 'icon.png'
//         })
//     );
// });

function findData(dataApp, parsePayload) {
  switch(parsePayload['@type']) {
    case 'updateNewMessage' :
      const chat = dataApp.updateNewChat.find(c => c.id === parsePayload.message.chat_id);
      return {
        id: chat.id,
        title:chat.title,
        content:parsePayload.message.content.text.text,
        url: `${self.location.protocol}//${self.location.host}/#/message/${chat.id}/${chat.title}`,
      };
    break;
	case 'error' :
		return {
	        id: 0,
	        title:'Error',
	        content:parsePayload.message,
	        url: `${self.location.protocol}//${self.location.host}`,
		}
	break;
  }
}

function showError(parsePayload) {
  switch(parsePayload['@type']) {
	case 'error' :
		return {
	        id: 0,
	        title:'Error',
	        content:parsePayload.message,
	        url: `${self.location.protocol}//${self.location.host}`,
		}
	break;
  }
}

messaging.setBackgroundMessageHandler(function (payload) {
console.log(self, 'self');
console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  console.log('Message received. on background', JSON.parse(payload.data.payload));
	const parsePayload = JSON.parse(payload.data.payload);
	const errorObject = showError(parsePayload);
	if(errorObject) {
       return self.registration.showNotification(data['@type'], {
            body: event.data ? message : 'no payload',
            icon: 'icon.png'
        })

	}

  localforage.getItem('messagram_data_app').then( function(dataApp) {
	  
	  const result = transformChatData(dataApp, parsePayload);

	  const forNotificationData = findData(dataApp, parsePayload);

	  const notificationTitle = `${forNotificationData.title}`;
	  const notificationOptions = {
	    body: `${forNotificationData.content}`,
	    icon: 'https://cdn.iconscout.com/icon/free/png-256/telegram-9-840221.png',
	    tag: `${forNotificationData.id}`,
	    renotify: true,
	    data:{
	      redirect_url: forNotificationData.url,
	    }
	  };
	  
	  return self.registration.showNotification(notificationTitle,
	    notificationOptions);
  }).catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
	});
});