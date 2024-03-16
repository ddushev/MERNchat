import { useEffect } from "react";
import { useSocketContext } from "../../context/socketContext"
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3"

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  const { selectedConversation } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (selectedConversation._id === newMessage.senderId) {
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        setMessages([...messages, newMessage]);
      }
    })

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages, selectedConversation]);
}

export default useListenMessages;