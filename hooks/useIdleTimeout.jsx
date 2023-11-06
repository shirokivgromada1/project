import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useIdleTimer } from "react-idle-timer";
/**
 * @param onIdle - function to notify user when idle timeout is close
 * @param idleTime - number of seconds to wait before user is logged out
 */

const useIdleTimeout = () => {
  const { idleTimeout } = useAuth();
  const [isIdle, setIdle] = useState(false);

  const idleTimer = useIdleTimer({
    timeout: idleTimeout * 1000,
    promptTimeout: (idleTimeout * 1000) / 2,
    onIdle: () => setIdle(true),
    debounce: 500,
  });
  return {
    isIdle,
    setIdle,
    idleTimer,
  };
};
export default useIdleTimeout;
