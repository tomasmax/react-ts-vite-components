import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Modal from "./Modal";

describe("Modal", () => {
  it("should render content", async () => {
    const props = {
      isOpen: true,
      onClose: () => {},
    };
    // arrange
    render(
      <Modal {...props}>
        <h2>Modal title</h2>
        <p>Modal content</p>
      </Modal>
    );

    // act
    const title = await screen.queryByText("Modal title");

    // assert
    expect(title);
  });

  it("should not render content", async () => {
    const props = {
      isOpen: false,
      onClose: () => {},
    };
    // arrange
    render(
      <Modal {...props}>
        <h2>Modal title</h2>
        <p>Modal content</p>
      </Modal>
    );

    // act
    const title = await screen.queryByText("Modal title");

    // assert
    expect(title).not.toBeInTheDocument();
  });

  it("should close the modal when the close button is clicked", async () => {
    const onCloseMock = jest.fn();
    const user = userEvent.setup();

    const props = {
      isOpen: true,
      onClose: onCloseMock,
    };

    // arrange
    render(
      <Modal {...props}>
        <h2>Modal title</h2>
        <p>Modal content</p>
      </Modal>
    );

    const closeButton = screen.getByLabelText("Close modal");

    await user.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
