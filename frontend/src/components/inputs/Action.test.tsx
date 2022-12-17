import { faStickyNote } from "@fortawesome/free-regular-svg-icons";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vitest } from "vitest";
import Action from "./Action";

const testLabel = "Test Label";
const testIcon = faStickyNote;

describe("Action button", () => {
  it("should be a button", () => {
    render(<Action icon={testIcon} label={testLabel}></Action>);
    const element = screen.getByRole("button", { name: testLabel });

    expect(element.getAttribute("type")).toEqual("button");
    expect(element.getAttribute("aria-label")).toEqual(testLabel);
  });

  it("should show icon", () => {
    render(<Action icon={testIcon} label={testLabel}></Action>);
    // TODO: use getBy...
    const element = screen.getByRole("img", { hidden: true });

    expect(element.getAttribute("data-prefix")).toEqual(testIcon.prefix);
    expect(element.getAttribute("data-icon")).toEqual(testIcon.iconName);
  });

  it("should call on-click event when clicked", async () => {
    const onClickFn = vitest.fn();
    render(
      <Action icon={testIcon} label={testLabel} onClick={onClickFn}></Action>
    );

    await userEvent.click(screen.getByRole("button", { name: testLabel }));

    expect(onClickFn).toHaveBeenCalled();
  });
});