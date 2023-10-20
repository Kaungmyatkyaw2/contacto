export const handleInfinitScroll = (fn: any, element: HTMLElement) => {
  const onScroll = async (_: Event) => {
    if (
      element.scrollHeight - element.scrollTop <=
      element.clientHeight * 1.5
    ) {
      await fn();
    }
  };

  const addEventListener = () => {
    element.addEventListener("scroll", onScroll);
  };

  const removeEventListener = () => {
    element.removeEventListener("scroll", onScroll);
  };

  return [addEventListener, removeEventListener];
};
