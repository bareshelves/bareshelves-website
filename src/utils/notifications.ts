export const getNotificationGranted = (): boolean | null => {
  switch (Notification.permission) {
    case 'default': return null
    case 'denied': return false
    case 'granted': return true
  }
}

export const requestNotificationPermission = (): Promise<NotificationPermission> => Notification.requestPermission()

export const notify = (title: string, link: string): Notification => {
  const notification = new Notification(title)
  
  notification.addEventListener('click', event => {
    event.preventDefault()
    window.open(link, '_blank')
  })

  return notification
}
