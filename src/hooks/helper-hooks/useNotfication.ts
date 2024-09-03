import { useEffect, useState } from "react";
import useUsers from "../authHooks/useUsers";
import useGetAllComments from "../comments/useGetAllComments";
import useGetAllTickets from "../tickets&department/useGetAllTickets";

const useNotfication = () => {
  const { users } = useUsers();
  const { tickets } = useGetAllTickets();
  const { comments } = useGetAllComments();
  const ticketCount = tickets?.tickets?.length;
  const usersCount = users?.users?.length;
  const commentsCount = comments?.allComments?.length;
  const [notifications, setNotifications] = useState({
    users: false,
    tickets: false,
    comments: false,
  });
  const checkAndUpdateCounts = (type: string, count: number) => {
    const storedCount = localStorage.getItem(type);
    if (storedCount !== null) {
      const previousCount = parseInt(storedCount, 10);
      if (count > previousCount) {
        setNotifications((prev) => ({ ...prev, [type]: true }));
      }
    }
    // Update localStorage with the new count
    localStorage.setItem(type, count.toString());
  };
  useEffect(() => {
    if (ticketCount !== undefined) {
      checkAndUpdateCounts("tickets", ticketCount);
    }
  }, [ticketCount]);

  useEffect(() => {
    if (commentsCount !== undefined) {
      checkAndUpdateCounts("comments", commentsCount);
    }
  }, [commentsCount]);

  useEffect(() => {
    if (usersCount !== undefined) {
      checkAndUpdateCounts("users", usersCount);
    }
  }, [usersCount]);
  const clearNotification = (type: string) => {
    setNotifications((prev) => ({ ...prev, [type]: false }));
  };
  return {
    notifications,
    clearNotification,
  };
};
export default useNotfication;
