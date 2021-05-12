
import { useCallback, useState, useEffect } from "react";

function UseRoveFocus() {
  const [currentFocus, setCurrentFocus] = useState(0);

  const handleKeyDown = useCallback(
    e => {
      if (e.keyCode === 40) {
        // Down arrow
        e.preventDefault();
        setCurrentFocus(currentFocus + 1);
      } else if (e.keyCode === 38) {
        // Up arrow
        e.preventDefault();
        setCurrentFocus(currentFocus - 1);
      }
    },
    [currentFocus, setCurrentFocus]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return [currentFocus, setCurrentFocus];
}

export default UseRoveFocus;