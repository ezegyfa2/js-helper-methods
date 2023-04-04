global.sendFacebookAPIEvent = function(eventName, eventId, userEmail, customData) {
    return $.post({
        url: 'https://graph.facebook.com/v16.0/' + window.facebookPixelId + '/events?access_token=' + window.facebookAccessToken,
        data: this.getFacebookAPIData(eventName, eventId, userEmail, customData)
    })
}

global.getFacebookAPIData = function(eventName, eventId, userEmail, customData) {
    let apiData = {
        data: [
            {
                event_id: eventId,
                event_name: eventName,
                event_time: Math.floor(new Date() / 1000),
                action_source: 'website',
            }
        ],
        test_event_code: window.facebookTestEventCode
    }
    if (userEmail) {
        apiData.data[0].user_data = {
            em: [
                userEmail
            ],
            ph: [
                null
            ]
        }
    }
    if (customData) {
        apiData.data[0].custom_data = customData
    }
    return apiData
}
