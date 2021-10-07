import React from "react";
import SendTestPulse from "./SendTestPulse";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("SendTestPulse", () => {
  const pulse = { name: "pulse" };
  const channel = { channel_type: "email" };
  const normalText = "Send email now";
  const successText = "Email sent";
  const failedText = "Sending failed";

  it("should display a success message when sending the pulse succeeds", () => {
    const testPulse = jest.fn().mockResolvedValue();

    render(
      <SendTestPulse
        pulse={pulse}
        channel={channel}
        testPulse={testPulse}
        normalText={normalText}
        successText={successText}
        disabled={false}
      />,
    );

    fireEvent.click(screen.getByText(normalText));

    waitFor(() => {
      screen.getByText(successText);
    });
  });

  it("should display a server error message when sending the pulse fails", () => {
    const errorResponse = { data: { message: "Server error" } };
    const testPulse = jest.fn().mockRejectedValue(errorResponse);

    render(
      <SendTestPulse
        pulse={pulse}
        channel={channel}
        testPulse={testPulse}
        normalText={normalText}
        successText={successText}
        disabled={false}
      />,
    );

    fireEvent.click(screen.getByText(normalText));

    waitFor(() => {
      screen.getByText(failedText);
      screen.getByText(errorResponse.data.message);
    });
  });
});
