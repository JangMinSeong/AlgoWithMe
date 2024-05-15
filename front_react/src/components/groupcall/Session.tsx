import { useState, useEffect } from 'react'
import { Publisher, Subscriber } from 'openvidu-browser'

interface IParticipant {
  connectionId: string
  nickname: string
  subscriber: Subscriber
}

interface ISessionProps {
  subscriber: Subscriber
  publisher: Publisher
  participants: Array<IParticipant>
}

const Session = (props: ISessionProps) => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])

  useEffect(() => {
    if (props.subscriber) {
      setSubscribers((prevSubscribers) => [
        ...prevSubscribers,
        props.subscriber,
      ])
    }
  }, [props.subscriber])

  return (
    <div>
      {props.participants.map((participant) => (
        <div key={participant.connectionId}>사람</div>
      ))}
    </div>
  )
}

export default Session
