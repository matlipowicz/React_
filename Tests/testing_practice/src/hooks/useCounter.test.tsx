import { renderHook, screen, act } from "@testing-library/react";
import { useCounter } from "./use-counter/useCounter";

describe("useCounter hook", () => {
    it("renders initial value as 0", () => {
        const { result } = renderHook(useCounter);
        expect(result.current.count).toBe(0);
    });

    it("hook renders the same value as initial value", () => {
        const { result } = renderHook(useCounter, {
            initialProps: { initialCount: 20 },
        });
        expect(result.current.count).toBe(20);
    });

    it("Increments value and renders 1 as heading", () => {
        const { result } = renderHook(useCounter);

        act(() => {
            result.current.increment();
        });
        expect(result.current.count).toBe(1);
    });
});
