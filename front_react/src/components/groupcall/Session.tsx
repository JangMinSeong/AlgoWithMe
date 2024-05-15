import { useState, useEffect } from 'react'
import { Publisher, Subscriber } from 'openvidu-browser'

interface ISessionProps {
  subscriber: Subscriber
  publisher: Publisher
}

const Session = (props: ISessionProps) => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])

  useEffect(() => {
    if (props.subscriber) {
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber])
    }
  }, [props.subscriber])

  return (
    <div>
      {subscribers.map((subscriberItem) => (
        <div key={subscriberItem.id}>사람</div>
      ))}
    </div>
  )
}

export default Session
