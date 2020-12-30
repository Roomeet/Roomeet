import { useEffect } from 'react';

export default function useOutsideAlerter(ref, setter, chat = false) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (chat) setter();
        if (setter) setter(() => false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setter]);
}
