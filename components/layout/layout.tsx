import { Fragment, useContext } from 'react';

import Notification from '../notification/notification';
import NotificationContext from '../../context/notification.context'
import NavBar from './navbar'

// schema
import { Props } from '../../schema/page.schema'

function Layout({ children }: Props) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <NavBar />
      <main className='layout'>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout