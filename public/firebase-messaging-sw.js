importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
importScripts('https://cdn.jsdelivr.net/npm/localforage@1.7.3/dist/localforage.min.js');

firebase.initializeApp({
    messagingSenderId: "351767822373"
});

const messaging = firebase.messaging();

const getData = async (keyName) => {
  return await localforage.getItem(keyName);
}

const transformChatData =  (dataApp, _payload) => {
    const parse = _payload;
    switch(parse['@type']) {
            case 'updateUser' :
              console.log('save user if the phone number same with the payload'); //save user information
              localforage.setItem('messagram_data_app', {
                ...dataApp,
                updateUser: parse,
              });
              return [];
            break;
            case 'updateNewMessage' :
              // update the chat data with the new payload
              const newChatData = dataApp.updateNewChat.map(c => {
            
                return {
                  ...c,
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
                ...dataApp,
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


const findData = (dataApp, parsePayload) => {
  switch(parsePayload['@type']) {
    case 'updateNewMessage' :
      const chat = dataApp.updateNewChat.find(c => c.id === parsePayload.message.chat_id);
      return {
        id: chat.id,
        title:chat.title,
        content:parsePayload.message.content.text.text,
      };
    break;
  }
}

self.addEventListener('notificationclick', function (e) {
    e.notification.close();

     e.waitUntil(
        clients.openWindow(e.notification.data.redirect_url)
      );

});

messaging.setBackgroundMessageHandler(async (payload) => {
  console.log(self, 'self');
console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  console.log('Message received. on background', JSON.parse(payload.data.payload));
  const dataApp = await localforage.getItem('messagram_data_app');
  const parsePayload = JSON.parse(payload.data.payload);
  const result = transformChatData(dataApp, parsePayload);

  const forNotificationData = findData(dataApp, parsePayload);

  const notificationTitle = `${forNotificationData.title}`;
  const notificationOptions = {
    body: `${forNotificationData.content}`,
    icon: '/',
    tag: `${forNotificationData.id}`,
    renotify: true,
    data:{
      redirect_url: `${self.location.protocol}//${self.location.host}/#/message/${forNotificationData.id}/${forNotificationData.title}`,
    }
  };
  
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
