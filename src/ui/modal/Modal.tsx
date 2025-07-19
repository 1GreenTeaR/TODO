import { ReactNode, useState } from "react";
import "./Modal.css";
import { Button } from "../button/Button";
import { Icon } from "../icon/Icon";

type Props = {
  children: ReactNode;
  onClose?: () => void;
  shouldReserveSpaceForCloseButton?: boolean;
};
export function Modal({
  children,
  onClose,
  shouldReserveSpaceForCloseButton = false,
}: Props) {
  const [isClosing, setIsClosing] = useState(false);
  function onBackgroundClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      close();
    }
  }

  function close() {
    setIsClosing(true);
    setTimeout(() => onClose?.(), 300);
  }
  return (
    <div className="modal-container" onMouseDown={onBackgroundClick}>
      <div
        className={`modal ${isClosing ? "modal-closed" : ""} ${
          shouldReserveSpaceForCloseButton ? "reserve-space" : ""
        }`}
      >
        <Button
          className="modal-close-button"
          size="m"
          color="regular-elevated"
          padding="none"
          onClick={close}
        >
          <Icon size={20} name="close" />
        </Button>
        {children}
      </div>
    </div>
  );
}
