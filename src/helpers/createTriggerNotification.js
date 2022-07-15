import notifee, { TriggerType } from '@notifee/react-native';
import add from 'date-fns/add';

export const createTriggerNotification = async (type) => {
  try {
    const notifDate = add(new Date(), {
      seconds: 10 // 10 seconds for testing
      // days: 1
    });

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: notifDate.getTime(),
    };

    await notifee.createTriggerNotification({
      id: `${type} notification`,
      title: "Okidoki",
      body: `Don't forget to ${type === 'feed' ? 'feed' : 'play with'} me!`
    },
    trigger,
    );

    // await notifee.getTriggerNotificationIds().then(ids => console.log('CURRENTLY SET UP NOTIFICATIONS:', ids));
  } catch (error) {
    console.log(error);
  }
};
