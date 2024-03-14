import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/getRandomEmoji";
import Conversation from "./conversation";

const ConversationList = () => {
  const { isLoading, conversations } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, index) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          isLastIndex={index === conversations.length - 1}
          emoji={getRandomEmoji()}
        />
      ))}
      {isLoading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
export default ConversationList;
