import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../tabs";
import * as React from "react";

describe("Tabs", () => {
  it("renders tabs correctly", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
        <TabsContent value="tab3">Content 3</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab 3" })).toBeInTheDocument();
  });

  it("shows default tab content", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
  });

  it("switches tab on click", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    await user.click(screen.getByRole("tab", { name: "Tab 2" }));

    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("marks active tab correctly", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });

    expect(tab1).toHaveAttribute("data-state", "active");
    expect(tab2).toHaveAttribute("data-state", "inactive");

    await user.click(tab2);

    expect(tab1).toHaveAttribute("data-state", "inactive");
    expect(tab2).toHaveAttribute("data-state", "active");
  });

  it("supports keyboard navigation with arrow keys", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
        <TabsContent value="tab3">Content 3</TabsContent>
      </Tabs>
    );

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    tab1.focus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Tab 3" })).toHaveFocus();

    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
  });

  it("wraps around when using arrow keys", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
        <TabsContent value="tab3">Content 3</TabsContent>
      </Tabs>
    );

    const tab3 = screen.getByRole("tab", { name: "Tab 3" });
    tab3.focus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveFocus();

    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Tab 3" })).toHaveFocus();
  });

  it("can be controlled", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    const ControlledTabs = () => {
      const [value, setValue] = React.useState("tab1");

      return (
        <Tabs
          value={value}
          onValueChange={(newValue) => {
            setValue(newValue);
            handleValueChange(newValue);
          }}
        >
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      );
    };

    render(<ControlledTabs />);

    await user.click(screen.getByRole("tab", { name: "Tab 2" }));

    expect(handleValueChange).toHaveBeenCalledWith("tab2");
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("disables tabs when disabled prop is true", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" disabled>
            Tab 2
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    const disabledTab = screen.getByRole("tab", { name: "Tab 2" });
    expect(disabledTab).toBeDisabled();

    await user.click(disabledTab);
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("applies custom className to TabsList", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList className="custom-list-class">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content</TabsContent>
      </Tabs>
    );

    const tablist = screen.getByRole("tablist");
    expect(tablist).toHaveClass("custom-list-class");
  });

  it("applies custom className to TabsTrigger", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" className="custom-trigger-class">
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content</TabsContent>
      </Tabs>
    );

    const trigger = screen.getByRole("tab", { name: "Tab 1" });
    expect(trigger).toHaveClass("custom-trigger-class");
  });

  it("applies custom className to TabsContent", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="custom-content-class">
          Content
        </TabsContent>
      </Tabs>
    );

    const content = screen.getByRole("tabpanel");
    expect(content).toHaveClass("custom-content-class");
  });

  it("handles multiple tab groups independently", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Tabs defaultValue="a1">
          <TabsList>
            <TabsTrigger value="a1">Group A - Tab 1</TabsTrigger>
            <TabsTrigger value="a2">Group A - Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="a1">Group A Content 1</TabsContent>
          <TabsContent value="a2">Group A Content 2</TabsContent>
        </Tabs>

        <Tabs defaultValue="b1">
          <TabsList>
            <TabsTrigger value="b1">Group B - Tab 1</TabsTrigger>
            <TabsTrigger value="b2">Group B - Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="b1">Group B Content 1</TabsContent>
          <TabsContent value="b2">Group B Content 2</TabsContent>
        </Tabs>
      </div>
    );

    expect(screen.getByText("Group A Content 1")).toBeInTheDocument();
    expect(screen.getByText("Group B Content 1")).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Group A - Tab 2" }));

    expect(screen.getByText("Group A Content 2")).toBeInTheDocument();
    expect(screen.getByText("Group B Content 1")).toBeInTheDocument();
  });

  it("forwards ref correctly to TabsList", () => {
    const ref = vi.fn();

    render(
      <Tabs defaultValue="tab1">
        <TabsList ref={ref}>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content</TabsContent>
      </Tabs>
    );

    expect(ref).toHaveBeenCalled();
  });

  it("forwards ref correctly to TabsTrigger", () => {
    const ref = vi.fn();

    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" ref={ref}>
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content</TabsContent>
      </Tabs>
    );

    expect(ref).toHaveBeenCalled();
  });

  it("forwards ref correctly to TabsContent", () => {
    const ref = vi.fn();

    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" ref={ref}>
          Content
        </TabsContent>
      </Tabs>
    );

    expect(ref).toHaveBeenCalled();
  });
});
