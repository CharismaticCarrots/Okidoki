import notifee, { TriggerType } from '@notifee/react-native';
import add from 'date-fns/add';

export const createTriggerNotification = async () => {
  notifee.getTriggerNotificationIds().then(ids => console.log('NOTIFICATIONS BEFORE: ', ids));
  try {
    const notifDate = add(new Date(), {
      seconds: 10 // 10 seconds for testing
      // days: 1
    });

    console.log("NOTIFICATION DATE", notifDate.toLocaleString('en-US', {
      timeZone: 'UTC',
    }))

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: notifDate.getTime(),
    };

    await notifee.createTriggerNotification({
      id: 'fullnessNotification',
      title: "Okidoki",
      body: `Don't forget to feed me!`
    },
    trigger,
    );

    await notifee.getTriggerNotificationIds().then(ids => console.log('NOTIFICATIONS AFTER: ', ids));
  } catch (error) {
    console.log(error);
  }
};
