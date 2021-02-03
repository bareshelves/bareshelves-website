/* eslint-disable @typescript-eslint/no-explicit-any */
export const getNotificationGranted = (): boolean | null => {
  // if (Notification.permission === 'granted') {
  //   (navigator.permissions.query as any)({
  //     name: 'periodic-background-sync',
  //   }).catch(console.error)
  // }

  switch (Notification.permission) {
    case 'default': return null
    case 'denied': return false
    case 'granted': return true
  }

}

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  const permission = await Notification.requestPermission()

  // const status = await (navigator.permissions.query as any)({
  //   name: 'periodic-background-sync',
  // })

  // if (status.state === 'granted') {
  //   // Periodic background sync can be used.
  // } else {
  //   // Periodic background sync cannot be used.
  // }

  return permission
}

export const notify = (title: string, link: string): Notification => {
  const notification = new Notification(title)
  
  notification.addEventListener('click', event => {
    event.preventDefault()
    window.open(link, '_blank')
  })

  return notification
}
